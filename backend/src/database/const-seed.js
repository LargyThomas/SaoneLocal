// require
require('dotenv').config();

// const

const admin = {
    usersEmail: process.env.SEED_ADMIN_EMAIL || "admin@saonelocal.fr",
    usersPassword: process.env.SEED_ADMIN_PASSWORD || "Password1!",
    usersGender: "N",
    usersLastName: "Admin",
    usersFirstName: "Super",
    usersCreationDate: "2026-05-19",
    usersLastConnexion: "2026-05-19",
    usersRole: 3,
    usersStatus: "active",
    usersProfilePicture: null
}

const association = {
    associationId: 1,
    associationValues: "Bon / Accessible / Local / Juste / Durable",
    associationTestimony: "Je veux manger local, c'est pour cela que je me suis tourné vers SaôneLocal. J'ai découvert des produits de qualité et rencontré des producteurs passionnés. - Jean Dupont",
    associationDescHome: "SaôneLocal est une association de producteurs du bassin chalonnais qui défend une rémunération plus juste des producteurs locaux.",
    associationLocalisation: "17 allées des locaux - 71100 Chalon-sur-Saône",
    associationDescAbout: "SaôneLocal regroupe des producteurs locaux du bassin chalonnais : vignerons, maraîchers, apiculteurs, boulangers, éleveurs et fromagers. L'association organise des marchés, des événements et sensibilise les consommateurs à l'importance de consommer local.",
    associationEmail: "saonelocal.contact@gmail.com",
    associationImage: "https://s11.aconvert.com/convert/p3r68-cdx67/cmzbd-uzdq0.jpg",
    associationNum: "0000000000"
}

const usersAssociation = { userId: admin.usersEmail, associationId: association.associationId }

const client1 = { usersEmail: process.env.SEED_CLIENT_EMAIL || "sophie.client@saonelocal.fr", usersPassword: process.env.SEED_CLIENT_PASSWORD || "Password1!", usersGender: "F", usersLastName: "Bernard", usersFirstName: "Sophie", usersCreationDate: "2026-05-19", usersLastConnexion: "2026-05-19", usersRole: 1, usersStatus: "active", usersProfilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80" }

const user1 = { usersEmail: process.env.SEED_PRODUCER1_EMAIL || "michel.durand@saonelocal.fr", usersPassword: process.env.SEED_PRODUCER1_PASSWORD || "Password1!", usersGender: "M", usersLastName: "Durand", usersFirstName: "Michel", usersCreationDate: "2026-05-19", usersLastConnexion: "2026-05-19", usersRole: 2, usersStatus: "active", usersProfilePicture: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=900&q=80" }
const producer1 = { producerId: 1, producerDesc: "Maraîcher à Crissey, Michel cultive légumes de saison, poireaux, tomates, courgettes, salades et carottes.", producerLocalisation: "Crissey, Saône-et-Loire, 71530", producerSiretNum: "73284591027658", producerStatus: "active" }

const user2 = { usersEmail: process.env.SEED_PRODUCER2_EMAIL || "isabelle.fontaine@saonelocal.fr", usersPassword: process.env.SEED_PRODUCER2_PASSWORD || "Password1!", usersGender: "F", usersLastName: "Fontaine-Marchais", usersFirstName: "Isabelle", usersCreationDate: "2026-05-19", usersLastConnexion: "2026-05-19", usersRole: 2, usersStatus: "active", usersProfilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80" }
const producer2 = { producerId: 2, producerDesc: "Vigneronne au Domaine de la Côte Chalonnaise à Mercurey, Isabelle produit des vins de Bourgogne depuis 1987.", producerLocalisation: "Mercurey, Saône-et-Loire, 71640", producerSiretNum: "58120479361584", producerStatus: "active" }

const user3 = { usersEmail: process.env.SEED_PRODUCER3_EMAIL || "karim.benchouia@saonelocal.fr", usersPassword: process.env.SEED_PRODUCER3_PASSWORD || "Password1!", usersGender: "M", usersLastName: "Benchouia", usersFirstName: "Karim", usersCreationDate: "2026-05-19", usersLastConnexion: "2026-05-19", usersRole: 2, usersStatus: "active", usersProfilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80" }
const producer3 = { producerId: 3, producerDesc: "Boulanger artisan à Montceau-les-Mines, Karim travaille des farines régionales et un levain naturel.", producerLocalisation: "Montceau-les-Mines, Saône-et-Loire, 71300", producerSiretNum: "42819375610452", producerStatus: "active" }

const user4 = { usersEmail: process.env.SEED_PRODUCER4_EMAIL || "claire.martin@saonelocal.fr", usersPassword: process.env.SEED_PRODUCER4_PASSWORD || "Password1!", usersGender: "F", usersLastName: "Martin", usersFirstName: "Claire", usersCreationDate: "2026-05-19", usersLastConnexion: "2026-05-19", usersRole: 2, usersStatus: "active", usersProfilePicture: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80" }
const producer4 = { producerId: 4, producerDesc: "Éleveuse à Charolles, Claire propose de la viande bovine locale en caissettes et des produits transformés.", producerLocalisation: "Charolles, Saône-et-Loire, 71120", producerSiretNum: "90315478261109", producerStatus: "active" }

const event1 = { eventsId: 1, eventsLocation: "Place d'armes - 71640 Givry", eventsDate: "2025-06-25", eventsName: "Marché de Givry", eventsDesc: "Marché local avec produits frais, pains, fruits, légumes, fromages et spécialités régionales.", eventsStatus: "active" }
const event2 = { eventsId: 2, eventsLocation: "Place de la Mairie - 71100 Saint-Rémy", eventsDate: "2026-08-04", eventsName: "Marché de Saint-Rémy", eventsDesc: "Un large choix de produits frais et locaux avec des animations ponctuelles.", eventsStatus: "active" }
const event3 = { eventsId: 3, eventsLocation: "Place du Champ de Mars - 71400 Autun", eventsDate: "2026-07-23", eventsName: "Grande foire d'Autun", eventsDesc: "Grande foire commerciale et agricole accompagnée d'une fête foraine et d'animations.", eventsStatus: "active" }
const event4 = { eventsId: 4, eventsLocation: "Quai Lamartine - 71000 Mâcon", eventsDate: "2026-09-12", eventsName: "Marché nocturne local", eventsDesc: "Marché en soirée avec producteurs, artisans, paniers de saison et restauration locale.", eventsStatus: "active" }
const event5 = { eventsId: 5, eventsLocation: "Maison des Associations - 71850 Charnay-lès-Mâcon", eventsDate: "2026-10-18", eventsName: "Journée circuits courts", eventsDesc: "Une journée dédiée aux initiatives locales, aux producteurs de proximité et aux nouvelles habitudes de consommation.", eventsStatus: "active" }

const category1 = { categoryId: 1, categoryName: "vin" }
const category2 = { categoryId: 2, categoryName: "pain" }
const category3 = { categoryId: 3, categoryName: "viande" }
const category4 = { categoryId: 4, categoryName: "légumes" }

const subcategory1 = { subcategoryId: 1, categoryId: category1.categoryId, subcategoryName: "vin rouge" }
const subcategory2 = { subcategoryId: 2, categoryId: category1.categoryId, subcategoryName: "vin blanc" }
const subcategory3 = { subcategoryId: 3, categoryId: category3.categoryId, subcategoryName: "viande rouge" }
const subcategory4 = { subcategoryId: 4, categoryId: category3.categoryId, subcategoryName: "viande blanche" }
const subcategory5 = { subcategoryId: 5, categoryId: category3.categoryId, subcategoryName: "charcuterie" }
const subcategory6 = { subcategoryId: 6, categoryId: category2.categoryId, subcategoryName: "pain au levain" }
const subcategory7 = { subcategoryId: 7, categoryId: category4.categoryId, subcategoryName: "légumes de saison" }
const subcategory8 = { subcategoryId: 8, categoryId: category2.categoryId, subcategoryName: "viennoiserie" }

const product1 = { productId: 1, producerId: producer2.producerId, categoryId: category1.categoryId, subcategoryId: subcategory1.subcategoryId, productName: "Clos du Roi", productPrice: 30, productDesc: "Vin rouge premier cru du domaine Chamirey.", productStatus: "active", productPicture: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80" }
const product2 = { productId: 2, producerId: producer2.producerId, categoryId: category1.categoryId, subcategoryId: subcategory2.subcategoryId, productName: "Bourgogne blanc", productPrice: 15, productDesc: "Vin blanc créé à partir de cépages régionaux.", productStatus: "active", productPicture: "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?auto=format&fit=crop&w=900&q=80" }
const product3 = { productId: 3, producerId: producer3.producerId, categoryId: category2.categoryId, subcategoryId: subcategory6.subcategoryId, productName: "Baguette au levain", productPrice: 1.5, productDesc: "Baguette croustillante au levain naturel.", productStatus: "active", productPicture: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=900&q=80" }
const product4 = { productId: 4, producerId: producer3.producerId, categoryId: category2.categoryId, subcategoryId: subcategory6.subcategoryId, productName: "Lot de 3 baguettes au levain", productPrice: 4, productDesc: "Lot de 3 baguettes croustillantes au levain.", productStatus: "active", productPicture: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80" }
const product5 = { productId: 5, producerId: producer1.producerId, categoryId: category4.categoryId, subcategoryId: subcategory7.subcategoryId, productName: "Panier maraîcher de saison", productPrice: 18.9, productDesc: "Panier de légumes frais cultivés à Crissey selon la saison.", productStatus: "active", productPicture: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80" }
const product6 = { productId: 6, producerId: producer1.producerId, categoryId: category4.categoryId, subcategoryId: subcategory7.subcategoryId, productName: "Poireaux bio", productPrice: 2.3, productDesc: "Poireaux frais vendus en botte, parfaits pour les soupes et gratins.", productStatus: "active", productPicture: "https://images.unsplash.com/photo-1602769515559-e15133a7e992?auto=format&fit=crop&w=900&q=80" }
const product7 = { productId: 7, producerId: producer4.producerId, categoryId: category3.categoryId, subcategoryId: subcategory3.subcategoryId, productName: "Colis de bœuf charolais", productPrice: 42, productDesc: "Colis de viande bovine locale préparé par une éleveuse de Charolles.", productStatus: "active", productPicture: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=900&q=80" }
const product8 = { productId: 8, producerId: producer4.producerId, categoryId: category3.categoryId, subcategoryId: subcategory5.subcategoryId, productName: "Terrine de campagne", productPrice: 6.5, productDesc: "Terrine artisanale préparée avec des produits du territoire.", productStatus: "active", productPicture: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80" }

const goToEvent1 = { producerId: producer1.producerId, eventsId: event2.eventsId }
const goToEvent2 = { producerId: producer2.producerId, eventsId: event2.eventsId }
const goToEvent3 = { producerId: producer3.producerId, eventsId: event3.eventsId }
const goToEvent4 = { producerId: producer4.producerId, eventsId: event4.eventsId }
const goToEvent5 = { producerId: producer1.producerId, eventsId: event5.eventsId }
const goToEvent6 = { producerId: producer2.producerId, eventsId: event5.eventsId }

// export
module.exports = {
    admin, association, usersAssociation,
    client1, user1, producer1, user2, producer2, user3, producer3, user4, producer4,
    event1, event2, event3, event4, event5,
    product1, product2, product3, product4, product5, product6, product7, product8,
    category1, category2, category3, category4,
    subcategory1, subcategory2, subcategory3, subcategory4, subcategory5, subcategory6, subcategory7, subcategory8,
    goToEvent1, goToEvent2, goToEvent3, goToEvent4, goToEvent5, goToEvent6
}
