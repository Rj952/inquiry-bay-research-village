// Inquiry Bay extras: free reflection checks, worked examples, transcripts, larger text,
// download my work (Word/PDF), capstone check, install as app. Nothing here sends data anywhere.
// (c) 2026 Dr. Rohan Jowallah. All rights reserved.
(function(){
"use strict";
const $ = (s, el=document) => el.querySelector(s);
const E = s => String(s==null?"":s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const W = s => (s||"").trim().split(/\s+/).filter(Boolean).length;
const get = (k,d) => { try { const v = localStorage.getItem(k); return v==null?d:v; } catch(e){ return d; } };
const put = (k,v) => { try { localStorage.setItem(k,v); } catch(e){} };
const has = (re, t) => new RegExp(re, "i").test(t||"");

// ---------- styles ----------
const css = `
.ib-skip{position:absolute;left:-9999px;top:8px;z-index:100;background:var(--mango);color:#06363f;padding:10px 16px;border-radius:999px;font-weight:700}
.ib-skip:focus{left:12px}
:focus-visible{outline:3px solid var(--mango);outline-offset:2px}
html.ib-big{font-size:118%} html.ib-big body{font-size:20px}
.bar #ibText{font-weight:700;min-width:44px}
.ib-tx{margin:8px 0 18px}
.ib-tx summary,.ib-ex summary{cursor:pointer;font-weight:700;color:var(--sea-deep,#0a4b55);padding:6px 0}
@media (prefers-color-scheme: dark){.ib-tx summary,.ib-ex summary{color:var(--mango)}}
.ib-tx .ib-txt{background:var(--surface-2);border-radius:14px;padding:14px 16px;white-space:pre-wrap;max-height:340px;overflow:auto;font-size:.95rem}
.ib-tx small{display:block;color:var(--muted);margin-top:6px}
.ib-ex{margin-top:14px;background:var(--surface);border:1.5px dashed var(--line);border-radius:16px;padding:6px 16px}
.ib-ex[open]{padding-bottom:14px}
.ib-ex .who{color:var(--muted);font-size:.9rem;margin:2px 0 8px}
.ib-ex blockquote{margin:0;border-left:4px solid var(--mango);padding:4px 0 4px 12px;font-style:italic}
.ib-coach{margin-top:12px;background:var(--surface-2);border-radius:14px;padding:12px 16px}
.ib-coach h3{font-size:1rem;margin:0 0 2px}
.ib-coach p.n{color:var(--muted);font-size:.85rem;margin:0 0 8px}
.ib-coach ul{list-style:none;margin:0;padding:0;display:grid;gap:6px}
.ib-coach li{display:grid;grid-template-columns:24px 1fr;gap:6px;align-items:start;font-size:.95rem}
.ib-coach li i{font-style:normal;font-weight:700;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:var(--surface);border:1.5px solid var(--line);font-size:.8rem}
.ib-coach li.on i{background:var(--ok,#1f8a5c);border-color:var(--ok,#1f8a5c);color:#fff}
.ib-coach li small{display:block;color:var(--muted)}
.ib-take .row{display:flex;gap:10px;flex-wrap:wrap}
.ib-take p{margin:6px 0 12px}
.ib-take .tip{color:var(--muted);font-size:.9rem}
.ib-modal{position:fixed;inset:0;z-index:90;background:rgba(3,20,24,.7);display:grid;place-items:center;padding:16px}
.ib-modal .sheet{background:var(--bg);color:var(--fg);width:min(760px,100%);max-height:92vh;overflow:auto;border-radius:22px;padding:22px 20px;box-shadow:0 30px 70px rgba(0,0,0,.45)}
.ib-modal h2{margin:0 0 6px}
.ib-crit{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:12px 14px;margin:10px 0;display:grid;gap:8px}
.ib-crit .top{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:baseline}
.ib-crit .sig{font-size:.8rem;font-weight:700;padding:2px 9px;border-radius:999px;background:var(--surface-2)}
.ib-crit .sig.ok{background:var(--ok-bg,#e1f4ea);color:var(--ok,#1f8a5c)}
.ib-crit .opts{display:flex;gap:6px;flex-wrap:wrap}
.ib-crit .opts button{border:1.5px solid var(--line);background:var(--surface-2);color:var(--fg);border-radius:999px;padding:6px 12px;font:inherit;font-size:.88rem;cursor:pointer}
.ib-crit .opts button[aria-pressed="true"]{background:var(--sea,#00a3b4);border-color:var(--sea,#00a3b4);color:#fff}
.ib-sum{font-weight:700;margin:12px 0}
footer .ib-links a{color:inherit;font-weight:700}
`;
const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

// ---------- free reflection checks (no AI) ----------
const PEOPLE = "teacher|student|learner|pupil|boy|girl|child|parent|principal|grade|form|nurse|worker|women|men|youth|farmer|staff|community";
const PLACE = "school|parish|community|island|rural|urban|classroom|district|region|clinic|church|college|jamaica|trinidad|barbados|guyana|bahamas|belize|caribbean|town|village";
const CHECKS = {
 s1:[["Say what you used to think research was","before|used to|thought|believed|assumed"],["Describe one real decision","decid|decision|chose|choice|policy|rule|stopped|started|introduced"],["Show how evidence could have helped","evidence|data|research|survey|record|asked|measure|check"]],
 s2:[["Name a worldview","positivis|post-?positiv|interpretiv|constructiv|pragmati|transformativ|critical"],["Name your approach","quantitative|qualitative|mixed|action research"],["Give a reason","because|since|so that|as i |this means|therefore"]],
 s3:[["Name the people","%P"],["Name the setting","%L"],["Narrow the topic more than once","narrow|more specific|focus|then|within"],["Give local evidence","data|record|report|score|statistic|percent|%|survey|ministry|evidence|\\d"]],
 s4:[["Write a purpose statement","purpose of (this|my|the) study"],["Write a question or hypothesis","\\?|hypothes"],["Check it against your problem","problem"]],
 s5:[["Name two sources","\\d{4}[\\s\\S]*\\d{4}|two (sources|studies|articles)|first[\\s\\S]*second|source 1[\\s\\S]*source 2"],["Say whether they are empirical","empirical|study|survey|interview|data|experiment"],["Name a theme","theme|both|common|connect|link"],["Name a gap","gap|missing|few|little|no stud|not yet|lack|none of"]],
 s6:[["Name a design","survey|experiment|quasi|correlational|case study|ethnograph|phenomenolog|grounded|narrative|action research|mixed|sequential|convergent"],["Name the population","population|all "],["Describe the sample","sample|participants|\\d"],["Name a sampling technique","random|stratified|purposive|convenience|snowball|cluster|systematic|quota|census"]],
 s7:[["Consent (and assent for children)","consent|assent|permission"],["Confidentiality or anonymity","confidential|anonym|pseudonym|code|name"],["Power","power|pressure|feel they must|teacher|position|role"],["Data storage","stor|password|secure|encrypt|delete|destroy|lock|keep"]],
 s8:[["Name your instrument","questionnaire|survey|interview|observation|test|checklist|scale|focus group|rubric|guide|document"],["Say how you will check quality","valid|reliab|trustworth|credib|member check|triangulat|alpha|expert"],["Plan a pilot","pilot|try out|trial|test it"]],
 s9:[["Set out steps in order","step|first|then|next|finally|after"],["Name an analysis method","descriptive|mean|average|t-test|anova|correlation|regression|chi|thematic|cod|theme|percent|frequenc"],["Link analysis to each question","question|rq"]],
 s10:[["Name your strongest link","strong|best|clear|solid"],["Name the link that needs work","weak|needs work|not yet|unclear|gap|improve|missing"],["Say what you will do next","next|will|plan|going to|then i"]]
};
function evalChecks(id, text){
  return (CHECKS[id]||[]).map(([label, re]) => ({ label, on: has(re.replace("%P",PEOPLE).replace("%L",PLACE), text) }));
}
function coachHTML(id, text){
  const items = evalChecks(id, text), n = W(text);
  const sent = (text||"").split(/[.!?]+\s/).filter(s=>W(s)>=4).length;
  const all = items.concat([{label:"Write in full sentences (aim for three or more)", on: sent>=3},{label:"Reach at least 40 words", on: n>=40}]);
  const got = all.filter(x=>x.on).length;
  return `<h3>Quick check · ${got} of ${all.length}</h3><p class="n">These are friendly prompts, not marks. They run on your device and nothing is sent anywhere.</p><ul>${all.map(x=>`<li class="${x.on?"on":""}"><i aria-hidden="true">${x.on?"✓":""}</i><span>${E(x.label)}${x.on?"":"<small>Try adding this.</small>"}</span></li>`).join("")}</ul>`;
}

// ---------- worked example: Andrea's journey (fictional) ----------
const EX = {
 s1:"Before this, I thought research meant big studies done by universities. Last year our school stopped the reading club because “the children were not interested”. No one checked. A short survey of the children and a look at the library borrowing records would have shown whether that was true. Research could have saved a programme that may have been working.",
 s2:"I lean towards interpretivism, because I want to understand how my Grade 4 boys feel about reading, not just their scores. But I also want to know how many of them read at home. So my study is leaning towards mixed methods: a short survey for the numbers, then interviews for the story behind them.",
 s3:"Topic: reading in primary school. Narrower: boys’ reading motivation. Narrower again: reading motivation among Grade 4 boys in three rural primary schools in one parish. Local evidence: our end-of-term records show that 18 of 30 Grade 4 boys read below grade level, compared with 9 of 28 girls.",
 s4:"Purpose: The purpose of this study is to explore the reading motivation of Grade 4 boys in three rural primary schools. Research question: How do Grade 4 boys in three rural primary schools describe their reasons for reading, or not reading? Check: yes, both point at my problem, which is low reading among these boys.",
 s5:"Source 1: a journal study of boys’ reading motivation in Caribbean primary schools (empirical: it used a survey). Source 2: an article on home literacy practices in the region (empirical: interviews with parents). Theme: what happens at home shapes motivation. Gap: neither looked at rural schools, and neither asked the boys themselves.",
 s6:"Design: an explanatory sequential mixed methods design, because I need the numbers first and then the reasons. Population: Grade 4 boys in rural schools in one parish. Sample: all 74 Grade 4 boys in three schools for the survey, then 9 boys chosen by purposive sampling for interviews. It fits because the schools are small and I can reach every class.",
 s7:"My biggest risk is power: I am a teacher, and boys may feel they must please me. I will get parent consent and child assent, read the assent script aloud, and make clear they can stop at any time. Names will be replaced with codes. Recordings will be kept on a password-protected laptop and deleted after five years.",
 s8:"Instruments: a 20-item reading motivation scale and an interview guide. Validity: two literacy specialists will review the scale. Reliability: I will check Cronbach’s alpha after the pilot. For the interviews, I will use member checking and keep an audit trail. I will pilot with six Grade 4 boys at a school that is not in my sample.",
 s9:"Step 1: clean the survey data. Step 2: use descriptive statistics (mean and standard deviation) to answer my first question on how motivated the boys are. Step 3: transcribe the interviews. Step 4: code them and build themes, following Braun and Clarke’s six phases, to answer my second question on why. Step 5: compare the numbers and the themes.",
 s10:"My strongest link is between my problem and my purpose: both are clearly about Grade 4 boys’ reading motivation in rural schools. My weakest link is between my second research question and my analysis, because I have not yet said how I will compare the three schools. Next, I will add a comparison step and ask a colleague to check it."
};
function exHTML(id){
  if (!EX[id]) return "";
  return `<details class="ib-ex"><summary>See a worked example</summary><p class="who">Meet Andrea, a fictional primary school teacher in a rural community. Here is how she answered this stop’s reflection. Use it as a model, not a template: your own study will look different.</p><blockquote>${E(EX[id])}</blockquote></details>`;
}

// ---------- transcripts ----------
function txHTML(key){
  const t = window.IB_TX && window.IB_TX[key]; if (!t) return "";
  return `<details class="ib-tx"><summary>Read the transcript</summary><div class="ib-txt">${E(t)}</div><small>Lightly edited text of the narration.</small></details>`;
}

// ---------- larger text ----------
function applyText(){ const on = get("ib-big","0")==="1"; document.documentElement.classList.toggle("ib-big", on); const b = $("#ibText"); if (b){ b.setAttribute("aria-pressed", String(on)); b.title = on ? "Normal text size" : "Larger text"; } }
function textBtn(){
  if ($("#ibText")) return; const bar = $(".bar .wrap"); if (!bar) return;
  const b = document.createElement("button"); b.type = "button"; b.id = "ibText"; b.textContent = "A+"; b.setAttribute("aria-label","Larger text");
  b.addEventListener("click", () => { put("ib-big", get("ib-big","0")==="1" ? "0" : "1"); applyText(); });
  bar.insertBefore(b, $("#navMap")); applyText();
}

// ---------- documents ----------
const A = () => window.IBApp || {};
const BPx = () => A().BP || [];
const ALx = () => A().ALIGN || [];
const ST = () => A().S || {stamps:{},refl:{},bp:{},align:[],concepts:{}};
function personName(){ const s = ST(); if (s.name) return s.name; try { const p = JSON.parse(localStorage.getItem("ibrv-learner")||"null"); if (p && p.name) return p.name; } catch(e){} return ""; }
function docBody(){
  const s = ST(), name = personName(), today = new Date().toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"});
  const n = STATIONS.filter(x=>s.stamps[x.id]).length;
  let h = `<h1>My Research Work</h1><p class="sub">Inquiry Bay Research Village${name?" · "+E(name):""} · ${E(today)} · ${n} of ${STATIONS.length} stamps</p>`;
  h += `<h2>Proposal Blueprint</h2>`;
  BPx().forEach(g => { h += `<h3>${E(g.group)}</h3>`; g.fields.forEach(f => { const v = (s.bp||{})[f.k]; h += `<p class="lbl">${E(f.label)}</p><p>${v?E(v).replace(/\n/g,"<br>"):'<span class="muted">Not written yet.</span>'}</p>`; }); });
  if (ALx().length){ h += `<h3>Alignment checks</h3><ul>${ALx().map((a,i)=>`<li>${(s.align||[])[i]?"☑":"☐"} ${E(a)}</li>`).join("")}</ul>`; }
  h += `<h2>Reflections</h2>`;
  STATIONS.forEach(x => { const r = (s.refl||{})[x.id]; h += `<h3>${x.num}. ${E(x.name)} · ${E(x.theme)}</h3><p class="lbl">${E(x.reflection)}</p><p>${r?E(r).replace(/\n/g,"<br>"):'<span class="muted">No reflection yet.</span>'}</p>`; });
  const cap = s.capstone || {};
  if (Object.keys(cap).length){ h += `<h2>Capstone self-check</h2><ul>${CRIT.map((c,i)=>`<li>${E(c.t)}: <b>${E(cap[i]||"Not rated")}</b></li>`).join("")}</ul>`; }
  const gloss = STATIONS.flatMap(x => ((s.concepts||{})[x.id]||[]).map(i => x.concepts[i])).filter(Boolean).sort((a,b)=>a.term.localeCompare(b.term));
  if (gloss.length){ h += `<h2>My glossary</h2><dl>${gloss.map(g=>`<dt>${E(g.term)}</dt><dd>${E(g.def)}</dd>`).join("")}</dl>`; }
  h += `<p class="foot">Inquiry Bay Research Village. Concept, design and content © 2026 Dr. Rohan Jowallah. All rights reserved.</p>`;
  return h;
}
const DOC_CSS = `body{font-family:Calibri,Arial,sans-serif;font-size:11.5pt;line-height:1.45;color:#111;max-width:760px;margin:24px auto;padding:0 16px}
h1{font-size:22pt;margin:0;color:#0a4b55}h2{font-size:15pt;color:#0a4b55;border-bottom:1.5px solid #cfe3e1;padding-bottom:3px;margin-top:22px}
h3{font-size:12.5pt;margin:14px 0 4px}.sub{color:#555;margin-top:4px}.lbl{font-weight:bold;margin:8px 0 2px;color:#333}.muted{color:#888;font-style:italic}
dt{font-weight:bold;margin-top:6px}dd{margin:0 0 4px 0}.foot{margin-top:28px;color:#777;font-size:9pt}
@media print{body{margin:0}h2{break-after:avoid}h3{break-after:avoid}}`;
function downloadWord(){
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>My Research Work</title><style>${DOC_CSS}</style></head><body>${docBody()}</body></html>`;
  const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob(["﻿", html], {type:"application/msword"}));
  a.download = "inquiry-bay-my-research-work.doc"; document.body.appendChild(a); a.click(); a.remove();
  toastX("Your Word file is downloading.");
}
function savePDF(){
  const w = window.open("", "_blank");
  if (!w){ toastX("Please allow pop-ups for this site, then try again."); return; }
  w.document.write(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>My Research Work</title><style>${DOC_CSS}.tip{background:#fff6dc;border-radius:10px;padding:10px 14px;font-family:Arial,sans-serif}@media print{.tip{display:none}}</style></head><body><p class="tip">In the print window, choose <b>Save as PDF</b> as the printer.</p>${docBody()}<script>setTimeout(function(){window.print()},400)<\/script></body></html>`);
  w.document.close();
}
function toastX(t){ try { if (A().toast) A().toast(t); } catch(e){} }

// ---------- capstone check ----------
const CRIT = [
 {t:"Title names the topic, the people and the setting", k:["title"], ok:b=>W(b.title)>=6},
 {t:"Problem statement gives evidence and a gap", k:["problem"], ok:b=>W(b.problem)>=25 && has("data|record|report|score|percent|%|evidence|\\d",b.problem) && has("gap|little is known|few|no stud|not (yet )?known|lack|missing",b.problem)},
 {t:"Purpose statement follows from the problem", k:["purpose"], ok:b=>has("purpose of (this|my|the) study",b.purpose)},
 {t:"Research questions or hypotheses match the purpose", k:["rq"], ok:b=>has("\\?|hypothes",b.rq)},
 {t:"Framework names a theory or shows how concepts connect", k:["framework"], ok:b=>W(b.framework)>=10},
 {t:"Literature themes lead to a clear gap", k:["litgap"], ok:b=>has("gap|missing|few|little|no stud|lack|not yet",b.litgap)},
 {t:"Approach and design fit the questions", k:["approach","design"], ok:b=>W(b.approach)>=10 && has("survey|experiment|quasi|correlational|case study|ethnograph|phenomenolog|grounded|narrative|action research|mixed|sequential",b.design)},
 {t:"Sample and sampling technique are clear", k:["sample"], ok:b=>has("\\d",b.sample) && has("random|stratified|purposive|convenience|snowball|cluster|systematic|quota|census|all ",b.sample)},
 {t:"Instruments include a quality check", k:["instruments"], ok:b=>has("valid|reliab|trustworth|pilot|credib",b.instruments)},
 {t:"Analysis answers every question", k:["analysis"], ok:b=>has("question|rq",b.analysis) && has("descriptive|mean|t-test|anova|correlation|regression|chi|thematic|cod|theme|percent",b.analysis)},
 {t:"Ethics covers consent, confidentiality and data storage", k:["ethics"], ok:b=>has("consent|assent",b.ethics) && has("confidential|anonym|pseudonym|code",b.ethics) && has("stor|password|secure|encrypt|delete|destroy|lock",b.ethics)}
];
const LEVELS = ["Not yet","Getting there","Strong"];
function capstone(){
  const s = ST(); s.capstone = s.capstone || {}; const b = s.bp || {};
  const ov = document.createElement("div"); ov.className = "ib-modal";
  const draw = () => {
    const strong = CRIT.filter((_,i)=>s.capstone[i]==="Strong").length;
    ov.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="capH"><h2 id="capH">Capstone check</h2>
    <p>Read your Proposal Blueprint against each point and rate yourself honestly. The small tag shows what a quick scan of your Blueprint found. It is only a hint, and nothing leaves your device.</p>
    ${CRIT.map((c,i)=>{ const ok = c.ok(b); return `<div class="ib-crit"><div class="top"><b>${i+1}. ${E(c.t)}</b><span class="sig ${ok?"ok":""}">${ok?"Looks covered":"Check this"}</span></div><div class="opts" role="group" aria-label="Rate: ${E(c.t)}">${LEVELS.map(l=>`<button type="button" data-i="${i}" data-l="${l}" aria-pressed="${s.capstone[i]===l}">${l}</button>`).join("")}</div></div>`; }).join("")}
    <p class="ib-sum">Strong: ${strong} of ${CRIT.length}. ${strong===CRIT.length?"Your blueprint is ready to become a full proposal.":"Work on the points marked “Not yet” first, then check again."}</p>
    <div class="row" style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn" id="capDoc" type="button">Download my work (Word)</button><button class="btn ghost" id="capClose" type="button">Close</button></div></div>`;
    ov.querySelectorAll("[data-l]").forEach(x => x.addEventListener("click", () => { s.capstone[x.dataset.i] = x.dataset.l; if (A().save) A().save(); const y = ov.querySelector(".sheet").scrollTop; draw(); ov.querySelector(".sheet").scrollTop = y; }));
    $("#capClose", ov).addEventListener("click", close); $("#capDoc", ov).addEventListener("click", downloadWord);
  };
  const close = () => { ov.remove(); document.removeEventListener("keydown", esc); };
  const esc = e => { if (e.key==="Escape") close(); };
  ov.addEventListener("click", e => { if (e.target===ov) close(); }); document.addEventListener("keydown", esc);
  draw(); document.body.appendChild(ov); setTimeout(()=>{ const f = ov.querySelector("button"); if (f) f.focus(); }, 30);
}

// ---------- install as app ----------
let deferred = null;
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferred = e; enhance(); });
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const standalone = () => window.matchMedia("(display-mode: standalone)").matches || navigator.standalone;
function installHTML(){
  if (standalone()) return `<p class="tip">You are using the village as an app on this device.</p>`;
  if (deferred) return `<button class="btn ghost" type="button" data-ib="install">Install the village as an app</button>`;
  if (isIOS) return `<p class="tip">To use it like an app: tap the Share button in Safari, then <b>Add to Home Screen</b>.</p>`;
  return `<p class="tip">To use it like an app, open your browser menu and choose <b>Install app</b> or <b>Add to Home Screen</b>.</p>`;
}
function takeHTML(cls){
  return `<section class="block ib-take ${cls||""}"><header><h2>Take your work with you</h2></header>
  <p>Your work is saved in this browser only. Download a copy of your Blueprint, reflections and glossary to keep it safe or to start writing your proposal.</p>
  <div class="row"><button class="btn" type="button" data-ib="word">Download as Word</button><button class="btn ghost" type="button" data-ib="pdf">Save as PDF</button><button class="btn ghost" type="button" data-ib="cap">Capstone check</button></div>
  <div style="margin-top:12px">${installHTML()}</div></section>`;
}
function wireTake(root){
  root.querySelectorAll("[data-ib]").forEach(b => { if (b.dataset.w) return; b.dataset.w = "1"; b.addEventListener("click", () => {
    const k = b.dataset.ib;
    if (k==="word") downloadWord(); else if (k==="pdf") savePDF(); else if (k==="cap") capstone();
    else if (k==="install" && deferred){ deferred.prompt(); deferred.userChoice.finally(()=>{ deferred = null; enhance(true); }); }
  }); });
}

// ---------- inject into each view ----------
function enhance(force){
  const app = $("#app"); if (!app) return;
  textBtn();
  app.querySelectorAll(".player[data-key]").forEach(p => { if (p.dataset.tx) return; p.dataset.tx = "1"; p.insertAdjacentHTML("afterend", txHTML(p.dataset.key)); });
  const v = A().view || "", arg = A().arg || null;
  if (v === "station" && arg){
    const lens = $(".lens", app); if (lens && !$(".ib-ex", app)) lens.insertAdjacentHTML("afterend", exHTML(arg));
    const wc = $("#wc", app), ta = $("#refl", app);
    if (wc && ta && !$(".ib-coach", app)){
      const box = document.createElement("div"); box.className = "ib-coach"; box.setAttribute("aria-live","polite");
      wc.insertAdjacentElement("afterend", box); const upd = () => { box.innerHTML = coachHTML(arg, ta.value); };
      upd(); let t; ta.addEventListener("input", () => { clearTimeout(t); t = setTimeout(upd, 250); });
    }
  }
  if (v === "passport"){ const old = $(".ib-take", app); if (old && force) old.remove(); if (!$(".ib-take", app)){ const hero = $(".st-hero", app); if (hero) hero.insertAdjacentHTML("afterend", takeHTML()); } }
  if (v === "cert"){ if (!$(".ib-take", app)){ const c = $(".cert", app); if (c) c.insertAdjacentHTML("afterend", takeHTML()); } }
  if (v === "home"){ const g = $(".gate .row", app); if (g && !$("[data-ib='cap']", g)){ g.insertAdjacentHTML("beforeend", `<button class="btn ghost" type="button" data-ib="cap">Capstone check</button><button class="btn ghost" type="button" data-ib="word">Download my work</button>`); } }
  wireTake(app);
}
function footer(){
  const f = $("footer .wrap"); if (!f || $(".ib-links", f)) return;
  const s = document.createElement("span"); s.className = "ib-links"; s.innerHTML = `<a href="host-guide.html">Host’s guide</a>`; f.appendChild(s);
}
function skip(){
  if ($(".ib-skip")) return; const a = document.createElement("a"); a.className = "ib-skip"; a.href = "#app"; a.textContent = "Skip to main content";
  a.addEventListener("click", e => { e.preventDefault(); const m = $("#app"); m.setAttribute("tabindex","-1"); m.focus(); });
  document.body.insertBefore(a, document.body.firstChild);
}
function start(){
  skip(); footer(); enhance();
  const app = $("#app"); if (app) new MutationObserver(() => enhance()).observe(app, {childList:true});
  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(()=>{});
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
window.IBX = { downloadWord, savePDF, capstone };
})();
