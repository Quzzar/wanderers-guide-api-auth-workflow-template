import { characterAuthClient } from './utils/auth';

// based on https://github.com/netlify/explorers/blob/main/functions/auth.js
export const handler = async (event) => {
	if (!event.queryStringParameters && !event.queryStringParameters.characterId) {
		return {
			statusCode: 401,
			body: JSON.stringify({
				error: 'Missing required query parameter `characterId`',
			}),
		};
	}

	const { characterId } = event.queryStringParameters;

	const oauth = characterAuthClient(characterId);

	const authorizationURI = oauth.authorizeURL({
		redirect_uri: `${process.env.BASE_URL}/.netlify/functions/oauthCallback`,
		state: process.env.WG_AUTH_STATE,
	});

	return {
		statusCode: 302,
		headers: {
			Location: `${authorizationURI}/${characterId}?response_type='code'`,
			'Cache-Control': 'no-cache',
		},
		body: 'redirecting to authorization...',
	};
};
