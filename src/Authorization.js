const c = require('centra')

const utilities = require('./utilities.js')

class Authorization {
	constructor (accessToken, info, application) {
		this.application = application
		this.accessToken = accessToken

		Object.assign(this, info)
	}

	async getProfile () {
		const res = await this.application.getReq('access', this.accessToken).path('user/profile').send()

		return await utilities.parse(res)
	}

	async getPermissions () {
		const res = await this.application.getReq('access', this.accessToken).path('permissions').send()

		return await utilities.parse(res)
	}

	async getHonorScore () {
		const res = await this.application.getReq('access', this.accessToken).path('honorScore').send()

		return await utilities.parse(res)
	}

	async createReputationEvent (event) {
		const res = await this.application.getReq('access', this.accessToken, 'POST').path('reputationEvent').body(event).send()

		return await utilities.parse(res)
	}

	async getReputationEvents (event) {
		const res = await this.application.getReq('access', this.accessToken).path('reputationEvent/list').body(event).send()

		return await utilities.parse(res)
	}

	async setReputationEventActive (eventId, active = null) {
		const res = await this.application.getReq('access', this.accessToken, 'POST').path('reputationEvent/setActive').body({
			'id': eventId,
			'active': active
		}).send()

		return await utilities.parse(res)
	}
}

module.exports = Authorization
