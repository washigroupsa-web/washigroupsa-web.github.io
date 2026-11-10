import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { chromium } from 'playwright';
const root=process.cwd(), captures=path.join(root,'qa-meele-gallery');
await fs.mkdir(captures,{recursive:true});
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml'};
const server=http.createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://local.test').pathname);
  const file=path.resolve(root,'.'+pathname);
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  const data=await fs.readFile(file);
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
  res.end(data);
 }catch(e){res.writeHead(404);res.end('Not found');}
});
await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
const base='http://127.0.0.1:'+server.address().port;
let browser;const results=[];let hasFailure=false;
try{
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 for(const [device,viewport] of Object.entries({mobile:{width:390,height:844},desktop:{width:1366,height:900}})){
  for(const lang of ['ar','en']){
   const context=await browser.newContext({viewport,deviceScaleFactor:1});
   const page=await context.newPage(),jsErrors=[],requestErrors=[];
   page.on('pageerror',e=>jsErrors.push(e.message));
   page.on('response',r=>{if(r.status()>=400&&r.url().startsWith(base))requestErrors.push(r.url()+':'+r.status());});
   const result={device,lang};
   try{
    await page.goto(base+'/washi-bee-meele.html'+(lang==='en'?'?lang=en':''),{waitUntil:'domcontentloaded',timeout:30000});
    const cards=page.locator('.meele-gallery-link');
    await cards.first().waitFor();
    result.count=await cards.count();
    for(let i=0;i<result.count;i++){
      await cards.nth(i).scrollIntoViewIfNeeded();
      await cards.nth(i).locator('img').evaluate(img=>img.decode());
    }
    result.state=await page.evaluate(()=>{
      const gallery=document.querySelector('.meele-gallery');
      const links=[...document.querySelectorAll('.meele-gallery-link')];
      return{
       language:document.documentElement.lang,
       title:gallery?.querySelector('h2')?.textContent,
       columns:getComputedStyle(document.querySelector('.meele-product-gallery-grid')).gridTemplateColumns.split(' ').filter(Boolean).length,
       links:links.map(a=>({href:a.getAttribute('href'),target:a.getAttribute('target'),rel:a.getAttribute('rel'),image:a.querySelector('img')?.getAttribute('src'),loaded:!!a.querySelector('img')?.naturalWidth,alt:a.querySelector('img')?.getAttribute('alt')})),
       horizontalOverflow:document.documentElement.scrollWidth-window.innerWidth,
       originalMainProductImagePresent:!!document.querySelector('img[src="assets/washi-meele-approved.png"]')
      };
    });
    await page.evaluate(()=>window.scrollTo(0,0));
    await page.waitForTimeout(250);
    await page.screenshot({path:path.join(captures,'meele-'+device+'-'+lang+'.png'),fullPage:true,animations:'disabled'});
    const state=result.state;
    result.passed=result.count===6
      &&state.language===lang
      &&state.links.length===6
      &&state.links.every(x=>x.href==='https://salla.sa/washi-bee'&&x.target==='_blank'&&x.rel?.includes('noopener')&&x.loaded&&x.alt)
      &&state.columns===2
      &&state.horizontalOverflow<=3
      &&state.originalMainProductImagePresent
      &&jsErrors.length===0&&requestErrors.length===0;
   }catch(e){result.error=String(e);result.passed=false;}
   result.jsErrors=jsErrors;result.requestErrors=requestErrors;
   if(!result.passed)hasFailure=true;
   results.push(result);
   await context.close();
  }
 }
}finally{
 await browser?.close();server.close();
 await fs.writeFile(path.join(captures,'results.json'),JSON.stringify(results,null,2));
}
console.log(JSON.stringify({passed:!hasFailure,checks:results.map(r=>({device:r.device,lang:r.lang,passed:r.passed,count:r.count,overflow:r.state?.horizontalOverflow,requestErrors:r.requestErrors,jsErrors:r.jsErrors,error:r.error}))},null,2));
if(hasFailure)process.exitCode=1;
