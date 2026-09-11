const floaters = document.getElementById("floaters");
const symbols = ["♡","✦","♡","✧","🎀"];

function spawn(){
  const el=document.createElement("span");
  el.className="floater";
  el.textContent=symbols[Math.floor(Math.random()*symbols.length)];
  el.style.left=Math.random()*100+"vw";
  el.style.fontSize=(12+Math.random()*13)+"px";
  el.style.animationDuration=(7+Math.random()*7)+"s";
  floaters.appendChild(el);
  setTimeout(()=>el.remove(),15000);
}
setInterval(spawn,850);

const photos=document.querySelectorAll(".photo");
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")});
},{threshold:.12});
photos.forEach(p=>observer.observe(p));

function confetti(){
  const pieces=["✦","♡","✧","•"];
  for(let i=0;i<28;i++){
    const el=document.createElement("span");
    el.className="floater";
    el.textContent=pieces[Math.floor(Math.random()*pieces.length)];
    el.style.left=(35+Math.random()*30)+"vw";
    el.style.top="48vh";
    el.style.position="fixed";
    el.style.animationDuration=(2.2+Math.random()*2)+"s";
    el.style.fontSize=(12+Math.random()*14)+"px";
    floaters.appendChild(el);
    setTimeout(()=>el.remove(),5000);
  }
  // A tiny soft chime made with Web Audio; no external music file required.
  try{
    const C=window.AudioContext||window.webkitAudioContext;
    const ctx=new C(), now=ctx.currentTime;
    [523.25,659.25,783.99].forEach((f,i)=>{
      const o=ctx.createOscillator(),g=ctx.createGain();
      o.frequency.value=f;o.type="sine";g.gain.setValueAtTime(.0001,now+i*.11);
      g.gain.exponentialRampToValueAtTime(.045,now+i*.11+.02);
      g.gain.exponentialRampToValueAtTime(.0001,now+i*.11+.65);
      o.connect(g);g.connect(ctx.destination);o.start(now+i*.11);o.stop(now+i*.11+.7);
    });
  }catch(e){}
}
document.getElementById("wishBtn").addEventListener("click",confetti);
