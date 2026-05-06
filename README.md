# 📍 SaôneLocal

SaôneLocal est une association regroupant une cinquantaine de producteurs locaux du bassin chalonnais : vignerons, maraîchers, apiculteurs, fromagers. Après des années sur une plateforme nationale qui leur prélevait 25% de commission, ils ont voté en assemblée générale : ils veulent leur propre outil. Simple, local, et 100% mobile.

---

## 🎯 Mission

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
│  └─ ...				                    // documentation complémentaire Market
│
└─ Readme.md				                // documentation principale du projet
```

## 📑 Explication de l'architecture

L'architecture frontend repose sur une combinaison du pattern **Feature-Based** et d'une version simplifiée de l'**Atomic Design**.

### Atomic Design (simplifié)

- Les composants UI sont fractionnés en composants **modulaires** et **réutilisables**
- Regroupés dans un dossier `ui/` et `features/` à la place de l'architecture classique `atoms` `moleculs` `organisms` `templates`
- L'arborescence complète aurait alourdi inutilement la structure du projet

### Feature-Based

- Constitue le cœur du **frontend** : chaque grande structure de SaôneLocal = une feature
- Chaque feature est **indépendante** : une feature ne va pas être dépendante d'une autre
- La distinction entre les dossiers `ui/` et `features/` repose sur la vocation des composants :
  - `ui/` → composants **réutilisables**
  - `features/` → composants **spécifiques** à un contexte fonctionnel
- La même logique est appliquée au **backend** pour structurer les différentes parties de l'application

### Sécurité & gestion des accès (Backend)

La sécurité est traitée comme un **domaine à part entière**, isolé dans `src/security/`, et non dispersée dans les features. Elle s'articule autour de deux axes :

**Authentification & tokens**
- `crypto.js` : hash des mots de passe
- `jwt.js` : création & vérification des tokens

**Middlewares**
- `auth.middleware.js` : vérifie l'authentification (JWT)
- `roles.middleware.js` : contrôle des permissions (RBAC)
- `injection.middleware.js` : protection XSS / injections
- `error-message.middleware.js` : messages d'erreur

### Séparation des priorités (Backend)

Le backend distingue trois niveaux dans l'organisation du code :

| Couche | Rôle | Emplacement |
|---|---|---|
| **Métier** | Logique applicative par domaine | `src/features/` |
| **Sécurité** | Authentification, autorisations, protection | `src/security/` |
| **Infrastructure** | Connexion BDD, schéma, seed | `src/database/` |

Au sein de chaque feature, le code est lui-même structuré en **4 couches distinctes** :

| Fichier | Rôle |
|---|---|
| `*.router.js` | Définit les routes et branche les middlewares |
| `*.controller.js` | Reçoit la requête, appelle le service, renvoie la réponse |
| `*.service.js` | Contient la logique métier et les interactions avec la BDD |
| `*.validation.js` | Valide et sanitize les données entrantes avant traitement |

> Le flux est toujours unidirectionnel : **Router → Validation → Controller → Service**. Chaque couche a une responsabilité unique.

### Hooks & Utils

**Hooks** (`src/hooks/`) : logique réutilisable avec état, découplée des composants :
- `use-fetch.js` : appels HTTP
- `use-auth.js` : état d'authentification
- `use-pagination.js` : logique de pagination

**Utils** (`src/utils/`) : fonctions pures sans état, réutilisables partout :
- `format.js` : formatage (dates, prix...)
- `validators.js` : validation des inputs
- `storage.js` : abstraction du `localStorage`
- `pagination.js` *(backend)* : calcul des offsets

### Convention de nommage

Les conventions suivantes s'appliquent à **l'ensemble du projet** :

- `camelCase` → variables et fonctions
- `kebab-case` → noms de fichiers / slugs d'URL / attributs HTML
- `UPPER_CASE` → constantes
- `PascalCase` → classes

## 🛠️ Stack technique

> Section en cours de rédaction

## 🏁 Guide d'installation & d'utilisation

> Section en cours de rédaction

## 👨🏻‍💻 Contributeurs

**Marketing**
- [tbourdiau-hue](#https://github.com/tbourdiau-hue)

**Développement**
- [clemencechenevoix](#https://github.com/clemencechenevoix)
- [Shino](#https://github.com/LargyThomas)
