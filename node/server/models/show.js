/* User model */
const mongoose = require('mongoose')
Schema = mongoose.Schema

const validator = require('validator')

const ShowSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	airDate: {
		type: Date
	},
	img:{
		type: String
	},
	link:{
		type: String
	},
	approved:{
		type: Boolean,
		required: true,
	},
	airInterval:{
		type: Number
	},
	updating:{
		type: Schema.Types.ObjectId
	}
})

const Show = mongoose.model('Show', ShowSchema)

module.exports = { Show }
