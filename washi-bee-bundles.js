/* Language switch for WASHI BEE bundle draft pages. */
(function(){
function setLanguage(lang){
  const root=document.documentElement;
  root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-wh-ar][data-wh-en]').forEach(function(el){
    el.textContent=el.getAttribute(lang==='ar'?'data-wh-ar':'data-wh-en');
  });
  const btn=document.getElementById('wh-language');
  if(btn)btn.textContent=lang==='ar'?'EN':'عربي';
  document.dispatchEvent(new Event('washi:language'));
}
document.addEventListener('DOMContentLoaded',function(){
  const btn=document.getElementById('wh-language');
  if(btn)btn.addEventListener('click',function(){setLanguage(document.documentElement.lang==='ar'?'en':'ar')});
  setLanguage(new URLSearchParams(location.search).get('lang')==='en'?'en':'ar');
});
})();
