const KEY="the-wall-prototype-v1";let category="Thought";
const form=document.getElementById("post-form"),message=document.getElementById("message"),counter=document.getElementById("counter"),feed=document.getElementById("feed"),filter=document.getElementById("filter"),toast=document.getElementById("toast");
const get=()=>{try{return JSON.parse(localStorage.getItem(KEY))||[]}catch{return[]}};const save=x=>localStorage.setItem(KEY,JSON.stringify(x));
function esc(x){const d=document.createElement("div");d.textContent=x;return d.innerHTML}
function ago(d){let s=Math.max(0,Math.floor((Date.now()-new Date(d))/1000));if(s<60)return"just now";let m=Math.floor(s/60);if(m<60)return`${m}m ago`;let h=Math.floor(m/60);if(h<24)return`${h}h ago`;let days=Math.floor(h/24);if(days<30)return`${days}d ago`;let mo=Math.floor(days/30);return mo<12?`${mo}mo ago`:`${Math.floor(mo/12)}y ago`}
function notify(x){toast.textContent=x;toast.classList.add("show");clearTimeout(notify.t);notify.t=setTimeout(()=>toast.classList.remove("show"),2200)}
function render(){let list=get(),f=filter.value;if(f!=="All")list=list.filter(p=>p.category===f);if(!list.length){feed.innerHTML='<div class="empty"><div class="empty-mark">∅</div><div>Nothing has been left here yet.</div></div>';return}feed.innerHTML=list.map((p,i)=>`<article class="card" style="animation-delay:${Math.min(i*35,280)}ms"><div class="meta"><span class="tag">${esc(p.category)}</span><span class="time">${ago(p.createdAt)}</span></div><div class="message">${esc(p.message)}</div><div class="actions"><button class="action ${p.liked?"liked":""}" onclick="likePost('${p.id}')">${p.liked?"♥":"♡"} ${p.likes}</button><button class="action delete" onclick="removePost('${p.id}')">remove</button></div></article>`).join("")}
document.querySelectorAll(".chip").forEach(c=>c.onclick=()=>{document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));c.classList.add("active");category=c.dataset.category});
message.oninput=()=>counter.textContent=message.value.length;
form.onsubmit=e=>{e.preventDefault();let v=message.value.trim();if(!v){notify("Write something first.");message.focus();return}let list=get();list.unshift({id:crypto.randomUUID?.()||Date.now()+"-"+Math.random(),message:v,category,likes:0,liked:false,createdAt:new Date().toISOString()});save(list);form.reset();counter.textContent="0";render();notify("Left anonymously.");document.getElementById("wall").scrollIntoView({behavior:"smooth"})};
filter.onchange=render;
window.likePost=id=>{let list=get(),p=list.find(x=>x.id===id);if(!p)return;p.liked=!p.liked;p.likes+=p.liked?1:-1;save(list);render()};
window.removePost=id=>{if(!confirm("Remove this post from this browser?"))return;save(get().filter(p=>p.id!==id));render();notify("Removed.")};
render();
