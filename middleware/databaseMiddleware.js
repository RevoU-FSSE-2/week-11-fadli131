const { MongoClient } = require('mongodb')

const databaseMiddleware = async (req, res, next) => {
    try {
        const mongoclient = await new MongoClient('mongodb://mongo:7Kf7dqt21aaIL8uNaMhc@containers-us-west-153.railway.app:5932').connect()
        db = mongoclient.db('week11')

        req.db = db

        next()
    } catch (error) {
        console.log(error, `<=================== error ==================`);
    }
}

module.exports = databaseMiddleware