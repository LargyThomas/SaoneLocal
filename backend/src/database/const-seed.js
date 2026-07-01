// require
require('dotenv').config();

// const

const ADMIN = {usersEmail:process.env.SEED_ADMIN_EMAIL, usersPassword:process.env.SEED_ADMIN_PASSWORD, usersGender:"N", usersLastName:"Admin", usersFirstName:"Super", usersCreationDate:"19/05/2026", usersLastConnexion:"19/05/2026 11:00", usersRole:3, usersStatus:"active"}
const ASSOCIATION = {
    associationId:1, 
    associationValues:"Bon / Accessible / Local / Juste / Durable", 
    associationTestimony: "Je veux manger local, c'est pour cela que je me suis tourné vers SaoneLocal, j'ai découvert des produits de qualités et j'ai pu rencontrer les producteurs, c'est une expérience que je recommande à tous les consommateurs qui veulent manger local. - Jean Dupont", 
    associationDescHome: "SaoneLocal est une association de producteurs du bassin chalonnais qui se battent pour une rémunération plus juste des producteurs locaux. Rejoignez l'Aventure et aidé-nous à être rémunés au prix le plus juste", 
    associationLocalisation:"17 allées des locaux - 71100 Châlon - Sur - Saône",
    associationDescAbout: "SaoneLocal est une association regroupant une cinquantaine de producteurs locaux du bassin chalonnais. Vignerons, marîchers, apiculteurs, fromagers sont réunnis pour défendre une rémunérations plus juste des producteurs. Nous organisons des marchés de producteurs, des événements pour faire découvrir les produits locaux et nous sensibilisons les consommateurs à l'importance de consommer local.", 
    associationEmail: "saonelocal.contact@gmail.com",
    associationImage:"https://s11.aconvert.com/convert/p3r68-cdx67/cmzbd-uzdq0.jpg",
    associationNum:"0000000000"}

const USERS_ASSOCIATION = {userId:ADMIN["usersEmail"], associationId:ASSOCIATION["associationId"]}

const USER_1 = {usersEmail:process.env.SEED_PRODUCER1_EMAIL, usersPassword:process.env.SEED_PRODUCER1_PASSWORD, usersGender:"M", usersLastName:"Durand", usersFirstName:"Michel", usersCreationDate:"19/05/2026", usersLastConnexion:"19/05/2026 11:00", usersRole:2, usersStatus:"active"}
const PRODUCER_1 = {producerId:1, producerDesc:"Bonjour je m'appelle Michel Durand, je suis maraîcher à Crissey. Je vends de tout : les poireaux, tomates, courgettes, salades sont de sortit en saison. Mais ma plus grande fierté sont mes carottes.", producerLocalisation:"Crissey, Saône-et-Loire, 71530", producerSiretNum:"73284591027658", producerStatus:"active"}
const USER_2 = {usersEmail:process.env.SEED_PRODUCER2_EMAIL, usersPassword:process.env.SEED_PRODUCER2_PASSWORD, usersGender:"F", usersLastName:"Fontaine-Marchais", usersFirstName:"Isabelle", usersCreationDate:"19/05/2026", usersLastConnexion:"19/05/2026 11:00", usersRole:2, usersStatus:"active"}
const PRODUCER_2 = {producerId:2, producerDesc:"Bonjour je m'appelle Isabelle Fontaine-Marchais, je suis vigneronne au Domaine de la Côte Chalonnaise, Mercurey. Productrice de vins de Bourgogne depuis 1987.", producerLocalisation:"Mercurey, Saône-et-Loire, 71640", producerSiretNum:"58120479361584", producerStatus:"active"}

const EVENT_1 = {eventsId:1, eventsLocation:"Place d'armes - 71640 GIVRY", eventsDate:"25/06/2025 06:30", eventsName:"MARCHÉ DE GIVRY", eventsDesc:"La place d'Armes s’anime avec son marché matinale. Les commerçants proposent un large panel de produits : boulangerie, fruits et légumes, poissons et crustacés, oeufs, fromages, chocolats … il y en a pour tous les gouts ! Que vous soyez habitants ou touristes, venez faire le plein de produits frais !", eventsStatus:"active"}
const EVENT_2 = {eventsId:2, eventsLocation:"Place de la Mairie - 71100 SAINR-RÉMY", eventsDate:"04/08/2026 08:00", eventsName:"MARCHÉ DE SAINR-RÉMY", eventsDesc:"Un large choix de produits frais et locaux (fruits, légumes, fromages, charcuterie, viande, …) vous est proposé, ainsi que des animations ponctuelles. Venez nombreux !", eventsStatus:'active'}
const EVENT_3 = {eventsId:3, eventsLocation:"Place du Champ de Mars - 71400 AUTUN", eventsDate:"23/07/2026 13:00", eventsName:"GRANDE  D'AUTUN", eventsDesc:"Grande foire commerciale et agricole se déroulera la 23 juillet, accompagné d'une fête foraine et d'animations de rue.", eventsStatus:"active"}

const CATEGORY_1 = {categoryId:1, categoryName:"vin"}
const CATEGORY_2 = {categoryId:2, categoryName:"pain"}
const CATEGORY_3 = {categoryId:3, categoryName:"viande"}

const SUBCATEGORY_1 = {subcategoryId:1, categoryId:CATEGORY_1["categoryId"], subcategoryName:"vin rouge"}
const SUBCATEGORY_2 = {subcategoryId:2, categoryId:CATEGORY_1["categoryId"], subcategoryName:"vin blanc"}
const SUBCATEGORY_3 = {subcategoryId:3, categoryId:CATEGORY_3["categoryId"], subcategoryName:"viande rouge"}
const SUBCATEGORY_4 = {subcategoryId:4, categoryId:CATEGORY_3["categoryId"], subcategoryName:"viande blanche"}
const SUBCATEGORY_5 = {subcategoryId:5, categoryId:CATEGORY_3["categoryId"], subcategoryName:"charcuterie"}
const SUBCATEGORY_6 = {subcategoryId:6, categoryId:CATEGORY_2["categoryId"], subcategoryName:"pain au levin"}

const PRODUCT_1 = {productId:1, producerId:PRODUCER_1["producerId"], categoryId:CATEGORY_1["categoryId"], subcategoryId:SUBCATEGORY_1["subcategoryId"], productName:"clos du roi", productPrice:30, productDesc:"Ce vin est un premier cru du domain Chamirey.", productStatus:"active"}
const PRODUCT_2 = {productId:2, producerId:PRODUCER_1["producerId"], categoryId:CATEGORY_1["categoryId"], subcategoryId:SUBCATEGORY_2["subcategoryId"], productName:"bourgogne", productPrice:15, productDesc:"Vin créer à partir des saveurs régionals.", productStatus:"active"}
const PRODUCT_3 = {productId:3, producerId:PRODUCER_2["producerId"], categoryId:CATEGORY_2["categoryId"], subcategoryId:SUBCATEGORY_6["subcategoryId"], productName:"baguette au levain", productPrice:1.5, productDesc:"une baguette croustillante au levain", productStatus:"active"}
const PRODUCT_4 = {productId:4, producerId:PRODUCER_2["producerId"], categoryId:CATEGORY_2["categoryId"], subcategoryId:SUBCATEGORY_6["subcategoryId"], productName:"lot de 3 baguettes au levain", productPrice:4, productDesc: "lot de 3 baguettes croustillante au levain", productStatus:"active"}

// export
module.exports = {
    ADMIN, 
    ASSOCIATION, USERS_ASSOCIATION, 
    USER_1, PRODUCER_1, USER_2, PRODUCER_2,
    EVENT_1, EVENT_2, EVENT_3,
    PRODUCT_1, PRODUCT_2, PRODUCT_3, PRODUCT_4,
    CATEGORY_1, CATEGORY_2, CATEGORY_3,
    SUBCATEGORY_1, SUBCATEGORY_2, SUBCATEGORY_3, SUBCATEGORY_4, SUBCATEGORY_5, SUBCATEGORY_6
}