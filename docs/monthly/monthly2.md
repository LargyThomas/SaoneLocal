# Récapitulatif Mensuel

**Monthly Staff : 09 juin 2026**  
**Chef de projet : Thomas**  
**Équipe : Thelma (Marketing) · Clémence (Dev) · Thomas (Dev / Chef de projet)**

---

# 1. Vue d'ensemble du projet

Depuis le précédent monthly, le projet est passé de la phase de modélisation à une phase active de développement back-end. Les principaux objectifs de cette période étaient la mise en place des fondations techniques de l'application, le développement des fonctionnalités prioritaires et la stabilisation de l'environnement de production.

**Période couverte :** 12 mai → 09 juin 2026

### Phases terminées
- Marketing
- Project Management
- Déploiement

### Phase en cours
- Développement Back-end

---

# 2. Suivi du projet

## GitHub Projects

Évolution depuis le précédent monthly :

- 85 issues créées
- 35 issues fermées (+11)
- 50 issues ouvertes

La progression du backlog reste conforme aux objectifs fixés pour la phase de développement back-end.

---

# 3. Travaux réalisés depuis le précédent monthly

## Avancement général

La phase de développement back-end a débuté conformément à la roadmap prévue.

À ce jour, le projet dispose d'un back-end considéré comme stable à environ **80 %**, avec l'ensemble des fonctionnalités principales développées ou en cours de finalisation.

Le projet suit actuellement les objectifs fixés lors des différents checkpoints et reste en cohérence avec le planning défini pour le mois de juin.

---

## Backend réalisé

### Thomas — Développement & gestion de projet

Fonctionnalités développées :

- Authentification complète (inscription, connexion, JWT, middleware d'authentification et gestion des rôles).
- Développement du catalogue produits.
- Développement du système de favoris.
- Développement du panier.
- Mise en place d'AWS S3 pour la gestion et le stockage des images.
- Code review et suivi technique du projet.

### Clémence — Développement

Fonctionnalités développées :

- Mise en place et configuration de PostgreSQL.
- Création du schéma SQL de la base de données.
- Développement des scripts de seed et du système de peuplement de la base.
- Développement des routes producteurs.
- Développement des routes commandes.
- Développement des routes calendrier.
- Évolution du Data Modeling tout au long du développement.

---

# 4. Difficultés rencontrées

## Data Modeling

Le développement du back-end a permis d'identifier plusieurs limites du modèle de données initial.

Certaines entités, relations et attributs se sont révélés incomplets ou inadaptés une fois confrontés aux besoins réels du développement.

Le MCD, le MLD et le MPD devront être repris afin d'obtenir une version cohérente avec l'application développée et les différentes évolutions apparues durant la phase de développement.

---

## Seed et cohérence de la base de données

La mise en place du système de seed a révélé plusieurs incohérences :

- contraintes manquantes ;
- attributs absents ;
- différences entre certaines tables et le modèle théorique.

Ces problèmes ont nécessité plusieurs corrections successives du schéma de données.

---

## Développement des services SQL

La création des différents fichiers `.service.js` a mis en évidence plusieurs problématiques :

- requêtes SQL incomplètes ;
- relations oubliées ;
- incohérences entre le code et la base de données ;
- cas métiers non anticipés lors de la phase de modélisation.

Ces éléments ont conduit à plusieurs ajustements du modèle de données ainsi qu'à des corrections dans le code applicatif.

---

# 5. État actuel du projet

### Fonctionnalités terminées

- Authentification
- Gestion des rôles et permissions
- Catalogue produits
- Favoris
- Déploiement serveur
- Gestion des images via AWS S3

### Fonctionnalités en cours

- Panier
- Producteurs
- Commandes
- Calendrier
- Administration

---

# 6. Prochaines étapes

## Juin

### Back-end

- Finalisation des routes Producteurs.
- Finalisation des routes Commandes.
- Finalisation du Calendrier.
- Développement de l'espace Administrateur.
- Campagne complète de tests.
- Correction des anomalies détectées.

### Front-end

- Début de l'intégration mobile-first.
- Connexion avec l'API REST.
- Gestion des appels API.
- Validation fonctionnelle des parcours utilisateurs.

---

# 7. Conclusion

Le projet respecte actuellement les objectifs fixés lors des précédents checkpoints. Malgré plusieurs difficultés liées au Data Modeling, à la cohérence de la base de données et à certaines problématiques découvertes durant le développement, l'équipe a su s'adapter et maintenir une progression constante.

Les trois dernières semaines seront consacrées à la finalisation du back-end, à l'intégration du front-end, à la campagne de tests et à la préparation de la soutenance afin de livrer une application complète, stable et conforme aux objectifs du projet.
