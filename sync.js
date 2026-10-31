// Inquiry Bay: OPTIONAL progress sharing. Nothing is sent unless the visitor chooses to share. (c) 2026 Dr. Rohan Jowallah
(function(){
const SB_URL = "https://yjtahynkggizwtuuuvuw.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqdGFoeW5rZ2dpend0dXV1dnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMDIyNTAsImV4cCI6MjA4OTU3ODI1MH0.iGI4pn4-uHVgABGxmbN0vUzja8fNBRRpmiqunp3dt0E";
const PKEY = "ibrv-learner", SKEY = "inquiry-bay-v1";
const rd = k => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch(e){ return null; } };
const wr = (k,v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)));
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let profile = rd(PKEY), last = null, timer = null, status = "idle";

const css = `.ibs-chip{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);color:#f4fbf8;border-radius:999px;padding:6px 12px;font:600 .82rem/1 var(--f-body);cursor:pointer;max-width:220px}
.ibs-chip span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ibs-dot{width:8px;height:8px;border-radius:50%;background:#9aa4a3;flex:none}.ibs-dot.ok{background:#6fd8a0}.ibs-dot.err{background:#ff8a7a}.ibs-dot.busy{background:#ffc24b}
.ibs-ov{position:fixed;inset:0;z-index:80;background:rgba(3,20,24,.72);backdrop-filter:blur(5px);display:grid;place-items:center;padding:16px}
.ibs-card{background:var(--surface);color:var(--fg);width:min(440px,100%);border-radius:22px;padding:24px 22px;display:grid;gap:12px;box-shadow:0 30px 70px rgba(0,0,0,.5)}
.ibs-card h2{font-family:var(--f-display);font-weight:800;font-size:1.6rem;letter-spacing:-.02em}
.ibs-card p{color:var(--muted);font-size:.95rem}
.ibs-card label{font-weight:700;font-size:.9rem;display:grid;gap:6px}
.ibs-card input{width:100%;padding:11px 13px;border-radius:12px;border:1.5px solid var(--line);background:var(--surface-2);color:var(--fg);font:inherit}
.ibs-card .err{color:var(--no);font-size:.88rem;font-weight:700}
.ibs-card small{color:var(--muted);font-size:.8rem}`;
const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

function chip(){
  let c = document.getElementById("ibsChip");
  if (!c){ const bar = document.querySelector(".bar .wrap"); if (!bar) return; c = document.createElement("button"); c.type="button"; c.id="ibsChip"; c.className="ibs-chip"; c.addEventListener("click", () => ask(true)); bar.insertBefore(c, bar.querySelector("#navMap")); }
  const label = status==="ok" ? "Saved" : status==="busy" ? "Saving…" : status==="err" ? "Not saved yet" : "Saved on this device";
  c.title = label + (profile ? " · " + profile.name : "");
  c.setAttribute("aria-label", (profile?profile.name+". ":"") + label + (profile ? ". Change sharing" : ". Share progress, optional"));
  c.innerHTML = `<i class="ibs-dot ${status==="ok"?"ok":status==="err"?"err":status==="busy"?"busy":""}"></i><span>${profile?esc(profile.name):"Share progress (optional)"}</span>`;
}

function ask(change){
  if (document.querySelector(".ibs-ov")) return;
  const ov = document.createElement("div"); ov.className = "ibs-ov";
  ov.innerHTML = `<form class="ibs-card" role="dialog" aria-modal="true" aria-labelledby="ibsH">
    <span class="kicker dark">${change?"Your details":"Optional"}</span>
    <h2 id="ibsH">${change?"Update your details":"Share your progress"}</h2>
    <p>This is optional. The village works fully without it, and your work is always saved on this device. Only if you choose to share, enter a name or nickname and your lecturer will see your stamps, reflections and Proposal Blueprint.</p>
    <label>Name or nickname<input id="ibsName" autocomplete="name" required maxlength="120" value="${profile?esc(profile.name):""}"></label>
    <label>Class or group (optional)<input id="ibsGroup" maxlength="60" placeholder="e.g. Group A" value="${profile&&profile.group?esc(profile.group):""}"></label>
    <span class="err" id="ibsErr" hidden>Please type a name or nickname.</span>
    <button class="btn big" type="submit">${change?"Save":"Share my progress"}</button>
    <button type="button" class="btn ghost" id="ibsCancel">Not now</button>${change?`<button type="button" class="btn ghost" id="ibsStop">Stop sharing</button>`:""}
    <small>You can skip this and still complete every stop.</small>
  </form>`;
  document.body.appendChild(ov);
  const f = ov.querySelector("form"); setTimeout(()=>ov.querySelector("#ibsName").focus(), 50);
  const cancel = ov.querySelector("#ibsCancel"); if (cancel) cancel.addEventListener("click", () => ov.remove());
  const stop = ov.querySelector("#ibsStop"); if (stop) stop.addEventListener("click", () => { profile = null; try{ localStorage.removeItem(PKEY); }catch(e){} status = "idle"; ov.remove(); chip(); });
  f.addEventListener("submit", e => { e.preventDefault();
    const name = ov.querySelector("#ibsName").value.trim(), group = ov.querySelector("#ibsGroup").value.trim();
    if (name.split(/\s+/).join("").length < 2){ ov.querySelector("#ibsErr").hidden = false; return; }
    profile = { id: (profile && profile.id) || uuid(), name, group }; wr(PKEY, profile);
    ov.remove(); chip(); push(last || rd(SKEY) || {}, true);
  });
}

async function send(state){
  if (!profile) return;
  status = "busy"; chip();
  const stamps = state && state.stamps ? Object.values(state.stamps).filter(Boolean).length : 0;
  try {
    const r = await fetch(SB_URL + "/rest/v1/rpc/ibrv_sync", { method:"POST", headers:{ "Content-Type":"application/json", "apikey":SB_KEY, "Authorization":"Bearer "+SB_KEY },
      body: JSON.stringify({ p_id: profile.id, p_name: profile.name, p_group: profile.group || null, p_stamps: Math.min(10, stamps), p_state: state || {} }) });
    status = r.ok ? "ok" : "err";
  } catch(e){ status = "err"; }
  chip();
}
function push(state, now){
  last = state; if (state && profile && !state.name) state.name = profile.name;
  clearTimeout(timer); timer = setTimeout(() => send(last), now ? 0 : 1200);
}
window.addEventListener("pagehide", () => { if (!profile || !last) return; try { fetch(SB_URL + "/rest/v1/rpc/ibrv_sync", { method:"POST", keepalive:true, headers:{ "Content-Type":"application/json", "apikey":SB_KEY, "Authorization":"Bearer "+SB_KEY }, body: JSON.stringify({ p_id: profile.id, p_name: profile.name, p_group: profile.group || null, p_stamps: Math.min(10, Object.values(last.stamps||{}).filter(Boolean).length), p_state: last }) }); } catch(e){} });

window.IBSync = { push };
function start(){ chip(); if (profile) push(rd(SKEY) || {}, true); }
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
