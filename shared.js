window.WASHI_LINKS={"version":"0.5.7","brand_group":{"ar":"مجموعة وشي","en":"WASHI GROUP"},"shared_links":[{"key":"whatsapp","ar":"واتساب بزنس","en":"WhatsApp Business","url":"https://wa.me/966537505583","status":"owner_provided_group_whatsapp_2026-10-30","brand_icon":"whatsapp","color":"#25D366","phone_display":"+966 53 750 5583"},{"key":"snapchat","ar":"سناب شات","en":"Snapchat","url":"https://www.snapchat.com/add/washigroup","status":"owner_provided_scapchat_username_washigroup_2026-10-30","brand_icon":"snapchat","color":"#FFFC00","username":"washigroup","original_shared_url":"https://www.snapchat.com/add/washigroup?share_id=kosoQIfXNls&locale=en-GB","verification_note_ar":"الرابط قدمه المالك مباشرة؛ لم يتم التحقق من فتح الملف العام عبر المتصفح.","verification_note_en":"Owner-provided; public profile reachability has not been independently verified."},{"key":"facebook","ar":"فيسبوك","en":"Facebook","url":"https://www.facebook.com/share/19p6fq9osQ/","status":"owner_provided_share_link_public_target_unverified_2026_10_30","brand_icon":"facebook","color":"#0866FF","verification_note_ar":"رابط مشاركة قدمته المالكة؛ نوع الصفحة/الملف العام لم يتحقق خارجيًا.","verification_note_en":"Owner-provided share URL; public destination/account type not independently verified."},{"key":"pinterest","ar":"بنترست","en":"Pinterest","url":"https://pin.it/6lhzPROP5","status":"owner_provided_new_shortlink_destination_unverified_2026_10_30","brand_icon":"pinterest","color":"#BD081C","verification_note_ar":"رابط بنترست الأحدث من المالكة؛ الوجهة المختصرة (حساب/منشور) غير متحققة.","verification_note_en":"Most recent owner-provided short link; final destination (profile/pin) unverified.","previous_url":"https://pin.it/6DvncjQt5"},{"key":"youtube","ar":"يوتيوب","en":"YouTube","url":"https://www.youtube.com/@washiart.sa2030","status":"owner_provided_youtube_brand_named_washi_art_2026_10_30","brand_icon":"youtube","color":"#FF0033","verification_note_ar":"قناة باسم وشي آرت، قدمتها المالكة لعرضها في روابط المجموعة المشتركة.","verification_note_en":"WASHI ART-branded channel provided by the owner for shared site links."},{"key":"linktree","ar":"لينك تري","en":"Linktree","url":"https://linktr.ee/washiart.sa","status":"owner_provided_shared_linktree_brand_scope_unverified_2026_10_30","brand_icon":"linktree","color":"#43E55E","verification_note_ar":"رابط قدمته المالكة؛ يحمل اسم وشي آرت. لم يتأكد شموله العلامات الثلاث.","verification_note_en":"Owner-provided; the handle names WASHI ART. Whether it covers all three brands is unverified."}],"brand_links":{"art":{"ar":"وشي آرت","en":"WASHI ART","instagram":"https://www.instagram.com/washiart.sa/","tiktok":null,"email":"washiart.sa@gmail.com","salla":"https://washiart-sa.com/","logo":"assets/washi-art-logo.webp"},"bee":{"ar":"وشي بي","en":"WASHI BEE","instagram":"https://www.instagram.com/washi.bee/","tiktok":"https://www.tiktok.com/@washiart.sa","facebook":"https://www.facebook.com/100066332409228/photos/","whatsapp":"https://wa.me/966537505583","linktree":"https://tr.ee/6ccoo34_cD","email":"washibee.sa@gmail.com","salla":"https://salla.sa/washi-bee","logo":"assets/washi-bee-official-logo.webp"},"alanood":{"ar":"العنود النعيمي","en":"ALANOOD ALNAIMI","instagram":null,"tiktok":null,"email":null,"salla":null,"logo":null}},"reference_only":{"washi_art_linktree":"https://linktr.ee/washiart.sa","washi_art_youtube":"https://www.youtube.com/@washiart.sa2030","facebook_candidate":"https://www.facebook.com/WASHIGROUP.SA","previous_whatsapp_contact":"https://wa.me/966561671589"},"notes":{"ar":"الروابط المشتركة الستة قدّمتها المالكة. تعذّر التحقق خارجيًا من وجهة رابط فيسبوك المختصر، ورابط بنترست، وشمول لينك تري للعلامات الثلاث؛ قنوات وشي آرت تُعرض كما قدمتها المالكة دون تغيير اسمها.","en":"All six shared links are owner-provided. The Facebook share URL, Pinterest short URL and Linktree coverage of all three brands are not independently verified. WASHI ART-branded channels are shown as provided."}};
(()=>{'use strict';
const linkData=window.WASHI_LINKS || null;
const socialDefs={instagram:['Instagram','إنستغرام','#E4405F'],tiktok:['TikTok','تيك توك','#000000'],email:['Email','البريد الإلكتروني','#8C6B57']};
let currentLanguage=()=>document.documentElement.lang==='en'?'en':'ar';
const asset=k=>({whatsapp:'whatsapp',snapchat:'snapchat',facebook:'facebook',pinterest:'pinterest',youtube:'youtube',linktree:'linktree',instagram:'instagram',tiktok:'tiktok',email:'gmail'})[k]||k;
function makeTile(spec,language){const live=!!spec.url;const el=document.createElement(live?'a':'div');el.className='washi-social-tile'+(live?'':' washi-pending');if(live){el.href=spec.url;el.target=spec.key==='email'?'_self':'_blank';el.rel='noopener noreferrer';}else{el.setAttribute('aria-disabled','true');el.title=language==='en'?'Official URL pending':'بانتظار الرابط الرسمي';}
const img=document.createElement('img');img.className='washi-social-icon';img.alt='';img.loading='lazy';img.src=`assets/brand-${spec.key}.svg`;img.onerror=()=>{img.style.display='none';};el.append(img);const name=document.createElement('span');name.className='washi-social-name';name.textContent=spec[language]||spec.key;el.append(name);if(spec.status==='owner_provided_shortlink_destination_unverified'){const tag=document.createElement('small');tag.className='washi-social-status';tag.textContent=language==='en'?'Destination pending check':'وجهة الرابط قيد التحقق';el.append(tag);}if(!live){const x=document.createElement('small');x.className='washi-social-status';x.textContent=language==='en'?'Coming soon':'بانتظار التوثيق';el.append(x);}return el;}
function show(){if(!linkData)return;const lang=currentLanguage(), brand=document.querySelector('[data-washi-brand]')?.getAttribute('data-washi-brand')||'group';const region=document.getElementById('washi-social-section');if(!region)return;region.innerHTML='';const w=document.createElement('div');w.className='washi-social-wrap';const row=document.createElement('div');row.className='washi-social-panels';
const shared=document.createElement('section');shared.className='washi-social-panel';const h1=document.createElement('h2');h1.textContent=lang==='ar'?'حسابات مجموعة وشي':'WASHI GROUP channels';shared.append(h1);const p1=document.createElement('p');p1.textContent=lang==='ar'?'وسائل التواصل المشتركة للمجموعة':'Shared group communication channels';shared.append(p1);const g1=document.createElement('div');g1.className='washi-social-grid';linkData.shared_links.forEach(x=>g1.append(makeTile(x,lang)));shared.append(g1);if(brand!=='bee')row.append(shared);
const own=document.createElement('section');own.className='washi-social-panel';const h2=document.createElement('h2');const brands=linkData.brand_links;const selected=brands[brand]||null;h2.textContent=lang==='ar'?'روابط '+(selected?.ar||'علاماتنا'):(selected?.en||'Our brands')+' channels';own.append(h2);const p2=document.createElement('p');p2.textContent=lang==='ar'?'حسابات كل علامة مستقلة عن المجموعة':'Individual brand channels and email';own.append(p2);const g2=document.createElement('div');g2.className='washi-social-grid';if(selected){let arr=[{key:'instagram',ar:'إنستغرام',en:'Instagram',url:selected.instagram,color:'#E4405F'},{key:'tiktok',ar:'تيك توك',en:'TikTok',url:selected.tiktok,color:'#252525'},{key:'email',ar:'البريد الإلكتروني',en:'Email',url:selected.email?'mailto:'+selected.email:null,color:'#8C6B57'}];if(brand==='bee'){arr=arr.concat([
 {key:'whatsapp',ar:'واتساب بزنس',en:'WhatsApp Business',url:selected.whatsapp,color:'#25D366'},
 {key:'facebook',ar:'فيسبوك',en:'Facebook',url:selected.facebook,color:'#0866FF'},
 {key:'linktree',ar:'جميع روابطنا (Linktree)',en:'All our links (Linktree)',url:selected.linktree,color:'#43E55E'}]);arr.find(x=>x.key==='tiktok').ar='تيك توك (@washiart.sa)';arr.find(x=>x.key==='tiktok').en='TikTok (@washiart.sa)';}
 arr.forEach(x=>g2.append(makeTile(x,lang)))}else{Object.entries(brands).forEach(([key,b])=>{const a=document.createElement('a');a.className='washi-social-tile';a.href={'art':'washi-art.html','bee':'washi-bee.html','alanood':'alanood-alnaimi.html'}[key];const span=document.createElement('span');span.className='washi-social-name';span.textContent=b[lang];a.append(span);g2.append(a)})}own.append(g2);row.append(own);
w.append(row);const notice=document.createElement('div');notice.className='washi-social-notice';notice.textContent=brand==='bee'?(lang==='en'?'WASHI BEE channels. TikTok @washiart.sa is shared with owner approval.':'روابط وشي بي المعتمدة؛ حساب تيك توك @washiart.sa مستخدم بموافقة المالكة.'):linkData.notes[lang];w.append(notice);region.append(w);}
function updateLabel(){const lang=currentLanguage();document.querySelectorAll('[data-washi-label-ar]').forEach(e=>e.textContent=e.getAttribute('data-washi-label-'+lang)||'');}
function refresh(){show();updateLabel()};document.addEventListener('DOMContentLoaded',()=>{refresh();const obs=new MutationObserver(()=>{refresh()});obs.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});});
})();

// WASHI GROUP permanent brand-specific about and social navigation.
(function(){
  const pages={group:{about:'about-washi-group.html',home:'index.html'},art:{about:'about-washi-art.html',home:'washi-art.html'},bee:{about:'about-washi-bee.html',home:'washi-bee.html'},alanood:{about:'about-alanood-alnaimi.html',home:'alanood-alnaimi.html'}};
  function refreshPermanentNavigation(){
    const brand=document.body.getAttribute('data-washi-brand')||'group', info=pages[brand]||pages.group;
    if(brand==='bee'){document.getElementById('washi-permanent-navigation')?.remove();return;}
    const language=document.documentElement.lang==='en'?'en':'ar';
    document.querySelectorAll('[data-wh-ar][data-wh-en]').forEach(el=>{
      el.textContent=el.getAttribute(language==='ar'?'data-wh-ar':'data-wh-en');
    });
    let nav=document.getElementById('washi-permanent-navigation');
    if(!nav){nav=document.createElement('nav');nav.id='washi-permanent-navigation';nav.setAttribute('aria-label','About and social navigation');
      let anchor=document.querySelector('header');if(anchor)anchor.insertAdjacentElement('afterend',nav);else document.body.insertBefore(nav,document.body.firstChild);
    }
    const about=language==='en'?'About Us':'من نحن', social=language==='en'?'Our Social Media':'مواقعنا على منصات التواصل';
    const heritage=language==='en'?'Meaning of Washi':'معنى وشي';
    const products=language==='en'?'Our Products':'منتجاتنا';
    nav.setAttribute('dir',language==='en'?'ltr':'rtl');
    const at=(location.pathname.split('/').pop()||'index.html');
    const socialHref=at===info.home?'#washi-social-section':(document.getElementById('washi-social-section')?'#washi-social-section':info.home+'#washi-social-section');
    nav.textContent='';
    const a=document.createElement('a');a.href=info.about;a.textContent=about;
    const b=document.createElement('a');b.href=socialHref;b.textContent=social;
    const meaning=document.createElement('a');meaning.href='meaning-of-washi.html';meaning.textContent=heritage;
    // WASHI BEE: accessible two-level catalog with direct product and bundle links.
    // Keep other WASHI GROUP brands unaffected.
    if(brand==='bee'){
      const home=document.createElement('a');home.href='washi-bee.html';home.textContent=language==='en'?'WASHI BEE Home':'الرئيسية';nav.append(home);
      const makeMenu=(title,items)=>{
        const menu=document.createElement('details');menu.className='washi-bee-nav-menu';
        const summary=document.createElement('summary');summary.textContent=title;menu.append(summary);
        const panel=document.createElement('div');panel.className='washi-bee-nav-panel';
        items.forEach(item=>{
          if(item.label){const caption=document.createElement('strong');caption.className='washi-bee-nav-caption';caption.textContent=item.label;panel.append(caption)}
          else{const link=document.createElement('a');link.href=item.href;link.textContent=item.text;panel.append(link)}
        });
        menu.append(panel);return menu;
      };
      const en=language==='en';
      const products=[
        {text:en?'All Products':'جميع المنتجات',href:'washi-bee-products.html'},
        {label:en?'Natural Creams':'الكريمات الطبيعية'},
        {text:en?'WASHI MEELE':'وشي ميلي',href:'washi-bee-meele.html'},
        {label:en?'Natural Soaps':'الصابون الطبيعي'},
        {text:en?'WASHI SAPOUNI':'وشي سابوني',href:'washi-bee-sapouni.html'},
        {label:en?'Perfumes':'العطور'},
        {text:en?'Mykonos':'ميكونوس',href:'washi-bee-mykonos.html'},
        {text:en?'Santorini':'سانتوريني',href:'washi-bee-santorini.html'},
        {text:en?'Corfu':'كورفو',href:'washi-bee-corfu.html'}
      ];
      const bundles=[
        {text:en?'All Bundles & Gifts':'جميع البكيجات والهدايا',href:'washi-bee-gifts.html'},
        {text:en?'WASHI MEELE Bundle':'بكيج وشي ميلي',href:'washi-bee-bundle-meele.html'},
        {text:en?'WASHI PERFUME Bundle':'بكيج وشي بيرفيوم',href:'washi-bee-bundle-perfume.html'},
        {text:en?'WASHI SAPOUNI Bundle':'بكيج وشي سابوني',href:'washi-bee-bundle-sapouni.html'}
      ];
      nav.append(makeMenu(en?'Products':'المنتجات',products));
      nav.append(makeMenu(en?'Bundles & Gifts':'البكيج والهدايا',bundles));
      const shop=document.createElement('a');shop.href='https://salla.sa/washi-bee';shop.target='_blank';shop.rel='noopener noreferrer';shop.textContent=en?'Shop on Salla':'تسوّق من سلة';nav.append(shop);
    }else if(brand==='art'){
      const productLink=document.createElement('a');productLink.href='products-washi-art.html';productLink.textContent=language==='en'?'Our Products':'منتجاتنا';nav.append(productLink);
    }
    const groupHome=document.createElement('a');groupHome.href='index.html';groupHome.textContent=language==='en'?'WASHI GROUP':'مجموعة وشي';nav.append(groupHome,a,meaning,b);
  }
  document.addEventListener('DOMContentLoaded',()=>{refreshPermanentNavigation();
    const obs=new MutationObserver(refreshPermanentNavigation);obs.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  });
})();

/* Load WASHI BEE unified header/footer only on WASHI BEE pages. */
(function(){
 if(!document.body||document.body.getAttribute('data-washi-brand')!=='bee')return;
 const style=document.createElement('link');style.rel='stylesheet';style.href='washi-bee-shell.css';document.head.appendChild(style);
 const script=document.createElement('script');script.src='washi-bee-shell.js';document.body.appendChild(script);
})();
