const Influx = require('influx')

class InfluxHelpr {

    constructor(host = 'influxdb', db = 'openiot', username = 'openiot', password = 'openiot') {
        this.HOST = host
        this.DB = db
        this.USERNAME = username
        this.PASSWORD = password
        this.influx = null
    }
    
    async init(schema = []) {
        try {

            // create influx client
            this.influx = new Influx.InfluxDB({
                host: this.HOST,
                database: this.DB,
                username: this.USERNAME,
                password: this.PASSWORD,
            })

            // ensure we have db
            const dbNames = await this.influx.getDatabaseNames()
            if (!dbNames.includes(this.DB)) {
                console.log(`Creating database ${this.DB}`)
                await this.influx.createDatabase(this.DB)
            }
            console.log(`Connected to InfluxDB`)
        } catch (err) {
            console.error(err)
        }
    }

    async write(points, appId, gwId, topic) {
        try {
            const dataToWrite = points.map(p => ({
                measurement: p.measurement,
                tags: p.tags || {},
                fields: p.fields || {},
                timestamp: p.timestamp ? new Date(p.timestamp) : new Date()
            }))
            if (dataToWrite.length) {
                console.log(`Writing ${dataToWrite.length} points to InfluxDB`)
                await this.influx.writePoints(dataToWrite)
                console.log(`${dataToWrite.length} points written to InfluxDB`)
            } else {
                console.log('No new points to add')
            }
        } catch (err) {
            console.error(`Error saving data to InfluxDB! ${err.stack}`)
        }
    }

}

module.exports = InfluxHelpr
