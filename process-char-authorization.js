export function processCharAuth(charID = null) {
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
	if (charID) {
		document.querySelector('#character-id').value = `${charID}`;
	}

	const button = document.querySelector('#authorization');
	button.addEventListener('click', function () {
		const characterId = document.querySelector('#character-id')?.value;
		if (!characterId) return;
		location.href = `https://kobold.netlify.app/.netlify/functions/oauth?characterId=${characterId}`;
	});
}
