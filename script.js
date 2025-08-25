/* ========== Helpers ========== */
const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];

/* ========== Sticky nav: active link on scroll ========== */
const sections = $$("main section[id]");
const navLinks = $$(".nav-link");

function setActiveLink() {
  let index = sections.findIndex(sec => sec.getBoundingClientRect().top > 120);
  if (index === -1) index = sections.length; // at bottom
  const current = index === 0 ? sections[0] : sections[index - 1];
  navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${current.id}`))

}
setActiveLink();
window.addEventListener("scroll", setActiveLink);

/* Keep Home active by default (also covers your requirement) */
$(".nav-link[href='#home']")?.classList.add("active");

/* Mobile nav */
$(".nav-toggle").addEventListener("click", () => {
  $("#nav").classList.toggle("open");
});

/* ========== Reveal on scroll ========== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      io.unobserve(e.target);
    }
  });
}, {threshold: 0.15});

$$(".reveal").forEach(el => io.observe(el));

/* ========== Animated stats counting ========== */
function countUp(el){
  const target = +el.dataset.count || 0;
  let n = 0;
  const step = Math.max(1, Math.round(target/60));
  const tick = () => {
    n += step;
    if (n >= target){ el.textContent = target; return; }
    el.textContent = n;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
$$(".stat .num").forEach(el => {
  const obs = new IntersectionObserver((ents)=>{
    if(ents[0].isIntersecting){ countUp(el); obs.disconnect(); }
  },{threshold:0.5});
  obs.observe(el);
});

/* ========== Smooth “play” pulse ========== */
$(".play").addEventListener("click", ()=> {
  alert("Thanks for visiting! Replace this with an intro video modal later.");
});

/* ========== Footer year ========== */
$("#year").textContent = new Date().getFullYear();