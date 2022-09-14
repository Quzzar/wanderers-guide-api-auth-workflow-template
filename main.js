import './style.css';
import { processCharAuth } from './process-char-authorization';

const queryParams = new URLSearchParams(window.location.search);
const token = queryParams.get('access_token');
if (token) {
	document.querySelector('#result').innerHTML = `
      <div>

        <h2>Access Token:</h2>
        <h3 class="access-token">${token}</h3>
        <hr>
        <p class="access-token-details">For character with ID: #${queryParams.get('char_id')}</p>
        <p class="access-token-details">Access Rights: ${queryParams.get('access_rights')}</p>
        <p class="access-token-details">Expires in: ${queryParams.get('expires_in')} seconds</p>

      </div>
    `;
} else {
	const params = new URLSearchParams(window.location.search);

	const charID = params.get('char_id');
	processCharAuth(charID);
}
