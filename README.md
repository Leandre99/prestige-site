# Site vitrine — Prestige VTC Bénin

Site statique (HTML/CSS/JS, sans build) : `index.html`, `site.css`, `site.js`, `shared.js` (GSAP chargé depuis cdnjs).

- Hero : photo d'un moto-taxi de Cotonou, trois atouts en verre. Site vitrine : aucune réservation en ligne.
- Mosaïque « Cotonou », application, flotte filtrable, points forts, bloc vidéo, contact.
- Vidéo du bloc final : déposer un fichier `img/benin.mp4` (sinon une photo s'affiche).

Réglages dans `shared.js` :
- `CONTACT.whatsapp` (ex. "22997000000") et/ou `CONTACT.email` : sans l'un des deux, le formulaire n'envoie rien et le dit.
- `APP_URL` : adresse de l'application web une fois déployée.

Aperçu local : `python -m http.server 5055` puis http://127.0.0.1:5055/
Déploiement : importer ce dossier sur Vercel (framework « Other », aucune commande de build).

## Médias (Pexels, licence Pexels : usage libre)
- `img/benin.mp4` : « Amazone Monument in Cotonou, Benin » (Pexels, id 38384036), compressé.
- `img/benin/*.jpg` : photos Pexels 38166000, 38166003, 8655016, 8657595 (Cotonou, Ganvié).
