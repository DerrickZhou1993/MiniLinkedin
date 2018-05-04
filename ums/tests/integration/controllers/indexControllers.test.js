import chai from 'chai'
import chaiHttp from 'chai-http'
import config from '../../../config/config'
import indexControllers from '../../../controllers/indexControllers'

const should = chai.should()
chai.use(chaiHttp)

describe ('get /', function() {

	before(function(){
		console.log('Starting indexControllers test suite.')
	})

	describe('happycase', function() {
		it('Response should be {\'hello world!\'}', function(done) {
			chai.request(config.baseUrl)
			.get('/')
			.end(function(err, res) {
				res.should.have.status(200)
				res.body.should.be.eql('hello world!')
				done()
			})
		})
	})

	after(function() {
		console.log('indexControllers test suite completed.')
	})
})