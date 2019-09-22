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

# Use

## Create application

Create an application with its private token.

```js
const myApp = new App('VLeIjSNigss5eqLcNf5Snv2kh_d-HWOv1-ojr952gpW0CyKt')
```

## Resolve users

```js
// in async context

const userInfoA = await myApp.resolveUser('username', 'ethan')

// or...

const userInfoB = await myApp.resolveUser('userId', '9175009b-b215-4be8-a3a8-88322757804d')
```

## Use an authToken

```js
const auth = await myApp.getAuth('rmxQPAll1kEhsc8u-IPwBkwyNdixJCSf')

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

```js
await auth.getPermissions()
```

### Get user HonorScore

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
```

### List reputation events

```js
await auth.getReputationEvents()
```

### Update active status of reputation event

```js
await auth.setReputationEventActive('ef8c4ce3-2f02-4647-ab5e-727387184e15', false)

// This will deactivate the reputation event with ID ef8c4ce3-2f02-4647-ab5e-727387184e15.
```

# Feedback and questions

If you have questions or feedback about the package, feel free to [let us know in GitHub issues](https://github.com/metrafin/node-client/issues/new).

Feel free to contribute through PRs as well. :)
