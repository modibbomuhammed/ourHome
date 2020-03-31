const mongoose 			= require('mongoose'),
	  mongoosePaginate 	= require('mongoose-paginate');


const homeSchema = new mongoose.Schema({
	state: String,
	location: String,
	lease: String,
	description: String,
	bedrooms: Number,
	price: Number,
	lat: Number,
	lng: Number,
	date: {type: Date, default: Date.now()},
	pictures: [{
		url: String,
		public_id: String
	}],
	agent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Agent'
	}
})

homeSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Home', homeSchema)