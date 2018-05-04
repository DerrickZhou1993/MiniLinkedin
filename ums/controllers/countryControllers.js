import express from 'express'
import entities from '../entities'
import { isEmptyArray } from '../utils/validationHelpers'

let router = express.Router()

router.get('/:countryId', function(req, res, next) {
	entities.Countries.getById(req.params.countryId)
	.then(function(country) {
		if (!country) {
			res.json({})
		} else {
			res.json(country)
		}
	})
})

router.get('/:countryId/provinces', function(req, res, next) {
	entities.Countries.listAllProvinces(req.params.countryId)
	.then(function(countries) {
		if (isEmptyArray(countries)) {
			res.json({})
		} else {
			return res.json(countries)
		}
	})
})

export default router