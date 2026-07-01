// require
const {connexion} = require('./database.js')
const {ADMIN, ASSOCIATION, USERS_ASSOCIATION, USER_1, PRODUCER_1, USER_2, PRODUCER_2, EVENT_1, EVENT_2, EVENT_3, PRODUCT_1, PRODUCT_2, PRODUCT_3, PRODUCT_4, CATEGORY_1, CATEGORY_2, CATEGORY_3, SUBCATEGORY_1, SUBCATEGORY_2, SUBCATEGORY_3, SUBCATEGORY_4, SUBCATEGORY_5, SUBCATEGORY_6} = require('./const-seed.js')
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
    if (!error, result){
        if (result.rows.length == 1){
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
function findUserAssociation(usersId, associationId) {
    connexion.query(`
        SELECT * 
        FROM users_association 
        WHERE usersId = $1, associationId = $2
    `,  [usersId, associationId], (err,res)=>{

        if (handleFind(err, res) == 0) {
            connexion.end
            insertUserAssociation(associationId[usersId], associationId[associationId])
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
        INSERT INTO users 
        VALUES ($1, $2, $3, $4, $5, date($6), date($7), $8, $9, $10)
    `,  [value["usersEmail"], hashedPassword, value["usersGender"], value["usersLastName"], value["usersFirstName"], value["usersCreationDate"], value["usersLastConnexion"], value["usersRole"], value["usersStatus"], value["usersProfilePicture"]], (err,res)=>{

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
        INSERT INTO producer 
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
        INSERT INTO events 
        VALUES ($1, $2, $3, $4, $5, $6)
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
        INSERT INTO product 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `,  [value["productId"], value["producerId"], value["categoryId"], value["subcategoryId"], value["productName"], value["productPrice"], value["productDesc"], value["productStatus"]], (err,res)=>{
        
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

// call

dispatch("users", ADMIN)
dispatch("users", USER_1)
dispatch("users", USER_2)

dispatch("association", ASSOCIATION)
dispatch("usersAssociation", USERS_ASSOCIATION)

dispatch("producer", PRODUCER_1)
dispatch("producer", PRODUCER_2)

dispatch("userProducer", [USER_1["usersEmail"], PRODUCER_1["producerId"]])
dispatch("userProducer", [USER_2["usersEmail"], PRODUCER_2["producerId"]])

dispatch("events", EVENT_1)
dispatch("events", EVENT_2)
dispatch("events", EVENT_3)

dispatch("product", PRODUCT_1)
dispatch("product", PRODUCT_2)
dispatch("product", PRODUCT_3)
dispatch("product", PRODUCT_4)

dispatch("category", CATEGORY_1)
dispatch("category", CATEGORY_2)
dispatch("category", CATEGORY_3)

dispatch("subcategory", SUBCATEGORY_1)
dispatch("subcategory", SUBCATEGORY_2)
dispatch("subcategory", SUBCATEGORY_3)
dispatch("subcategory", SUBCATEGORY_4)
dispatch("subcategory", SUBCATEGORY_5)
dispatch("subcategory", SUBCATEGORY_6)