/* ================= DATA (fictional, FY2025) ================= */
const CH = [
  { k:'email',      color:'#D62828', spend:42000,  imp:1800000,  clk:72000,  conv:3600, rev:312000, eng:6.1, q:[.22,.24,.23,.31] },
  { k:'search',     color:'#1F4E9E', spend:185000, imp:4200000,  clk:168000, conv:6720, rev:598000, eng:3.2, q:[.24,.25,.23,.28] },
  { k:'social',     color:'#F2B701', spend:140000, imp:9500000,  clk:133000, conv:3190, rev:255000, eng:4.8, q:[.23,.26,.25,.26] },
  { k:'display',    color:'#7A7A7A', spend:96000,  imp:12000000, clk:48000,  conv:860,  rev:77000,  eng:0.9, q:[.27,.25,.23,.25] },
  { k:'influencer', color:'#2A9D8F', spend:78000,  imp:3100000,  clk:62000,  conv:1550, rev:171000, eng:7.4, q:[.18,.27,.30,.25] },
  { k:'affiliate',  color:'#E76F51', spend:55000,  imp:2400000,  clk:41000,  conv:1940, rev:196000, eng:2.1, q:[.23,.24,.24,.29] }
];
CH.forEach(c => { c.roi=(c.rev-c.spend)/c.spend; c.cvr=c.conv/c.clk; c.ctr=c.clk/c.imp; c.cpa=c.spend/c.conv; c.roas=c.rev/c.spend; });
const TOT = CH.reduce((a,c)=>{ ['spend','imp','clk','conv','rev'].forEach(k=>a[k]+=c[k]); return a; },{spend:0,imp:0,clk:0,conv:0,rev:0});
TOT.roi=(TOT.rev-TOT.spend)/TOT.spend; TOT.cvr=TOT.conv/TOT.clk; TOT.ctr=TOT.clk/TOT.imp; TOT.cpa=TOT.spend/TOT.conv;
const SEAS_REV   = [.07,.065,.075,.08,.085,.08,.075,.07,.085,.09,.11,.115];
const SEAS_SPEND = [.08,.078,.082,.083,.085,.083,.08,.078,.085,.087,.089,.09];

/* ================= I18N ================= */
const T = {
 en:{
  loading:'Loading campaign data…', period:'FY 2025 · 6 CHANNELS · 24 CAMPAIGNS',
  title:'Marketing Campaign Analysis',
  subtitle:'Where does each euro work hardest? ROI, conversion and engagement across every channel.',
  k_spend:'Total spend', k_rev:'Revenue', k_roi:'Blended ROI', k_conv:'Conversions', k_cvr:'Conversion rate', k_cpa:'Cost / acquisition',
  vs:'vs FY24',
  sum_title:'Executive summary',
  s1:'Blended ROI of 170%: every €1 spent returned €2.70 in revenue.',
  s2:'Email (643% ROI) and Affiliate (256%) are under-funded: 16% of budget, but 32% of revenue.',
  s3:'Display is the only loss-making channel (−20% ROI) despite 36% of all impressions.',
  charts_title:'Performance analysis',
  c_trend:'Monthly spend vs revenue', c_roi:'ROI by channel', c_mix:'Budget share vs revenue share',
  c_funnel:'Conversion funnel', c_eng:'Conversion × engagement matrix',
  pivot_title:'Pivot table · Channel × Quarter', pivot_metric:'Metric',
  m_roi:'ROI', m_cvr:'CVR', m_rev:'Revenue', m_cpa:'CPA', channel:'Channel', total:'Total',
  legend_low:'Weak', legend_high:'Strong', best:'BEST', worst:'WORST',
  reco_title:'Recommendations',
  sim_title:'Budget reallocation simulator', sim_label:'Display budget moved',
  sim_rev:'Projected revenue', sim_delta:'Revenue uplift', sim_roi:'Projected ROI',
  sim_note:'Moved budget is split 40% Search / 30% Email / 30% Affiliate, with a 40% diminishing-returns haircut on their current ROAS.',
  method_title:'Methodology',
  method_txt:'Data is fictional but realistic. Revenue uses last-click attribution and engagement = interactions / impressions. Quarterly splits come from campaign calendars. Projections are deliberately conservative.',
  foot:'Portfolio project · Fictional data · Built with HTML, CSS & vanilla JS (pure SVG)',
  spend:'Spend', revenue:'Revenue', impressions:'Impressions', clicks:'Clicks', conversions:'Conversions',
  ctr:'CTR', cvr:'CVR', engagement:'Engagement', share:'share',
  months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  ch:{email:'Email',search:'Paid Search',social:'Social Ads',display:'Display',influencer:'Influencer',affiliate:'Affiliate'},
  quad:['STARS','ENGAGE → CONVERT','OPTIMISE OR CUT','CONVERTERS'],
  h_what:'What it shows', h_read:'How to read it', h_ins:'Key insight', h_act:'Action',
  recos:[
   ['Cut Display by 50% and reallocate','Lowest CVR (1.8%) and the only negative ROI. Move €48k to Search, Email and Affiliate.','+€94k revenue'],
   ['Scale Email','Lowest CPA (€11.7) and highest ROI. Grow the list with lead magnets and segmented flows.','+€15k budget → ~+€65k'],
   ['Fix Social Ads conversion','High reach but CVR of only 2.4% vs 3.4% average. A/B test landing pages and retarget engaged users.','+1pt CVR = +€106k'],
   ['Front-load Q4','Nov–Dec generates 23% of annual revenue. Shift 10% of Q3 budget to the peak season.','+€30–40k'],
   ['Monetise Influencer engagement','Best engagement (7.4%) but average conversion. Add tracked promo codes and shoppable links.','Better attribution']
  ],
  info:{
   trend:{t:'Monthly spend vs revenue',what:'Revenue (filled area) and marketing spend (line) for each month of FY2025.',read:'The gap between the two lines is gross marketing return. A wider gap means more efficient months.',ins:'Spend is almost flat (7.8–9% per month) while revenue rises to 11.5% in December. Q4 demand is not matched by budget.',act:'Shift budget from the slow summer months (Jul–Aug) to Oct–Dec.'},
   roi:{t:'ROI by channel',what:'Return on investment per channel: (revenue − spend) / spend.',read:'Bars to the right of zero make money. Longer bars mean more profit per euro.',ins:'Email returns €7.43 per €1. Display loses €0.20 on every euro.',act:'Rebalance budget toward the top three channels, within their capacity.'},
   mix:{t:'Budget share vs revenue share',what:'Outer ring = share of spend. Inner ring = share of revenue.',read:'If a channel’s inner slice is bigger than its outer slice, it over-delivers.',ins:'Display takes 16% of budget for 5% of revenue. Email takes 7% of budget for 19% of revenue.',act:'Align budget share with revenue share step by step, testing at each change.'},
   funnel:{t:'Conversion funnel',what:'All channels combined: impressions → clicks → conversions.',read:'The percentages between stages show where users drop off.',ins:'CTR is 1.59% and CVR 3.41%. Display inflates impressions but adds few clicks.',act:'Improve the post-click experience: landing-page speed and checkout friction.'},
   eng:{t:'Conversion × engagement matrix',what:'X = conversion rate. Y = engagement rate. Bubble size = spend.',read:'Dashed lines mark the averages. The top right is the ideal zone.',ins:'Email is a star. Influencer engages but under-converts. Display falls in the cut zone.',act:'Move audiences toward the right: retarget engaged Influencer and Social users.'},
   pivot:{t:'Pivot table',what:'Channel × quarter breakdown of the selected metric, like an Excel pivot table.',read:'Colour coding: green = strong, red = weak. For CPA, lower is better and the scale is inverted.',ins:'Email peaks in Q4 (holiday campaigns). Display ROI erodes over the year.',act:'Switch the metric to compare efficiency (ROI, CPA) with volume (Revenue).'},
   sim:{t:'Reallocation simulator',what:'What-if model: move part of the Display budget to better channels.',read:'Moving the slider recalculates projected revenue and ROI.',ins:'Each euro moved yields about €1.95 net extra revenue, even after the diminishing-returns haircut.',act:'Start at 50%, measure for 6 weeks, then scale up.'}
  }
 },
 fr:{
  loading:'Chargement des données…', period:'EXERCICE 2025 · 6 CANAUX · 24 CAMPAGNES',
  title:'Analyse des campagnes marketing',
  subtitle:'Où chaque euro travaille-t-il le mieux ? ROI, conversion et engagement par canal.',
  k_spend:'Dépenses totales', k_rev:'Chiffre d’affaires', k_roi:'ROI global', k_conv:'Conversions', k_cvr:'Taux de conversion', k_cpa:'Coût / acquisition',
  vs:'vs 2024',
  sum_title:'Synthèse',
  s1:'ROI global de 170 % : chaque euro investi a généré 2,70 € de CA.',
  s2:'L’Email (ROI 643 %) et l’Affiliation (256 %) sont sous-financés : 16 % du budget, mais 32 % du CA.',
  s3:'Le Display est le seul canal déficitaire (ROI −20 %) malgré 36 % des impressions.',
  charts_title:'Analyse de performance',
  c_trend:'Dépenses vs CA mensuels', c_roi:'ROI par canal', c_mix:'Part du budget vs part du CA',
  c_funnel:'Entonnoir de conversion', c_eng:'Matrice conversion × engagement',
  pivot_title:'Tableau croisé · Canal × Trimestre', pivot_metric:'Indicateur',
  m_roi:'ROI', m_cvr:'TC', m_rev:'CA', m_cpa:'CPA', channel:'Canal', total:'Total',
  legend_low:'Faible', legend_high:'Fort', best:'TOP', worst:'FLOP',
  reco_title:'Recommandations',
  sim_title:'Simulateur de réallocation', sim_label:'Budget Display déplacé',
  sim_rev:'CA projeté', sim_delta:'Gain de CA', sim_roi:'ROI projeté',
  sim_note:'Le budget déplacé est réparti 40 % Search / 30 % Email / 30 % Affiliation, avec une décote de 40 % sur leur ROAS actuel (rendements décroissants).',
  method_title:'Méthodologie',
  method_txt:'Données fictives mais réalistes. Le CA est attribué au dernier clic et l’engagement = interactions / impressions. Les répartitions trimestrielles suivent les calendriers de campagne. Les projections sont volontairement prudentes.',
  foot:'Projet portfolio · Données fictives · HTML, CSS & JS natif (SVG pur)',
  spend:'Dépenses', revenue:'CA', impressions:'Impressions', clicks:'Clics', conversions:'Conversions',
  ctr:'CTR', cvr:'TC', engagement:'Engagement', share:'part',
  months:['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc'],
  ch:{email:'Email',search:'Search payant',social:'Social Ads',display:'Display',influencer:'Influence',affiliate:'Affiliation'},
  quad:['STARS','ENGAGER → CONVERTIR','OPTIMISER OU COUPER','CONVERTISSEURS'],
  h_what:'Ce que montre le graphique', h_read:'Comment le lire', h_ins:'Insight clé', h_act:'Action',
  recos:[
   ['Réduire le Display de 50 % et réallouer','TC le plus bas (1,8 %) et seul ROI négatif. Déplacer 48 k€ vers Search, Email et Affiliation.','+94 k€ de CA'],
   ['Accélérer l’Email','CPA le plus bas (11,7 €) et meilleur ROI. Développer la base via lead magnets et scénarios segmentés.','+15 k€ de budget → ~+65 k€'],
   ['Corriger la conversion Social Ads','Forte portée mais TC de 2,4 % seulement, contre 3,4 % en moyenne. A/B tester les landing pages, recibler les engagés.','+1 pt de TC = +106 k€'],
   ['Renforcer le T4','Nov–Déc génèrent 23 % du CA annuel. Déplacer 10 % du budget T3 vers le pic de saison.','+30 à 40 k€'],
   ['Monétiser l’engagement Influence','Meilleur engagement (7,4 %) mais conversion moyenne. Ajouter des codes promo tracés et des liens shoppables.','Meilleure attribution']
  ],
  info:{
   trend:{t:'Dépenses vs CA mensuels',what:'CA (aire pleine) et dépenses marketing (ligne) pour chaque mois de 2025.',read:'L’écart entre les deux courbes représente le retour brut. Plus il est large, plus le mois est efficace.',ins:'Les dépenses sont quasi plates (7,8–9 % par mois) alors que le CA monte à 11,5 % en décembre. La demande du T4 n’est pas suivie par le budget.',act:'Déplacer du budget de l’été (juil.–août) vers oct.–déc.'},
   roi:{t:'ROI par canal',what:'Retour sur investissement par canal : (CA − dépenses) / dépenses.',read:'Une barre à droite de zéro est rentable. Plus elle est longue, plus le profit par euro est élevé.',ins:'L’Email rapporte 7,43 € pour 1 €. Le Display perd 0,20 € par euro.',act:'Rééquilibrer le budget vers les 3 meilleurs canaux, dans la limite de leur capacité.'},
   mix:{t:'Part du budget vs part du CA',what:'Anneau extérieur = part des dépenses. Anneau intérieur = part du CA.',read:'Si la part intérieure d’un canal dépasse sa part extérieure, il sur-performe.',ins:'Le Display prend 16 % du budget pour 5 % du CA. L’Email prend 7 % du budget pour 19 % du CA.',act:'Aligner progressivement budget et CA, en testant à chaque étape.'},
   funnel:{t:'Entonnoir de conversion',what:'Tous canaux confondus : impressions → clics → conversions.',read:'Les pourcentages entre les étapes montrent où les utilisateurs décrochent.',ins:'CTR de 1,59 % et TC de 3,41 %. Le Display gonfle les impressions mais apporte peu de clics.',act:'Améliorer l’après-clic : vitesse des landing pages et friction au paiement.'},
   eng:{t:'Matrice conversion × engagement',what:'X = taux de conversion. Y = taux d’engagement. Taille = dépenses.',read:'Les pointillés marquent les moyennes. Le quadrant en haut à droite est la zone idéale.',ins:'L’Email est une star. L’Influence engage mais convertit peu. Le Display est en zone à couper.',act:'Pousser les audiences vers la droite : recibler les engagés Influence et Social.'},
   pivot:{t:'Tableau croisé dynamique',what:'Répartition canal × trimestre de l’indicateur choisi, comme un TCD Excel.',read:'Mise en forme conditionnelle : vert = fort, rouge = faible. Pour le CPA, plus bas = mieux (échelle inversée).',ins:'L’Email culmine au T4 (campagnes de fin d’année). Le ROI Display s’érode sur l’année.',act:'Changer d’indicateur pour comparer efficacité (ROI, CPA) et volume (CA).'},
   sim:{t:'Simulateur de réallocation',what:'Modèle « et si » : déplacer une partie du budget Display vers de meilleurs canaux.',read:'Le curseur recalcule le CA et le ROI projetés.',ins:'Chaque euro déplacé rapporte environ 1,95 € de CA net supplémentaire, même après décote.',act:'Commencer à 50 %, mesurer pendant 6 semaines, puis amplifier.'}
  }
 }
};

/* ================= HELPERS ================= */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
let lang = localStorage.getItem('lang') || 'en';
const t = k => T[lang][k] ?? k;
const loc = () => lang === 'fr' ? 'fr-FR' : 'en-US';
const eur  = v => new Intl.NumberFormat(loc(),{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(v);
const eurC = v => new Intl.NumberFormat(loc(),{style:'currency',currency:'EUR',notation:'compact',maximumFractionDigits:1}).format(v);
const numC = v => new Intl.NumberFormat(loc(),{notation:'compact',maximumFractionDigits:1}).format(v);
const pct  = (v,d=1) => new Intl.NumberFormat(loc(),{style:'percent',maximumFractionDigits:d,minimumFractionDigits:d}).format(v);
const NS = '[w3.org](http://www.w3.org/2000/svg)';
function el(tag, a = {}, parent){
  const e = document.createElementNS(NS, tag);
  for (const k in a) e.setAttribute(k, a[k]);
  if (parent) parent.appendChild(e);
  return e;
}
function svg(id, w, h){ const c = document.getElementById(id); c.innerHTML=''; return el('svg',{viewBox:`0 0 ${w} ${h}`},c); }
function txt(p, x, y, s, a = {}){ const e = el('text',{x,y,...a},p); e.textContent = s; return e; }

/* ================= LOADER ================= */
(function loader(){
  const bar = $('#ldBar');
  for (let i=0;i<20;i++) bar.appendChild(document.createElement('i'));
  let p = 0;
  const step = () => {
    p = Math.min(100, p + Math.random()*9 + 3);
    $('#ldPct').textContent = Math.round(p) + '%';
    bar.querySelectorAll('i').forEach((b,i)=> b.classList.toggle('on', i < Math.round(p/5)));
    if (p < 100) setTimeout(step, 70 + Math.random()*90);
    else setTimeout(()=>{ $('#loader').classList.add('done'); renderAll(); }, 350);
  };
  step();
})();

/* ================= STARS ================= */
(function stars(){
  const cv = $('#stars'), cx = cv.getContext('2d');
  let W, H, S = [], m = {x:-9999,y:-9999};
  const init = () => {
    W = cv.width = innerWidth; H = cv.height = innerHeight;
    const n = Math.min(240, Math.floor(W*H/6500));
    S = Array.from({length:n}, () => ({ x:Math.random()*W, y:Math.random()*H, r:Math.random()*1.3+.3,
      vx:(Math.random()-.5)*.15, vy:-(Math.random()*.25+.05), a:Math.random()*.6+.3, ox:0, oy:0 }));
  };
  addEventListener('resize', init);
  addEventListener('mousemove', e => { m.x = e.clientX; m.y = e.clientY; });
  addEventListener('mouseleave', () => { m.x = m.y = -9999; });
  init();
  (function loop(){
    const st = getComputedStyle(document.documentElement);
    const rgb = st.getPropertyValue('--star').trim();
    const acc = st.getPropertyValue('--accent').trim();
    cx.clearRect(0,0,W,H);
    for (const s of S){
      s.x += s.vx; s.y += s.vy;
      if (s.y < -5) { s.y = H+5; s.x = Math.random()*W; }
      if (s.x < -5) s.x = W+5; if (s.x > W+5) s.x = -5;
      const dx = s.x + s.ox - m.x, dy = s.y + s.oy - m.y, d = Math.hypot(dx,dy);
      if (d < 130 && d > 0){ const f = (130-d)/130; s.ox += dx/d*f*2.2; s.oy += dy/d*f*2.2; }
      s.ox *= .92; s.oy *= .92;
      const X = s.x + s.ox, Y = s.y + s.oy;
      if (d < 110){
        cx.strokeStyle = acc; cx.globalAlpha = (110-d)/110*.35; cx.lineWidth = .6;
        cx.beginPath(); cx.moveTo(X,Y); cx.lineTo(m.x,m.y); cx.stroke();
      }
      cx.globalAlpha = s.a * (.7 + .3*Math.sin(Date.now()/600 + s.x));
      cx.fillStyle = d < 130 ? acc : `rgb(${rgb})`;
      cx.fillRect(X, Y, s.r, s.r); // square stars: discrete geometry
    }
    cx.globalAlpha = 1;
    requestAnimationFrame(loop);
  })();
})();

/* ================= KPIs ================= */
function renderKpis(){
  const k = [
    ['k_spend', eurC(TOT.spend), '+8%', false],
    ['k_rev',   eurC(TOT.rev),   '+14%', true],
    ['k_roi',   pct(TOT.roi,0),  '+12 pts', true],
    ['k_conv',  numC(TOT.conv),  '+11%', true],
    ['k_cvr',   pct(TOT.cvr,2),  '+0.3 pts', true],
    ['k_cpa',   eur(TOT.cpa),    '−3%', true]
  ];
  $('#kpis').innerHTML = k.map(([l,v,d,good]) =>
    `<div class="kpi"><small>${t(l)}</small><strong>${v}</strong><span class="d ${good?'up':'down'}">${good?'▲':'▼'} ${d} ${t('vs')}</span></div>`).join('');
}

/* ================= CHARTS ================= */
function drawTrend(){
  const W=880,H=300,L=60,R=20,Tp=20,B=40, s=svg('cTrend',W,H);
  const rev = SEAS_REV.map(v=>v*TOT.rev), sp = SEAS_SPEND.map(v=>v*TOT.spend), max = 200000;
  const x = i => L + i*(W-L-R)/11, y = v => Tp + (1-v/max)*(H-Tp-B);
  for (let v=0; v<=max; v+=50000){
    el('line',{x1:L,x2:W-R,y1:y(v),y2:y(v),class:'gl'},s);
    txt(s,L-8,y(v)+4,eurC(v),{'text-anchor':'end',class:'ax'});
  }
  t('months').forEach((m,i)=>txt(s,x(i),H-14,m,{'text-anchor':'middle',class:'ax'}));
  const area = `M${x(0)},${y(0)} ` + rev.map((v,i)=>`L${x(i)},${y(v)}`).join(' ') + ` L${x(11)},${y(0)} Z`;
  el('path',{d:area,style:'fill:var(--accent);opacity:.18'},s);
  el('polyline',{points:rev.map((v,i)=>`${x(i)},${y(v)}`).join(' '),fill:'none',style:'stroke:var(--accent)','stroke-width':3,class:'draw'},s);
  el('polyline',{points:sp.map((v,i)=>`${x(i)},${y(v)}`).join(' '),fill:'none',style:'stroke:var(--ink)','stroke-width':2,'stroke-dasharray':'6 4'},s);
  rev.forEach((v,i)=>{
    const tip = `<b>${t('months')[i]}</b><br>${t('revenue')}: ${eur(v)}<br>${t('spend')}: ${eur(sp[i])}<br>ROI: ${pct((v-sp[i])/sp[i],0)}`;
    el('rect',{x:x(i)-6,y:y(v)-6,width:12,height:12,style:'fill:var(--accent);stroke:var(--ink)','stroke-width':1.5,'data-tip':tip,class:'pop'},s);
    el('circle',{cx:x(i),cy:y(sp[i]),r:4,style:'fill:var(--ink)','data-tip':tip},s);
  });
  el('rect',{x:L+10,y:6,width:14,height:10,style:'fill:var(--accent)'},s); txt(s,L+30,15,t('revenue'));
  el('line',{x1:L+120,x2:L+144,y1:11,y2:11,style:'stroke:var(--ink)','stroke-width':2,'stroke-dasharray':'6 4'},s); txt(s,L+150,15,t('spend'));
}

function drawRoi(){
  const W=520,H=300,L=110,R=60,s=svg('cRoi',W,H), min=-1, max=7;
  const d = [...CH].sort((a,b)=>b.roi-a.roi), x = v => L + (v-min)/(max-min)*(W-L-R);
  [0,2,4,6].forEach(v=>{ el('line',{x1:x(v),x2:x(v),y1:10,y2:H-30,class:'gl'},s); txt(s,x(v),H-12,pct(v,0),{'text-anchor':'middle',class:'ax'}); });
  d.forEach((c,i)=>{
    const y = 16 + i*42, x0 = Math.min(x(0),x(c.roi)), w = Math.abs(x(c.roi)-x(0));
    txt(s,L-10,y+19,t('ch')[c.k],{'text-anchor':'end'});
    el('rect',{x:x0,y,width:w,height:28,style:`fill:${c.roi<0?'var(--red)':c.color}`,class:'grow',
      'data-tip':`<b>${t('ch')[c.k]}</b><br>ROI: ${pct(c.roi,0)}<br>ROAS: ${c.roas.toFixed(2)}×<br>${t('spend')}: ${eur(c.spend)}`},s);
    txt(s,c.roi<0?x0-6:x0+w+6,y+19,pct(c.roi,0),{'text-anchor':c.roi<0?'end':'start','font-weight':800});
  });
  el('line',{x1:x(0),x2:x(0),y1:6,y2:H-30,style:'stroke:var(--ink)','stroke-width':2},s);
}

function arcPath(cx,cy,r,w,a0,a1){
  const p=(rr,a)=>`${cx+rr*Math.cos(a)},${cy+rr*Math.sin(a)}`, lg = a1-a0 > Math.PI ? 1 : 0, ri = r-w;
  return `M${p(r,a0)} A${r},${r} 0 ${lg} 1 ${p(r,a1)} L${p(ri,a1)} A${ri},${ri} 0 ${lg} 0 ${p(ri,a0)} Z`;
}
function drawMix(){
  const W=520,H=300,s=svg('cMix',W,H),cx=145,cy=150;
  [['spend',125],['rev',88]].forEach(([key,r])=>{
    let a = -Math.PI/2; const tot = TOT[key];
    CH.forEach(c=>{
      const sh = c[key]/tot, a1 = a + sh*Math.PI*2;
      el('path',{d:arcPath(cx,cy,r,30,a,a1-0.012),style:`fill:${c.color}`,class:'pop',
        'data-tip':`<b>${t('ch')[c.k]}</b><br>${key==='spend'?t('spend'):t('revenue')} ${t('share')}: ${pct(sh,1)}<br>${eur(c[key])}`},s);
      a = a1;
    });
  });
  txt(s,cx,cy-4,t('spend').toUpperCase(),{'text-anchor':'middle',class:'ax'});
  txt(s,cx,cy+12,'↔ '+t('revenue').toUpperCase(),{'text-anchor':'middle',class:'ax'});
  CH.forEach((c,i)=>{
    const y = 40 + i*40, ds = c.rev/TOT.rev - c.spend/TOT.spend;
    el('rect',{x:300,y,width:14,height:14,style:`fill:${c.color}`},s);
    txt(s,322,y+12,t('ch')[c.k],{'font-weight':600});
    txt(s,322,y+28,`${pct(c.spend/TOT.spend,0)} → ${pct(c.rev/TOT.rev,0)}`,{class:'ax'});
    txt(s,505,y+12,(ds>=0?'▲':'▼'),{'text-anchor':'end',style:`fill:${ds>=0?'#2A9D6F':'var(--red)'}`});
  });
}

function drawFunnel(){
  const W=520,H=300,s=svg('cFunnel',W,H);
  const st = [[t('impressions'),TOT.imp,480],[t('clicks'),TOT.clk,320],[t('conversions'),TOT.conv,160]];
  st.forEach(([l,v,w],i)=>{
    const y = 14 + i*96, x = (W-w)/2, nw = st[i+1] ? st[i+1][2] : w*.7;
    el('polygon',{points:`${x},${y} ${x+w},${y} ${(W+nw)/2},${y+62} ${(W-nw)/2},${y+62}`,
      style:`fill:${['var(--blue)','var(--yellow)','var(--accent)'][i]}`,class:'pop',
      'data-tip':`<b>${l}</b><br>${new Intl.NumberFormat(loc()).format(v)}`},s);
    txt(s,W/2,y+28,l.toUpperCase(),{'text-anchor':'middle','font-weight':800,style:'fill:#fff'});
    txt(s,W/2,y+46,numC(v),{'text-anchor':'middle',style:'fill:#fff'});
    if (i<2){
      const r = st[i+1][1]/v;
      txt(s,W/2,y+82,`↓ ${i?t('cvr'):t('ctr')} ${pct(r,2)}`,{'text-anchor':'middle','font-weight':800});
    }
  });
}

function drawEng(){
  const W=520,H=300,L=50,R=20,Tp=20,B=40,s=svg('cEng',W,H);
  const x = v => L + (v-.01)/(.055-.01)*(W-L-R), y = v => Tp + (1-v/8)*(H-Tp-B);
  [.01,.02,.03,.04,.05].forEach(v=>txt(s,x(v),H-18,pct(v,0),{'text-anchor':'middle',class:'ax'}));
  [0,2,4,6,8].forEach(v=>{ el('line',{x1:L,x2:W-R,y1:y(v),y2:y(v),class:'gl'},s); txt(s,L-8,y(v)+4,v+'%',{'text-anchor':'end',class:'ax'}); });
  txt(s,W-R,H-2,t('cvr')+' →',{'text-anchor':'end',class:'ax'});
  txt(s,L,12,'↑ '+t('engagement'),{class:'ax'});
  const ae = CH.reduce((a,c)=>a+c.eng,0)/CH.length;
  el('line',{x1:x(TOT.cvr),x2:x(TOT.cvr),y1:Tp,y2:H-B,style:'stroke:var(--ink)','stroke-dasharray':'4 4'},s);
  el('line',{x1:L,x2:W-R,y1:y(ae),y2:y(ae),style:'stroke:var(--ink)','stroke-dasharray':'4 4'},s);
  const q = t('quad');
  txt(s,W-R-4,Tp+14,q[0],{'text-anchor':'end',class:'ax','font-weight':800});
  txt(s,L+6,Tp+14,q[1],{class:'ax','font-weight':800});
  txt(s,L+6,H-B-8,q[2],{class:'ax','font-weight':800});
  txt(s,W-R-4,H-B-8,q[3],{'text-anchor':'end',class:'ax','font-weight':800});
  CH.forEach(c=>{
    const r = 6 + Math.sqrt(c.spend)/18;
    el('circle',{cx:x(c.cvr),cy:y(c.eng),r,style:`fill:${c.color};fill-opacity:.85;stroke:var(--ink)`,'stroke-width':2,class:'pop',
      'data-tip':`<b>${t('ch')[c.k]}</b><br>${t('cvr')}: ${pct(c.cvr,2)}<br>${t('engagement')}: ${c.eng}%<br>${t('spend')}: ${eur(c.spend)}`},s);
    txt(s,x(c.cvr),y(c.eng)-r-4,t('ch')[c.k],{'text-anchor':'middle','font-size':11,'font-weight':600});
  });
}

/* ================= PIVOT ================= */
let metric = 'roi';
function pivotVal(c, qi){
  const qs = .25; // spend & clicks split evenly per quarter
  const rev = qi==null ? c.rev : c.rev*c.q[qi], spend = qi==null ? c.spend : c.spend*qs;
  const conv = qi==null ? c.conv : c.conv*c.q[qi], clk = qi==null ? c.clk : c.clk*qs;
  return { roi:(rev-spend)/spend, cvr:conv/clk, rev, cpa:spend/conv }[metric];
}
function fmtM(v){ return metric==='rev' ? eurC(v) : metric==='cpa' ? eur(v) : pct(v, metric==='cvr'?2:0); }
function renderPivot(){
  const rows = CH.map(c=>({c, v:[0,1,2,3].map(q=>pivotVal(c,q)), tot:pivotVal(c)}));
  const all = rows.flatMap(r=>r.v), mn = Math.min(...all), mx = Math.max(...all);
  const inv = metric==='cpa';
  const color = v => { let n = (v-mn)/(mx-mn||1); if (inv) n = 1-n; return `hsl(${n*140} ${55+n*5}% 45% / .5)`; };
  const tots = rows.map(r=>r.tot), best = inv?Math.min(...tots):Math.max(...tots), worst = inv?Math.max(...tots):Math.min(...tots);
  const totalRow = [0,1,2,3].map(q=>{
    const rev = CH.reduce((a,c)=>a+c.rev*c.q[q],0), sp = TOT.spend*.25, conv = CH.reduce((a,c)=>a+c.conv*c.q[q],0), clk = TOT.clk*.25;
    return { roi:(rev-sp)/sp, cvr:conv/clk, rev, cpa:sp/conv }[metric];
  });
  const totAll = { roi:TOT.roi, cvr:TOT.cvr, rev:TOT.rev, cpa:TOT.cpa }[metric];
  $('#pivot').innerHTML =
    `<thead><tr><th>${t('channel')}</th><th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th><th>${t('total')}</th></tr></thead><tbody>` +
    rows.map(r=>`<tr><td><span class="dot" style="background:${r.c.color}"></span>${t('ch')[r.c.k]}</td>` +
      r.v.map(v=>`<td class="cell" style="background:${color(v)}">${fmtM(v)}</td>`).join('') +
      `<td><b>${fmtM(r.tot)}</b>${r.tot===best?`<span class="flag up">▲ ${t('best')}</span>`:r.tot===worst?`<span class="flag down">▼ ${t('worst')}</span>`:''}</td></tr>`).join('') +
    `<tr class="total"><td>${t('total')}</td>${totalRow.map(v=>`<td>${fmtM(v)}</td>`).join('')}<td>${fmtM(totAll)}</td></tr></tbody>`;
}

/* ================= RECOS & SIMULATOR ================= */
function renderRecos(){
  $('#recos').innerHTML = t('recos').map(([h,p,i])=>`<li><b>${h}</b>${p}<br><span class="impact">${i}</span></li>`).join('');
}
function renderSim(){
  const p = +$('#simRange').value/100, d = CH.find(c=>c.k==='display'), g = k => CH.find(c=>c.k===k).roas;
  const moved = d.spend*p, gain = moved*(.4*g('search')+.3*g('email')+.3*g('affiliate'))*.6, loss = moved*d.roas;
  const rev = TOT.rev + gain - loss;
  $('#simPct').textContent = Math.round(p*100)+'%';
  $('#simAmt').textContent = eur(moved);
  $('#simRev').textContent = eurC(rev);
  $('#simDelta').textContent = (gain-loss>=0?'+':'') + eurC(gain-loss);
  $('#simRoi').textContent = pct((rev-TOT.spend)/TOT.spend,0);
}

/* ================= TOOLTIP & MODAL ================= */
const tip = $('#tip');
document.addEventListener('mousemove', e=>{
  const tg = e.target.closest && e.target.closest('[data-tip]');
  if (tg){
    tip.innerHTML = tg.getAttribute('data-tip'); tip.classList.add('show');
    const w = tip.offsetWidth;
    tip.style.left = Math.min(e.clientX+16, innerWidth-w-10)+'px';
    tip.style.top = (e.clientY+16)+'px';
  } else tip.classList.remove('show');
});
document.addEventListener('click', e=>{
  const b = e.target.closest('.info'); if (!b) return;
  const i = t('info')[b.dataset.info];
  $('#mTitle').textContent = i.t;
  $('#mBody').innerHTML = `<h4>${t('h_what')}</h4><p>${i.what}</p><h4>${t('h_read')}</h4><p>${i.read}</p><h4>${t('h_ins')}</h4><p>${i.ins}</p><h4>${t('h_act')}</h4><p>${i.act}</p>`;
  $('#modal').classList.add('open');
});
const closeModal = () => $('#modal').classList.remove('open');
$('#mClose').onclick = closeModal;
$('#modal').addEventListener('click', e=>{ if (e.target.id==='modal') closeModal(); });
document.addEventListener('keydown', e=>{ if (e.key==='Escape') closeModal(); });

/* ================= CONTROLS ================= */
function applyI18n(){
  document.documentElement.lang = lang;
  $$('[data-i18n]').forEach(e=>e.textContent = t(e.dataset.i18n));
  $$('#langBtn span').forEach(s=>s.classList.toggle('on', s.dataset.l===lang));
}
function renderAll(){
  applyI18n(); renderKpis();
  drawTrend(); drawRoi(); drawMix(); drawFunnel(); drawEng();
  renderPivot(); renderRecos(); renderSim();
}
$('#langBtn').onclick = () => { lang = lang==='en'?'fr':'en'; localStorage.setItem('lang',lang); renderAll(); };

const root = document.documentElement;
root.dataset.theme = localStorage.getItem('theme') || 'dark';
$('#themeBtn').onclick = () => { root.dataset.theme = root.dataset.theme==='dark'?'light':'dark'; localStorage.setItem('theme',root.dataset.theme); };

function setAccent(c){
  root.style.setProperty('--accent', c); localStorage.setItem('accent', c);
  $('#accentPick').value = c;
  $$('.sw[data-c]').forEach(s=>s.classList.toggle('on', s.dataset.c.toLowerCase()===c.toLowerCase()));
}
$$('.sw[data-c]').forEach(s=>s.onclick = () => setAccent(s.dataset.c));
$('#accentPick').addEventListener('input', e=>setAccent(e.target.value));
setAccent(localStorage.getItem('accent') || '#D62828');

$('#metricSeg').addEventListener('click', e=>{
  const b = e.target.closest('button'); if (!b) return;
  metric = b.dataset.m;
  $$('#metricSeg button').forEach(x=>x.classList.toggle('on', x===b));
  renderPivot();
});
$('#simRange').addEventListener('input', renderSim);
applyI18n();
