const c = require('centra')

module.exports = {
	'baseUrl': 'https://api.metrafin.com/v1/',
	'parse': async (res) => {
		if (res.statusCode.toString().charAt(0) !== '2') {
			let parsed = null

			try {
				parsed = await res.json()
			}
			catch (err) {
				throw new Error('Bad status code from server ' + res.statusCode)
			}

			if (parsed !== null && typeof parsed.error === 'string') {
				throw new Error(parsed.error)
			}
			else {
				throw new Error('Bad status code ' + res.statusCode)
			}
		}
		else {
			return await res.json()
		}
	}
}
