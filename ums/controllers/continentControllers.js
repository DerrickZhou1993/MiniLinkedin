import express from 'express'
import entities from '../entities'

let router = express.Router()

router.get('/list', function(req, res, next) {
	entities.Continents.list()
	.then(function(continents) {
		if (!continents.length) {
			res.json({})
		} else {
			res.json(continents)
		}
	})
})

router.get('/:continentId/countries', function(req, res, next) {
	entities.Continents.listAllCountries(req.params.continentId)
	.then(function(continents) {
		if (!continents.length) {
			res.json({})
		} else {
			return res.json(continents)
		}
	})
})

export default router