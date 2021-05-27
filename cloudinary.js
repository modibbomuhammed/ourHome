const cloudinary 		= require('cloudinary'),
	  cloudinaryStorage	= require('multer-storage-cloudinary'),
	  crypto 			= require('crypto');


cloudinary.config({ 
  cloud_name: 'modibbomuhammed', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'ourHome',
  allowedFormats: ['jpg', 'jpeg','png'],
  filename: function (req, file, cb) {
    let buf = crypto.randomBytes(16)
	buf = buf.toString('hex')
	let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, '');
	uniqFileName += buf
	cb(undefined, uniqFileName)  
  }
});

module.exports = {
	storage,
	cloudinary
}
