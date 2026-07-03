Test examples for each routes of Saône Local.
Here the 3 characters "___" will be used as a placeholder of a variable information


# Producer

### <span style="color:GreenYellow">GET</span> /api/producer/

**Body :** none

**Headers :** none

**Return :**
```
 if success > status 201
{
    "message": "Informations correctement récupérées.",

    "result": [
        {
            "usersfirstname": ___ ,
            "userslastname": ___ ,
            "usersprofilpicture": ___ ,
            "producerlocalisation": ___ ,
            "producerid": ___
        }, 
        ...
    ]
}

 if error > status 500
{
    "error": "Erreur serveur. Veuillez réessayer plus tard."
}
```

<u>last test :</u> 25/06/2026 11:59

___ 
### <span style="color:GreenYellow">GET</span> /api/producer/:id

**Body :** none

**Headers :** none

**Return :**
```
 if success > status 201
{
    "message": "Informations correctement récupérées.",

    "resultProducer": [
        {
            usersfirstname": ___ ,
            "userslastname": ___ ,
            "usersprofilpicture": ___ ,
            "userslastconnexion": ___ ,
            "producerdesc": ___ ,
            "producerlocalisation": ___ ,
            "producersiretnum": ___ ,
            "producerid": ___ ,
            "producerstatus": ___
        }
    ]

    "resultProduct": [
        {
            "productid": ___ ,
            "productname": ___ ,
            "productpicture": ___ ,
            "productprice": ___ ,
            "productstatus": ___
        },
        ...
    ],

    "resultEvent": [
        {
            "eventslocation": ___ ,
            "eventsdate": ___ ,
            "eventsname": ___
        },
        ...
    ]
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 29/06/2026 09:40

___
### <span style="color:GreenYellow">GET</span> /api/producer/:id/product

**Body :** none

**Headers :** none

**Return :**
```
 if success >
{
    "message": "Informations correctement récupérées.",

    "result": [
        {
            "productid": ___ ,
            "productname": ___ ,
            "productpicture": ___ ,
            "productprice": ___ ,
            "productstatus": "___
        },
        ...
    ]
}

 if error > status entre 400 et 500
{
    "error": "Erreur serveur. Veuillez réessayer plus tard"
}
```

<u>last test :</u> 25/06/2026 12:15

___
### <span style="color:GreenYellow">GET</span> /api/producer/profil

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` | 

**Return :**
```
 if success >
{
    "message": "Informations correctement récupérées.",

    "resultUser": [
        {
            "producerdesc": ___ ,
            "producerlocalisation": ___ ,
            "producersiretnum": ___ ,
            "usersfirstname": ___ ,
            "userslastname": ___ ,
            "usersgender": ___ ,
            "userscreationdate": ___ ,
            "usersprofilpicture": ___
        }
    ],

    "resultProduct": [
        {
            "productid": ___ ,
            "productname": ___ 
            "productpicture": ___
        },
        ...
    ],

    "resultOrder": [
        {
            "usersfirstname": ___ ,
            "userslastname": ___ ,
            "ordersid": ___ ,
            "ordersstatus": "n",
            "orderstotalcost": ___
        },
        ...
    ],

    "resultStatistique": {
        "statTotalCost": ___ ,
        "statTotalProduct": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 26/06/2026 10:27

___
### <span style="color:purple">PATCH</span> /api/producer/profil

**Body :** raw JSON v
```
{
    "key": ___ ,
    "value": ___
}
```

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 201
{
    "message": "Information correctement modifiée."
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 02/07/2026 16:02

___

# Orders

### <span style="color:GreenYellow">GET</span> /api/orders/

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success with a client account >
{
    "message": "Informations correctement récupérées.",

    "result": [
        {
            "ordersdate": ___ ,
            "ordersid": ___ ,
            "ordersstatus": ___ ,
            "orderstotalcost": ___ ,
            "ordersitemsquantity": ___ ,
            "ordersitemstotalcost": ___ ,
            "productname": ___
        },
        ...
    ]
}

 if success with a producer account >
{
    "message": "Informations correctement récupérées.",

    "result": [
        {
            "usersfirstname": ___ ,
            "userslastname": ___ ,
            "ordersid": ___ ,
            "ordersstatus": ___ ,
            "orderstotalcost": ___ ,
            "ordersitemsquantity": ___ ,
            "ordersitemstotalcost": ___ ,
            "productname": ___
        },
        ...
    ]
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 26/06/2026 16:43

___

### <span style="color:Yellow">POST</span> /api/orders/

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |   

**Return :**
```
 if success >
{
    "message": "Commande correctement effectuée."
}

 if error >
{
    "error": ___
}
```

<u>last test :</u> 26/06/2026 16:40

___

### <span style="color:Purple">PATCH</span> /api/orders/:id/status

**Body :** raw JSON v
```
{
    "ordersStatus": ___
}
```

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 201
{
    "message": "Statut de la commande correctement modifié."
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 28/06/2026 10:30

___

# Favorites

### <span style="color:GreenYellow">GET</span> /api/favorites/

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Informations correctement récupérées.",
    "result": [
        {
            "productid": ___ ,
            "producerid": ___ ,
            "categoryid": ___ ,
            "subcategoryid": ___ ,
            "productname": ___ ,
            "productprice": ___ ,
            "productdesc": ___ ,
            "productstatus": ___ ,
            "productpicture": ___ 
        },
    ]
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 28/06/2026 11:00

___

### <span style="color:Yellow">POST</span> /api/favorites/product

**Body :** raw JSON v
```
{
    "id": ___
}
```

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 201
{
    "message": "Favori ajouté."
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 28/06/2026 10:57

___

### <SPAN STYLE="COLOR:ORANGERED">DELETE</SPAN> /api/favorites/product/:id/

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Favori retiré."
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 28/06/2026 11:06

___

### <span style="color:Yellow">POST</span> /api/favorites/producer

**Body :** raw JSON v
```
{
    "id": ___
}
```

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 201
{
    "message": "Favori ajouté."
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 03/07/2026 11:20

___

### <SPAN STYLE="COLOR:ORANGERED">DELETE</SPAN> /api/favorites/producer/:id/

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Favori retiré."
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 03/07/2026 11:23

___


# Client

### <span style="color:GreenYellow">GET</span> /api/client/profil

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` | 

**Return :**
```
 if success >
{
    "message": "Information correctement récupéré",

    "resultUser": [
        {
            "usersfirstname": ___ ,
            "userslastname": ___ ,
            "usersgender": ___ ,
            "userscreationdate": ___ ,
            "usersprofilpicture": ___
        }
    ],

    "resultOrder": [

    ],

    "resultBasket": [
        {
            "productid": ___ ,
            "productname": ___ ,
            "productpicture": ___ ,
            "basketitemsquantity": ___ ,
            "basketitemstotalcost": ___ 
        },
        ...
    ],

    "resultFavoriteProduct": [

    ],

    "resultFavoriteProducer": [

    ]
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 26/06/2026 10:56

___
### <span style="color:purple">PATCH</span> /api/client/profil

**Body :** 
```
{
    "key": ___ ,
    "value": ___
}
```

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 201
{
    "message": "Information correctement modifiée."
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 26/06/2026 10:57

___

# Catalog

### <span style="color:GreenYellow">GET</span> /api/catalog/

**Body :** raw JSON v
```
{
    "search": ___ ,
    "category": ___ ,
    "subcategory": ___ ,
    "producer": ___ ,
    "page": ___
}
```

**Headers :** none

**Return :**
```
 if success > status 200
{
    "message": "Information correctement récupéré",

    "result": {
        "products": [
            {
                "productid": ___ ,
                "productname": ___ ,
                "productprice": ___ ,
                "productdesc": ___ ,
                "categoryname": ___ ,
                "subcategoryname": ___ ,
                "producerid": ___ ,
                "producerdesc": ___
            },
            ...
        ],
        "pagination": {
            "total": ___ ,
            "page": ___ ,
            "totalPages": ___ ,
            "limit": ___
        }
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 03/07/2026 16:22

___

### <span style="color:GreenYellow">GET</span> /api/catalog/:id

**Body :** none

**Headers :** none

**Return :**
```
 if success > status 200
{
    "message": "Information correctement récupéré",

    "result": {
        "productid": ___ ,
        "productname": ___ ,
        "productprice": ___ ,
        "productdesc": ___ ,
        "categoryname": ___ ,
        "subcategoryname": ___ ,
        "producerid": ___ ,
        "producerdesc": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 29/06/2026 10:25

___

### <span style="color:Yellow">POST</span> /api/catalog/

**Body :** raw JSON v
```
{
    "categoryid": ___ ,
    "subcategoryid": ___ ,
    "productname": ___ ,
    "productprice": ___ ,
    "productdesc": ___ ,
    "productpicture": ___
}
```
(only categoryid, productname and productprice are required field)

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` | 

**Return :**
```
 if success > status 201
{
    "message": "Produit correctement ajouté",
    "result": {
        "productid": ___ ,
        "producerid": ___ ,
        "categoryid": ___ ,
        "subcategoryid": ___ ,
        "productname": ___ ,
        "productprice": ___ ,
        "productdesc": ___ ,
        "productstatus": ___ ,
        "productpicture": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 29/06/2026 11:07

___

### <span style="color:purple">PATCH</span> /api/catalog/:id

**Body :** raw JSON v
```
{
    "categoryid": ___ ,
    "subcategoryid": ___ ,
    "productname": ___ ,
    "productprice": ___ ,
    "productdesc": ___ ,
    "productpicture": ___ 
}
```
(Each fields can be modify one by one, or with any combinations of fields)

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |

**Return :**
```
 if success > status 200
{
    "message": "Produit correctement modifié",
    
    "result": {
        "productid": ___ ,
        "producerid": ___ ,
        "categoryid": ___ ,
        "subcategoryid": ___ ,
        "productname": ___ ,
        "productprice": ___ ,
        "productdesc": ___ ,
        "productstatus": ___ ,
        "productpicture": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 00/00/0000 00:00

___

### <SPAN STYLE="COLOR:ORANGERED">DELETE</SPAN> /api/catalog/:id

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |

**Return :**
```
 if success > status 200
{
    "message": "Produit correctement supprimé"
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 29/06/2026 11:50

___

# calender

### <span style="color:GreenYellow">GET</span> /api/calendar/

**Body :** none

**Headers :** none

**Return :**
```
 if success > status 201
{
    "message": "Information correctement récupéré",

    "resultEvent": [
        {
            "eventsname": ___ ,
            "eventsdate": ___ ,
            "eventslocation": ___ ,
            "eventsdesc": ___
        },
        ...
    ],

    "resultProducer": [
        {
            "eventsname": ___ ,
            "eventsdate": ___ ,
            "usersemail": ___ ,
            "usersfirstname": ___ ,
            "userslastname": ___
        },
        ...
    ]
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 29/06/2026 00:12

___

### <span style="color:Yellow">POST</span> /api/calendar/

**Body :** raw JSON v
```
{
    "events": ___
}
```

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success >  status 201
{
    "message": "Information correctement ajouté"
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 29/06/2026 00:20

___

### <SPAN STYLE="COLOR:ORANGERED">DELETE</SPAN> /api/calendar/

**Body :** raw JSON v
```
{
    "events": ___
}
```

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 201
 {
    "message": "Information correctement supprimé"
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 29/06/2026 00:28

___

# basket

### <span style="color:GreenYellow">GET</span> /api/basket/

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` | 

**Return :**
```
 if success > status 200
{
    "message": "Information correctement récupéré",

    "result": {
        "user": ___ ,
        "items": [
            {
                "basketitemsid": ___ ,
                "basketitemsquantity":___ ,
                "productid": ___ ,
                "productname": ___ ,
                "productprice": ___ ,
                "itemtotalprice": ___
            },
            ...
        ],
        "total": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 26/06/2026 15:00

___

### <span style="color:Yellow">POST</span> /api/basket/

**Body :** raw JSON v
```
{
    "productId": ___ ,
    "quantity": ___
}
```

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` | 

**Return :**
```
 if success > status 
{
    "message": "Produit correctement ajouté",
    
    "result": {
        "user": ___ ,
        "items": [
            {
                "basketitemsid": ___ ,
                "basketitemsquantity":___ ,
                "productid": ___ ,
                "productname": ___ ,
                "productprice": ___ ,
                "itemtotalprice": ___
            },
            ...
        ],
        "total": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 26/06/2026 14:59

___

### <span style="color:OrangeRed">DELETE</span> /api/basket/:id

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` | 

**Return :**
```
 if success > status 201
{
    "message": "Produit correctement supprimé",
    "result": {
        "user": ___ ,
        "items": [
            {
                "basketitemsid": ___ ,
                "basketitemsquantity":___ ,
                "productid": ___ ,
                "productname": ___ ,
                "productprice": ___ ,
                "itemtotalprice": ___
            },
            ...
        ],
        "total": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 00/00/0000 00:00

___

# auth

### <span style="color:Yellow">POST</span> /api/auth/register

**Body :** raw JSON v
```
{
   "email": ___ ,
   "password": ___ ,
   "gender": ___ ,
   "lastName": ___ ,
   "firstName": ___
}
```

**Headers :** none

**Return :**
```
 if success > status 201
{
    "message": "Compte créé avec succès.",
    "user": {
        "usersemail": ___ ,
        "usersrole": ___ ,
        "userscreationdate": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 26/06/2026 10:10

___

### <span style="color:Yellow">POST</span> /api/auth/login

**Body :** raw JSON v
```
{
    "email": ___ ,
    "password": ___
}
```

**Headers :** none

**Return :**
```
 if success > status 202
{
    "message": "Connexion réussie."

    "token": ___ ,
    
    "user": {
        "email": ___ ,
        "role": ___ ,
        "createdAt": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 26/06/2026 09:54

___

# admin

### <span style="color:GreenYellow">GET</span> /api/admin/dashboard

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Information correctement récupéré",

    "dashboard": {
        "totalUsers": ___ ,
        "totalProducers": ___ ,
        "totalOrders": ___ ,
        "totalRevenue": ___ ,

        "recentOrders": [
            {
                "ordersid": ___ ,
                "ordersstatus": ___ ,
                "orderstotalcost": ___ ,
                "ordersdate": ___ ,
                "usersfirstname": ___ ,
                "userslastname": ___
            },
            ...
        ],

        "newUsers": [
            {
                "usersemail": ___ ,
                "usersfirstname": ___ ,
                "userslastname": ___ ,
                "usersrole": ___ ,
                "usersstatus": ___ ,
                "userscreationdate": ___
            },
            ...
        ],

        "ordersDistribution": [
            {
                "ordersstatus": "n",
                "total": "1"
            }
        ],

        "ordersEvolution": [
            {
                "ordersdate": ___ ,
                "total": ___ 
            }
        ]
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 29/06/2026 21:49

___

### <span style="color:GreenYellow">GET</span> /api/admin/association

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Information correctement récupéré",
    "result": [
        {
            "associationid": ___ ,
            "associationlocationoffice": ___ ,
            "associationvalues": ___ ,
            "associationtestimony": ___ ,
            "associationdeschome": ___ ,
            "associationdescabout": ___ ,
            "associationemail": ___ ,
            "associationnum": ___ 
        }
    ]
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 03/07/2026 23:34

___

### <SPAN STYLE="COLOR:LightSkyBlue">PUT</SPAN> /api/admin/association

**Body :** raw JSON v
```
{
    "key": ___ ,
    "value": ___
}
```

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Information correctement modifié",

    "user": {
        "usersemail": ___ ,
        "usersgender": ___ ,
        "userslastname": ___ ,
        "usersfirstname": ___ ,
        "usersrole": ___ ,
        "usersstatus": ___ ,
        "usersprofilpicture": ___ ,
        "userscreationdate": ___ ,
        "userslastconnexion": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 03/07/2026 23:41

___

### <span style="color:GreenYellow">GET</span> /api/admin/producers

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Information correctement récupéré"

    "producers": [
        {
            "producerid": ___ ,
            "producerdesc": ___ ,
            "producerlocalisation": ___ ,
            "producersiretnum": ___ ,
            "producerstatus": ___ ,
            "usersid": ___ ,
            "usersfirstname": ___ ,
            "userslastname": ___ ,
            "userscreationdate": ___ ,
            "usersstatus": ___
        },
        ...
    ]
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 29/06/2026 21:53

___

### <span style="color:Yellow">POST</span> /api/admin/producers

**Body :** raw JSON v
```
{
    "email": ___ ,
    "password": ___ ,
    "gender": ___ ,
    "lastName": ___ ,
    "firstName": ___ ,
    "producerSiretNum": ___
}
```

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > 201
{
    "message": "Producteur créé avec succès.",

    "producer": {
        "user": {
            "usersemail": ___ ,
            "usersgender": ___ ,
            "userslastname": ___ ,
            "usersfirstname": ___ ,
            "usersrole": ___ ,
            "usersstatus": ___ ,
            "userscreationdate": ___
        },
        "producer": {
            "producerid": ___ ,
            "producerdesc": ___ ,
            "producerlocalisation": ___ ,
            "producersiretnum": ___ ,
            "producerstatus": ___
        }
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 30/06/2026 09:10

___

### <SPAN STYLE="COLOR:ORANGERED">DELETE</SPAN> /api/admin/producers/:id

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Producteur désactivé avec succès.",

    "producer": {
        "producerId": ___ ,
        "producerSiretNum": ___ ,
        "producerStatus": ___ ,
        "usersEmail": ___ ,
        "usersStatus": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 30/06/2026 16:10

___

### <span style="color:purple">PATCH</span> /api/admin/producers/:id/enable

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Producteur activé avec succès.",

    "producer": {
        "producerId": ___ ,
        "producerSiretNum": ___ ,
        "producerStatus": "active" ,
        "usersEmail": ___ ,
        "usersStatus": "___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 00/00/0000 00:00

___

### <span style="color:GreenYellow">GET</span> /api/admin/users

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Information correctement récupéré",

    "users": [
        {
            "usersemail": ___ ,
            "usersgender": ___ ,
            "userslastname": ___ ,
            "usersfirstname": ___ ,
            "usersrole": ___ ,
            "usersstatus": ___ ,
            "usersprofilpicture": ___ ,
            "userscreationdate": ___ ,
            "userslastconnexion": ___
        },
        ...
    ]
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 29/06/2026 21:56

___

### <span style="color:GreenYellow">GET</span> /api/admin/users/:email

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Information correctement récupéré",

    "user": {
        "usersemail": ___ ,
        "usersgender": ___ ,
        "userslastname": ___ ,
        "usersfirstname": ___ ,
        "usersrole": ___ ,
        "usersstatus": ___ ,
        "usersprofilpicture": ___ ,
        "userscreationdate": ___ ,
        "userslastconnexion": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 29/06/2026 21:58

___

### <SPAN STYLE="COLOR:LightSkyBlue">PUT</SPAN> /api/admin/users/:email

**Body :** raw JSON v
```
{
    "usersRole": ___ ,
    "usersStatus": ___
}
```

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Utilisateur mis à jour avec succès.",

    "user": {
        "usersemail": ___ ,
        "usersgender": ___ ,
        "userslastname": ___ ,
        "usersfirstname": ___ ,
        "usersrole": ___ ,
        "usersstatus": ___ ,
        "usersprofilpicture": ___ ,
        "userscreationdate": ___ ,
        "userslastconnexion": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 03/07/2026 23:41

___

### <span style="color:GreenYellow">GET</span> /api/admin/orders

**Body :** none

**Headers :**
**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Information correctement récupéré",

    "orders": [
        {
            "ordersid": ___ ,
            "usersid": ___ ,
            "orderstotalcost": ___ ,
            "ordersdate": ___ ,
            "ordersstatus": ___ ,
            "usersfirstname": ___ ,
            "userslastname": ___
        },
        ...
    ]
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 30/06/2026 07:43

___

### <span style="color:GreenYellow">GET</span> /api/admin/orders/:orderId

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Information correctement récupéré",

    "order": {
        "ordersid": ___ ,
        "usersid": ___ ,
        "orderstotalcost": ___ ,
        "ordersdate": ___ ,
        "ordersstatus": ___ ,
        "usersfirstname": ___ ,
        "userslastname":___ ,
        "items": [
            {
                "ordersitemsid": ___ ,
                "productid": ___ ,
                "ordersitemsquantity": ___ ,
                "ordersitemstotalcost": ___ ,
                "productname": ___ ,
                "productprice": ___ ,
                "productstatus": ___ ,
                "producerid": ___ ,
                "producersiretnum": ___
            },
            ...
        ]
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 00/00/0000 00:00

___

### <span style="color:purple">PATCH</span> /api/admin/orders/:orderId/status

**Body :** raw JSON v
```
{
     "ordersStatus": ___
}
```

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Statut de commande mis à jour avec succès.",

    "order": {
        "ordersid": ___ ,
        "usersid": ___ ,
        "orderstotalcost": ___ ,
        "ordersdate": ___ ,
        "ordersstatus": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 30/06/2026 08:08

___

### <span style="color:purple">PATCH</span> /api/admin/orders/:orderId/cancel

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Commande annulée avec succès.",

    "order": {
        "ordersid": ___ ,
        "usersid": ___ ,
        "orderstotalcost": ___ ,
        "ordersdate": ___ ,
        "ordersstatus": "a"
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 30/06/2026 08:10

___

### <span style="color:GreenYellow">GET</span> /api/admin/products 

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Information correctement récupéré",

    "products": [
        {
            "productid": ___ ,
            "producerid": ___ ,
            "categoryid": ___ ,
            "subcategoryid": ___ ,
            "productname": ___ ,
            "productprice": ___ ,
            "productdesc": ___ ,
            "productstatus": ___ ,
            "productpicture": ___ ,
            "producersiretnum": ___ ,
            "categoryname": ___ ,
            "subcategoryname": ___
        },
        ...
    ]
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 0/06/2026 07:48

___

### <span style="color:GreenYellow">GET</span> /api/admin/products/:productId

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Information correctement récupéré",

    "products": {
        "productid": ___ ,
        "producerid": ___ ,
        "categoryid": ___ ,
        "subcategoryid": ___ ,
        "productname": ___ ,
        "productprice": ___ ,
        "productdesc": ___ ,
        "productstatus": ___ ,
        "productpicture": ___ ,
        "producersiretnum": ___ ,
        "categoryname": ___ ,
        "subcategoryname": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 30/06/2026 07:50

___

### <span style="color:purple">PATCH</span> /api/admin/products/:productId/disable

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success >
{
    "message": "Produit désactivé avec succès.",

    "product": {
        "productid": ___ ,
        "producerid": ___ ,
        "categoryid": ___ ,
        "subcategoryid": ___ ,
        "productname": ___ ,
        "productprice": ___ ,
        "productdesc": ___ ,
        "productstatus": "inactive",
        "productpicture": ___ 
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 30/06/2026 08:15

___

### <span style="color:purple">PATCH</span> /api/admin/products/:productId/enable

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Produit activé avec succès.",

    "product": {
        "productid": ___ ,
        "producerid": ___ ,
        "categoryid": ___ ,
        "subcategoryid": ___ ,
        "productname": ___ ,
        "productprice": ___ ,
        "productdesc": ___ ,
        "productstatus": "active",
        "productpicture": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 30/06/2026 08:17

___

### <SPAN STYLE="COLOR:ORANGERED">DELETE</SPAN> /api/admin/products/:productId

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Produit supprimé avec succès.",

    "product": {
        "productid": ___ ,
        "productname": ___ ,
        "productstatus": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 30/06/2026 15:58

___

### <span style="color:GreenYellow">GET</span> /api/admin/events

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Information correctement récupéré",

    "events": [
        {
            "eventsid": ___ ,
            "eventslocation": ___ ,
            "eventsdate": ___ ,
            "eventsname": ___ ,
            "eventsdesc": ___ 
        },
        ...
    ]
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 30/06/2026 07:53

___

### <span style="color:GreenYellow">GET</span> /api/admin/events/:eventId

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Information correctement récupéré",

    "event": {
        "eventsid": ___ ,
        "eventslocation": ___ ,
        "eventsdate":ss ___ ,
        "eventsname": ___ ,
        "eventsdesc": ___ 
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 30/06/2026 07:55

___

### <span style="color:Yellow">POST</span> /api/admin/events

**Body :** raw JSON v
```
{
    "eventsLocation": ___ ,
    "eventsDate": ___ ,
    "eventsName": ___ ,
    "eventsDesc": ___
}
```

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 201
{
    "message": "Événement créé avec succès.",

    "event": {
        "eventsid": ___ ,
        "eventslocation": ___ ,
        "eventsdate": ___ ,
        "eventsname": ___ ,
        "eventsdesc": ___ ,
        "eventsstatus": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 12/07/2026 12:20

___

### <SPAN STYLE="COLOR:LightSkyBlue">PUT</SPAN> /api/admin/events/:eventId

**Body :** raw JSON v
```
{
    "eventsLocation": ___ ,
    "eventsDate": ___ ,
    "eventsName": ___ ,
    "eventsDesc": ___ 
}
```

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Événement mis à jour avec succès.",
    "event": {
        "eventsid": ___ ,
        "eventslocation": ___ ,
        "eventsdate": ___ ,
        "eventsname": ___ ,
        "eventsdesc": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 01/07/2026 12:35

___

### <span style="color:purple">PATCH</span> /api/admin/events/:eventId/disable

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Événement désactivé avec succès.",

    "event": {
        "eventsid": ___ ,
        "eventslocation": ___ ,
        "eventsdate": ___ ,
        "eventsname": ___ ,
        "eventsdesc": ___ ,
        "eventsstatus": "inactive"
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 30/06/2026 08:20

___

### <span style="color:purple">PATCH</span> /api/admin/events/:eventId/enable

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200 
{
    "message": "Événement activé avec succès.",
    "event": {
        "eventsid": ___ ,
        "eventslocation": ___ ,
        "eventsdate": ___ ,
        "eventsname": ___ ,
        "eventsdesc": ___ ,
        "eventsstatus": "active"
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 30/06/2026 08:21

___

### <SPAN STYLE="COLOR:ORANGERED">DELETE</SPAN> /api/admin/events/:eventId

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  
**Return :**
```
 if success > status 200
{
    "message": "Événement supprimé avec succès.",

    "event": {
        "eventsid": ___ ,
        "eventslocation": ___ ,
        "eventsdate": ___ ,
        "eventsname": ___ ,
        "eventsdesc": ___
    }
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 01/07/2026 14:41

___

### <span style="color:GreenYellow">GET</span> /api/admin/logs

**Body :** none

**Headers :**
| Key | Value |
|---|---|
| Authorization | Bearer `TOKEN GIVEN BY THE LOGIN` |  

**Return :**
```
 if success > status 200
{
    "message": "Information correctement récupéré",

    "logs": [
        {
            "user": ___ ,
            "action": ___ ,
            "target": ___ ,
            "date": ___
        },
        ...
    ]
}

 if error > status entre 400 et 500
{
    "error": ___
}
```

<u>last test :</u> 30/06/2026 08:00

___