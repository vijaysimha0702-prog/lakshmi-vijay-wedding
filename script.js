const cover = document.getElementById("coverScreen");
const openInvite = document.getElementById("openInvite");
const site = document.getElementById("site");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

openInvite.addEventListener("click", () => {
  cover.classList.add("open");
  setTimeout(() => {
    cover.style.display = "none";
    site.classList.remove("hidden");
    window.scrollTo(0, 0);
    playMusic();
  }, 900);
});

function playMusic(){
  music.play().then(() => musicBtn.classList.add("playing")).catch(() => {});
}

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicBtn.classList.add("playing");
  } else {
    music.pause();
    musicBtn.classList.remove("playing");
  }
});

const weddingDate = new Date("2026-08-26T04:00:00+05:30").getTime();

function updateTimer(){
  const now = Date.now();
  const diff = weddingDate - now;

  if(diff <= 0){
    ["days","hours","minutes","seconds"].forEach(id => document.getElementById(id).textContent = "00");
    return;
  }

  document.getElementById("days").textContent = Math.floor(diff / (1000*60*60*24)).toString().padStart(2,"0");
  document.getElementById("hours").textContent = Math.floor((diff / (1000*60*60)) % 24).toString().padStart(2,"0");
  document.getElementById("minutes").textContent = Math.floor((diff / (1000*60)) % 60).toString().padStart(2,"0");
  document.getElementById("seconds").textContent = Math.floor((diff / 1000) % 60).toString().padStart(2,"0");
}
setInterval(updateTimer, 1000);
updateTimer();

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("show");
  });
},{threshold:.2});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

function createPetal(){
  const flowers = ["🌸","❀","✿","🌺","🍃","🌼"];
  const el = document.createElement("span");
  el.className = "petal";
  el.textContent = flowers[Math.floor(Math.random()*flowers.length)];
  el.style.left = Math.random()*100 + "vw";
  el.style.animationDuration = (6 + Math.random()*6) + "s";
  el.style.fontSize = (12 + Math.random()*12) + "px";
  document.getElementById("petals").appendChild(el);
  setTimeout(()=>el.remove(), 13000);
}
setInterval(createPetal, 500);

// Mobile tap highlight
document.querySelectorAll(".memory-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".memory-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
  });
});

const shareText = `💍 Lakshmi ❤️ Vijay Simha Wedding Invitation

Reception: 25 August 2026, 7:00 PM onwards
Muhurtam: 26 August 2026, 4:00 AM - 5:00 AM
Venue: Shree Madhura Meenakshi Kalyana Mandapam, Hindupur

View invitation: ${window.location.href}`;

document.getElementById("whatsapp").href = "https://wa.me/?text=" + encodeURIComponent(shareText);
