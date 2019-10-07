const c = require('centra')

const Authorization = require('./Authorization.js')
const utilities = require('./utilities.js')

class Application {
	constructor (privateKey) {
		this.privateKey = privateKey
	}

	getReq (auth = 'private', extra = null, method = 'GET') {
		if (auth === 'private') {
			return c(utilities.baseUrl, method).header({
				'Authorization': this.privateKey
			})
		}
		else if (auth === 'access') {
			return c(utilities.baseUrl, method).header({
				'Authorization': this.privateKey + ':' + extra
			})
		}
	}

	async auth (code, method = 'authorizationCode') {
		let accessToken

		if (method === 'authorizationCode') {
			const authTokenRes = await this.getReq('private', null, 'POST').path('createAccessToken').body({
				'authorizationCode': code
			}).send()

			accessToken = (await utilities.parse(authTokenRes)).accessToken
		}
		else if (method === 'accessToken') {
			accessToken = code
		}
		else throw new Error('Unknown auth method \'' + method + '\'')

		const authInfo = await this.getReq('access', accessToken).path('token').send()

		const parsed = await utilities.parse(authInfo)

		return new Authorization(accessToken, parsed, this)
	}

	async resolveUser (by, value) {
		if (!['userId', 'username'].includes(by)) {
			throw new Error('Cannot lookup by \'' + by + '\'')
		}

		const lookupRes = await this.getReq('private', null, 'POST').path('resolveUser').body({
			'resolveBy': by,
			'value': value
		}).send()

		const parsed = await utilities.parse(lookupRes)

		return parsed
	}
}

module.exports = Application
