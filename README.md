# 📍 SaôneLocal

SaôneLocal est une association fictive regroupant une cinquantaine de producteurs locaux du bassin chalonnais : vignerons, maraîchers, apiculteurs, fromagers. Après des années sur une plateforme nationale qui leur prélevait 25% de commission, ils ont voté en assemblée générale : ils veulent leur propre outil. Simple, local, et 100% mobile.

---

## 📖 Mission

Concevoir et développer la marketplace des producteurs locaux du bassin chalonnais de zéro. De la réflexion UX jusqu'au déploiement sur un vrai serveur.

---

## 📁 Structure du projet

```
SaôneLocal
│
├─ frontend/
│  └─ src/
│     ├─ ui/
│     │  ├─ button.jsx
│     │  ├─ input.jsx
│     │  ├─ product-card.jsx
│     │  ├─ producer-card.jsx
│     │  ├─ navbar.jsx
│     │  ├─ footer.jsx
│     │  ├─ modal.jsx
│     │  ├─ badge.jsx
│     │  └─ searchBar.jsx
│     │
│     ├─ features/
│     │  ├─ public/
│     │  │  ├─ home-Page.jsx
│     │  │  ├─ catalog-page.jsx
│     │  │  ├─ producer-page.jsx
│     │  │  ├─ calendar-page.jsx
│     │  │  └─ about-page.jsx 
│     │  │
│     │  ├─ auth/
│     │  │  ├─ login-page.jsx
│     │  │  ├─ forgot-password-page.jsx
│     │  │  └─ register-page.jsx
│     │  │
│     │  ├─ client/
│     │  │  ├─ cart-page.jsx
│     │  │  ├─ favorites-page.jsx
│     │  │  ├─ order-page.jsx
│     │  │  ├─ history-page.jsx
│     │  │  ├─ checkout-page.jsx
│     │  │  └─ profile-page.jsx
│     │  │
│     │  ├─ producer/
│     │  │  ├─ dashboard-page.jsx
│     │  │  ├─ catalogManager-page.jsx
│     │  │  └─ orders-manager-page.jsx
│     │  │
│     │  └─ admin/
│     │      ├─ admin-page.jsx
│     │      └─ users-page.jsx
│     │
│     ├─ hooks/
│     │  ├─ use-fetch.js
│     │  ├─ use-auth.js
│     │  └─ use-pagination.js
│     │
│     ├─ api/
│     │  ├─ api.js
│     │  ├─ auth.api.js
│     │  ├─ catalog.api.js
│     │  ├─ orders.api.js
│     │  ├─ producers.api.js
│     │  ├─ basket.api.js
│     │  ├─ favorites.api.js
│     │  └─ users.api.js
│     │
│     ├─ utils/
│     │  ├─ format.js
│     │  ├─ validators.js
│     │  └─ storage.js
│     │
│     ├─ App.jsx
│     ├─ main.jsx
│     ├─ routes.jsx
│     ├─ tailwind.config.js
│     ├─ vite.config.js
│     └─ package.json
│
├─ backend/
│  └─ src/
│     ├─ features/
│     │  ├─ public/
│     │  │  ├─ display-catalogue.js
│     │  │  ├─ display-producer.js
│     │  │  └─ display-calendar.js
│     │  │
│     │  ├─ auth/
│     │  │  ├─ log-in.js
│     │  │  ├─ register.js
│     │  │  └─ recover-account.js
│     │  │
│     │  ├─ client/
│     │  │  ├─ gestion-favorite-producers.js
│     │  │  ├─ gestion-favorite-products.js
│     │  │  ├─ gestion-cart.js
│     │  │  ├─ gestion-profil.js
│     │  │  └─ display-orders.js
│     │  │
│     │  ├─ producer/
│     │  │  ├─ gestion-catalog.js
│     │  │  ├─ gestion-order.js
│     │  │  ├─ gestion-profil.js
│     │  │  └─ display-stats.js
│     │  │
│     │  └─ admin/
│     │     ├─ gestion-calendar.js
│     │     └─ gestion-producer.js
│     │
│     ├─ security/
│     │  ├─ crypting.js
│     │  ├─ protection-injection.js
│     │  └─ payment.js
│     │
│     ├─ data_base/
│     │  ├─ db.sql
│     │  ├─ seeder.js
│     │  └─ gestion-db.js
│     │
│     └─ utils/
│        └─ ...
│
├─ .github/
│  └─ workflow/
│     └─ ci.yml
│
├─ docker/
│  ├─ Dockerfile
│  └─ docker-compose.yml
│
├─ docs/
│  ├─ weekly/
│  │  ├─ weekly1.md
│  │  ├─ weekly2.md
│  │  └─ ...
│  │
│  ├─ data-model/
│  │  ├─ MCD.png
│  │  ├─ MLD.png
│  │  └─ MPD.png
│  │
│  └─ ...
│
└─ Readme.md
```

## 📑 Explication de l'architecture

L'architecture frontend repose sur une combinaison du pattern **Feature-Based** et d'une version simplifiée de l'**Atomic Design**.

### Atomic Design (simplifié)
- Les composants UI sont fractionnés en composants **modulaires** et **réutilisables**
- Regroupés dans un dossier 'ui/' et 'features/' à la place de l'architecture classique 'atoms' 'moleculs' 'organisms' 'templates'
- L'arborescence complète aurait alourdi inutilement la structure du projet

### Feature-Based
- Constitue le cœur du **frontend** : chaque grande structure de SaôneLocal = une feature
- Chaque feature est **indépendante** : une feature ne va pas être dépendante d'une autre
- La distinction entre les dossiers 'ui/' et 'features/' repose sur la vocation des composants :
  - 'ui/ → composants **réutilisables**
  - 'features/' → composants **spécifiques** à un contexte fonctionnel
- La même logique est appliquée au **backend** pour structurer les différentes parties de l'application

### Convention de nommage

Les conventions suivantes s'appliquent à **l'ensemble du projet** :

- 'camelCase' → variables et fonctions
- 'kebab-case' → noms de fichiers / slugs d'URL / attributs HTML
- 'UPPER_CASE' → constantes
- 'PascalCase' → classes

---

## 👨🏻‍💻 Contributeurs

**Marketing**
- [tbourdiau-hue](#https://github.com/tbourdiau-hue)

**Développement**
- [clemencechenevoix](#https://github.com/clemencechenevoix)
- [Shino](#https://github.com/LargyThomas)
