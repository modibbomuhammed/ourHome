const mongoose 				= require('mongoose'),
	  passportLocalMongoose	= require('passport-local-mongoose'),
	  mongooseTypePhone 	= require('mongoose-type-phone');
 
    
	  
	  
const agentSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true},
	company: String,
	email: { type: String, required: true, unique: true},
	phone: {
        work: mongoose.SchemaTypes.Phone,
        home: mongoose.SchemaTypes.Phone
    }
})

agentSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Agent', agentSchema);