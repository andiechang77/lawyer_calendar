$('.datepicker').datepicker({
    format: 'yyyy-mm-dd'
});

// Client ID and API key from the Developer Console
var CLIENT_ID = "129834602246-ba6eaiu67dglidn89hugtu9nhl2ta1u5.apps.googleusercontent.com";
var API_KEY = "AIzaSyCDU-4TEoQ9iGzzsaPI05tGFQbQRyMVx6I";

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
*  On load, called to load the auth2 library and API client library.
*/
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
*  Initializes the API client library and sets up sign-in state
*  listeners.
*/
function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    }, function(error) {
      appendPre(JSON.stringify(error, null, 2));
    });
}

/**
*  Called when the signed in status changes, to update the UI
*  appropriately. After a sign-in, the API is called.
*/
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authorizeButton.style.display = 'none';
      signoutButton.style.display = 'block';
      $("#showBlock").toggle("slow");
    } else {
      authorizeButton.style.display = 'block';
      signoutButton.style.display = 'none';
    }
}

/**
*  Sign in the user upon button click.
*/
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
*  Sign out the user upon button click.
*/
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
    $("#showBlock").hide(1000);
}

/**
* Append a pre element to the body containing the given message
* as its text node. Used to display the results of the API call.
*
* @param {string} message Text to be placed in pre element.
*/
function appendPre(message) {
    var pre = document.getElementById('contents');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

function submit() {

    var date = document.getElementById('dateInput').value;
    var description = document.getElementById('descriptionInput').value;
    var case_type = document.getElementById('caseType').value;

    var resource = {
        "summary": description,
        "description": description,
        "location": "Taipei",
        "start": {
            "dateTime": date + "T00:00:00.000+08:00"
        },
        "end": {
            "dateTime": date + "T23:59:59.000+08:00"
        }

    };
    var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': resource
    });
    request.execute(function(resp) {
        console.log(resp);
    });

    alert(date + ", " + description + ", " + case_type) 

}