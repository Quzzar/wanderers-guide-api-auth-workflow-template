import axios from 'axios';

// based on https://github.com/netlify/explorers/blob/main/functions/auth-callback.js
export const handler = async (event) => {
	if (!event.queryStringParameters) {
		return {
			statusCode: 401,
			body: JSON.stringify({ error: 'Not authorized' }),
		};
	}

	const { code } = event.queryStringParameters;

	try {
		// wanderer's guide uses a non-standard header auth method
		// so we can't continue to use the simple-oauth2 module here
		const response = await axios({
			url: `https://wanderersguide.app/api/oauth2/token?code=${code}&client_id=${process.env.WG_CLIENT_ID}`,
			method: 'post',
			headers: {
				authorization: `Apikey ${process.env.WG_API_KEY}`,
				Accept: 'application/json',
				'content-type': 'application/json',
				'cache-control': 'no-cache',
				Connection: 'keep-alive',
			},
			responseType: 'json',
		});
		const queryArr = [];
		for (const key of Object.keys(response.data)) {
			queryArr.push(`${key}=${response.data[key]}`);
		}

		return {
			statusCode: 302,
			headers: {
				Location: `${process.env.BASE_URL}?${queryArr.join('&')}`,
				'Cache-Control': 'no-cache',
			},
			body: 'redirecting to application...',
		};
	} catch (err) {
		console.error('Access token error', err.message);
		console.error(err);

		return {
			statusCode: err.statusCode || 500,
			body: JSON.stringify({ error: err.message }),
		};
	}
};
