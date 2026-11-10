import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { chromium } from 'playwright';

const root = process.cwd();
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.woff2':'font/woff2'};
const server = http.createServer(async (req,res)=>{
  try {
    const name = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const resolved = path.resolve(root,'.'+name);
    if (!resolved.startsWith(root+path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
    const bytes = await fs.readFile(resolved);
    res.setHeader('Content-Type',mime[path.extname(resolved)]||'application/octet-stream');
    res.end(bytes);
  } catch { res.writeHead(404);res.end('Not Found'); }
});
await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
const base = 'http://127.0.0.1:'+server.address().port;
const target = path.join(root,'qa-captures');
await fs.mkdir(target,{recursive:true});
const sample = ['washi-bee.html','washi-bee-products.html','washi-bee-meele.html','washi-bee-sapouni.html','washi-bee-mykonos.html','about-washi-bee.html','washi-bee-gifts.html'];
const results = []; let browser;
try {
 browser = await chromium.launch({headless:true, args:['--no-sandbox']});
 for(const [device,size] of Object.entries({mobile:{width:390,height:844},desktop:{width:1366,height:900}})){
  const context=await browser.newContext({viewport:size,deviceScaleFactor:1});
  for(const name of sample){
   const page=await context.newPage(); const pageErrors=[];const missing=[];
   page.on('pageerror',e=>pageErrors.push(e.message));
   page.on('response',r=>{if(r.status()>=400&&r.url().startsWith(base)) missing.push(r.url())});
   let row={page:name,device};
   try {
    await page.goto(base+'/'+name,{waitUntil:'domcontentloaded',timeout:25000});
    await page.waitForTimeout(400);
    row = {...row,...await page.evaluate(()=>{
      const hdr=document.querySelector('#washi-bee-site-header');
      return {
        lang: document.documentElement.lang,
        hasHeader:!!hdr,
        hasHeaderLogo: !!hdr?.querySelector('img[src*="washi-bee-approved-logo.png"]'),
        hasFooter:!!document.querySelector('#washi-bee-site-footer'),
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        brokenImages:[...document.images].filter(x=>!x.complete||x.naturalWidth===0).map(x=>x.src)
      };
    })};
    const stem=name.replace('.html','');
    if(device==='mobile' || ['washi-bee.html','washi-bee-products.html'].includes(name)){
      await page.screenshot({path:path.join(target,stem+'-'+device+'.png'),fullPage:true,animations:'disabled'});
    }
    if(device==='mobile'){
      const btn=page.locator('#bee-shell-mobile');
      if(await btn.count()){
       await btn.click();
       row.mobileMenuOpened=await btn.getAttribute('aria-expanded')==='true';
      }
    }
    await page.goto(base+'/'+name+'?lang=en',{waitUntil:'domcontentloaded',timeout:25000});
    await page.waitForTimeout(200);
    row.englishUrlLanguage=await page.evaluate(()=>document.documentElement.lang);
   } catch (e){row.error=String(e)}
   row.jsErrors=pageErrors;row.httpErrors=missing;
   results.push(row);await page.close();
  }
  await context.close();
 }
}finally{
 await browser?.close();server.close();
 await fs.writeFile(path.join(target,'results.json'),JSON.stringify(results,null,2));
}
const faults=results.filter(x=>x.error||!x.hasHeader||!x.hasHeaderLogo||!x.hasFooter||x.overflow>3||x.brokenImages?.length||x.jsErrors?.length||x.httpErrors?.length||x.mobileMenuOpened===false);
console.log(JSON.stringify({checked:results.length,faults,englishUrlResults:results.map(x=>({page:x.page,device:x.device,lang:x.englishUrlLanguage}))},null,2));
if(faults.length)process.exitCode=1;
