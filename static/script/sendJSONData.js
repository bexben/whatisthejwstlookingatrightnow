function sendJSONdata() {
    var name = 
        document.getElementById("name").value;
    var email = 
        document.getElementById("email").value;
    var result = 
        document.getElementById("result");

    // Creating a XHR object
    var xhr = new XMLHttpRequest();

    // open a connection
    xhr.open("POST", "/userdata");

    // Set the request header
    xhr.setRequestHeader(
      "Content-Type", "application/json"
    );

    // Converting JSON data to string
    var data = JSON.stringify(
      { name: name, email: email }
    );
    xhr.send(data);

    // Create a state change callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 &&
            xhr.status === 200) {
            // Print received data from server
            result.innerHTML = this.responseText;
        }
    };
}