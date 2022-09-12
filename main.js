import './style.css'
import { processAccessToken } from './process-access-token'
import { processCharAuth } from './process-char-authorization'

// If has code query parameter, fetch access token.
let params = new URLSearchParams(window.location.search);
let code = params.get("code");

if(code){

  let state = params.get("state");

  processAccessToken(code, state);

} else {

  let charID = params.get("char_id");

  processCharAuth(charID);

}

