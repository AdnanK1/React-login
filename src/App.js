import "./App.css";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

function App() {
  const [user, setUser] = useState({});

  function handleCallBackResponse(res) {
    console.log("Encoded JWT ID Token:" + res.credential);
    var userObject = jwtDecode(res.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "926521009509-iefldr67466nd5eumbrq6sajk9db2iod.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);
  // If we have no user show sign in button
  // If we have a user show logout button
  return (
    <div className="App">
      <div id="signDiv"></div>
      {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}

      {user && (
        <div>
          <img src={user.picture}></img>
          <h3> {user.name} </h3>
        </div>
      )}
    </div>
  );
}

export default App;
