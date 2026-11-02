const base='https://res.cloudinary.com/dkdruv9ng/image/upload/c_limit,w_1600/q_auto/f_auto/';
const galleries={simisip:{title:'Simisip — identity & labels',description:'A selection of logo explorations and product-label designs. Alternative treatments are shown as explorations, rather than a single final identity system.',images:['v1793414904/lgo_nlvnrn.jpg','v1793414914/Logo_Design_g97tey.jpg','v1793414926/Logo_Design_alt_qjvc0f.jpg','v1793414938/Logo_with_details_stz5oe.jpg','v1793415066/sticker_3_jn5fja.jpg','v1793415070/sticker_2_qbqg64.jpg','v1793415075/sticker_1_gulwns.jpg']},training:{title:'Telica Academy campaign',description:'Four selected promotional slides. Explore the complete sequence below.',images:['v1793416425/Training_slide_1_zyfwne.jpg','v1793416424/Training_slide_2_wbo2ih.jpg','v1793416447/Training_slide_3_fdepzg.jpg','v1793416451/Training_slide_4_m66vrb.jpg']}};
document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});document.querySelectorAll('[data-category]').forEach(p=>p.hidden=button.dataset.filter!=='all'&&p.dataset.category!==button.dataset.filter)}));
const dialog=document.getElementById('gallery');document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{const g=galleries[button.dataset.gallery];document.getElementById('gallery-title').textContent=g.title;document.getElementById('gallery-description').textContent=g.description;const container=document.getElementById('gallery-images');container.replaceChildren(...g.images.map((path,i)=>{const img=new Image();img.src=base+path;img.alt=g.title+' — image '+(i+1);img.loading=i?'lazy':'eager';return img}));dialog.showModal();document.body.classList.add('modal-open')}));document.getElementById('close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});

const enquiryForm = document.getElementById('enquiry');
enquiryForm.addEventListener('submit', event => {
  event.preventDefault();
  const fields = new FormData(enquiryForm);
  const sender = fields.get('name').trim();
  const brief = fields.get('brief').trim();
  const subject = encodeURIComponent('Soteria enquiry from ' + sender);
  const body = encodeURIComponent(['Hello William,', '', brief, '', sender].join('\r\n'));
  window.location.href = enquiryForm.action + '?subject=' + subject + '&body=' + body;
});

// Ambient snow dropping animation (blurred blue dots)
function initSnow() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const container = document.getElementById('snow-container');
  if (!container) return;

  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 22 : 45;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const flake = document.createElement('span');
    flake.className = 'snowflake';

    const size = (Math.random() * 4 + 3).toFixed(1); // 3px to 7px
    const x = (Math.random() * 100).toFixed(2); // 0% to 100%
    const duration = (Math.random() * 6 + 7).toFixed(1); // 7s to 13s
    const delay = -(Math.random() * duration).toFixed(2); // Negative delay spreads flakes immediately
    const opacity = (Math.random() * 0.35 + 0.25).toFixed(2); // 0.25 to 0.60 opacity
    const blur = (Math.random() * 1.2 + 0.8).toFixed(1); // 0.8px to 2.0px light blur
    const s1 = ((Math.random() - 0.5) * 36).toFixed(1);
    const s2 = ((Math.random() - 0.5) * 44).toFixed(1);
    const s3 = ((Math.random() - 0.5) * 36).toFixed(1);
    const s4 = ((Math.random() - 0.5) * 26).toFixed(1);

    flake.style.setProperty('--snow-x', `${x}%`);
    flake.style.setProperty('--snow-size', `${size}px`);
    flake.style.setProperty('--snow-duration', `${duration}s`);
    flake.style.setProperty('--snow-delay', `${delay}s`);
    flake.style.setProperty('--snow-opacity', opacity);
    flake.style.setProperty('--snow-blur', `${blur}px`);
    flake.style.setProperty('--snow-sway-1', `${s1}px`);
    flake.style.setProperty('--snow-sway-2', `${s2}px`);
    flake.style.setProperty('--snow-sway-3', `${s3}px`);
    flake.style.setProperty('--snow-sway-4', `${s4}px`);

    fragment.appendChild(flake);
  }

  container.appendChild(fragment);
}

initSnow();
