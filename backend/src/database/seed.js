// require

const {connexion} = require('./database.js')
const {admin, user1, producer1, user2, producer2, event1, event2, event3} = require('./const-seed.js')

// function gestion

function gestionErr(error) {
    if (!error){
        return 1
    }else{
        console.log(error.message)
        return -1
    }
}

function gestionFind(error, result) {
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

function dispatch(keyWord, values) {
    switch (keyWord) {
        case "users":
            findUsers(values)
            break
        case "producer":
            findProducer(values)
            break
        case "user-producer":
            findUserProducer(values[0], values[1])
            break
        case "events":
            findEvents(values)
            break
    }
    connexion.end
}

// function find

function findUsers(values) {
    connexion.query('Select * from users where usersemail = $1', [values["usersEmail"]], (err,res)=>{
        if (gestionFind(err, res) == 0) {
            connexion.end
            insertUsers(values)
        }
        connexion.end
    })
}

function findProducer(values) {
    connexion.query('Select * from producer where producerid = $1', [values["producerId"]], (err,res)=>{
        if (gestionFind(err, res) == 0) {
            connexion.end
            insertProducer(values)
        }
        connexion.end
    })
}

function findUserProducer(usersId, producerId) {
    connexion.query('Select * from user_producer where usersid = $1 and producerid = $2', [usersId, producerId], (err,res)=>{
        if (gestionFind(err, res) == 0) {
            connexion.end
            insertUserProducer(usersId, producerId)
        }
        connexion.end
    })
}

function findEvents(values) {
    connexion.query('Select * from events where eventsid = $1', [values["eventsId"]], (err,res)=>{
        if (gestionFind(err, res) == 0) {
            connexion.end
            insertEvents(values)
        }
        connexion.end
    })
}

// function insert

function insertUsers(values) {
    connexion.query('Insert into users values ($1, $2, $3, $4, $5, date($6), date($7), $8)', [values["usersEmail"], values["usersPassword"], values["usersGender"], values["usersLastName"], values["usersFirstName"], values["usersCreationDate"], values["usersLastConnexion"], values["usersRole"]], (err,res)=>{
        connexion.end
        return gestionErr(err)
    })
}

function insertProducer(values) {
    connexion.query('Insert into producer values ($1, $2, $3)', [values["producerId"], values["producerDesc"], values["producerSiretNum"]], (err,res)=>{
        connexion.end
        return gestionErr(err)
    })
}

function insertUserProducer(usersId, producerId) {
    connexion.query('Insert into user_producer values ($1, $2)', [usersId, producerId], (err,res)=>{
        connexion.end
        return gestionErr(err)
    })
}

function insertEvents(values) { 
    connexion.query('Insert into events values ($1, $2, $3, $4, $5)', [values["eventsId"], values["eventsLocation"], values["eventsDate"], values["eventsName"], values["eventsDesc"]], (err,res)=>{
        connexion.end
        return gestionErr(err)
    })
}

// call of the functions

dispatch("users", admin)
dispatch("users", user1)
dispatch("users", user2)

dispatch("producer", producer1)
dispatch("producer", producer2)

dispatch("user-producer", [user1["usersEmail"], producer1["producerId"]])
dispatch("user-producer", [user2["usersEmail"], producer2["producerId"]])

dispatch("events", event1)
dispatch("events", event2)
dispatch("events", event3)
