# 📍 SaôneLocal

SaôneLocal est une association fictive regroupant une cinquantaine de producteurs locaux du bassin chalonnais : vignerons, maraîchers, apiculteurs, fromagers. Après des années sur une plateforme nationale qui leur prélevait 25% de commission, ils ont voté en assemblée générale : ils veulent leur propre outil. Simple, local, et 100% mobile.

---

## 📖 Mission

Concevoir et développer la marketplace des producteurs locaux du bassin chalonnais de zéro. De la réflexion UX jusqu'au déploiement sur un vrai serveur.

---

## 📁 Structure du projet

```
SaoneLocal
│
├─ frontend/
│  └─ src/
│     ├─ ui/				                // composants UI génériques réutilisables (design system)
│     │  ├─ button.jsx
│     │  ├─ input.jsx
│     │  ├─ product-card.jsx
│     │  ├─ producer-card.jsx
│     │  ├─ navbar.jsx
│     │  ├─ footer.jsx
│     │  ├─ modal.jsx
│     │  ├─ badge.jsx
│     │  └─ search-bar.jsx
│     │
│     ├─ features/			            // organisation par fonctionnalité métier
│     │  ├─ public/			            // pages accessibles sans connexion
│     │  ├─ auth/				            // authentification (login, register, reset)
│     │  ├─ client/			            // espace utilisateur (achat, profil, commandes)
│     │  ├─ producer/			          // espace producteur (gestion produits & commandes)
│     │  └─ admin/			            // administration globale
│     │
│     ├─ hooks/				              // logique réutilisable
│     │  ├─ use-fetch.js
│     │  ├─ use-auth.js
│     │  └─ use-pagination.js
│     │
│     ├─ api/				                // couche d’abstraction des appels HTTP vers le backend
│     │  ├─ api.js			            // config global
│     │  ├─ auth.api.js
│     │  ├─ catalog.api.js
│     │  ├─ orders.api.js
│     │  ├─ producers.api.js
│     │  ├─ basket.api.js
│     │  ├─ favorites.api.js
│     │  └─ users.api.js
│     │
│     ├─ utils/				              // fonctions utilitaires transverses
│     │  ├─ format.js
│     │  ├─ validators.js
│     │  └─ storage.js
│     │
│     ├─ app.jsx				            // composant racine
│     ├─ main.jsx			              // point d’entrée React (montage de l’app)
│     ├─ routes.jsx			            // définition des routes (routing)
│     ├─ tailwind.config.js
│     ├─ vite.config.js
│     └─ .env.example
│
├─backend/
│  └─ src/
│     ├─ features/			            // architecture modulaire par domaine métier
│     │  ├─ catalog/			          // gestion des produits
│     │  ├─ orders/			            // gestion des commandes
│     │  ├─ basket/			            // panier utilisateur
│     │  ├─ favorites/			        // gestion des favoris
│     │  ├─ calendar/			          // événements
│     │  ├─ public/			            // accessibles sans auth
│     │  ├─ auth/				            // authentification
│     │  ├─ client/			            // logique spécifique côté client
│     │  ├─ producers/			        // gestion des producteurs
│     │  └─ admin/			            // administration
│     │
│     ├─ security/			            // gestion sécurité
│     │  ├─ crypto.js			          // hash des mots de passe
│     │  ├─ jwt.js				          // création & vérification des tokens
│     │  └─ middleware/
│     │      ├─ auth.middleware.js	// vérifie l’authentification (JWT)
│     │      ├─ roles.middleware.js	// contrôle des permissions (RBAC)
│     │      ├─ error-message.middleware.js	// messages d’erreur
│     │      └─ injection.middleware.js	// protection XSS / injections
│     │
│     ├─ database/			            // gestion base de données
│     │  ├─ schema.sql
│     │  ├─ seed.js
│     │  └─ database.js
│     │
│     ├─ utils/				              // helpers backend réutilisables
│     │  └─ pagination.js
│     │
│     ├─ app.js         			      // configuration Express
│     ├─ server.js     			        // lancement du serveur Node.js
│     └─ .env.example
│
├─ .github/
│  └─ workflow/
│     └─ ci.yml				              // pipeline CI/CD
│
├─ docker/
│  ├─ Dockerfile			              // définition de l’image de l’app
│  └─ docker-compose.yml		        // orchestration des services
│
├─ docs/
│  ├─ weekly/				                // suivi de l’avancement du projet
│  ├─ data-model/			              // modélisation de la base de données
│  └─ ...				                    // documentation complémentaire market
│
└─ Readme.md				                // documentation principale du projet
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
