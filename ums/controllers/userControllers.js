import express from 'express'
import entities from '../entities'
import { USER_ID_COOKIE, EMAIL_COOKIE, SESSION_ID_COOKIE } from '../utils/cookieHelpers'

let router = express.Router()

router.post('/signup', function(req, res, next) {

	if (!req.body.email === undefined) {
		console.log('Email is required but not given.')
		res.json({result:false, exception: "Email is required but not given."})
	} if (!req.body.password === undefined) {
		console.log('Password is required but not given.')
		res.json({result:false, exception: "Password is required but not given."})
	} if (!req.body.first_name === undefined) {
		console.log('First name is required but not given.')
		res.json({result:false, exception: "Email is required but not given."})
	} else if (!req.body.last_name) {
		console.log('Last name is required but not given.')
		res.json({result:false, exception: "Last name is required but not given."})
	} else if (!req.body.consented) {
		console.log('User consent is required but not given.')
		res.json({result:false, exception: "User consent is required but not given."})
	} else {
		const data = req.body
		entities.Users.signup(data.email, data.password, data.first_name, data.last_name, data.consented, data.middle_name)
		.then(function(result) {
			res.json({result:true})
		}).catch(function(err) {
			console.log(err)
			res.json({result:false, exception: err.message})
		})
	}
})

router.post('/signin', function(req, res, next) {
	if (!req.body.email === undefined) {
		console.log('Email is required but not given.')
		res.json({result:false, exception: "Email is required but not given."})
	} if (!req.body.password === undefined) {
		console.log('Password is required but not given.')
		res.json({result:false, exception: "Password is required but not given."})
	} else {
		const data = req.body
		entities.Users.signin(data.email, data.password)
		.then(function(result) {
			res.json({result:result.result, session_id: result.session_id, user_id: result.uuid})
		}).catch(function(err) {
			console.log(err)
			res.json({result:false, exception: err.message})
		})
	}
})

router.post('/signout', function(req, res, next) {
	if (!req.body.email === undefined) {
		console.log('Email is required but not given.')
		res.json({result:false, exception: "Email is required but not given."})
	} else if (req.body.email !== req.get(EMAIL_COOKIE)) {
		console.log('Email header and body email does not match, suspecious logout.')
		res.json({result: false, exception: "Unexpected logout value."})
	} else {
		entities.Users.signout(req.body.email, req.get(USER_ID_COOKIE), req.get(SESSION_ID_COOKIE), req.body.logout_all)
		.then(function(result) {
			res.json({result:true})
		}).catch(function(err) {
			console.log(err)
			res.json({result:false, exception: err.message})
		})
	}
})

export default router