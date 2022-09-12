export function processAccessToken(code, state=null) {
  
  // Display loading gif
  document.querySelector('#result').innerHTML = `
    <div>
      <img src="loading.gif" alt="Loading" />
    </div>
  `;

  fetch(`https://wanderersguide.app/api/oauth2/token/?code=${code}&client_id=${import.meta.env.VITE_CLIENT_ID}`, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Apikey ${import.meta.env.VITE_API_KEY}`,
    },
  }).then(response => {

    if (!response.ok) {
        return Promise.reject(response);
    }
    return response.json();

  }).then(data => {

    console.log("Success");
    console.log(data);

    document.querySelector('#result').innerHTML = `
      <div>

        <h2>Access Token:</h2>
        <h3 class="access-token">${data.access_token}</h3>
        <hr>
        <p class="access-token-details">For character with ID: #${data.char_id}</p>
        <p class="access-token-details">Access Rights: ${data.access_rights}</p>
        <p class="access-token-details">Expires in: ${data.expires_in} seconds</p>
        <hr>

      </div>
    `;

  }).catch(error => {

    if (typeof error.json === "function") {
        error.json().then(jsonError => {
          console.log("JSON error from API");
          console.error(jsonError);
        }).catch(genericError => {
          console.log("Generic error from API");
          console.error(error.statusText);
        });
    } else {
      console.log("Fetch error");
      console.error(error);
    }

    document.querySelector('#result').innerHTML = `
      <div>

        <h2>Error:</h2>
        <h3 class="error">${error.statusText}</h3>

      </div>
    `;

  });

}
