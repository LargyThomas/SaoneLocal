// require
const {connexion} = require('./database.js')
const {
    admin, association, usersAssociation,
    client1, user1, producer1, user2, producer2, user3, producer3, user4, producer4,
    event1, event2, event3, event4, event5,
    product1, product2, product3, product4, product5, product6, product7, product8,
    category1, category2, category3, category4,
    subcategory1, subcategory2, subcategory3, subcategory4, subcategory5, subcategory6, subcategory7, subcategory8,
    goToEvent1, goToEvent2, goToEvent3, goToEvent4, goToEvent5, goToEvent6
} = require('./const-seed.js')
const { hashPassword } = require('../security/crypto.js')

// function

// handle

/**
* @description handle the error when doing a query
* @param {hash} error, the error
* @return {int} 1 if there is no error and -1 if there is an error
*/
function handleErr(error) {
    if (!error){
        return 1
    }else{
        console.log(error.message)
        return -1
    }
}

/**
* @description return if the information exist (when doing a finding query)
* @param {hash} error, the error
* @return {int} 1 if the information exist, 0 if not, -1 if there is an error
*/
function handleFind(error, result) {
    let var_return = 0
    if (!error && result){
        if (result.rows.length >= 1){
            var_return = 1
        }
    }else{
        console.log(error.message)
        var_return = -1
    }
    return var_return
}

/**
* @description execute the right finding and insert function for the KeyWord
* @param {string} keyWord, the error
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function dispatch(keyWord, value) {
    switch (keyWord) {
        case "users":
            findUser(value)
            break
        case "producer":
            findProducer(value)
            break
        case "userProducer":
            findUserProducer(value[0], value[1])
            break
        case "events":
            findEvent(value)
            break
        case "product":
            findProduct(value)
            break
        case "category":
            findCategory(value)
            break
        case "subcategory":
            findSubcategory(value)
            break
        case "association":
            findAssociation(value)
            break
        case "userAssociation":
            findUserAssociation(value)
            break
        case "goToEvent":
            findGoToEvent(value)
            break
    }
    connexion.end
}

// find

/**
* @description find if the user with the values value already exist, if not it will be insert in the database
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function findUser(value) {
    connexion.query(`
        SELECT *
        FROM users
        WHERE usersemail = $1
    `,  [value["usersEmail"]], (err,res)=>{

        if (handleFind(err, res) == 0) {
            connexion.end
            insertUser(value)
        }
        connexion.end
    })
}

/**
* @description find if the producer with the values value already exist, if not it will be insert in the database
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function findProducer(value) {
    connexion.query(`
        SELECT *
        FROM producer
        WHERE producerid = $1
    `,  [value["producerId"]], (err,res)=>{

        if (handleFind(err, res) == 0) {
            connexion.end
            insertProducer(value)
        }
        connexion.end
    })
}

/**
* @description find if the link beetween user and producer with the values value already exist, if not it will be insert in the database
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function findUserProducer(usersId, producerId) {
    connexion.query(`
        SELECT *
        FROM user_producer
        WHERE usersid = $1
        AND producerid = $2
    `,  [usersId, producerId], (err,res)=>{

        if (handleFind(err, res) == 0) {
            connexion.end
            insertUserProducer(usersId, producerId)
        }
        connexion.end
    })
}

/**
* @description find if the event with the values value already exist, if not it will be insert in the database
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function findEvent(value) {
    connexion.query(`
        SELECT *
        FROM events
        WHERE eventsid = $1
    `,  [value["eventsId"]], (err,res)=>{

        if (handleFind(err, res) == 0) {
            connexion.end
            insertEvent(value)
        }
        connexion.end
    })
}

/**
* @description find if the product with the values value already exist, if not it will be insert in the database
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function findProduct(value) {
    connexion.query(`
        SELECT *
        FROM product
        WHERE productid = $1
    `,  [value["productId"]], (err,res)=>{

        if (handleFind(err, res) == 0) {
            connexion.end
            insertProduct(value)
        }
        connexion.end
    })
}

/**
* @description find if the category with the values value already exist, if not it will be insert in the database
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function findCategory(value) {
    connexion.query(`
        SELECT *
        FROM category
        WHERE categoryid = $1
    `,  [value["categoryId"]], (err,res)=>{

        if (handleFind(err, res) == 0) {
            connexion.end
            insertCategory(value)
        }
        connexion.end
    })
}

/**
* @description find if the subcategory with the values value already exist, if not it will be insert in the database
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function findSubcategory(value) {
    connexion.query(`
        SELECT *
        FROM subcategory
        WHERE subcategoryid = $1
    `,  [value["subcategoryId"]], (err,res)=>{

        if (handleFind(err, res) == 0) {
            connexion.end
            insertSubcategory(value)
        }
        connexion.end
    })
}

/**
* @description find if the association with the values value already exist, if not it will be insert in the database
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function findAssociation(value) {
    connexion.query(`
        SELECT *
        FROM association
        WHERE associationId = $1
    `,  [value["associationId"]], (err,res)=>{

        if (handleFind(err, res) == 0) {
            connexion.end
            insertAssociation(value)
        }
        connexion.end
    })
}

/**
* @description find if the user managing the association with the values value already exist, if not it will be insert in the database
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function findUserAssociation(value) {
    connexion.query(`
        SELECT *
        FROM user_association
        WHERE usersId = $1
        AND associationId = $2
    `,  [value["userId"], value["associationId"]], (err,res)=>{

        if (handleFind(err, res) == 0) {
            connexion.end
            insertUserAssociation(value)
        }
        connexion.end
    })
}

/**
* @description find if the producer is already linked to the event, if not it will be insert in the database
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function findGoToEvent(value) {
    connexion.query(`
        SELECT *
        FROM go_to_events
        WHERE producerId = $1
        AND eventsId = $2
    `,  [value["producerId"], value["eventsId"]], (err,res)=>{

        if (handleFind(err, res) == 0) {
            connexion.end
            insertGoToEvent(value)
        }
        connexion.end
    })
}

// insert

/**
* @description insert in the database the user with the values value
* @param {hash} value, the values of the new entitie to insert
* @return
*/
async function insertUser(value) {
    const hashedPassword = await hashPassword(value["usersPassword"])
    connexion.query(`
        INSERT INTO users(usersEmail, usersPassword, usersGender, usersLastname, usersFirstname, usersCreationDate, usersLastConnexion, usersRole, usersStatus, usersProfilPicture)
        VALUES ($1, $2, $3, $4, $5, date($6), date($7), $8, $9, $10)
    `,  [value["usersEmail"], hashedPassword, value["usersGender"], value["usersLastName"], value["usersFirstName"], value["usersCreationDate"], value["usersLastConnexion"], value["usersRole"], value["usersStatus"], value["usersProfilePicture"] || null], (err,res)=>{

        connexion.end
        return handleErr(err)
    })
}

/**
* @description insert in the database the producer with the values value
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function insertProducer(value) {
    connexion.query(`
        INSERT INTO producer(producerId, producerDesc, producerLocalisation, producerSiretNum, producerStatus)
        VALUES ($1, $2, $3, $4, $5)
    `,  [value["producerId"], value["producerDesc"], value["producerLocalisation"], value["producerSiretNum"], value["producerStatus"]], (err,res)=>{

        connexion.end
        return handleErr(err)
    })
}

/**
* @description insert in the database the link beetween user and producer with the values value
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function insertUserProducer(usersId, producerId) {
    connexion.query(`
        INSERT INTO user_producer
        VALUES ($1, $2)
    `,  [usersId, producerId], (err,res)=>{

        connexion.end
        return handleErr(err)
    })
}

/**
* @description insert in the database the event with the values value
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function insertEvent(value) {
    connexion.query(`
        INSERT INTO events(eventsId, eventsLocation, eventsDate, eventsName, eventsDesc, eventsStatus)
        VALUES ($1, $2, date($3), $4, $5, $6)
    `,  [value["eventsId"], value["eventsLocation"], value["eventsDate"], value["eventsName"], value["eventsDesc"], value["eventsStatus"]], (err,res)=>{

        connexion.end
        return handleErr(err)
    })
}


/**
* @description insert in the database the product with the values value
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function insertProduct(value) {
    connexion.query(`
        INSERT INTO product(productId, producerId, categoryId, subcategoryId, productName, productPrice, productDesc, productStatus, productPicture)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `,  [value["productId"], value["producerId"], value["categoryId"], value["subcategoryId"], value["productName"], value["productPrice"], value["productDesc"], value["productStatus"], value["productPicture"] || null], (err,res)=>{

        connexion.end
        return handleErr(err)
    })
}


/**
* @description insert in the database the category with the values value
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function insertCategory(value) {
    connexion.query(`
        INSERT INTO category
        VALUES ($1, $2)
    `,  [value["categoryId"], value["categoryName"]], (err,res)=>{

        connexion.end
        return handleErr(err)
    })
}


/**
* @description insert in the database the subcategory with the values value
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function insertSubcategory(value) {
    connexion.query(`
        INSERT INTO subcategory
        VALUES ($1, $2, $3)
    `,  [value["subcategoryId"], value["categoryId"], value["subcategoryName"]], (err,res)=>{

        connexion.end
        return handleErr(err)
    })
}


/**
* @description insert in the database the association with the values value
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function insertAssociation(value) {
    connexion.query(`
        INSERT INTO association
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `,  [value["associationId"], value["associationLocalisation"], value["associationValues"], value["associationTestimony"], value["associationDescHome"], value["associationDescAbout"], value["associationEmail"], value["associationNum"]], (err,res)=>{

        connexion.end
        return handleErr(err)
    })
}


/**
* @description insert in the database the user managing the association with the values value
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function insertUserAssociation(value) {
    connexion.query(`
        INSERT INTO user_association
        VALUES ($1, $2)
    `,  [value["userId"], value["associationId"]], (err,res)=>{

        connexion.end
        return handleErr(err)
    })
}

/**
* @description insert in the database the link beetween a producer and an event with the values value
* @param {hash} value, the values of the new entitie to insert
* @return
*/
function insertGoToEvent(value) {
    connexion.query(`
        INSERT INTO go_to_events(producerId, eventsId)
        VALUES ($1, $2)
    `,  [value["producerId"], value["eventsId"]], (err,res)=>{

        connexion.end
        return handleErr(err)
    })
}

// call

dispatch("users", admin)
dispatch("users", client1)
dispatch("users", user1)
dispatch("users", user2)
dispatch("users", user3)
dispatch("users", user4)

dispatch("association", association)
dispatch("userAssociation", usersAssociation)

dispatch("producer", producer1)
dispatch("producer", producer2)
dispatch("producer", producer3)
dispatch("producer", producer4)

dispatch("userProducer", [user1["usersEmail"], producer1["producerId"]])
dispatch("userProducer", [user2["usersEmail"], producer2["producerId"]])
dispatch("userProducer", [user3["usersEmail"], producer3["producerId"]])
dispatch("userProducer", [user4["usersEmail"], producer4["producerId"]])

dispatch("events", event1)
dispatch("events", event2)
dispatch("events", event3)
dispatch("events", event4)
dispatch("events", event5)

dispatch("product", product1)
dispatch("product", product2)
dispatch("product", product3)
dispatch("product", product4)
dispatch("product", product5)
dispatch("product", product6)
dispatch("product", product7)
dispatch("product", product8)

dispatch("category", category1)
dispatch("category", category2)
dispatch("category", category3)
dispatch("category", category4)

dispatch("subcategory", subcategory1)
dispatch("subcategory", subcategory2)
dispatch("subcategory", subcategory3)
dispatch("subcategory", subcategory4)
dispatch("subcategory", subcategory5)
dispatch("subcategory", subcategory6)
dispatch("subcategory", subcategory7)
dispatch("subcategory", subcategory8)

dispatch("goToEvent", goToEvent1)
dispatch("goToEvent", goToEvent2)
dispatch("goToEvent", goToEvent3)
dispatch("goToEvent", goToEvent4)
dispatch("goToEvent", goToEvent5)
dispatch("goToEvent", goToEvent6)
