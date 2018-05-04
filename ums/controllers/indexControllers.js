import express from 'express'
import entities from '../entities'

let router = express.Router()

router.get('/', function(req, res, next) {
	res.json('hello world!')
})

export default router