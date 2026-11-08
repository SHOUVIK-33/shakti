/* =========================================================
   RENDER
   ========================================================= */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

/* hero mandala petals */
(function petals(){
  const g = document.getElementById('petals');
  if(!g) return;
  let out = '';
  for(let i=0;i<32;i++){
    const a = (360/32)*i;
    out += '<ellipse cx="400" cy="252" rx="21" ry="86" fill="none" stroke-opacity=".2" transform="rotate('+a+' 400 400)"/>';
  }
  g.innerHTML = out;
})();

/* navadurga */
(function(){
  const el = document.getElementById('navadurgaGrid');
  el.innerHTML = NAVADURGA.map(x => `
    <article class="ncard reveal">
      <div class="ncard-day"><span>Day ${x.d}</span><em>${x.chakra}</em></div>
      <p class="ncard-deva">${x.deva}</p>
      <h3 class="ncard-name">${x.name}</h3>
      <p class="ncard-mean">${x.mean}</p>
      <div class="ncard-rows">
        <div class="nrow"><span>Vahana</span><b>${x.vahana}</b></div>
        <div class="nrow"><span>Bhog</span><b>${x.bhog}</b></div>
        <div class="nrow"><span>Chakra</span><b>${x.chakra}</b></div>
        <div class="nrow"><span>Colour</span><b>${x.colour}</b></div>
      </div>
      <div class="ncard-mantra">${x.mantra}<small>${x.roman}</small></div>
      <p style="font-size:12px;color:var(--dim2);margin:11px 0 0;line-height:1.5">${x.bless}</p>
      <details class="dhyana-wrap">
        <summary>Dhyana shloka</summary>
        <div class="dhyana">${x.dhyana.replace(/\n/g,'<br>')}</div>
        <div class="dhyana" style="font-family:var(--font-sans);font-style:italic;font-size:12px;border:0;padding-top:4px;margin-top:0">${x.droman.replace(/\n/g,'<br>')}</div>
      </details>
    </article>`).join('');
})();

/* mahavidya */
(function(){
  const el = document.getElementById('mahavidyaGrid');
  el.innerHTML = MAHAVIDYA.map(x => `
    <article class="mv reveal">
      <div class="mv-top"><span class="mv-deva">${x.deva}</span><span class="mv-name">${x.name}</span></div>
      <div class="mv-ep">${x.ep}</div>
      <p class="mv-ess">${x.ess}</p>
      <div class="mv-mantra">${x.mantra}<small>${x.roman}</small></div>
      <div class="mv-grant">${x.grant}</div>
    </article>`).join('');
})();

/* peethas */
(function(){
  const t18 = document.getElementById('tbl18');
  t18.innerHTML = '<thead><tr><th>#</th><th>Shakti</th><th>Place</th><th>Region</th><th>Body part</th><th>Bhairava</th></tr></thead><tbody>' +
    P18.map((r,i)=>`<tr><td>${String(i+1).padStart(2,'0')}</td><td class="t-name">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td></tr>`).join('') +
    '</tbody>';

  document.getElementById('grid51').innerHTML = P51.map((n,i)=>`<div><b>${String(i+1).padStart(2,'0')}</b><span>${n}</span></div>`).join('');

  const t52 = document.getElementById('tbl52');
  t52.innerHTML = '<thead><tr><th>#</th><th>Peetha / Shakti</th><th>Bhairava</th><th>Place</th><th>Region</th><th>Body part</th></tr></thead><tbody>' +
    P52.map((r,i)=>`<tr><td>${String(i+1).padStart(2,'0')}</td><td class="t-name">${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td></tr>`).join('') +
    '</tbody>';

  const t108 = document.getElementById('tbl108');
  t108.innerHTML = '<thead><tr><th>#</th><th>Place / Peetha</th><th>Goddess</th></tr></thead><tbody>' +
    P108.map((r,i)=>`<tr><td>${String(i+1).padStart(3,'0')}</td><td class="t-name">${r[0]}</td><td>${r[1]}</td></tr>`).join('') +
    '</tbody>';

  const tn = document.getElementById('tblNote');
  tn.innerHTML = '<thead><tr><th>Count</th><th>Tradition</th><th>Names</th><th>Status</th></tr></thead><tbody>' +
    NOTE_ROWS.map(r=>`<tr><td>${r[0]}</td><td class="t-name">${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('') +
    '</tbody>';
})();

/* mantras */
function renderMantras(filter){
  const root = document.getElementById('mantraRoot');
  const groups = MGROUPS.filter(g => filter === 'all' || g.id === filter);
  root.innerHTML = groups.map(g => `
    <div class="mgroup">
      <div class="mgroup-head">
        <h3>${g.title}</h3><div class="line"></div><span class="cnt">${g.items.length} mantra</span>
      </div>
      <div class="mlist">
        ${g.items.map(it => `
          <article class="mitem">
            <button class="copy" data-copy="${encodeURIComponent(it.deva + '\n' + (it.ro||''))}">copy</button>
            <h5>${it.t}</h5>
            <div class="deva">${it.deva}</div>
            ${it.ro ? '<div class="roman">'+it.ro+'</div>' : ''}
            ${it.note ? '<div class="note">'+it.note+'</div>' : ''}
          </article>`).join('')}
      </div>
    </div>`).join('');
  bindCopy();
}
function bindCopy(){
  $$('.copy').forEach(b=>{
    b.addEventListener('click', async () => {
      const txt = decodeURIComponent(b.dataset.copy);
      try{ await navigator.clipboard.writeText(txt); }catch(e){
        const ta=document.createElement('textarea'); ta.value=txt; document.body.appendChild(ta); ta.select();
        try{document.execCommand('copy');}catch(_){} ta.remove();
      }
      b.textContent='copied'; b.classList.add('done');
      setTimeout(()=>{b.textContent='copy'; b.classList.remove('done');},1600);
    });
  });
}
renderMantras('all');

/* kathas */
(function(){
  document.getElementById('kathaGrid').innerHTML = KATHAS.map(k => `
    <article class="katha reveal">
      <h4>${k.t}</h4>
      <span class="where">${k.w}</span>
      ${k.p.map(p=>'<p>'+p+'</p>').join('')}
      <span class="hold">${k.hold}</span>
    </article>`).join('');
})();

/* teachings */
(function(){
  document.getElementById('teachGrid').innerHTML = TEACH.map(t => `
    <article class="teach reveal">
      <span class="num">${t.n}</span>
      <h4>${t.t}</h4>
      <p>${t.p}</p>
      <span class="quote">${t.q}</span>
    </article>`).join('');
})();

/* =========================================================
   INTERACTION
   ========================================================= */
/* reveal on scroll */
(function(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{rootMargin:'0px 0px -8% 0px', threshold:.08});
  $$('.reveal').forEach(el=>io.observe(el));
})();

/* toc + topnav scroll spy */
(function(){
  const links = $$('#toc a, #topnav a');
  const map = [];
  $$('section[id], header[id]').forEach(el=>{
    const l = $$('#toc a, #topnav a').filter(a=>a.getAttribute('href')==='#'+el.id);
    if(l.length) map.push({el, links:l});
  });
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        links.forEach(l=>l.classList.remove('active'));
        const m = map.find(x=>x.el===e.target);
        if(m){
          m.links.forEach(l=>l.classList.add('active'));
          if(window.innerWidth<=1000){
            const a = m.links[0];
            if(a && a.closest('#toc')) a.scrollIntoView({behavior:'smooth', block:'nearest', inline:'center'});
          }
        }
      }
    });
  },{rootMargin:'-12% 0px -76% 0px'});
  map.forEach(m=>obs.observe(m.el));
  links.forEach(a=>a.addEventListener('click', ev=>{
    const el = document.getElementById(a.getAttribute('href').slice(1));
    if(el){ ev.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); history.replaceState(null,'',a.getAttribute('href')); }
  }));
})();

/* peetha tabs */
(function(){
  const tabs = $$('#peethaTabs .tab');
  tabs.forEach(t=>t.addEventListener('click',()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    $$('.panel').forEach(p=>p.classList.remove('active'));
    const p = document.getElementById(t.dataset.tab);
    if(p) p.classList.add('active');
  }));
})();

/* mantra filter */
(function(){
  const tabs = $$('#mFilter .tab');
  tabs.forEach(t=>t.addEventListener('click',()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    renderMantras(t.dataset.f);
  }));
})();

/* ---------- sound ---------- */
let AC = null;
function audio(){
  if(!AC){ try{ AC = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ AC = null; } }
  if(AC && AC.state === 'suspended') AC.resume();
  return AC;
}
function ringBell(){
  const ac = audio(); if(!ac) return;
  const t0 = ac.currentTime;
  const partials = [[523,0.30,2.6],[1046,0.22,2.1],[1568,0.13,1.5],[2093,0.07,1.0],[784,0.10,1.8]];
  partials.forEach(([f,g,d])=>{
    const o = ac.createOscillator(); const gn = ac.createGain();
    o.type='sine'; o.frequency.value=f;
    gn.gain.setValueAtTime(0, t0);
    gn.gain.linearRampToValueAtTime(g, t0+0.012);
    gn.gain.exponentialRampToValueAtTime(0.0001, t0+d);
    o.connect(gn).connect(ac.destination);
    o.start(t0); o.stop(t0+d+0.05);
  });
}
function chime(){
  const ac = audio(); if(!ac) return;
  const t0 = ac.currentTime;
  [[880,0.16,1.2],[1320,0.09,0.9]].forEach(([f,g,d])=>{
    const o=ac.createOscillator(), gn=ac.createGain();
    o.type='sine'; o.frequency.value=f;
    gn.gain.setValueAtTime(0,t0); gn.gain.linearRampToValueAtTime(g,t0+0.01);
    gn.gain.exponentialRampToValueAtTime(0.0001,t0+d);
    o.connect(gn).connect(ac.destination); o.start(t0); o.stop(t0+d+0.05);
  });
}

/* ---------- hero diya ---------- */
(function(){
  const d = document.getElementById('heroDiya'), hint = document.getElementById('diyaHint');
  function light(){
    if(d.classList.contains('lit')) return;
    d.classList.add('lit'); chime();
    hint.textContent = 'जय माता दी — the lamp is lit';
  }
  d.addEventListener('click', light);
  d.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); light(); } });
})();

/* ---------- yantra ---------- */
(function(){
  const el = document.getElementById('mandirYantra');
  if(!el) return;
  let petal16 = '', petal8 = '';
  for(let i=0;i<16;i++) petal16 += '<ellipse cx="200" cy="92" rx="24" ry="52" transform="rotate('+(i*22.5)+' 200 200)"/>';
  for(let i=0;i<8;i++) petal8 += '<ellipse cx="200" cy="128" rx="30" ry="46" transform="rotate('+(i*45)+' 200 200)"/>';
  el.innerHTML = '<svg viewBox="0 0 400 400">' +
    '<g fill="none" stroke="#f2d79b" stroke-opacity=".38"><circle cx="200" cy="200" r="192"/><circle cx="200" cy="200" r="164" stroke-opacity=".22"/></g>' +
    '<g fill="none" stroke="#f2d79b" stroke-opacity=".30">' + petal16 + '</g>' +
    '<g fill="none" stroke="#f2d79b" stroke-opacity=".42">' + petal8 + '</g>' +
    '<g fill="none" stroke="#f6c9d3" stroke-opacity=".55" stroke-width="1.2">' +
      '<path d="M200 78 L302 258 L98 258 Z"/><path d="M200 322 L98 142 L302 142 Z"/>' +
      '<circle cx="200" cy="200" r="52"/><circle cx="200" cy="200" r="26" stroke-opacity=".4"/>' +
    '</g>' +
    '<circle cx="200" cy="200" r="5.5" fill="#f2d79b" fill-opacity=".9"/>' +
    '</svg>';
})();

/* ---------- virtual mandir ---------- */
(function(){
  const mandir = document.getElementById('mandir');
  const btnLight = document.getElementById('btnLight');
  const btnBell = document.getElementById('btnBell');
  const btnFlowers = document.getElementById('btnFlowers');
  const btnAarti = document.getElementById('btnAarti');
  const bellWrap = document.getElementById('bellWrap');
  const mandirDiya = document.getElementById('mandirDiya');
  const caption = document.getElementById('mandirCaption');

  const CAPTIONS = {night:'जय माता दी', dawn:'उषा के दर्शन', kashi:'काशी विशालाक्षी', himalaya:'शारदा पीठ', forest:'कामाख्या वन'};

  function lightMandir(){
    if(mandir.classList.contains('lit')) return;
    mandir.classList.add('lit'); btnLight.classList.add('on'); btnLight.textContent='Diya lit';
    chime();
  }
  btnLight.addEventListener('click', lightMandir);
  mandirDiya.addEventListener('click', lightMandir);
  mandirDiya.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); lightMandir(); } });

  function swingBell(){
    ringBell();
    bellWrap.classList.remove('swung');
    void bellWrap.offsetWidth;
    bellWrap.classList.add('swung');
    setTimeout(()=>bellWrap.classList.remove('swung'), 950);
  }
  btnBell.addEventListener('click', swingBell);
  bellWrap.addEventListener('click', swingBell);

  btnFlowers.addEventListener('click', ()=>{
    lightMandir(); chime();
    const chars = ['❀','✿','❁','✾'];
    for(let i=0;i<16;i++){
      const p = document.createElement('span');
      p.className='petal';
      p.textContent = chars[Math.floor(Math.random()*chars.length)];
      p.style.left = (6 + Math.random()*88) + '%';
      p.style.color = ['#f2d79b','#e8a2b0','#ffd9a0','#f6c9d3'][Math.floor(Math.random()*4)];
      p.style.animationDuration = (2.6 + Math.random()*2.2) + 's';
      p.style.animationDelay = (Math.random()*0.9) + 's';
      p.style.fontSize = (13 + Math.random()*13) + 'px';
      mandir.appendChild(p);
      setTimeout(()=>p.remove(), 6000);
    }
    caption.textContent = 'पुष्प समर्पित · pushpa samarpit';
    setTimeout(()=>{ caption.textContent = CAPTIONS[mandir.dataset.darshan]; }, 3400);
  });

  btnAarti.addEventListener('click', ()=>{
    lightMandir(); ringBell();
    const aartiTab = $$('#mFilter .tab').find(t=>t.dataset.f==='aarti');
    if(aartiTab) aartiTab.click();
    document.getElementById('s6').scrollIntoView({behavior:'smooth', block:'start'});
  });

  $$('.darshan-btns .mbtn').forEach(b=>{
    b.addEventListener('click', ()=>{
      $$('.darshan-btns .mbtn').forEach(x=>x.classList.remove('on'));
      b.classList.add('on');
      mandir.dataset.darshan = b.dataset.darshan;
      caption.textContent = CAPTIONS[b.dataset.darshan] || 'जय माता दी';
      chime();
    });
  });
})();

/* ---------- japa mala ---------- */
(function(){
  const num = document.getElementById('japaNum');
  const beads = document.getElementById('japaBeads');
  let n = 0;
  let out = '';
  for(let i=0;i<108;i++) out += '<i></i>';
  beads.innerHTML = out;
  const dots = $$('i', beads);
  function paint(){
    dots.forEach((d,i)=>d.classList.toggle('on', i<n));
    num.textContent = n;
  }
  document.getElementById('japaBtn').addEventListener('click', ()=>{
    if(n>=108){
      n=0; paint(); chime();
      document.getElementById('mandirCaption').textContent='एक माला पूर्ण · one mala complete';
      return;
    }
    n++; paint(); chime();
    if(n===108) document.getElementById('mandirCaption').textContent='एक माला पूर्ण · one mala complete';
  });
  document.getElementById('japaReset').addEventListener('click', ()=>{ n=0; paint(); });
  paint();
})();

/* ---------- sankalp ---------- */
(function(){
  const btn = document.getElementById('sankalpBtn');
  const inp = document.getElementById('sankalpName');
  const out = document.getElementById('sankalpOut');
  function offer(){
    const name = (inp.value||'').trim();
    if(!name){ out.textContent = 'पहले अपना नाम लिखिए।'; return; }
    out.innerHTML = name + ',<br>माँ तुम्हारा संकल्प पूर्ण करें।<br><span style="font-family:var(--font-mono);font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--dim2)">Jai Mata Di</span>';
    ringBell();
  }
  btn.addEventListener('click', offer);
  inp.addEventListener('keydown', e=>{ if(e.key==='Enter') offer(); });
})();

/* =========================================================
   v2 — progress, back-to-top, toast, search, keyboard
   ========================================================= */
(function(){
  const bar = document.getElementById('progress');
  const top = document.getElementById('totop');
  function onScroll(){
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    if(bar) bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    if(top) top.classList.toggle('show', h.scrollTop > 700);
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll);
  if(top) top.addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));
  onScroll();
})();

let TOAST_T = null;
function toast(msg){
  const el = document.getElementById('toast');
  if(!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(TOAST_T);
  TOAST_T = setTimeout(()=>el.classList.remove('show'), 1800);
}

(function(){
  const root = document.getElementById('mantraRoot');
  if(!root) return;
  root.addEventListener('click', e => {
    const b = e.target.closest('.copy');
    if(b) toast('Mantra copied');
  });
})();

(function(){
  const input = document.getElementById('mSearch');
  const root = document.getElementById('mantraRoot');
  if(!input || !root) return;
  function applySearch(){
    const q = (input.value || '').trim().toLowerCase();
    let total = 0;
    $$('.mgroup').forEach(g=>{
      let shown = 0;
      $$('.mitem', g).forEach(it=>{
        const hit = !q || it.textContent.toLowerCase().indexOf(q) !== -1;
        it.classList.toggle('hide', !hit);
        if(hit) shown++;
      });
      g.classList.toggle('hide', shown === 0);
      total += shown;
    });
    let empty = document.getElementById('mEmpty');
    if(!empty){
      empty = document.createElement('p');
      empty.id = 'mEmpty'; empty.className = 'mempty';
      root.appendChild(empty);
    }
    empty.textContent = total ? '' : 'Koi mantra nahi mila — "' + input.value + '"';
    empty.style.display = total ? 'none' : 'block';
  }
  input.addEventListener('input', applySearch);
  input.addEventListener('keydown', e=>{ if(e.key === 'Escape'){ input.value = ''; applySearch(); } });
  document.getElementById('mFilter').addEventListener('click', applySearch);
})();

(function(){
  ['peethaTabs','mFilter'].forEach(id=>{
    const bar = document.getElementById(id);
    if(!bar) return;
    bar.addEventListener('keydown', e=>{
      if(e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const tabs = $$('.tab', bar);
      const i = tabs.indexOf(document.activeElement);
      if(i === -1) return;
      e.preventDefault();
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      next.focus(); next.click();
    });
  });
})();
