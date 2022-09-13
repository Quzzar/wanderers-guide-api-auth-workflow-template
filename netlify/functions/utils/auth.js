import { AuthorizationCode } from 'simple-oauth2';

function createAuthClient(credentials) {
	if (!credentials.client.id || !credentials.client.secret) {
		throw new Error('Missing a valid Wanderers Guide OAuth client ID and secret.');
	}

	return new AuthorizationCode(credentials);
}

export const characterAuthClient = function (characterId) {
	let characterIdString = '';
	// format to allow a consistent url if no character id is provided
	if (characterId) characterIdString = `/${characterId}`;

	return createAuthClient({
		client: {
			id: process.env.WG_CLIENT_ID,
			secret: process.env.WG_API_KEY,
		},
		auth: {
			tokenHost: 'https://wanderersguide.app/api',
			tokenPath: 'https://wanderersguide.app/api/oauth2/token',
			authorizeHost: `https://wanderersguide.app/api`,
			authorizePath: `https://wanderersguide.app/api/oauth2/authorize${characterIdString}`,
		},
	});
};
