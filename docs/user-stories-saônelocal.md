# User Stories SaôneLocal

---

# Espace public

---

## US-01 Page d'accueil

## User Story
**En tant que** visiteur,
**Je veux** voir une page d'accueil présentant l'association et les producteurs mis en avant,
**Afin de** comprendre en quelques secondes ce qu'est SaôneLocal et avoir envie de rester.

---

## Critères d'acceptation
- [ ] La page affiche une description courte de l'association
- [ ] Au moins 3 producteurs sont mis en avant avec photo et nom
- [ ] Un bouton visible redirige vers le catalogue
- [ ] La page est lisible et utilisable sur mobile 375px

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Public |
| Assigné à | Dev + Marketing |

---

## US-02 Catalogue produits

## User Story
**En tant que** visiteur,
**Je veux** parcourir le catalogue des produits avec des filtres par catégorie et par producteur,
**Afin de** trouver rapidement ce qui m'intéresse sans tout parcourir.

---

## Critères d'acceptation
- [ ] Les produits sont affichés sous forme de cards avec nom, prix, photo et producteur
- [ ] Les filtres par catégorie et par producteur sont visibles et fonctionnels
- [ ] La pagination est gérée côté back-end (pas de filtrage JS côté client)
- [ ] Le catalogue est accessible sans connexion

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Public |
| Assigné à | Dev |

---

## US-03 Fiche producteur

## User Story
**En tant que** visiteur,
**Je veux** consulter la fiche d'un producteur avec sa présentation, sa localisation et ses produits disponibles,
**Afin de** mieux le connaître avant de commander.

---

## Critères d'acceptation
- [ ] La fiche affiche le nom, la photo, la description et la localisation du producteur
- [ ] La liste de ses produits disponibles est affichée sur la même page
- [ ] La fiche est accessible depuis le catalogue et la page d'accueil
- [ ] La page est responsive mobile 375px

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Public |
| Assigné à | Dev |

---

## US-04 Calendrier des marchés

## User Story
**En tant que** visiteur,
**Je veux** consulter le calendrier des marchés et événements à venir,
**Afin de** savoir quand et où je peux récupérer mes commandes ou rencontrer les producteurs.

---

## Critères d'acceptation
- [ ] Les événements sont listés avec nom, date, lieu et description courte
- [ ] Les données sont initialisées via le seeder (pas d'interface de gestion)
- [ ] La page est accessible sans connexion
- [ ] L'affichage est lisible sur mobile

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Public |
| Assigné à | Dev |

---

## US-05 Page à propos

## User Story
**En tant que** visiteur,
**Je veux** lire l'histoire et les valeurs de SaôneLocal,
**Afin de** comprendre la démarche de l'association et avoir confiance avant de m'inscrire.

---

## Critères d'acceptation
- [ ] La page présente l'histoire de l'association et ses valeurs
- [ ] Le ton est cohérent avec la charte éditoriale définie par le marketing
- [ ] La page est accessible sans connexion
- [ ] Le contenu est lisible sur mobile 375px

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Public |
| Assigné à | Dev + Marketing |

---

## US-24 Recherche par mot-clé

## User Story
**En tant que** visiteur,
**Je veux** rechercher un produit ou un producteur par mot-clé,
**Afin de** trouver ce que je cherche sans passer par les filtres.

---

## Critères d'acceptation
- [ ] Une barre de recherche est visible sur le catalogue
- [ ] La recherche porte sur le nom du produit et le nom du producteur
- [ ] Les résultats sont retournés par le back-end (pas de filtrage JS côté client)
- [ ] Si aucun résultat, un message clair est affiché

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🟠 Should have |
| Espace | Public |
| Assigné à | Dev |

---

## US-26 Affichage de la note moyenne sur la fiche produit

## User Story
**En tant que** visiteur,
**Je veux** voir la note moyenne d'un produit,
**Afin de** évaluer sa qualité avant de l'ajouter à mon panier.

---

## Critères d'acceptation
- [ ] La note moyenne est calculée côté back-end
- [ ] Elle s'affiche sous forme d'étoiles avec le nombre d'avis
- [ ] Si aucun avis, un message "Pas encore d'avis" est affiché
- [ ] La note est visible sur la card produit dans le catalogue et sur la fiche détail

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🟡 Could have |
| Espace | Public |
| Assigné à | Dev |

---

## US-30 Métadonnées SEO de base

## User Story
**En tant que** responsable marketing,
**Je veux** que chaque page publique ait un titre et une description meta pertinents,
**Afin de** améliorer la visibilité de SaôneLocal sur les moteurs de recherche.

---

## Critères d'acceptation
- [ ] Chaque page publique a un `<title>` et une balise `<meta description>` uniques
- [ ] Les fiches producteur et produit incluent le nom dans le titre
- [ ] Les balises sont générées côté serveur (SSR ou statique)
- [ ] Aucune page publique ne retourne de title vide

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🟠 Should have |
| Espace | Public |
| Assigné à | Dev + Marketing |

---

## US-31 Page d'erreur 404 personnalisée

## User Story
**En tant que** visiteur,
**Je veux** tomber sur une page d'erreur claire et utile quand une URL n'existe pas,
**Afin de** ne pas me retrouver bloqué sans savoir quoi faire.

---

## Critères d'acceptation
- [ ] Une page 404 dédiée s'affiche pour toute route inexistante
- [ ] Elle contient un message compréhensible et un lien vers l'accueil
- [ ] Le code HTTP retourné est bien 404
- [ ] La page reprend le header et footer habituels du site

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🟠 Should have |
| Espace | Public |
| Assigné à | Dev |

---

# Espace client

---

## US-06 Inscription

## User Story
**En tant que** client,
**Je veux** créer un compte avec mon email et un mot de passe,
**Afin de** pouvoir commander sur la plateforme.

---

## Critères d'acceptation
- [ ] Le formulaire contient les champs email et mot de passe
- [ ] La validation est faite côté back-end (regex email, longueur et complexité du mot de passe)
- [ ] Un email déjà utilisé renvoie un message d'erreur clair
- [ ] Le mot de passe est haché avec bcrypt, jamais stocké en clair
- [ ] La date d'inscription est enregistrée en base

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Client |
| Assigné à | Dev |

---

## US-07 Connexion

## User Story
**En tant que** client,
**Je veux** me connecter avec mon email et mon mot de passe,
**Afin d'** accéder à mon espace personnel de façon sécurisée.

---

## Critères d'acceptation
- [ ] Un JWT est généré et retourné à la connexion
- [ ] La dernière date de connexion est mise à jour en base
- [ ] Un message d'erreur s'affiche en cas de mauvais identifiants, sans exposer d'information technique
- [ ] La route est protégée côté back-end

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Client |
| Assigné à | Dev |

---

## US-08 Ajout au panier et gestion

## User Story
**En tant que** client,
**Je veux** ajouter des produits à mon panier et le gérer,
**Afin de** préparer ma commande avant de valider.

---

## Critères d'acceptation
- [ ] Un bouton "Ajouter au panier" est visible sur chaque fiche produit
- [ ] Le compteur du panier se met à jour immédiatement
- [ ] On peut modifier la quantité ou supprimer un produit depuis le panier
- [ ] Le panier persiste entre les pages sans se vider

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Client |
| Assigné à | Dev |

---

## US-09 Favoris

## User Story
**En tant que** client,
**Je veux** sauvegarder des producteurs et des produits en favoris,
**Afin de** les retrouver rapidement sans avoir à chercher à chaque visite.

---

## Critères d'acceptation
- [ ] Un bouton favori est disponible sur chaque fiche produit et fiche producteur
- [ ] Les favoris sont accessibles depuis le profil client
- [ ] L'ajout et la suppression d'un favori fonctionnent sans recharger la page
- [ ] Les favoris persistent entre les sessions

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🟠 Should have |
| Espace | Client |
| Assigné à | Dev |

---

## US-10 Tunnel de commande et suivi

## User Story
**En tant que** client,
**Je veux** passer une commande en click & collect et suivre son statut en temps réel,
**Afin de** savoir quand venir récupérer mes produits au marché.

---

## Critères d'acceptation
- [ ] Le tunnel de commande aboutit à une page de confirmation (paiement fictif simulé)
- [ ] Les statuts possibles sont : nouvelle → en préparation → prête → retirée
- [ ] Le client voit le statut actuel de chaque commande dans son historique
- [ ] L'historique complet des commandes est accessible depuis son espace

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Client |
| Assigné à | Dev |

---

## US-21 Email de confirmation de commande

## User Story
**En tant que** client,
**Je veux** recevoir un email récapitulatif après avoir passé commande,
**Afin de** avoir une trace écrite de mon achat.

---

## Critères d'acceptation
- [ ] L'email est envoyé automatiquement après confirmation de la commande
- [ ] Il contient : numéro de commande, liste des produits, prix total et point de retrait
- [ ] L'envoi est déclenché côté back-end
- [ ] En cas d'échec d'envoi, la commande est quand même validée

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🟠 Should have |
| Espace | Client |
| Assigné à | Dev |

---

## US-22 Notification de changement de statut

## User Story
**En tant que** client,
**Je veux** être notifié quand le statut de ma commande change,
**Afin de** savoir sans avoir à me connecter que ma commande est prête.

---

## Critères d'acceptation
- [ ] Un email est envoyé à chaque changement de statut
- [ ] Le message indique le nouveau statut et le nom du producteur
- [ ] L'envoi est déclenché par la mise à jour de statut côté producteur
- [ ] Le client peut voir l'historique des statuts depuis son espace

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🟠 Should have |
| Espace | Client |
| Assigné à | Dev |

---

## US-23 Email de bienvenue à l'inscription

## User Story
**En tant que** client,
**Je veux** recevoir un email de bienvenue après mon inscription,
**Afin de** confirmer que mon compte a bien été créé.

---

## Critères d'acceptation
- [ ] L'email est envoyé automatiquement après création du compte
- [ ] Il contient le prénom (si renseigné) et un lien vers le catalogue
- [ ] Le ton est cohérent avec la charte éditoriale
- [ ] L'email s'affiche correctement sur mobile

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🟡 Could have |
| Espace | Client |
| Assigné à | Dev + Marketing |

---

## US-25 Laisser un avis sur un produit

## User Story
**En tant que** client,
**Je veux** laisser une note et un commentaire sur un produit que j'ai commandé,
**Afin de** partager mon expérience avec les autres visiteurs.

---

## Critères d'acceptation
- [ ] L'option n'est disponible que pour les produits figurant dans une commande au statut "retirée"
- [ ] La note est sur 5 étoiles, le commentaire est optionnel
- [ ] Un client ne peut laisser qu'un seul avis par produit
- [ ] L'avis est visible sur la fiche produit après soumission

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🟡 Could have |
| Espace | Client |
| Assigné à | Dev |

---

## US-28 Gestion du profil client

## User Story
**En tant que** client,
**Je veux** modifier mes informations personnelles depuis mon espace,
**Afin de** garder mon compte à jour.

---

## Critères d'acceptation
- [ ] On peut modifier le prénom, l'email et le mot de passe
- [ ] La modification du mot de passe exige la saisie de l'ancien
- [ ] Un email déjà utilisé renvoie un message d'erreur clair
- [ ] Les modifications sont sauvegardées immédiatement en base

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Client |
| Assigné à | Dev |

---

## US-29 Suppression du compte client

## User Story
**En tant que** client,
**Je veux** supprimer mon compte depuis mon espace,
**Afin de** exercer mon droit à l'effacement de mes données.

---

## Critères d'acceptation
- [ ] Une option de suppression est accessible depuis les paramètres du profil
- [ ] Une confirmation explicite est demandée avant suppression
- [ ] La suppression anonymise les données de commandes (pas de suppression en cascade)
- [ ] Le client est déconnecté et redirigé vers la page d'accueil après suppression

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Client |
| Assigné à | Dev |

---

# Espace producteur

---

## US-11 Connexion producteur

## User Story
**En tant que** producteur,
**Je veux** me connecter depuis mon téléphone avec un compte dédié,
**Afin d'** accéder à mon tableau de bord simplement.

---

## Critères d'acceptation
- [ ] Le compte producteur est créé via le seeder par défaut
- [ ] La connexion fonctionne avec email et mot de passe
- [ ] Un JWT est généré à la connexion
- [ ] L'interface s'affiche correctement sur mobile 375px

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Producteur |
| Assigné à | Dev |

---

## US-12 Gestion du catalogue produits

## User Story
**En tant que** producteur,
**Je veux** ajouter, modifier et supprimer mes produits depuis mon tableau de bord,
**Afin de** maintenir mon catalogue à jour sans avoir besoin d'aide technique.

---

## Critères d'acceptation
- [ ] On peut créer un produit en remplissant au minimum 3 champs : nom, prix, catégorie
- [ ] On peut modifier un produit existant
- [ ] On peut supprimer un produit
- [ ] Les champs sont validés côté back-end
- [ ] Les modifications sont visibles immédiatement dans l'espace public

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Producteur |
| Assigné à | Dev |

---

## US-13 Gestion des commandes reçues

## User Story
**En tant que** producteur,
**Je veux** voir les commandes reçues et mettre à jour leur statut,
**Afin d'** informer mes clients de l'avancement de leur préparation.

---

## Critères d'acceptation
- [ ] Les commandes sont listées avec le nom du client, les produits et le statut actuel
- [ ] On peut faire avancer le statut : nouvelle → en préparation → prête → retirée
- [ ] La mise à jour du statut est visible immédiatement côté client
- [ ] L'interface est utilisable en quelques clics sur mobile

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Producteur |
| Assigné à | Dev |

---

## US-14 Vue synthétique des ventes

## User Story
**En tant que** producteur,
**Je veux** voir un résumé de mes ventes sur mon tableau de bord,
**Afin d'** avoir une vision rapide de mon activité sans avoir à analyser chaque commande.

---

## Critères d'acceptation
- [ ] Le dashboard affiche le nombre total de commandes reçues
- [ ] Les produits les plus commandés sont mis en avant
- [ ] Les données sont calculées côté back-end
- [ ] La vue s'affiche correctement sur mobile

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🟠 Should have |
| Espace | Producteur |
| Assigné à | Dev |

---

## US-15 Affichage date d'inscription et dernière connexion

## User Story
**En tant que** producteur,
**Je veux** voir ma date d'inscription et ma dernière connexion quelque part dans mon interface,
**Afin de** confirmer que mon compte est bien actif et à jour.

---

## Critères d'acceptation
- [ ] La date d'inscription est stockée en base à la création du compte
- [ ] La dernière connexion est mise à jour à chaque login
- [ ] Ces deux informations sont visibles dans le dashboard producteur ou le profil
- [ ] Elles s'affichent dans un format lisible (ex : 13 avril 2026)

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Producteur |
| Assigné à | Dev |

---

# Espace admin

---

## US-16 Connexion administrateur

## User Story
**En tant que** administrateur,
**Je veux** me connecter avec un compte dédié à accès restreint,
**Afin de** gérer la plateforme sans interférer avec les espaces client et producteur.

---

## Critères d'acceptation
- [ ] Le compte admin est créé via le seeder
- [ ] La connexion génère un JWT avec un rôle `admin`
- [ ] L'accès au back-office est refusé à tout autre rôle
- [ ] Des tentatives répétées échouées entraînent un blocage temporaire du compte

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Admin |
| Assigné à | Dev |

---

## US-17 Gestion des comptes utilisateurs

## User Story
**En tant que** administrateur,
**Je veux** lister, suspendre et supprimer les comptes clients et producteurs,
**Afin de** maintenir la qualité et la sécurité de la plateforme.

---

## Critères d'acceptation
- [ ] La liste affiche email, rôle, date d'inscription et statut (actif / suspendu)
- [ ] On peut suspendre ou réactiver un compte sans le supprimer
- [ ] On peut supprimer définitivement un compte avec confirmation
- [ ] Un compte suspendu ne peut plus se connecter

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Admin |
| Assigné à | Dev |

---

## US-18 Création d'un compte producteur

## User Story
**En tant que** administrateur,
**Je veux** créer manuellement un compte producteur depuis le back-office,
**Afin de** intégrer un nouveau producteur sans qu'il ait accès à une inscription publique.

---

## Critères d'acceptation
- [ ] Le formulaire contient : nom, email, mot de passe temporaire, description, localisation
- [ ] Le compte est immédiatement actif après création
- [ ] L'admin reçoit une confirmation visuelle à l'écran
- [ ] Le producteur peut modifier son mot de passe après connexion

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🔴 Must have |
| Espace | Admin |
| Assigné à | Dev |

---

## US-19  Modération des produits

## User Story
**En tant que** administrateur,
**Je veux** voir tous les produits publiés et pouvoir en retirer certains,
**Afin de** m'assurer que le catalogue reste conforme aux règles de l'association.

---

## Critères d'acceptation
- [ ] La liste affiche tous les produits avec producteur, prix et statut (visible / masqué)
- [ ] On peut masquer un produit sans le supprimer
- [ ] Un produit masqué n'apparaît plus dans le catalogue public
- [ ] L'admin peut laisser une note interne visible uniquement en back-office

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🟠 Should have |
| Espace | Admin |
| Assigné à | Dev |

---

## US-20 Tableau de bord global

## User Story
**En tant que** administrateur,
**Je veux** voir un résumé de l'activité de la plateforme,
**Afin de** avoir une vue d'ensemble sans éplucher chaque section.

---

## Critères d'acceptation
- [ ] Le dashboard affiche : nombre de clients, producteurs, commandes du jour, commandes totales
- [ ] Les données sont calculées côté back-end
- [ ] L'affichage se rafraîchit à chaque chargement de la page
- [ ] La page s'affiche correctement sur desktop et mobile

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🟠 Should have |
| Espace | Admin |
| Assigné à | Dev |

---

## US-27 Modération des avis

## User Story
**En tant que** administrateur,
**Je veux** consulter et supprimer des avis signalés,
**Afin de** garder le contenu de la plateforme fiable et bienveillant.

---

## Critères d'acceptation
- [ ] Un visiteur peut signaler un avis depuis la fiche produit
- [ ] Les avis signalés apparaissent dans une file dédiée en back-office
- [ ] L'admin peut supprimer un avis ou ignorer le signalement
- [ ] La suppression retire l'avis du front immédiatement

---

## Informations
| Champ | Valeur |
|-------|--------|
| Priorité | 🟡 Could have |
| Espace | Admin |
| Assigné à | Dev |
