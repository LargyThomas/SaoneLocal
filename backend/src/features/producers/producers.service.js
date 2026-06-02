// producers.service.js\n// TODO: implement producers service logic\n\nmodule.exports = {};\n

const { connexion } = require('../../database/database.js')
const { checkout } = require('./producers.routes.js')

findAllProducer = async (req, res) => {
    const result = await connexion.query("SELECT users.usersfirstname, users.userslastname, users.usersProfilPicture, producer.producerLocalisation, producer.producerId FROM user_producer JOIN users ON user_producer.usersId = users.usersEmail JOIN producer ON user_producer.producerId = producer.producerId WHERE producer.producerStatus = 'active'")
    return result.rows
}

findProducerId = async (req, res) => {
    const result = await connexion.query("SELECT users.usersfirstname, users.userslastname, users.usersProfilPicture, users.usersLastConnexion, producer.producerDesc, producer.producerLocalisation, producer.producerSiretNum, producer.producerId, producerStatus FROM user_producer JOIN users ON user_producer.usersId = users.usersEmail JOIN producer ON user_producer.producerId = producer.producerId WHERE producer.producerId = $1", [req.params.id])
    
    if (result.rows.length === 0) {
        throw new Error('THIS_ID_DOES_NOT_EXIST')
    }
    
    if (result.rows[0]["producerstatus"] != 'active') {
        throw new Error('PRODUCER_NOT_ACTIVE')
    }
    return result.rows
}
// regarde ce que service me renvoie et si tout vas bien envoie le profil
findAllProductProducerId = async (req, res) => {
    let result = await connexion.query("SELECT producerStatus FROM producer WHERE producer.producerId = $1", [req.params.id])
    
    if (result.rows.length === 0) {
        throw new Error('THIS_ID_DOES_NOT_EXIST')
    }
    
    if (result.rows[0]["producerstatus"] != 'active') {
        throw new Error('PRODUCER_NOT_ACTIVE')
    }

    result = await connexion.query("SELECT productId, productName, productPicture, productPrice, productStatus FROM product WHERE producerId = $1", [req.params.id])
    return result.rows
}

module.exports = {findAllProducer, findProducerId, findAllProductProducerId}