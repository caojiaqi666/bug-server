const UserSchema = require('../Schema/UserSchema.js')
const {db} = require('../Schema/config.js')

const UserModel = db.model("online", UserSchema)


module.exports = UserModel
