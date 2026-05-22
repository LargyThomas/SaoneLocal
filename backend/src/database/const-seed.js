require('dotenv').config();

const admin = {usersEmail:process.env.SEED_ADMIN_EMAIL, usersPassword:process.env.SEED_ADMIN_PASSWORD, usersGender:"N", usersLastName:"Admin", usersFirstName:"Super", usersCreationDate:"19/05/2026", usersLastConnexion:"19/05/2026 11:00", usersRole:3}
const association = {associationId:1, 
    associationValues:"Bon / Accessible / Local / Juste / Durable", 
    associationTestimony: "Je veux manger local, c'est pour cela que je me suis tourné vers SaoneLocal, j'ai découvert des produits de qualités et j'ai pu rencontrer les producteurs, c'est une expérience que je recommande à tous les consommateurs qui veulent manger local. - Jean Dupont", 
    associationDescHome: "SaoneLocal est une association de producteurs du bassin chalonnais qui se battent pour une rémunération plus juste des producteurs locaux. Rejoignez l'Aventure et aidé-nous à être rémunés au prix le plus juste", 
    associationDescAbout: "SaoneLocal est une association regroupant une cinquantaine de producteurs locaux du bassin chalonnais. Vignerons, marîchers, apiculteurs, fromagers sont réunnis pour défendre une rémunérations plus juste des producteurs. Nous organisons des marchés de producteurs, des événements pour faire découvrir les produits locaux et nous sensibilisons les consommateurs à l'importance de consommer local.", 
    associationEmail: "saonelocal.contact@gmail.com",
    associationImage:"https://s11.aconvert.com/convert/p3r68-cdx67/cmzbd-uzdq0.jpg"}
const users_association = {userId:admin["usersEmail"], associationId:association["associationId"]}

const user1 = {usersEmail:process.env.SEED_PRODUCER1_EMAIL, usersPassword:process.env.SEED_PRODUCER1_PASSWORD, usersGender:"M", usersLastName:"Durand", usersFirstName:"Michel", usersCreationDate:"19/05/2026", usersLastConnexion:"19/05/2026 11:00", usersRole:2}
const producer1 = {producerId:1, producerDesc:"Bonjour je m'appelle Michel Durand, je suis maraîcher à Crissey. Je vends de tout : les poireaux, tomates, courgettes, salades sont de sortit en saison. Mais ma plus grande fierté sont mes carottes.", producerLocalisation:"Crissey, Saône-et-Loire, 71530", producerSiretNum:"73284591027658"}
const user2 = {usersEmail:process.env.SEED_PRODUCER2_EMAIL, usersPassword:process.env.SEED_PRODUCER2_PASSWORD, usersGender:"F", usersLastName:"Fontaine-Marchais", usersFirstName:"Isabelle", usersCreationDate:"19/05/2026", usersLastConnexion:"19/05/2026 11:00", usersRole:2}
const producer2 = {producerId:2, producerDesc:"Bonjour je m'appelle Isabelle Fontaine-Marchais, je suis vigneronne au Domaine de la Côte Chalonnaise, Mercurey. Productrice de vins de Bourgogne depuis 1987.", producerLocalisation:"Mercurey, Saône-et-Loire, 71640)", producerSiretNum:"58120479361584"}

const event1 = {eventsId:1, eventsLocation:"Place d'armes - 71640 GIVRY", eventsDate:"25/06/2025 06:30", eventsName:"MARCHÉ DE GIVRY", eventsDesc:"La place d'Armes s’anime avec son marché matinale. Les commerçants proposent un large panel de produits : boulangerie, fruits et légumes, poissons et crustacés, oeufs, fromages, chocolats … il y en a pour tous les gouts ! Que vous soyez habitants ou touristes, venez faire le plein de produits frais !"}
const event2 = {eventsId:2, eventsLocation:"Place de la Mairie - 71100 SAINR-RÉMY", eventsDate:"04/08/2026 08:00", eventsName:"MARCHÉ DE SAINR-RÉMY", eventsDesc:"Un large choix de produits frais et locaux (fruits, légumes, fromages, charcuterie, viande, …) vous est proposé, ainsi que des animations ponctuelles. Venez nombreux !"}
const event3 = {eventsId:3, eventsLocation:"Place du Champ de Mars - 71400 AUTUN", eventsDate:"23/07/2026 13:00", eventsName:"GRANDE  D'AUTUN", eventsDesc:"Grande foire commerciale et agricole se déroulera la 23 juillet, accompagné d'une fête foraine et d'animations de rue."}

const category1 = {categoryId:1, categoryName:"vin"}
const category2 = {categoryId:2, categoryName:"pain"}
const category3 = {categoryId:3, categoryName:"viande"}

const subcategory1 = {subcategoryId:1, categoryId:category1["categoryId"], subcategoryName:"vin rouge"}
const subcategory2 = {subcategoryId:2, categoryId:category1["categoryId"], subcategoryName:"vin blanc"}
const subcategory3 = {subcategoryId:3, categoryId:category3["categoryId"], subcategoryName:"viande rouge"}
const subcategory4 = {subcategoryId:4, categoryId:category3["categoryId"], subcategoryName:"viande blanche"}
const subcategory5 = {subcategoryId:5, categoryId:category3["categoryId"], subcategoryName:"charcuterie"}
const subcategory6 = {subcategoryId:6, categoryId:category2["categoryId"], subcategoryName:"pain au levin"}

const product1 = {productId:1, producerId:producer1["producerId"], categoryId:category1["categoryId"], subcategoryId:subcategory1["subcategoryId"], productName:"clos du roi", productPrice:30, productDesc:"Ce vin est un premier cru du domain Chamirey."}
const product2 = {productId:2, producerId:producer1["producerId"], categoryId:category1["categoryId"], subcategoryId:subcategory2["subcategoryId"], productName:"bourgogne", productPrice:15, productDesc:"Vin créer à partir des saveurs régionals."}
const product3 = {productId:3, producerId:producer2["producerId"], categoryId:category2["categoryId"], subcategoryId:subcategory6["subcategoryId"], productName:"baguette au levain", productPrice:1.5, productDesc:"une baguette croustillante au levain"}
const product4 = {productId:4, producerId:producer2["producerId"], categoryId:category2["categoryId"], subcategoryId:subcategory6["subcategoryId"], productName:"lot de 3 baguettes au levain", productPrice:4, productDesc: "lot de 3 baguettes croustillante au levain"}

module.exports = {admin, association, users_association, user1, producer1, user2, producer2,
    event1, event2, event3,
    product1, product2, product3, product4,
    category1, category2, category3,
    subcategory1, subcategory2, subcategory3, subcategory4, subcategory5, subcategory6}