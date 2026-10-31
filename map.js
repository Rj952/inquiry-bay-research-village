/* Inquiry Bay Research Village: illustrated map, links and animation.
   (c) 2026 Dr. Rohan Jowallah, Ed.D., FHEA. All rights reserved. */
(function(){
const MAP_IMG = "village-map.jpg";

/* ---- Links shown at each stop under "Resources" (edit freely) ---- */
const GS = q => "https://scholar.google.com/scholar?q=" + encodeURIComponent(q);
const RESOURCES = {
  s1: [ { label: "ERIC: education research database", url: "https://eric.ed.gov/" },
        { label: "UWI Mona Library", url: "https://www.mona.uwi.edu/library/welcome" } ],
  s2: [ { label: "Find Miron (1998) on Google Scholar", url: GS("Miron 1998 Choosing the right research methods qualitative quantitative or both") },
        { label: "Research paradigms: scholarly sources", url: GS("research paradigms education positivism interpretivism pragmatism") } ],
  s3: [ { label: "Writing a problem statement: scholarly sources", url: GS("writing the research problem statement education") },
        { label: "Caribbean education research on Google Scholar", url: GS("Caribbean education research Jamaica") } ],
  s4: [ { label: "Research questions and hypotheses: scholarly sources", url: GS("writing research questions and hypotheses education research") } ],
  s5: [ { label: "ERIC: education research database", url: "https://eric.ed.gov/" },
        { label: "Onwuegbuzie, Leech & Collins (2012), full text", url: "https://files.eric.ed.gov/fulltext/EJ981457.pdf" },
        { label: "UWI Library guides", url: "https://libguides.uwi.edu/monaorientation" },
        { label: "APA Style: in-text citations", url: "https://apastyle.apa.org/style-grammar-guidelines/citations" },
        { label: "APA Style: reference examples", url: "https://apastyle.apa.org/style-grammar-guidelines/references/examples" } ],
  s6: [ { label: "Research designs and sampling: scholarly sources", url: GS("sampling techniques qualitative quantitative educational research") } ],
  s7: [ { label: "The Belmont Report: core ethical principles", url: "https://www.hhs.gov/ohrp/regulations-and-policy/belmont-report/index.html" },
        { label: "Jamaica's Data Protection Act: what it means", url: "https://jis.gov.jm/jamaicans-urged-to-get-acquainted-with-data-protection-standards/" } ],
  s8: [ { label: "Validity, reliability and trustworthiness: scholarly sources", url: GS("validity reliability trustworthiness educational research instruments") } ],
  s9: [ { label: "Descriptive and inferential statistics explained", url: "https://statistics.laerd.com/statistical-guides/descriptive-inferential-statistics.php" },
        { label: "Braun & Clarke: thematic analysis", url: "https://researchspace.auckland.ac.nz/handle/2292/43968" } ],
  s10: [ { label: "Purdue OWL: APA 7 formatting", url: "https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/general_format.html" },
         { label: "APA Style: reference examples", url: "https://apastyle.apa.org/style-grammar-guidelines/references/examples" } ]
};
try { STATIONS.forEach(s => { if (RESOURCES[s.id] && !(s.resources && s.resources.length)) s.resources = RESOURCES[s.id]; }); } catch(e){}

/* ---- Hotspots: [left, top, width, height, badgeX, badgeY] in % of the picture ---- */
const SPOTS = { s1:[82.12,56.84,15.48,27.16,89.07,59.56], s2:[84.65,11.87,14.21,21.13,92.23,14.79], s3:[63.17,37.02,22.43,18.81,73.28,39.74],
  s4:[51.8,59.86,15.79,27.16,58.62,62.07], s5:[36.96,33.0,19.58,22.13,46.75,35.61], s6:[23.06,55.84,21.16,22.13,33.29,58.35],
  s7:[3.28,32.7,11.37,31.49,7.58,35.41], s8:[13.39,20.93,17.44,20.12,21.35,23.54], s9:[31.08,6.84,17.44,21.13,39.17,9.76], s10:[57.61,1.21,19.58,27.77,67.28,3.82] };
/* boats: [left, top, width, height, bgSize, bgX, bgY, animation] */
const BOATS = [ [75.81,69.42,9.48,27.67,1055.33,83.74,95.967,"ib-bob"], [15.79,70.42,7.9,9.05,1266.4,17.147,77.434,"ib-bob2"],
  [64.56,74.65,8.21,10.66,1217.69,70.337,83.559,"ib-bob"], [27.04,89.03,3.41,6.34,2931.48,27.992,95.059,"ib-bob2"] ];
/* warm lights: [x%, y%, size%] */
const LIGHTS = [[7.6,42.8,3.2],[63.2,18.1,2.6],[71.4,18.1,2.6],[46.8,46.3,2.4],[73.3,47.3,2.4],[33.5,65.4,2.2],[21.5,30.2,2.2],[39.2,17.1,2.4],
  [89.7,65.4,2],[92.2,24.1,2],[11.8,49.7,1.2],[24,52,1.2],[53.4,77.3,1.2],[64.3,77.3,1.2],[77.2,56.3,1.2],[95.1,69.4,1.2],[51.8,54.3,1.2],[29.9,40.2,1.2]];

let mode = "day";
try { mode = localStorage.getItem("ibrv-mapmode") || "day"; } catch(e){}

const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function html(states, fallbackSVG){
  const spots = states.map(s => {
    const p = SPOTS[s.id]; if (!p) return "";
    const icon = s.lk ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10V8a5 5 0 0 1 10 0v2" fill="none" stroke="#fff" stroke-width="2.4"/><rect x="5" y="10" width="14" height="10" rx="2" fill="#fff"/></svg>`
      : s.dn ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>` : "";
    return `<div class="ib-spot st-marker ${s.lk?"locked":""} ${s.dn?"done":""} ${s.cur?"current":""}" data-id="${s.id}" tabindex="0" role="button"
      aria-label="Stop ${s.num}: ${esc(s.name)}, ${esc(s.theme)}${s.dn?" (stamped)":s.lk?" (locked)":""}" style="left:${p[0]}%;top:${p[1]}%;width:${p[2]}%;height:${p[3]}%">
      <span class="ib-tip"><b>${s.num} · ${esc(s.name)}</b>${esc(s.theme)}${s.lk?" · opens after stop "+(s.num-1):s.dn?" · stamped":""}</span></div>
      ${(s.lk||s.dn||s.cur)?`<span class="ib-badge ${s.lk?"lk":s.dn?"dn":"cur"}" style="left:${p[4]}%;top:${p[5]}%">${icon}</span>`:""}`;
  }).join("");
  const boats = BOATS.map(b => `<span class="ib-boat ${b[7]}" style="left:${b[0]}%;top:${b[1]}%;width:${b[2]}%;height:${b[3]}%;background-image:url('${MAP_IMG}');background-size:${b[4]}% auto;background-position:${b[5]}% ${b[6]}%"></span>`).join("");
  const lights = LIGHTS.map((l,i) => `<span class="ib-light" style="left:${l[0]}%;top:${l[1]}%;width:${(l[2]*1.4).toFixed(2)}%;animation-delay:${(i*0.37)%3}s"></span>`).join("");
  return `<div class="ib-map ib-${mode}">
    <div class="ib-stage">
      <img class="ib-img" src="${MAP_IMG}" alt="Illustrated map of Inquiry Bay Research Village: a seaside resort town with ten numbered stops" onerror="this.closest('.ib-map').classList.add('ib-fail')">
      <div class="ib-water" aria-hidden="true"><i></i><i></i></div>
      <div class="ib-sparkles" aria-hidden="true">${Array.from({length:14},(_,i)=>`<span style="left:${18+((i*53)%80)}%;top:${76+((i*29)%20)}%;animation-delay:${(i*0.41)%4}s"></span>`).join("")}</div>
      ${boats}
      <svg class="ib-far" viewBox="0 0 40 30" aria-hidden="true"><path d="M20 2 L20 22 L8 22Z" fill="#fff" opacity=".9"/><path d="M21 6 L21 22 L30 22Z" fill="#fff" opacity=".7"/><path d="M5 23 H33 L29 28 H9Z" fill="#33424a"/></svg>
      <div class="ib-tint" aria-hidden="true"></div>
      <div class="ib-lights" aria-hidden="true">${lights}</div>
      ${spots}
      <div class="ib-ctrl"><button type="button" class="ib-mode" data-ibmode="day" aria-pressed="${mode==="day"}">Day</button><button type="button" class="ib-mode" data-ibmode="night" aria-pressed="${mode==="night"}">Night</button></div>
    </div>
    <div class="ib-fallback">${fallbackSVG||""}</div>
  </div>`;
}

document.addEventListener("click", e => {
  const b = e.target.closest("[data-ibmode]"); if (!b) return;
  mode = b.dataset.ibmode; try { localStorage.setItem("ibrv-mapmode", mode); } catch(err){}
  document.querySelectorAll(".ib-map").forEach(m => { m.classList.remove("ib-day","ib-night"); m.classList.add("ib-"+mode); });
  document.querySelectorAll("[data-ibmode]").forEach(x => x.setAttribute("aria-pressed", String(x.dataset.ibmode===mode)));
});

window.IBMap = { html };
})();
