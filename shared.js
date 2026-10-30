// ───────── Réglages à renseigner ─────────
// Numéro WhatsApp au format international sans « + » (ex. "22997000000") et/ou e-mail de réception.
// Tant que les deux sont vides, le formulaire ne peut rien envoyer et l'indique clairement.
const CONTACT = { whatsapp: "2290164305401", phoneDisplay: "+229 01 64 30 54 01", email: "" };
// Adresse de l'application web, une fois déployée (ex. "https://prestige-vtc.vercel.app").
const APP_URL = "";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* Année du pied de page */
const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

/* Liens vers l'application */
$$("[data-app]").forEach((a) => {
  if (APP_URL) { a.href = APP_URL; a.target = "_blank"; a.rel = "noopener"; }
  else a.addEventListener("click", (e) => { e.preventDefault(); a.dataset.soon = "1"; a.setAttribute("title", "Bientôt disponible"); a.classList.add("is-soon"); });
});

/* Coordonnées affichées seulement si elles existent */
$$("[data-contact='whatsapp']").forEach((el) => {
  if (!CONTACT.whatsapp) { el.hidden = true; return; }
  el.href = `https://wa.me/${CONTACT.whatsapp}`; el.target = "_blank"; el.rel = "noopener";
  if (CONTACT.phoneDisplay) el.textContent = `WhatsApp · ${CONTACT.phoneDisplay}`;
});
$$("[data-contact='email']").forEach((el) => {
  if (!CONTACT.email) { el.hidden = true; const li = el.closest("li"); if (li) li.hidden = true; return; }
  el.href = `mailto:${CONTACT.email}`; el.textContent = CONTACT.email;
});

/* Formulaire de contact : prépare un message WhatsApp ou e-mail (aucun serveur n'est nécessaire) */
const form = $("#contactForm");
if (form) {
  const note = $("#formNote");
  const say = (t, ok) => { note.textContent = t; note.dataset.state = ok ? "ok" : "warn"; };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    if (!d.name?.trim() || !d.phone?.trim()) return say("Indiquez au moins votre nom et votre téléphone.", false);
    const body = `Bonjour Prestige, je suis ${d.name.trim()} (${d.phone.trim()}).\nSujet : ${d.topic || "Information"}\n${(d.message || "").trim()}`;
    if (CONTACT.whatsapp) {
      window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
      say("Votre message est prêt dans WhatsApp : appuyez sur envoyer.", true);
    } else if (CONTACT.email) {
      location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Demande Prestige VTC")}&body=${encodeURIComponent(body)}`;
      say("Votre application e-mail s'ouvre avec le message.", true);
    } else {
      say("Démonstration : aucun numéro ni e-mail de réception n'est encore configuré, le message n'a pas été envoyé.", false);
    }
  });
}

/* Apparition au défilement */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold: 0.14 });
$$(".reveal").forEach((el) => io.observe(el));

/* Barre de navigation : fond au défilement */
const nav = $("#nav");
if (nav) { const f = () => nav.classList.toggle("scrolled", scrollY > 30); f(); addEventListener("scroll", f, { passive: true }); }

/* Parallaxe douce des images */
const para = $$("[data-parallax]");
if (para.length && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const tick = () => para.forEach((el) => {
    const r = el.parentElement.getBoundingClientRect();
    const k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
    el.style.setProperty("--py", `${(k * -40).toFixed(1)}px`);
  });
  tick(); addEventListener("scroll", tick, { passive: true });
}
