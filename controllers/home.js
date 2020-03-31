const Homes = require('../models/home');
const fetch = require('node-fetch');
const { cloudinary } = require('../cloudinary');


module.exports = {
	async getHomes(req,res,next){
		let homes = await Homes.find({})
		res.render('homes/index', { homes, title: 'Home'})
	},
	
	newHome(req,res,next){
		res.render('homes/new', { title: 'Add New Home'})
	},
	
	async createHome(req,res,next){
		if(req.files.length){
			req.body.pictures = []
			for(let result of req.files){
				let pic = {
					url: result.secure_url,
					public_id: result.public_id
				}
				req.body.pictures.push(pic)
			}
		}
		let addy = `${req.body.address}, ${req.body.state}`
		let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addy}&key=${process.env.GEOCODER_GOOGLE}` 
			                   
		fetch(url)
		.then(result => result.json())
		.then(data => {
			req.body.lat = data.results[0].geometry.location.lat
			req.body.lng = data.results[0].geometry.location.lng
		})
		eval(require('locus'))
		let result = await Homes.create(req.body)
		res.redirect('/homes')
	},
	
	async showHome(req,res,next){
		let home = await Homes.findById(req.params.id);
		res.render('homes/show', { home, title: 'Details'})
	},
	
	async editHome(req,res,next){
		let home = await Homes.findById(req.params.id)
		res.render('homes/edit', { home, title: 'Edit'})
	},
	
	async updateHome(req,res,next){
		let home = await Homes.findById(req.params.id);
		
		if(req.body.changePics && req.body.changePics.length){
			await cloudinary.v2.api.delete_resources(req.body.changePics);
	
			for(let publicid of req.body.changePics){
				for(let result of home.pictures){
					if(result.public_id === publicid){
						let index = home.pictures.indexOf(result)
						home.pictures.splice(index, 1)
					}	
				}
			}
		}
		
		if(req.files.length){
			for(let result of req.files){
				let pic = {
					url: result.secure_url,
					public_id: result.public_id
				}
				home.pictures.push(pic)
			}
		}
		
		const { state, location, lease, bedrooms, price, description } = req.body
		
		home.state = state
		home.location = location
		home.lease = lease
		home.bedrooms = bedrooms
		home.price = price
		home.description = description

		await home.save()
		res.redirect('/homes/' + home.id)
	},
	
	async deleteHome(req,res,next){
		let home  = await Homes.findById(req.params.id);
		for(let pic of home.pictures){
			await cloudinary.v2.uploader.destroy(pic.public_id)
		}
		await home.remove()
		res.redirect('/homes')
	}
}