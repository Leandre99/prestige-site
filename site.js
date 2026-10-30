// Flotte : filtres.
const filters = document.querySelectorAll("#filters .chip");
const cards = document.querySelectorAll("#grid .vcard");
filters.forEach((f) =>
  f.addEventListener("click", () => {
    filters.forEach((x) => x.classList.remove("on"));
    f.classList.add("on");
    cards.forEach((c) => {
      const show = f.dataset.f === "all" || c.dataset.t === f.dataset.f;
      c.classList.toggle("hide", !show);
    });
  })
);

// Vidéo du Bénin dans le bloc final (facultative : déposer img/benin.mp4).
const benVideo = document.getElementById("benVideo");
if (benVideo) {
  const box = document.getElementById("telecharger");
  let seen = false;
  const sync = () => {
    if (!benVideo.isConnected || !benVideo.src) return;
    if (seen) benVideo.play().catch(() => {}); else benVideo.pause();
  };
  new IntersectionObserver((en) => { seen = en[0].isIntersecting; sync(); }, { threshold: 0.25 }).observe(box);
  fetch("img/benin.mp4", { method: "HEAD" })
    .then((r) => { if (!r.ok) throw 0; benVideo.src = "img/benin.mp4"; benVideo.load(); sync(); })
    .catch(() => benVideo.remove());
}

/* ───── Animations GSAP ───── */
gsap.registerPlugin(ScrollTrigger);

// Entrée du hero.
const heroIn = gsap.timeline({ defaults: { ease: "power4.out" } });
heroIn
  .from(".hero-card", { y: 60, opacity: 0, scale: 0.97, duration: 1.2 }, 0)
  .from(".pill-tag", { y: 20, opacity: 0, duration: 0.8 }, 0.3)
  .from(".hero-copy h1", { y: 60, opacity: 0, duration: 1.1 }, 0.4)
  .from(".hero-copy p", { y: 40, opacity: 0, duration: 0.9 }, 0.55)
  .from(".cta .btn", { y: 30, opacity: 0, stagger: 0.12, duration: 0.8 }, 0.7)
  .from(".hero-badges li", { x: 70, opacity: 0, stagger: 0.14, duration: 1 }, 0.6);

// Le grand bloc d'en-tête se resserre doucement quand on défile.
gsap.to(".hero-card", { scale: 0.94, borderRadius: 56, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

// Mosaïque : les photos du Bénin se décalent à des vitesses différentes.
document.querySelectorAll(".tile img").forEach((im, i) =>
  gsap.fromTo(im, { yPercent: i % 2 ? -8 : 8 }, { yPercent: i % 2 ? 8 : -8, ease: "none", scrollTrigger: { trigger: im.closest(".tile"), start: "top bottom", end: "bottom top", scrub: true } })
);

// Application : les deux téléphones arrivent par les côtés.
gsap.fromTo(".m1", { x: -160, rotation: -16, opacity: 0 }, { x: 0, rotation: -7, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".app", start: "top 70%" } });
gsap.fromTo(".m2", { x: 160, rotation: 14, opacity: 0 }, { x: 0, rotation: 5, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".app", start: "top 70%" } });
gsap.to(".m1", { y: -40, ease: "none", scrollTrigger: { trigger: ".app", start: "top bottom", end: "bottom top", scrub: true } });
gsap.to(".m2", { y: 40, ease: "none", scrollTrigger: { trigger: ".app", start: "top bottom", end: "bottom top", scrub: true } });

// Bloc vidéo : il grandit en arrivant.
gsap.fromTo(".cta-video", { scale: 0.9 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".cta-video", start: "top 95%", end: "top 40%", scrub: true } });
