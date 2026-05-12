# Récapitulatif Mensuel

**Monthly Staff :** 12 mai 2026  
**Chef de projet :** Thomas  
**Équipe :** Thelma (Marketing) · Clémence (Dev) · Thomas (Dev / Chef de projet)

---

# 1. Vue d'ensemble du projet

SaôneLocal est une marketplace locale dédiée aux producteurs du bassin chalonnais. 
L'objectif est de concevoir et développer une application mobile-first de zéro, de la réflexion UX jusqu'au déploiement en production sur un vrai serveur.

- **Période couverte :** 08 avril → 12 mai 2026
- **Phases terminées :** Phase Marketing
- **Phase en cours :** Modélisation & Déploiement

---

# 2. Organisation mise en place

## Discord

Dès le démarrage du projet, un serveur Discord dédié a été créé pour centraliser toutes les communications et livrables de l'équipe.

Le serveur est structuré en salons thématiques :

- Salons par profil (dev, marketing, général)
- Salons dédiés aux livrables (charte-graphique, maquettes, design-system)
- Système de rappels automatiques pour les weeklys (bot de rappel chaque lundi soir et mardi matin)

---

## GitHub Projects

Un backlog complet a été mis en place sur GitHub Projects avec :

- 85 issues créées couvrant l'ensemble du projet
- 61 ouvertes et 24 fermées à l'heure actuelle
- Chaque user story dotée :
  - d'un titre
  - d'une description
  - de critères d'acceptation
  - d'une priorité (Must Have / Should Have / Could Have)
- Un board avec les colonnes :
  - Todo
  - In Progress
  - In Review
  - Done

Chaque commit référence le numéro de l'issue correspondante via les Conventional Commits.

---

## Roadmap

Une roadmap visuelle a été créée et partagée avec l'équipe couvrant l'ensemble du projet d'avril à juillet 2026, avec :

- les grandes phases
- les deadlines
- les checkpoints mensuels

---

## Weeklys

Un weekly est organisé chaque mardi à 9h10.

Chaque membre dépose son compte rendu le lundi avant minuit dans le salon dédié.

Les comptes rendus sont archivés dans :

```txt
/docs/weekly/
```

du repository GitHub.

---

# 3. Phase Marketing - Avril (terminée)

**Responsable :** Thelma

## Livrables rendus

- ✅ Charte graphique complète
  - logo
  - palette de couleurs
  - couleurs fonctionnelles
  - ton éditorial

- ✅ Wireframes basse fidélité

- ✅ Maquettes haute fidélité mobile 375px (Figma)

- ✅ Design system
  - comportements des composants
  - radius border
  - typographie
  - couleurs

---

## Difficultés rencontrées

Un report de deadline a été accordé par les coachs sur la phase marketing.

Ce report était lié à deux points principaux :

- une review des maquettes ayant nécessité plusieurs itérations supplémentaires
- la création du Design System qui n'avait pas encore été intégré

Grâce à ce report, les livrables ont pu être rendus dans un état complet et soigné.

---

# 4. Phase Project Management - Fin avril (terminée)

**Responsables :** Toute l’équipe

## Livrables réalisés

- ✅ Création du repo GitHub avec structure complète
  - `/docs`
  - `/weeklys`
  - `/frontend`
  - `/backend`

- ✅ Mise en place du backlog GitHub Projects

- ✅ Rédaction des user stories avec critères d'acceptation

- ✅ Priorisation :
  - Must Have
  - Should Have
  - Could Have

- ✅ Architecture frontend et backend définie et documentée

- ✅ CI/CD de base mis en place (GitHub Actions)

- ✅ Convention de nommage Conventional Commits appliquée sur tous les commits

---

# 5. Phase Modélisation & Déploiement - Mai (en cours)

## Data Modeling - Clémence

Le data modeling a été l'étape la plus itérative du projet.

Plusieurs versions ont été produites avant d'arriver à une version satisfaisante.

### Versions précédentes

- **V1 → V3**
  - problèmes structurels identifiés lors des reviews internes :
    - attributs calculés stockés
    - listes dans les colonnes
    - absence d'entité ORDER
    - cardinalités au mauvais format

- **V4**
  - version intermédiaire avec corrections partielles

---

### V5 - Version finale envoyée au coach

Corrections intégrées :

- Tout en anglais
  - entités
  - attributs
  - associations

- Identifiants métier :
  - `userEmail`
  - `productRef`
  - `orderRef`

- Cardinalités au format Merise
  - `(0,N)`
  - `(1,1)`

- Entité `ORDER` à part entière

- Entité `PRODUCER` séparée de `USER`

- Suppression des attributs calculés

- Association réflexive `PAIRS_WITH` sur `PRODUCT`

- Entités `CATEGORY` et `SUBCATEGORY` séparées

- Tables de liaison :
  - `order_items`
  - `basket_items`

### Statut

Le modèle a été envoyé au coach et est actuellement en attente de validation.

Le MPD sera produit après validation du MCD/MLD.

Le schéma peut encore évoluer si des oublis sont identifiés lors de la review.

---

## Déploiement - Thomas

L'infrastructure de production a été entièrement mise en place.

| Composant | Statut | Détail |
|---|---|---|
| AWS EC2 | ✅ | Instance Ubuntu 26.04 t3.micro |
| Node.js | ✅ | Installé via NVM sur EC2 |
| PostgreSQL | ✅ | Installé et configuré sur EC2 |
| No-IP | ✅ | Sous-domaine configuré |
| Nginx | ✅ | Reverse proxy opérationnel |
| HTTPS | ✅ | Certbot + Let's Encrypt actif |
| CI/CD | ✅ | GitHub Actions avec CI + Continuous Delivery |

---

# 6. Problèmes rencontrés et solutions

| Problème | Solution apportée |
|---|---|
| Report deadline marketing | Accord des coachs → livrables rendus complets |
| Data modeling | Itérations successives avec corrections du coach → V5 envoyée |
| Pipeline CI/CD | Fichiers manquants ainsi que Node et pm2 |

---

# 7. Ce qui est prévu pour la suite

| Date | Étape |
|---|---|
| 13 mai | Début développement back-end (API REST, routes, services) |
| 22 mai | Checkpoint dev → auth + catalogue opérationnels |
| 05 juin | Checkpoint dev → back-end stable |
| 12 juin | Rendu final back-end |
| 15 juin | Début intégration front-end |
| 26 juin | Checkpoint final |
| 03 juillet | Fin de projet → soutenance |

---

# 8. Comptes GitHub

| Membre | Rôle | GitHub |
|---|---|---|
| Thomas | Chef de projet / Dev | LargyThomas |
| Clémence | Dev | clemencechenevoix |
| Thelma | Marketing | tbourdiau-hue |