(function(){
const MINW = 40;           // minimum words in each reflection
const KEY = "inquiry-bay-v1";
const PREVIEW = location.hash === "#preview";
const $ = (s, el=document) => el.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const words = s => (s||"").trim().split(/\s+/).filter(Boolean).length;
const shuffle = a => { a = a.slice(); for (let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
let S = { stamps:{}, concepts:{}, acts:{}, refl:{}, bp:{}, align:[], name:"" };
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch(e){}
let saveT;
function save(){ clearTimeout(saveT); saveT = setTimeout(()=>{ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }, 150); }
const byId = id => STATIONS.find(s => s.id === id);
const idx = id => STATIONS.findIndex(s => s.id === id);
const stampCount = () => STATIONS.filter(s => S.stamps[s.id]).length;
const unlocked = id => PREVIEW || idx(id) === 0 || !!S.stamps[STATIONS[idx(id)-1].id];
const currentId = () => (STATIONS.find(s => !S.stamps[s.id]) || {}).id;
function conceptsDone(st){ return (S.concepts[st.id]||[]).length >= st.concepts.length; }
function actsDone(st){ const a = S.acts[st.id]||[]; return st.activities.every((_,i)=>a[i]); }
function reflDone(st){ return words(S.refl[st.id]) >= MINW; }
const BP = [
{ group:"Section 1 · Introduction", fields:[
{ k:"title", label:"Working title", hint:"Name the topic, the people and the setting.", from:["s3"] },
{ k:"background", label:"Background and context", hint:"Two to four sentences. Use local or Caribbean evidence.", from:["s3"] },
{ k:"problem", label:"Problem statement", hint:"What is wrong, proof it exists, who is affected, the gap in knowledge, and the consequence.", from:["s3"] },
{ k:"purpose", label:"Purpose statement", hint:"\"The purpose of this study is to ...\"", from:["s4"] },
{ k:"rq", label:"Research questions or hypotheses", hint:"Two or three questions, or a null and alternative hypothesis.", from:["s4"] },
{ k:"significance", label:"Significance", hint:"Who will benefit, and how?", from:[] },
{ k:"definitions", label:"Key terms and operational definitions", hint:"Define each key term the way your study will measure or use it.", from:[] } ]},
{ group:"Section 2 · Literature review", fields:[
{ k:"framework", label:"Theoretical or conceptual framework", hint:"Name the theory or describe how your concepts connect.", from:["s5"] },
{ k:"litgap", label:"Main themes in the literature and the gap", hint:"Two or three themes, and what is still missing.", from:["s5"] } ]},
{ group:"Section 3 · Methods", fields:[
{ k:"approach", label:"Approach and worldview", hint:"Quantitative, qualitative, mixed or action research, and why. Connect to Miron (1998).", from:["s2"] },
{ k:"design", label:"Research design", hint:"For example: survey, correlational, case study, phenomenology.", from:["s6"] },
{ k:"sample", label:"Population, sample and sampling technique", hint:"Who, how many, and how they will be chosen.", from:["s6"] },
{ k:"instruments", label:"Instruments and data collection procedures", hint:"What tools, how you will check quality, and how data will be gathered.", from:["s8"] },
{ k:"analysis", label:"Data analysis", hint:"Step by step, linked to each research question.", from:["s9"] },
{ k:"ethics", label:"Ethical considerations", hint:"Consent, assent, confidentiality or anonymity, power, permissions, data storage.", from:["s7"] } ]},
{ group:"Back matter", fields:[
{ k:"appendices", label:"Appendices you will include", hint:"For example: consent forms, permission letters, instruments.", from:[] } ]}
];
const ALIGN = [
"My title names the same topic and people as my problem statement.",
"My purpose statement follows directly from my problem.",
"My research questions match my purpose (quantitative or qualitative wording).",
"My design is the right type for my research questions.",
"My instruments collect the data my questions need.",
"My analysis answers every research question.",
"My ethics plan covers consent, confidentiality or anonymity, and power."
];
const bpFields = BP.flatMap(g => g.fields);
const bpDone = () => bpFields.every(f => words(S.bp[f.k]) >= 3) && ALIGN.every((_,i)=>S.align[i]);
const aud = $("#aud"); let audKey = null, audBtn = null;
const ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>';
const ICON_PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>';
function playerHTML(key, title){
return `<div class="player" data-key="${key}"><button type="button" class="play" aria-label="Play narration">${ICON_PLAY}</button>
<div class="lbl"><b>${esc(title)}</b><small class="pmsg">Listen to Dr. Jowallah's guide to this stop.</small></div><div class="ptrack"><div></div></div></div>`;
}
function wirePlayers(root){
root.querySelectorAll(".player").forEach(p => {
const btn = $(".play", p), key = p.dataset.key;
btn.addEventListener("click", () => {
if (audKey === key && !aud.paused){ aud.pause(); return; }
if (audKey !== key){ aud.src = NARRATION[key] || ""; audKey = key; }
if (audBtn && audBtn !== btn) audBtn.innerHTML = ICON_PLAY;
audBtn = btn;
if (!NARRATION[key]){ noAudio(p); return; }
aud.play().catch(()=>noAudio(p));
});
});
}
function noAudio(p){ const m = $(".pmsg", p); if (m) m.textContent = "Narration for this stop will be added soon. Read on below."; if (audBtn) audBtn.innerHTML = ICON_PLAY; }
aud.addEventListener("play", ()=>{ if (audBtn) audBtn.innerHTML = ICON_PAUSE; });
aud.addEventListener("pause", ()=>{ if (audBtn) audBtn.innerHTML = ICON_PLAY; });
aud.addEventListener("error", ()=>{ const p = document.querySelector(`.player[data-key="${audKey}"]`); if (p) noAudio(p); });
aud.addEventListener("timeupdate", ()=>{ const p = document.querySelector(`.player[data-key="${audKey}"] .ptrack div`); if (p && aud.duration) p.style.width = (aud.currentTime/aud.duration*100)+"%"; });
function stopAudio(){ try{ aud.pause(); }catch(e){} }
function updateMeter(){
const n = stampCount();
$("#meterTxt").textContent = `${n} of ${STATIONS.length} stamps`;
$("#meterFill").style.width = (n/STATIONS.length*100)+"%";
}
$("#navMap").addEventListener("click", () => go("home"));
$("#navPass").addEventListener("click", () => go("passport"));
if (PREVIEW) $("#previewFlag").hidden = false;
const POS = { s1:[858,600], s2:[905,262], s3:[705,418], s4:[560,612], s5:[455,392], s6:[300,560], s7:[105,470], s8:[235,318], s9:[420,205], s10:[655,215] };
function smooth(pts){
let d = `M${pts[0][0]},${pts[0][1]}`;
for (let i=0;i<pts.length-1;i++){
const p0 = pts[i-1]||pts[i], p1 = pts[i], p2 = pts[i+1], p3 = pts[i+2]||p2;
const c1 = [p1[0]+(p2[0]-p0[0])/6, p1[1]+(p2[1]-p0[1])/6], c2 = [p2[0]-(p3[0]-p1[0])/6, p2[1]-(p3[1]-p1[1])/6];
d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1]}`;
}
return d;
}
const F = v => `style="fill:var(--${v})"`;
function palm(x,y,s=1){
return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,0 C4,-20 2,-42 8,-62" style="fill:none;stroke:#8a6a3d;stroke-width:5;stroke-linecap:round"/>
<g transform="translate(8,-62)">${[-150,-110,-60,-20,20].map(a=>`<path transform="rotate(${a})" d="M0,0 C12,-6 26,-4 36,6 C24,2 12,2 0,0Z" ${F("palm")}/>`).join("")}<circle r="3.5" style="fill:#7a5530"/></g></g>`;
}
function house(x,y,w,h,roof,opts={}){
const l = x-w/2, t = y-h;
const zig = Array.from({length:Math.floor(w/8)},(_,i)=>`${l+i*8},${t} ${l+i*8+4},${t+5}`).join(" ");
return `<g><rect x="${l}" y="${t}" width="${w}" height="${h}" style="fill:var(--wall);stroke:var(--ink);stroke-opacity:.25"/>
<path d="M${l-6},${t} L${x},${t-h*0.55} L${l+w+6},${t}Z" ${F(roof)}/>
<polyline points="${zig} ${l+w},${t}" style="fill:none;stroke:var(--wall);stroke-width:1.5"/>
<rect x="${x-6}" y="${y-18}" width="12" height="18" ${F("sea-deep")}/>
${w>40?`<rect x="${l+7}" y="${t+9}" width="10" height="10" ${F("mango")}/><rect x="${l+w-17}" y="${t+9}" width="10" height="10" ${F("mango")}/>`:""}
${opts.chimney?`<rect x="${x+w*0.18}" y="${t-h*0.5}" width="7" height="16" style="fill:var(--ink);opacity:.6"/><circle cx="${x+w*0.18+4}" cy="${t-h*0.55-8}" r="5" style="fill:#fff;opacity:.6"/><circle cx="${x+w*0.18+10}" cy="${t-h*0.55-18}" r="6" style="fill:#fff;opacity:.45"/>`:""}
</g>`;
}
const BUILD = {
s1: ([x,y]) => `<rect x="${x-7}" y="${y-78}" width="14" height="82" style="fill:#a27b4c"/>${[0,1,2,3,4,5].map(i=>`<line x1="${x-7}" x2="${x+7}" y1="${y-72+i*13}" y2="${y-72+i*13}" style="stroke:#7a5530;stroke-width:1.5"/>`).join("")}<rect x="${x-9}" y="${y-2}" width="4" height="14" style="fill:#7a5530"/><rect x="${x+5}" y="${y-2}" width="4" height="14" style="fill:#7a5530"/>${house(x-34,y-74,40,26,"roof2")}`,
s2: ([x,y]) => `<rect x="${x-24}" y="${y-8}" width="48" height="8" style="fill:#a27b4c"/>${[-20,-6,6,20].map(o=>`<rect x="${x+o-2}" y="${y-44}" width="4" height="36" style="fill:var(--wall)"/>`).join("")}<path d="M${x-30},${y-44} L${x},${y-66} L${x+30},${y-44}Z" ${F("roof1")}/><line x1="${x+34}" y1="${y}" x2="${x+34}" y2="${y-80}" style="stroke:var(--ink);stroke-width:2;opacity:.6"/><path d="M${x+34},${y-80} l22,7 l-22,7z" ${F("mango")}/>`,
s3: ([x,y]) => [-46,0,46].map((o,i)=>`<rect x="${x+o-20}" y="${y-26}" width="40" height="26" style="fill:var(--wall)"/><path d="M${x+o-24},${y-26} h48 l-6,-14 h-36z" ${F(["roof1","roof3","roof2"][i])}/>${[0,1,2].map(k=>`<rect x="${x+o-24+k*16}" y="${y-26}" width="8" height="6" style="fill:#fff;opacity:.55"/>`).join("")}<circle cx="${x+o-8}" cy="${y-10}" r="4" ${F("mango")}/><circle cx="${x+o+6}" cy="${y-10}" r="4" ${F("hibiscus")}/>`).join(""),
s4: ([x,y]) => `<rect x="${x-6}" y="${y-92}" width="12" height="96" style="fill:#a27b4c"/>${[0,1,2,3,4,5,6].map(i=>`<line x1="${x-6}" x2="${x+6}" y1="${y-86+i*13}" y2="${y-86+i*13}" style="stroke:#7a5530;stroke-width:1.5"/>`).join("")}<g class="boat"><path d="M${x+18},${y-30} h44 l-8,12 h-28z" ${F("hibiscus")}/><line x1="${x+40}" y1="${y-30}" x2="${x+40}" y2="${y-58}" style="stroke:var(--ink);stroke-width:2"/><path d="M${x+40},${y-58} v24 h18z" style="fill:#fff"/></g><path d="M${x+6},${y-60} q14,-30 30,-6" style="fill:none;stroke:var(--ink);stroke-width:1.5;opacity:.7"/>`,
s5: ([x,y]) => `<rect x="${x-46}" y="${y-48}" width="92" height="48" style="fill:var(--wall);stroke:var(--ink);stroke-opacity:.25"/><path d="M${x-52},${y-48} L${x},${y-76} L${x+52},${y-48}Z" ${F("roof2")}/>${[-36,-18,0,18,36].map(o=>`<rect x="${x+o-3}" y="${y-46}" width="6" height="46" style="fill:#fff;stroke:var(--ink);stroke-opacity:.2"/>`).join("")}<circle cx="${x}" cy="${y-60}" r="7" style="fill:#fff;stroke:var(--ink);stroke-opacity:.5"/><line x1="${x}" y1="${y-60}" x2="${x}" y2="${y-65}" style="stroke:var(--ink)"/><line x1="${x}" y1="${y-60}" x2="${x+4}" y2="${y-60}" style="stroke:var(--ink)"/><rect x="${x-58}" y="${y}" width="116" height="6" style="fill:#c9b48a"/>`,
s6: ([x,y]) => `${house(x+36,y,44,30,"roof3")}<path d="M${x-50},${y-30} q30,26 66,0 z" ${F("roof2")}/><line x1="${x-40}" y1="${y-24}" x2="${x-44}" y2="${y}" style="stroke:#7a5530;stroke-width:3"/><line x1="${x+4}" y1="${y-24}" x2="${x+8}" y2="${y}" style="stroke:#7a5530;stroke-width:3"/><path d="M${x-40},${y-30} v-30 l26,30z" style="fill:#fff;opacity:.85"/>`,
s7: ([x,y]) => `<path d="M${x-16},${y} L${x-10},${y-96} L${x+10},${y-96} L${x+16},${y}Z" style="fill:#fff;stroke:var(--ink);stroke-opacity:.3"/>${[20,52,80].map(o=>`<path d="M${x-15+o*0.06},${y-o} L${x-14+o*0.06},${y-o-10} L${x+14-o*0.06},${y-o-10} L${x+15-o*0.06},${y-o}Z" ${F("hibiscus")}/>`).join("")}<rect x="${x-12}" y="${y-112}" width="24" height="16" ${F("mango")}/><path d="M${x-14},${y-112} L${x},${y-126} L${x+14},${y-112}Z" style="fill:var(--ink);opacity:.7"/><path d="M${x+12},${y-104} l60,-16 v32z" style="fill:var(--mango);opacity:.3"/>`,
s8: ([x,y]) => `${house(x,y,58,38,"roof1",{chimney:true})}<rect x="${x-24}" y="${y-60}" width="48" height="12" rx="3" style="fill:var(--mango)"/>`,
s9: ([x,y]) => `<rect x="${x-50}" y="${y-30}" width="70" height="30" style="fill:var(--wall);stroke:var(--ink);stroke-opacity:.25"/><path d="M${x-56},${y-30} h82 l-10,-16 h-62z" ${F("roof3")}/><rect x="${x+26}" y="${y-8}" width="40" height="8" style="fill:#c9b48a"/>${[0,1,2,3,4,5].map(i=>`<circle cx="${x+31+i*6}" cy="${y-10}" r="2.6" style="fill:#7a3b22"/>`).join("")}${[0,1,2,3,4].map(i=>`<circle cx="${x+34+i*6}" cy="${y-14}" r="2.6" style="fill:#a8452a"/>`).join("")}`,
s10: ([x,y]) => `<rect x="${x-60}" y="${y-6}" width="120" height="8" style="fill:#c9b48a"/>${[-52,-26,0,26,52].map(o=>`<rect x="${x+o-3}" y="${y-46}" width="6" height="40" style="fill:var(--wall)"/>`).join("")}<path d="M${x-70},${y-46} Q${x},${y-96} ${x+70},${y-46}Z" ${F("hibiscus")}/>${[-56,-28,0,28,56].map((o,i)=>`<path d="M${x+o-10},${y-46} q10,10 20,0" style="fill:none;stroke:var(--wall);stroke-width:2"/>`).join("")}<line x1="${x}" y1="${y-82}" x2="${x}" y2="${y-104}" style="stroke:var(--ink);stroke-width:2"/><path d="M${x},${y-104} l18,6 l-18,6z" ${F("mango")}/>`
};
const BH = { s1:110, s2:86, s3:44, s4:98, s5:80, s6:64, s7:130, s8:66, s9:50, s10:108 };
function mapSVG(){
const coast = "M0,505 C60,520 90,500 150,512 C230,528 300,515 380,528 C470,542 520,515 610,528 C700,540 780,512 870,522 C930,528 970,515 1000,520";
const pts = STATIONS.map(s => { const [x,y]=POS[s.id]; return (s.id==="s1"||s.id==="s4") ? [x, y-78] : [x, y+10]; });
const cur = currentId();
let markers = STATIONS.map(s => {
const [x,y] = POS[s.id], lk = !unlocked(s.id), dn = !!S.stamps[s.id], isCur = s.id===cur && !PREVIEW;
const by = y - BH[s.id] - 26;
const fill = dn ? "hibiscus" : lk ? "lock" : "mango";
const lw = s.name.length*8.2+20;
const ly = (s.id==="s1"||s.id==="s4") ? y+26 : y+28;
return `<g class="st-marker ${lk?"locked":""}" data-id="${s.id}" tabindex="0" role="button" aria-label="Station ${s.num}: ${esc(s.name)}${dn?" (stamped)":lk?" (locked)":""}">
${BUILD[s.id]([x,y])}
<rect x="${x-lw/2}" y="${ly-15}" width="${lw}" height="22" rx="11" style="fill:var(--surface);opacity:.94"/>
<text x="${x}" y="${ly}" text-anchor="middle" style="fill:var(--fg);font:700 14px var(--f-body)">${esc(s.name)}</text>
<g class="badge" style="transform-origin:${x}px ${by}px">
${isCur?`<circle class="pulse" cx="${x}" cy="${by}" r="20" style="fill:var(--mango)"/>`:""}
<circle class="ring" cx="${x}" cy="${by}" r="20" style="fill:var(--${fill});stroke:var(--surface);stroke-width:3"/>
${lk?`<path d="M${x-6},${by-1} v-4 a6,6 0 0 1 12,0 v4" style="fill:none;stroke:#fff;stroke-width:2.5"/><rect x="${x-8}" y="${by-1}" width="16" height="11" rx="2" style="fill:#fff"/>`
: dn?`<path d="M${x-8},${by} l6,6 l11,-12" style="fill:none;stroke:#fff;stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round"/>`
: `<text x="${x}" y="${by+6}" text-anchor="middle" style="fill:var(--ink);font:700 17px var(--f-body)">${s.num}</text>`}
</g></g>`;
}).join("");
return `<svg viewBox="0 0 1000 680" role="img" aria-label="Map of Inquiry Bay Research Village with ten stations">
<rect width="1000" height="680" style="fill:var(--sky)"/>
<circle cx="930" cy="70" r="34" style="fill:var(--mango);opacity:.9"/>
<path d="M0,170 L70,110 L130,140 L210,70 L290,125 L360,85 L450,140 L540,60 L620,120 L700,90 L790,135 L860,100 L1000,150 L1000,260 L0,260Z" style="fill:var(--mount)"/>
<path d="M0,215 C120,170 220,200 320,180 C430,158 540,200 650,175 C760,150 880,190 1000,170 L1000,300 L0,300Z" style="fill:var(--hill)"/>
<rect y="470" width="1000" height="210" style="fill:var(--sea)"/>
<rect y="600" width="1000" height="80" style="fill:var(--sea-deep);opacity:.45"/>
<path d="${coast.replace(/(\d+),(\d+)/g,(m,a,b)=>a+","+(+b+30))} L1000,500 L0,500Z" style="fill:var(--sand)"/>
<path d="M0,240 C200,205 400,235 600,210 C800,190 900,215 1000,205 L1000,520 C970,515 930,528 870,522 C780,512 700,540 610,528 C520,515 470,542 380,528 C300,515 230,528 150,512 C90,500 60,520 0,505Z" style="fill:var(--grass)"/>
<path d="M0,330 C180,300 330,345 520,320 C700,300 850,335 1000,310 L1000,380 C820,400 680,370 520,390 C340,410 160,380 0,400Z" style="fill:var(--grass-2);opacity:.35"/>
${[[60,600],[300,640],[680,650],[940,640],[460,600]].map(([x,y])=>`<path class="wave" d="M${x-30},${y} q15,-8 30,0 t30,0" style="fill:none;stroke:#fff;stroke-opacity:.55;stroke-width:2.5"/>`).join("")}
<g class="boat"><path d="M700,628 h60 l-10,14 h-40z" style="fill:var(--wall)"/><line x1="730" y1="628" x2="730" y2="590" style="stroke:var(--ink);stroke-width:2"/><path d="M730,592 v32 h24z" ${F("mango")}/></g>
<path d="${smooth(pts)}" style="fill:none;stroke:var(--road);stroke-width:16;stroke-linecap:round;stroke-linejoin:round;opacity:.95"/>
<path d="${smooth(pts)}" style="fill:none;stroke:var(--surface);stroke-width:2;stroke-dasharray:8 10;opacity:.8"/>
${palm(40,500,1)}${palm(190,500,.9)}${palm(345,515,1.1)}${palm(640,520,.9)}${palm(760,505,1)}${palm(980,505,.9)}${palm(560,330,.8)}${palm(330,250,.8)}${palm(800,330,.85)}${palm(150,380,.8)}
${markers}
</svg>`;
}
let view = "home", viewArg = null;
function go(v, arg){ stopAudio(); view = v; viewArg = arg; render(); window.scrollTo({top:0, behavior:"instant" in window ? "instant" : "auto"}); }
function render(){
updateMeter();
const app = $("#app");
if (view === "station") app.innerHTML = stationHTML(byId(viewArg));
else if (view === "passport") app.innerHTML = passportHTML();
else if (view === "cert") app.innerHTML = certHTML();
else app.innerHTML = homeHTML();
wire(app);
}
function homeHTML(){
const n = stampCount(), all = n === STATIONS.length;
return `<div class="wrap">
<section class="hero">
<span class="eyebrow">A Caribbean research resort</span>
<h1>Inquiry Bay Research Village</h1>
<p class="lede">Welcome to the bay. Before you write your research proposal, you will walk the village from the Arrival Jetty to the Proposal Pavilion. At each stop you gather key concepts, practise them, reflect on your own study, and earn a stamp in your passport. Stops open one at a time, in the order a real study is built.</p>
<div class="howto"><span><b>1 · Gather</b> every concept card</span><span><b>2 · Practise</b> until every activity is correct</span><span><b>3 · Reflect</b> on your own study (at least ${MINW} words)</span><span><b>4 · Stamp</b> your passport</span></div>
<div class="welcome-audio">${playerHTML(all?"farewell":"welcome", all?"Departure message":"Welcome to Inquiry Bay")}</div>
</section>
${all?`<div class="gate"><h2>Your passport is full.</h2><p>You have gathered everything you need. Take your Proposal Blueprint and write your full research proposal.</p><div class="row" style="justify-content:flex-start"><button class="btn big" data-go="cert">View my certificate</button><button class="btn ghost" data-go="passport">Open my passport</button></div></div>`:""}
<div class="mapbox">${mapSVG()}</div>
<div class="section-h"><h2>Your route</h2><span class="eyebrow">${n} of ${STATIONS.length} stamped</span></div>
<ol class="route">${STATIONS.map(s => {
const lk = !unlocked(s.id), dn = !!S.stamps[s.id], cur = s.id===currentId();
return `<li class="${dn?"done":cur?"current":""}"><button type="button" data-st="${s.id}" ${lk?"disabled":""}><span class="n">${dn?"✓":s.num}</span><span class="t"><b>${esc(s.name)}</b><small>${esc(s.theme)}${lk?" · opens after stop "+(s.num-1):""}</small></span></button></li>`;
}).join("")}</ol>
</div>`;
}
function stationHTML(st){
if (!st || !unlocked(st.id)) return homeHTML();
const opened = S.concepts[st.id]||[];
const step = { n:0 }; const nx = () => ++step.n;
return `<div class="wrap">
<section class="st-hero">
<span class="eyebrow">Stop ${st.num} of ${STATIONS.length} · ${esc(st.theme)}</span>
<h1>${esc(st.name)}</h1>
<p class="big">${esc(st.bigIdea)}</p>
<span class="feeds"><b>Feeds your proposal:</b> ${esc(st.feeds)}</span>
<div class="checks" id="checks">${checksHTML(st)}</div>
</section>
${playerHTML(st.id, "Your guide at the "+st.name)}
<section class="block" aria-labelledby="g-${st.id}">
<header><span class="step">${nx()}</span><h2 id="g-${st.id}">Gather the key concepts</h2><span class="sub">Tap each card to open it. Every card you open goes into your passport glossary.</span></header>
<div class="cards">${st.concepts.map((c,i) => { const o = opened.includes(i); return `<button type="button" class="card ${o?"open":""}" data-c="${i}" aria-expanded="${o}">
<span class="term">${esc(c.term)}<span class="tag">${o?"Collected":"Tap to open"}</span></span>
<span class="def" ${o?"":"hidden"}>${esc(c.def)}</span><span class="ex" ${o?"":"hidden"}><b>Example:</b> ${esc(c.ex)}</span></button>`; }).join("")}</div>
<div class="lens">
<div><span class="eyebrow">Caribbean lens</span><h3>${esc(st.caribbean.title)}</h3><p>${esc(st.caribbean.text)}</p></div>
<div><span class="eyebrow">Reading link</span><h3>Take this to your reading</h3><ul>${st.reading.map(r=>`<li>${esc(r.cite)}<small>${esc(r.note)}</small></li>`).join("")}</ul>
${st.resources && st.resources.length?`<div class="res"><span class="eyebrow">Resources from your lecturer</span><ul>${st.resources.map(r=>`<li><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.label)}</a></li>`).join("")}</ul></div>`:""}</div>
</div>
</section>
<section class="block" aria-labelledby="p-${st.id}">
<header><span class="step">${nx()}</span><h2 id="p-${st.id}">Practise</h2><span class="sub">Keep going until every answer is correct. Wrong answers are part of learning, so try again.</span></header>
${st.activities.map((a,i)=>`<div class="act" id="act-${i}" data-i="${i}"></div>`).join("")}
</section>
${st.final?`<section class="block" aria-labelledby="bp-h">
<header><span class="step">${nx()}</span><h2 id="bp-h">Build your Proposal Blueprint</h2><span class="sub">Bring together what you gathered. Your notes from earlier stops appear under each box. Every box needs at least a few words, and every alignment check must be ticked.</span></header>
${blueprintHTML()}
</section>`:""}
<section class="block" aria-labelledby="r-${st.id}">
<header><span class="step">${nx()}</span><h2 id="r-${st.id}">Reflect on your own study</h2></header>
<label for="refl" style="font-weight:700">${esc(st.reflection)}</label>
<textarea id="refl" placeholder="Write in full sentences about your own topic.">${esc(S.refl[st.id]||"")}</textarea>
<span class="wc" id="wc"></span>
</section>
<div class="gate" id="gate"></div>
</div>`;
}
function checksHTML(st){
const c = conceptsDone(st), a = actsDone(st), r = reflDone(st), b = st.final ? bpDone() : null;
const chip = (on, t) => `<span class="chip ${on?"on":""}"><i>${on?"✓":"○"}</i>${t}</span>`;
return chip(c, `Concepts ${(S.concepts[st.id]||[]).length}/${st.concepts.length}`) + chip(a, `Practice ${(S.acts[st.id]||[]).filter(Boolean).length}/${st.activities.length}`) + (st.final?chip(b,"Blueprint"):"") + chip(r, "Reflection") + (S.stamps[st.id]?chip(true,"Stamped"):"");
}
function gateHTML(st){
const ready = conceptsDone(st) && actsDone(st) && reflDone(st) && (!st.final || bpDone());
const next = STATIONS[idx(st.id)+1];
if (S.stamps[st.id]) return `<h2>Stamp collected: ${esc(st.keepsake)}</h2><p>You can come back to this stop at any time.</p><div class="row" style="justify-content:flex-start">${next?`<button class="btn big" data-st="${next.id}">Walk on to ${esc(next.name)}</button>`:`<button class="btn big" data-go="cert">View my certificate</button>`}<button class="btn ghost" data-go="home">Back to the map</button></div>`;
const todo = [];
if (!conceptsDone(st)) todo.push("Open every concept card");
if (!actsDone(st)) todo.push("Complete every practice activity correctly");
if (st.final && !bpDone()) todo.push("Fill every Blueprint box and tick every alignment check");
if (!reflDone(st)) todo.push(`Write at least ${MINW} words of reflection`);
return `<h2>${ready?"Ready for your stamp":"Before you can collect your stamp"}</h2>${ready?`<p>You have earned the <b>${esc(st.keepsake)}</b>.</p>`:`<ul>${todo.map(t=>`<li>${t}</li>`).join("")}</ul>`}<button class="btn big" id="stampBtn" ${ready?"":"disabled"}>Collect my stamp</button>`;
}
function renderAct(st, i){
const a = st.activities[i], box = $("#act-"+i); if (!box) return;
const done = (S.acts[st.id]||[])[i];
box.className = "act" + (done?" passed":"");
const head = `<div class="ap">${esc(a.prompt)}</div>`;
if (done && !box.dataset.replay){
box.innerHTML = `${head}<div class="status">Completed correctly ✓</div><button class="btn ghost" data-replay>Practise again</button>`;
$("[data-replay]", box).addEventListener("click", ()=>{ box.dataset.replay = "1"; renderAct(st,i); });
return;
}
const pass = () => { const arr = S.acts[st.id] = S.acts[st.id]||[]; arr[i] = true; save(); box.classList.add("passed"); const s = $(".status", box); if (s){ s.textContent = "Completed correctly ✓"; } refreshGate(st); };
if (a.type === "sort"){
const items = shuffle(a.items.map((it,k)=>({...it,k})));
box.innerHTML = `${head}<div class="status">Sorted 0 of ${items.length}</div><div class="tray">${items.map(it=>`<button type="button" class="item" data-k="${it.k}">${esc(it.t)}</button>`).join("")}</div>
<div class="buckets">${a.buckets.map((b,bi)=>`<button type="button" class="bucket" data-b="${bi}"><b>${esc(b)}</b></button>`).join("")}</div><div class="msg" hidden></div>`;
let sel = null, placed = 0; const msg = $(".msg", box);
box.querySelectorAll(".item").forEach(el => el.addEventListener("click", () => { box.querySelectorAll(".item").forEach(x=>x.classList.remove("sel")); sel = el; el.classList.add("sel"); box.querySelectorAll(".bucket").forEach(b=>b.classList.add("ready")); msg.hidden = true; }));
box.querySelectorAll(".bucket").forEach(bk => bk.addEventListener("click", () => {
if (!sel){ msg.hidden=false; msg.className="msg no"; msg.textContent="First tap a card, then tap a basket."; return; }
const it = a.items[+sel.dataset.k];
if (+bk.dataset.b === it.b){
const d = document.createElement("div"); d.className="placed"; d.innerHTML = `${esc(it.t)}<small>${esc(it.why)}</small>`; bk.appendChild(d);
sel.remove(); sel = null; placed++; box.querySelectorAll(".bucket").forEach(b=>b.classList.remove("ready"));
$(".status", box).textContent = `Sorted ${placed} of ${a.items.length}`; msg.hidden = true;
if (placed === a.items.length) pass();
} else { bk.classList.remove("shake"); void bk.offsetWidth; bk.classList.add("shake"); msg.hidden=false; msg.className="msg no"; msg.textContent="Not quite. Think about the key concept and try another basket."; }
}));
}
else if (a.type === "order"){
const steps = shuffle(a.steps.map((t,k)=>({t,k})));
box.innerHTML = `${head}<div class="status">Step 1 of ${a.steps.length}</div><ol class="seq"></ol><div class="tray">${steps.map(s=>`<button type="button" class="item" data-k="${s.k}">${esc(s.t)}</button>`).join("")}</div><div class="msg" hidden></div>`;
let nextK = 0; const msg = $(".msg", box), seq = $(".seq", box);
box.querySelectorAll(".item").forEach(el => el.addEventListener("click", () => {
if (+el.dataset.k === nextK){ const li = document.createElement("li"); li.textContent = a.steps[nextK]; seq.appendChild(li); el.remove(); nextK++; msg.hidden = true;
$(".status", box).textContent = nextK < a.steps.length ? `Step ${nextK+1} of ${a.steps.length}` : "";
if (nextK === a.steps.length) pass();
} else { el.classList.remove("shake"); void el.offsetWidth; el.classList.add("shake"); msg.hidden=false; msg.className="msg no"; msg.textContent="That is not the next step. Which must come first?"; }
}));
}
else if (a.type === "mcq"){
box.innerHTML = `${head}<div class="status">Answered 0 of ${a.questions.length}</div>${a.questions.map((q,qi)=>`<div class="q" data-q="${qi}"><b>${qi+1}. ${esc(q.q)}</b><div class="opts">${q.options.map((o,oi)=>`<button type="button" class="opt" data-o="${oi}">${esc(o)}</button>`).join("")}</div><div class="msg" hidden></div></div>`).join("")}`;
let right = 0;
box.querySelectorAll(".q").forEach(qe => { const q = a.questions[+qe.dataset.q], msg = $(".msg", qe);
qe.querySelectorAll(".opt").forEach(ob => ob.addEventListener("click", () => {
if (+ob.dataset.o === q.a){ ob.classList.add("right"); qe.querySelectorAll(".opt").forEach(x=>x.disabled=true); msg.hidden=false; msg.className="msg ok"; msg.textContent = "Correct. " + q.why; right++; $(".status", box).textContent = `Answered ${right} of ${a.questions.length}`; if (right === a.questions.length) pass(); }
else { ob.classList.add("wrong"); ob.disabled = true; msg.hidden=false; msg.className="msg no"; msg.textContent = "Not quite. Read the question again and try another answer."; }
})); });
}
else if (a.type === "calc"){
box.innerHTML = `${head}<div class="status"></div><div class="calc">${a.fields.map((f,fi)=>`<label>${esc(f.label)}<input type="number" step="any" inputmode="decimal" id="calc-${st.id}-${fi}"></label>`).join("")}</div><button type="button" class="btn">Check my answers</button><div class="msg" hidden></div>`;
let tries = 0; const msg = $(".msg", box);
$(".btn", box).addEventListener("click", () => { tries++; let ok = 0;
a.fields.forEach((f,fi) => { const inp = $("#calc-"+st.id+"-"+fi), v = parseFloat(inp.value); const good = !isNaN(v) && Math.abs(v - f.answer) <= f.tol; inp.classList.toggle("right", good); inp.classList.toggle("wrong", !good); if (good) ok++; });
msg.hidden = false;
if (ok === a.fields.length){ msg.className="msg ok"; msg.textContent = "All correct. " + a.why; pass(); }
else { msg.className="msg no"; msg.textContent = `${ok} of ${a.fields.length} correct. ` + (tries >= 2 ? "Hint: " + a.why : "Check the red boxes and try again."); }
});
}
}
function blueprintHTML(){
return `<form class="bp" id="bpForm" onsubmit="return false">${BP.map(g=>`<fieldset><legend>${esc(g.group)}</legend>${g.fields.map(f=>{
const notes = f.from.map(id=>S.refl[id]?`<div class="notes"><b>Your notes from the ${esc(byId(id).name)}:</b> ${esc(S.refl[id])}</div>`:"").join("");
return `<div class="field"><label for="bp-${f.k}">${esc(f.label)}</label><span class="hint">${esc(f.hint)}</span><textarea id="bp-${f.k}" data-bp="${f.k}">${esc(S.bp[f.k]||"")}</textarea>${notes}</div>`;
}).join("")}</fieldset>`).join("")}
<fieldset><legend>Alignment check</legend><div class="align-list">${ALIGN.map((t,i)=>`<label><input type="checkbox" id="al-${i}" data-al="${i}" ${S.align[i]?"checked":""}> <span>${esc(t)}</span></label>`).join("")}</div></fieldset>
<div class="row" style="justify-content:flex-start"><button type="button" class="btn ghost" data-copy="bp">Copy my blueprint</button>${canDownload()?`<button type="button" class="btn ghost" data-dl="bp">Download as text file</button>`:""}</div>
<textarea class="copybox" id="copybox-bp" hidden readonly></textarea></form>`;
}
function blueprintText(){
let t = `PROPOSAL BLUEPRINT\nInquiry Bay Research Village\n${S.name?"Prepared by: "+S.name+"\n":""}Date: ${new Date().toLocaleDateString()}\n\n`;
BP.forEach(g => { t += `== ${g.group} ==\n\n`; g.fields.forEach(f => { t += `${f.label}:\n${(S.bp[f.k]||"").trim()||"(not yet written)"}\n\n`; }); });
t += "== Alignment check ==\n" + ALIGN.map((a,i)=>`[${S.align[i]?"x":" "}] ${a}`).join("\n") + "\n";
return t;
}
function allWorkText(){
let t = `MY RESEARCH PASSPORT\nInquiry Bay Research Village\n${S.name?"Name: "+S.name+"\n":""}Stamps: ${stampCount()} of ${STATIONS.length}\n\n== Reflections ==\n\n`;
STATIONS.forEach(s => { if (S.refl[s.id]) t += `${s.num}. ${s.name} (${s.theme})\nPrompt: ${s.reflection}\n${S.refl[s.id].trim()}\n\n`; });
return t + "\n" + blueprintText();
}
function passportHTML(){
const gloss = STATIONS.flatMap(s => (S.concepts[s.id]||[]).map(i => ({...s.concepts[i], st:s.name}))).sort((a,b)=>a.term.localeCompare(b.term));
return `<div class="wrap">
<section class="st-hero"><span class="eyebrow">Everything you have gathered</span><h1>My Research Passport</h1><p class="big">Your stamps, your glossary of key concepts, and your reflections. Copy your work to keep it or to start your proposal.</p></section>
<section class="block"><header><h2>Stamps and keepsakes</h2></header>
<div class="stamps">${STATIONS.map(s=>`<div class="stamp ${S.stamps[s.id]?"got":""}"><span><b>${esc(s.name)}</b>${S.stamps[s.id]?esc(s.keepsake):"Not yet stamped"}</span></div>`).join("")}</div></section>
<section class="block gloss"><header><h2>My glossary</h2><span class="sub">${gloss.length} concepts collected</span></header>
<label for="gq" class="eyebrow">Search your glossary</label><input id="gq" type="search" placeholder="e.g. sampling, validity, paradigm">
<dl id="gl">${gloss.map(g=>`<div data-t="${esc((g.term+" "+g.def).toLowerCase())}"><dt>${esc(g.term)}</dt><dd>${esc(g.def)} <small>· ${esc(g.st)}</small></dd></div>`).join("") || "<p>Open concept cards at each stop to fill your glossary.</p>"}</dl></section>
<section class="block"><header><h2>My reflections</h2></header><div class="refl">${STATIONS.filter(s=>S.refl[s.id]).map(s=>`<article><span class="eyebrow">${s.num} · ${esc(s.name)}</span><p>${esc(S.refl[s.id])}</p></article>`).join("") || "<p>Your reflections will appear here.</p>"}</div>
<div class="row" style="justify-content:flex-start"><button class="btn" data-copy="all">Copy all my work</button>${canDownload()?`<button class="btn ghost" data-dl="all">Download as text file</button>`:""}</div>
<textarea class="copybox" id="copybox-all" hidden readonly></textarea></section>
<section class="block"><header><h2>Start again</h2></header><p>Clear every stamp, answer and reflection saved in this browser.</p><div id="resetBox"><button class="btn ghost" id="resetBtn">Reset my progress</button></div></section>
</div>`;
}
function code(){ const str = (S.name||"")+"|"+(S.certDate||"")+"|"+STATIONS.map(s=>words(S.refl[s.id])).join(","); let h = 2166136261; for (const ch of str){ h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return "IBRV-" + (h>>>0).toString(36).toUpperCase().padStart(7,"0"); }
function certHTML(){
if (stampCount() < STATIONS.length && !PREVIEW) return homeHTML();
if (!S.certDate){ S.certDate = new Date().toISOString().slice(0,10); save(); }
const total = STATIONS.reduce((n,s)=>n+words(S.refl[s.id]),0);
return `<div class="wrap"><section class="st-hero"><span class="eyebrow">Journey complete</span><h1>Ready to write</h1></section>
<div class="field" style="max-width:420px; margin-bottom:16px"><label for="certName">Your full name, as it should appear</label><input id="certName" value="${esc(S.name||"")}" placeholder="Type your name"></div>
<div class="cert"><span class="eyebrow">Inquiry Bay Research Village</span><h2>Certificate of Passage</h2><p>This certifies that</p><div class="who" id="certWho">${esc(S.name||"Your name")}</div>
<p style="max-width:52ch">walked all ten stops of the village, gathered every key concept, completed every practice activity, wrote ${total} words of reflection, and built a Proposal Blueprint.</p>
<p>Completed ${esc(S.certDate)} · Verification code <code id="certCode">${code()}</code></p>
<p class="eyebrow">Concept and design © Dr. Rohan Jowallah, Ed.D., FHEA</p></div>
<p style="margin-top:14px; color:var(--muted)">Take a screenshot of this certificate and submit it with your blueprint, as your lecturer directs.</p>
${playerHTML("farewell","Departure message")}
</div>`;
}
function canDownload(){ try { return window.top === window.self; } catch(e){ return false; } }
function copyText(text, box){
const fallback = () => { box.hidden = false; box.value = text; box.focus(); box.select(); };
if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(()=>toast("Copied. Paste it into your document."), fallback); else fallback();
}
function download(text, name){ const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text],{type:"text/plain"})); a.download = name; document.body.appendChild(a); a.click(); a.remove(); }
function toast(t){ const d = document.createElement("div"); d.className="overlay"; d.style.background="transparent"; d.style.pointerEvents="none"; d.innerHTML = `<div class="panel" style="max-width:320px">${esc(t)}</div>`; document.body.appendChild(d); setTimeout(()=>d.remove(), 1800); }
function refreshGate(st){ const g = $("#gate"); if (g) g.innerHTML = gateHTML(st); const c = $("#checks"); if (c) c.innerHTML = checksHTML(st); wireGate(st); }
function wireGate(st){
const b = $("#stampBtn"); if (b) b.addEventListener("click", () => {
S.stamps[st.id] = true; save(); updateMeter();
const next = STATIONS[idx(st.id)+1];
const ov = document.createElement("div"); ov.className = "overlay";
ov.innerHTML = `<div class="panel" role="dialog" aria-modal="true" aria-label="Stamp collected"><div class="bigstamp">${esc(st.name)}</div><h2 class="display" style="font-size:1.5rem">Stamped!</h2><p>You collected the <b>${esc(st.keepsake)}</b>.</p><div class="row">${next?`<button class="btn big" data-ov="next">Walk on to ${esc(next.name)}</button>`:`<button class="btn big" data-ov="cert">See my certificate</button>`}<button class="btn ghost" data-ov="map">Back to the map</button></div></div>`;
document.body.appendChild(ov);
const close = () => ov.remove();
ov.querySelectorAll("[data-ov]").forEach(x => x.addEventListener("click", () => { close(); const k = x.dataset.ov; if (k==="next") go("station", next.id); else if (k==="cert") go("cert"); else go("home"); }));
$("[data-ov]", ov).focus();
});
$("#gate")?.querySelectorAll("[data-st],[data-go]").forEach(x => x.addEventListener("click", () => x.dataset.st ? go("station", x.dataset.st) : go(x.dataset.go)));
}
function wire(app){
wirePlayers(app);
app.querySelectorAll(".st-marker").forEach(m => {
const open = () => { if (!m.classList.contains("locked")) go("station", m.dataset.id); else toast("This stop opens when you finish the one before it."); };
m.addEventListener("click", open); m.addEventListener("keydown", e => { if (e.key==="Enter"||e.key===" "){ e.preventDefault(); open(); } });
});
app.querySelectorAll(".route [data-st]").forEach(b => b.addEventListener("click", () => go("station", b.dataset.st)));
app.querySelectorAll(".gate [data-go]").forEach(b => { if (view==="home") b.addEventListener("click", () => go(b.dataset.go)); });
if (view === "station"){
const st = byId(viewArg);
app.querySelectorAll(".card").forEach(c => c.addEventListener("click", () => {
const i = +c.dataset.c, arr = S.concepts[st.id] = S.concepts[st.id]||[];
const open = c.getAttribute("aria-expanded") === "true";
c.setAttribute("aria-expanded", String(!open));
c.querySelectorAll(".def,.ex").forEach(x => x.hidden = open);
if (!arr.includes(i)){ arr.push(i); save(); c.classList.add("open"); $(".tag", c).textContent = "Collected"; refreshGate(st); }
}));
st.activities.forEach((_,i) => renderAct(st, i));
const ta = $("#refl"), wc = $("#wc");
const upd = () => { const n = words(ta.value); wc.textContent = `${n} words${n<MINW?` · ${MINW-n} more to go`:" · ready"}`; wc.classList.toggle("ok", n>=MINW); };
upd(); ta.addEventListener("input", () => { S.refl[st.id] = ta.value; save(); upd(); refreshGate(st); });
if (st.final){
app.querySelectorAll("[data-bp]").forEach(t => t.addEventListener("input", () => { S.bp[t.dataset.bp] = t.value; save(); refreshGate(st); }));
app.querySelectorAll("[data-al]").forEach(c => c.addEventListener("change", () => { S.align[+c.dataset.al] = c.checked; save(); refreshGate(st); }));
}
refreshGate(st);
}
app.querySelectorAll("[data-copy]").forEach(b => b.addEventListener("click", () => { const k = b.dataset.copy; copyText(k==="bp"?blueprintText():allWorkText(), $("#copybox-"+k)); }));
app.querySelectorAll("[data-dl]").forEach(b => b.addEventListener("click", () => { const k = b.dataset.dl; download(k==="bp"?blueprintText():allWorkText(), k==="bp"?"proposal-blueprint.txt":"research-passport.txt"); }));
if (view === "passport"){
const q = $("#gq"); if (q) q.addEventListener("input", () => { const v = q.value.toLowerCase(); app.querySelectorAll("#gl > div").forEach(d => d.hidden = v && !d.dataset.t.includes(v)); });
const rb = $("#resetBtn"); if (rb) rb.addEventListener("click", () => {
$("#resetBox").innerHTML = `<p><b>This cannot be undone.</b> Are you sure?</p><div class="row" style="justify-content:flex-start"><button class="btn" id="resetYes" style="background:var(--no)">Yes, clear everything</button><button class="btn ghost" id="resetNo">Keep my progress</button></div>`;
$("#resetYes").addEventListener("click", () => { S = { stamps:{}, concepts:{}, acts:{}, refl:{}, bp:{}, align:[], name:"" }; try{ localStorage.removeItem(KEY); }catch(e){} go("home"); });
$("#resetNo").addEventListener("click", () => render());
});
}
if (view === "cert"){
const n = $("#certName"); if (n) n.addEventListener("input", () => { S.name = n.value; save(); $("#certWho").textContent = n.value || "Your name"; $("#certCode").textContent = code(); });
}
}
render();
})();

