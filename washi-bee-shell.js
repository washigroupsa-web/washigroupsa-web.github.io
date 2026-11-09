/* WASHI BEE shared shell: never touches another WASHI GROUP brand. */
(function(){
'use strict';
if(document.body.getAttribute('data-washi-brand')!=='bee')return;
const identity=window.WASHI_LINKS?.brand_links?.bee||{};
const bundleUrl='https://salla.sa/washi-bee/washi-bee-gifts/p520918653';
const safe=(x)=>String(x||'').replace(/[&<>"']/g,(s)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
const isEnglish=()=>document.documentElement.lang==='en';
const t=(ar,en)=>isEnglish()?en:ar;
function local(path){
  if(!isEnglish()||path.startsWith('#'))return path;
  const parts=path.split('#');const base=parts[0];
  if(!base.endsWith('.html'))return path;
  return base+'?lang=en'+(parts.length>1?'#'+parts.slice(1).join('#'):'');
}
function a(href,label,extra=''){
  return '<a href="'+safe(local(href))+'"'+extra+'>'+safe(label)+'</a>';
}
function ext(href,label){
  return href?a(href,label,' target="_blank" rel="noopener noreferrer"'):'';
}
function menu(label,items){
  return '<details class="bee-shell-dropdown"><summary>'+safe(label)+'</summary><div class="bee-shell-dropdown-panel">'+items.join('')+'</div></details>';
}
function caption(ar,en){return '<span class="bee-shell-caption">'+safe(t(ar,en))+'</span>'}
function headerHTML(){
 const prod=[
 a('washi-bee-products.html',t('جميع المنتجات','All products')),
 caption('الكريمات الطبيعية','Natural creams'),
 a('washi-bee-meele.html',t('وشي ميلي','WASHI MEELE')),
 caption('الصابون الطبيعي','Natural soaps'),
 a('washi-bee-sapouni.html',t('وشي سابوني','WASHI SAPOUNI')),
 caption('العطور','Perfumes'),
 a('washi-bee-mykonos.html',t('ميكونوس','Mykonos')),
 a('washi-bee-santorini.html',t('سانتوريني','Santorini')),
 a('washi-bee-corfu.html',t('كورفو','Corfu'))
 ];
 const current=location.pathname.split('/').pop()||'washi-bee.html';
 return '<div class="bee-shell-top"><div class="bee-shell-inner">'+
  '<span>'+safe(t('من طبيعة اليونان... إلى حياتك','FROM GREEK NATURE... TO YOUR LIFE'))+'</span>'+
  a('index.html',t('العودة إلى مجموعة وشي','Back to WASHI GROUP'))+
  '</div></div><div class="bee-shell-main bee-shell-inner">'+
  a('washi-bee.html','<logo>') // replaced below before inserting
  .replace('&lt;logo&gt;','<img src="assets/washi-bee-official-logo.webp" alt="'+safe(t('شعار وشي بي','WASHI BEE logo'))+'"><span><strong>'+safe(t('وشي بي','WASHI BEE'))+'</strong><small>WASHI BEE</small></span>')
  .replace('<a ','<a class="bee-shell-logo" ')+
  '<nav id="bee-shell-nav" class="bee-shell-nav" aria-label="'+safe(t('القائمة الرئيسية لوشي بي','WASHI BEE main navigation'))+'">'+
  a('washi-bee.html',t('الرئيسية','Home'),current==='washi-bee.html'?' aria-current="page"':'')+
  menu(t('المنتجات','Products'),prod)+
  ext(bundleUrl,t('البكيج والهدايا','Bundles & Gifts'))+
  a('about-washi-bee.html',t('من نحن','About'),current==='about-washi-bee.html'?' aria-current="page"':'')+
  a('#washi-bee-site-footer',t('تواصل معنا','Contact'))+
  '</nav>'+
  '<div class="bee-shell-actions">'+
  ext(identity.salla||'https://salla.sa/washi-bee',t('تسوّق الآن','Shop now')).replace('<a ','<a class="bee-shell-store" ')+
  '<button type="button" id="bee-shell-language" class="bee-shell-lang" aria-label="'+safe(t('تغيير اللغة','Change language'))+'">'+(isEnglish()?'عربي':'EN')+'</button>'+
  '<button type="button" id="bee-shell-mobile" class="bee-shell-mobile" aria-expanded="false" aria-controls="bee-shell-nav">'+safe(t('القائمة','Menu'))+'</button>'+
  '</div></div>';
}
function footerHTML(){
 const email=identity.email||'washibee.sa@gmail.com';
 const whatsapp=identity.whatsapp||'https://wa.me/966537505583';
 const social=[
   ext(identity.instagram,t('إنستغرام — @washi.bee','Instagram — @washi.bee')),
   ext(identity.tiktok,t('تيك توك — @washiart.sa','TikTok — @washiart.sa')),
   ext(identity.facebook,t('فيسبوك','Facebook')),
   ext(identity.linktree,t('جميع روابطنا — لينك تري','All links — Linktree'))
 ].filter(Boolean).map(s=>s.replace('<a ','<a class="bee-shell-footer-link" ')).join('');
 return '<div class="bee-shell-inner bee-shell-footer-grid">'+
  '<div><div class="bee-shell-footer-brand"><img src="assets/washi-bee-official-logo.webp" alt="'+safe(t('شعار وشي بي','WASHI BEE logo'))+'"><div><h2>'+safe(t('وشي بي','WASHI BEE'))+'</h2><span>WASHI BEE</span></div></div><p>'+safe(t('من طبيعة اليونان... إلى حياتك. اكتشفي العناية الطبيعية والصابون والعطور والبكجات والهدايا.','From Greek nature to your life. Explore skincare, soaps, perfumes, bundles and gifts.'))+'</p></div>'+
  '<div><h3>'+safe(t('تصفّح الموقع','Explore'))+'</h3>'+
  [a('washi-bee.html',t('الرئيسية','Home')),a('washi-bee-products.html',t('المنتجات','Products')),ext(bundleUrl,t('البكيج والهدايا','Bundles & Gifts')),a('about-washi-bee.html',t('من نحن','About Us')),ext(identity.salla||'https://salla.sa/washi-bee',t('متجر سلة','Salla Store'))].map(s=>s.replace('<a ','<a class="bee-shell-footer-link" ')).join('')+
  '</div><div><h3>'+safe(t('تواصل معنا','Contact'))+'</h3>'+
  ext(whatsapp,t('واتساب بزنس: 0537505583','WhatsApp: +966 53 750 5583')).replace('<a ','<a class="bee-shell-footer-link" ')+
  a('mailto:'+email,email,' class="bee-shell-footer-link"')+
  '<h3>'+safe(t('تابعينا','Follow us'))+'</h3>'+social+
  '</div><div><h3>'+safe(t('البكيجات','Bundles'))+'</h3>'+
  [ext(bundleUrl,t('عرض جميع البكجات والهدايا','View Bundles & Gifts'))].map(s=>s.replace('<a ','<a class="bee-shell-footer-link" ')).join('')+
  '</div></div>'+
  '<div class="bee-shell-footer-bottom"><div class="bee-shell-inner"><span>© 2026 WASHI BEE · WASHI GROUP</span>'+a('index.html',t('العودة إلى مجموعة وشي','Back to WASHI GROUP'))+'</div></div>';
}
function applyBodyLanguage(lang){
 document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 document.querySelectorAll('[data-wh-ar][data-wh-en],[data-i18n-ar][data-i18n-en]').forEach(el=>{
  const prefix=el.hasAttribute('data-wh-ar')?'data-wh-':'data-i18n-';
  el.textContent=el.getAttribute(prefix+lang)||'';
 });
 document.querySelectorAll('[data-wh-lang]').forEach(el=>el.hidden=el.getAttribute('data-wh-lang')!==lang);
 document.dispatchEvent(new Event('washi:language'));
}
function render(){
 let header=document.getElementById('washi-bee-site-header');
 if(!header){
  const old=document.querySelector('body > header');
  if(!old)return;
  header=document.createElement('header');header.id='washi-bee-site-header';header.setAttribute('data-washi-shell','bee');
  old.replaceWith(header);
 }
 const wasOpen=header.querySelector('#bee-shell-mobile')?.getAttribute('aria-expanded')==='true';
 header.innerHTML=headerHTML();
 const nav=header.querySelector('#bee-shell-nav'),mobile=header.querySelector('#bee-shell-mobile');
 if(wasOpen){nav.classList.add('bee-shell-nav-open');mobile.setAttribute('aria-expanded','true')}
 mobile.addEventListener('click',()=>{
  const open=nav.classList.toggle('bee-shell-nav-open');mobile.setAttribute('aria-expanded',String(open));
 });
 header.querySelector('#bee-shell-language').addEventListener('click',()=>applyBodyLanguage(isEnglish()?'ar':'en'));
 header.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{
  if(d.open)header.querySelectorAll('details').forEach(o=>{if(o!==d)o.open=false});
 }));
 let footer=document.getElementById('washi-bee-site-footer');
 if(!footer){
  const old=document.querySelector('body > footer');
  if(!old)return;
  footer=document.createElement('footer');footer.id='washi-bee-site-footer';
  old.replaceWith(footer);
 }
 footer.innerHTML=footerHTML();
 document.getElementById('washi-permanent-navigation')?.remove();
}
function start(){
 const langParam=new URLSearchParams(location.search).get('lang');
 if(langParam==='ar'||langParam==='en')applyBodyLanguage(langParam);
 render();
 document.addEventListener('washi:language',render);
 const observer=new MutationObserver(render);
 observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
else start();
})();