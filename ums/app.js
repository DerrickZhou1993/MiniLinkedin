import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import corsFilter from 'cors'
import indexControllers from './controllers/indexControllers'
import continentControllers from './controllers/continentControllers'
import countryControllers from './controllers/countryControllers'
import userControllers from './controllers/userControllers'
import { isWhiteListRequest, isAuthenticated } from './security/authProvider'
import { USER_ID_COOKIE, EMAIL_COOKIE, SESSION_ID_COOKIE } from './utils/cookieHelpers'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(corsFilter())
app.options('*', corsFilter())
app.use(express.static(path.join(__dirname, 'public')))

//security handler
app.use(function(req, res, next) {
	const isWhiteListed = isWhiteListRequest(req.originalUrl)
	if (isWhiteListed) {
		next()
	} else {
		const userId = req.get(USER_ID_COOKIE)
		const email = req.get(EMAIL_COOKIE)
		const sessionId = req.get(SESSION_ID_COOKIE)
		
		isAuthenticated(userId, email, sessionId)
		.then(function() {
			return next()
		}).catch(function(errr) {
			console.log(errr)
			let err = new Error("Resource does not exist, or you do not have permission to access it.")
			err.status = 404
			return next(err)
		})
	}
})

app.use('/continents', continentControllers)
app.use('/countries', countryControllers)
app.use('/users', userControllers)
app.use('/', indexControllers)

// error handlers
app.use(function(err, req, res, next) {
	console.log(err)
	if (err.status === 404) {
		res.status(404)
		res.json({result: false, data:"Resource does not exist, or you do not have permission to access it."})
	} if (err.status === 400) {
		res.status(400)
		res.json({result: false, data:"Bad request."})
	} else {
		res.status(err.status || 500)
		res.json({result: false, data:"Internal server error."})
	}
})

export default app