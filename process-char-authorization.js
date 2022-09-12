
export function processCharAuth(charID=null) {

  document.querySelector('#result').innerHTML = `
    <div>

      <div class="card" style="padding-bottom: 0em;">
        <input id="character-id" type="number" placeholder="Character ID"></input>
      </div>

      <div class="card">
        <button id="authorization" type="button">Authorize Character</button>
      </div>

    </div>
  `;

  // If 'char_id' query parameter exists, set character ID input to default to that char_id.
  if(charID){
    document.querySelector('#character-id').value = charID+'';
  }

  setupAuthorizationLink(document.querySelector('#authorization'), document.querySelector('#character-id'));

}


function setupAuthorizationLink(element, characterID) {

  element.addEventListener('click', () => {
    if(characterID.value){
      location.href = `https://wanderersguide.app/api/oauth2/authorize/${characterID.value}?response_type=code&client_id=${import.meta.env.VITE_CLIENT_ID}&state=${import.meta.env.VITE_AUTH_STATE}`;
    }
  });
    
}
