# Metrafin API Node
> Official Metrafin API Client for Node.js

[GitHub](https://github.com/metrafin/node-client) | [NPM](https://www.npmjs.com/package/metrafin) | [Official API Documentation](https://github.com/metrafin/documentation)

# Install

```bash
npm i metrafin
```

```js
const App = require('metrafin')
```

# Usage

## Create application

Create an application with its private token.

```js
const myApp = new App('VLeIjSNigss5eqLcNf5Snv2kh_d-HWOv1-ojr952gpW0CyKt')
```

## Resolve users

```js
// in async context

const userInfoA = await myApp.resolveUser('username', 'ethan')
// => { error: null, userId: 'd2ed3320-af45-4136-bc51-bb48a62da7dc', username: 'ethan' }

// or...

const userInfoB = await myApp.resolveUser('userId', '9175009b-b215-4be8-a3a8-88322757804d')
// => { error: null, userId: 'd2ed3320-af45-4136-bc51-bb48a62da7dc', username: 'ethan' }
```

## Create authorization instance using authorization code (`authorization_code`)

Create an auth instance using an `authorization_code`. You may access the accessToken as a property of the created authorization if all is successful.

It is recommended that you check that all of the OAuth scopes you expect are present in the auth instance's `scopes` array.

```js
const auth = await myApp.auth('rmxQPAll1kEhsc8u-IPwBkwyNdixJCSf', 'authorizationCode')

console.log('Auth accessToken: ' + auth.accessToken)
console.log('Auth userId: ' + auth.userId)
console.log('Auth scopes: ' + auth.scopes)
console.log('Auth expires: ' + auth.expires)
```

## Create authorization instance using access token

Create an auth instance using an `access token`.

```js
const auth = await myApp.auth('rmxQPAll1kEhsc8u-IPwBkwyNdixJCSf', 'accessToken')

console.log('Auth accessToken: ' + auth.accessToken)
console.log('Auth userId: ' + auth.userId)
console.log('Auth scopes: ' + auth.scopes)
console.log('Auth expires: ' + auth.expires)
```

### Get user profile

See [profile information documentation](https://github.com/metrafin/documentation#profile-information) for details about the profile response.

```js
await auth.getProfile()
```

### Get user permissions

See [permissions documentation](https://github.com/metrafin/documentation#get-v1permissions) for details about the permissions response.

```js
await auth.getPermissions()
```

### Get user HonorScore

See [HonorScore documentation](https://github.com/metrafin/documentation#get-v1honorscore) for details about the HonorScore response.

```js
await auth.getHonorScore()
```

### Create reputation event

See [reputation event documentation](https://github.com/metrafin/documentation#post-v1reputationevent) for details about reputation events.

```js
await auth.createReputationEvent({
	'context': 'public_comment',
	'tag': 'spam',
	'type': 'negative',
	'description': 'Excessive commenting on a video'
})
// => {"error": null, "eventId": "0f6ca352-480a-468d-a99f-43580ccf4aff"}
```

### List reputation events

```js
await auth.getReputationEvents()
// => {"error": null, "reputationEvents": [ ... ]}
```

### Update active status of reputation event

```js
await auth.setReputationEventActive('ef8c4ce3-2f02-4647-ab5e-727387184e15', false)

// This will deactivate the reputation event with ID ef8c4ce3-2f02-4647-ab5e-727387184e15.
```

# Feedback and questions

If you have questions or feedback about the package, feel free to [let us know in GitHub issues](https://github.com/metrafin/node-client/issues/new).

Feel free to contribute through PRs as well. :)
