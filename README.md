# 📍 SaôneLocal

SaôneLocal est une association regroupant une cinquantaine de producteurs locaux du bassin chalonnais : vignerons, maraîchers, apiculteurs, fromagers. Après des années sur une plateforme nationale qui leur prélevait 25% de commission, ils ont voté en assemblée générale : ils veulent leur propre outil. Simple, local, et 100% mobile.

---

## 🎯 Mission

Concevoir et développer la marketplace des producteurs locaux du bassin chalonnais de zéro. De la réflexion UX jusqu'au déploiement sur un vrai serveur.

---

## 🎨 Maquettes & Design

- **Site en ligne** : [https://saonelocal.ddns.net/](https://saonelocal.ddns.net/)
- **Figma (UI / UX)** : [Voir les maquettes](https://www.figma.com/design/YWrSEreuXZ1XBNhgbk8dyK/Final-Saonelocal?node-id=0-1&p=f&t=zTXzQXHXLhKipTTg-0)
- **Design System** : [Voir le Design System](https://github.com/LargyThomas/SaoneLocal/blob/main/docs/charte-graphique/design-system-sa%C3%B4nelocal.pdf)

> Les maquettes ont été réalisées en mobile-first sur une base 375px.

---

## 📁 Structure du projet

```txt
SaoneLocal
│
├── frontend/
│  └── src/
│     ├── ui/                         // composants UI génériques réutilisables
│     ├── features/                   // organisation par fonctionnalité métier
│     │  ├── public/                  // pages accessibles sans connexion
│     │  ├── auth/                    // authentification
│     │  ├── client/                  // espace utilisateur
│     │  └── producer/                // espace producteur
│     ├── hooks/                      // logique réutilisable
│     ├── api/                        // appels HTTP vers le backend
│     ├── utils/                      // fonctions utilitaires
│     ├── app.jsx
│     ├── main.jsx
│     └── routes.jsx
│
├── backend/
│  └── src/
│     ├── features/                   // architecture modulaire par domaine
│     │  ├── admin/
│     │  ├── auth/
│     │  ├── basket/
│     │  ├── calendar/
│     │  ├── catalog/
│     │  ├── client/
│     │  ├── favorites/
│     │  ├── orders/
│     │  ├── producers/
│     │  └── upload/
│     ├── security/                   // sécurité, JWT, middlewares
│     ├── database/                   // schéma, seed, connexion BDD
│     ├── app.js
│     └── server.js
│
├── docs/
│  ├── weekly/
│  └── charte-graphique/
│
├── docker/
│  ├── docker-compose.yml
│  └── Dockerfile
│
├── scripts/
│
├── .github/
│  └── workflows/
│     └── ci.yml
│
└── README.md
```

---

## 📑 Explication de l'architecture

L'architecture frontend repose sur une combinaison du pattern **Feature-Based** et d'une version simplifiée de l'**Atomic Design**.

### Atomic Design simplifié

- Les composants UI sont fractionnés en composants modulaires et réutilisables.
- Les composants communs sont regroupés dans `ui/`.
- Les composants spécifiques à une page ou un contexte métier sont placés dans `features/`.

### Feature-Based

- Chaque grande partie de SaôneLocal correspond à une feature.
- Les pages publiques, l'authentification, l'espace client et l'espace producteur sont séparés.
- La même logique est appliquée au backend avec une organisation par domaine métier.

### Sécurité & gestion des accès

La sécurité est regroupée dans `src/security/`.

- `crypto.js` : hash des mots de passe.
- `jwt.js` : création et vérification des tokens.
- `auth.middleware.js` : vérification de l'authentification.
- `roles.middleware.js` : contrôle des rôles.
- `injection.middleware.js` : protection contre certaines injections.

### Organisation backend

Chaque feature backend suit une logique simple :

| Fichier | Rôle |
|---|---|
| `*.routes.js` | Définit les routes |
| `*.controller.js` | Gère la requête et la réponse |
| `*.service.js` | Contient la logique métier |
| `*.validation.js` | Valide les données reçues |

> Le flux principal est : **Route → Validation → Controller → Service**.

---

## 🛠️ Stack technique

### Frontend

- React.js
- JavaScript
- Tailwind CSS
- Vite
- Node.js

### Backend

- Node.js
- Express.js
- JavaScript
- PostgreSQL
- JWT
- Bcrypt
- Multer
- AWS S3

### Outils

- Git / GitHub
- GitHub Actions
- PM2
- Nginx
- Figma

---

## 🏁 Guide d'installation & d'utilisation

### Prérequis

- Node.js
- npm
- PostgreSQL
- Git

### Lancer le backend

```bash
cd backend
npm install
```

Créer un fichier `.env` dans le dossier `backend`.

Exemple :

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=saonelocal
JWT_SECRET=your_secret
```

Initialiser les données :

```bash
npm run seed
```

Lancer le backend :

```bash
npm run dev
```

Le backend tourne sur :

```txt
http://localhost:3000
```

### Lancer le frontend

Dans un deuxième terminal :

```bash
cd frontend
npm install
npm run dev
```

Le frontend tourne sur :

```txt
http://localhost:5173
```

### Build frontend

```bash
cd frontend
npm run build
```

### Comptes de démonstration

Les comptes de démonstration sont définis dans :

```txt
backend/src/database/const-seed.js
```

Exemples :

```txt
Client : sophie.client@saonelocal.fr
Producteur : michel.durand@saonelocal.fr
Admin : admin@saonelocal.fr
Mot de passe : Password1!
```

Pour un compte producteur, cocher `Espace producteur : Oui`.

Pour un compte administrateur, cocher `Espace admin : Oui`.

---

## 👨🏻‍💻 Contributeurs

**Marketing**
- [tbourdiau-hue](https://github.com/tbourdiau-hue) : maquettes, UX/UI, direction visuelle.

**Développement**
- [clemencechenevoix](https://github.com/clemencechenevoix) : PostgreSQL, JavaScript, Express.js, Node.js, routes API, base de données.
- [Shino](https://github.com/LargyThomas) : React.js, Tailwind CSS, JavaScript, Node.js, Express.js, intégration front/back, mise en place de l'instance.