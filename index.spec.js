const mock = require('mock-require')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const sinon = require('sinon')
const moment = require('moment')
const should = chai.should()
const expect = chai.expect
chai.use(sinonChai)

describe('Influx', function() {

	function generateData(size = 100) {
		const data = []
		const now = moment().subtract(1, 'hour')
		for (let i = 0; i < size; i++) {
			now.add(1, 'second')
			data.push({
				measurement: 'measurement',
				tags: { foo: 'bar' },
				fields: { baz: Math.random() * 100 },
				timestamp: now.toISOString(),
			})
		}
		return data
	}

	// mock influx
	const influxStub = {
		FieldType: { FLOAT: 1 },
		InfluxDB: sinon.stub().returns({
			getDatabaseNames: sinon.stub().resolves([]),
			createDatabase: sinon.stub().resolves(),
			writePoints: sinon.stub().resolves(),
		})
	}

	mock('influx', influxStub)

	const influx = require('./index')

	it('should initialize', () => {
		influx.prepare()
		influx.load()
		influx.getCapabilities()
		influx.start()
	})

	it('should deinitialize', () => {
		influx.stop()
		influx.unload()
		influx.cleanup()
	})

	it('should handle lifecycle methods', () => {
		influx.start()
		influx.suspend()
	})

	it('should process cron message', async () => {

		const contextStub = {
			topic: 'influx',
			message: generateData(),
			appId: 'abc', 
			gatewayId: 'def',
		}
		let output = await influx.process(contextStub)
		output.should.be.an('array')
		

	})

})
