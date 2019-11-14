/* User model */
const mongoose = require('mongoose')
Schema = mongoose.Schema

const validator = require('validator')

const bcrypt = require('bcryptjs')
const { Show } = require('../models/show')

// We'll make this model in a different way
// using mongoose's Schema object
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 6,
		trim: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Not valid email.'
		}
	},
	password: { type: String, required: true, minlength: 6 },
    bio: { type: String },
    img: { type: String },
	is_admin:{ type: Boolean, required: true },
	is_banned:{ type: Boolean, required: true },
	my_shows : [{ type: Schema.Types.ObjectId, ref: 'Show' }]
})


// Our own student finding function 
UserSchema.statics.findByUserPassword = function(username, password) {
	const User = this

	return User.findOne({username: username}).then((user) => {
		if (!user) {
			return Promise.reject()
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (error, result) => {
				if (result) {
					resolve(user);
				} else {
					reject();
				}
			})
		})
	})
}

// This function runs before saving user to database
UserSchema.pre('save', function(next) {
    const user = this

    if (user.isModified('password')) {
		bcrypt.genSalt(10, (error, salt) => {
			bcrypt.hash(user.password, salt, (error, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next();
	}
})


const User = mongoose.model('User', UserSchema)


module.exports = {User}
