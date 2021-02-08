import * as database from './database.js'
const data = {
  email: 'd@d.d',
  password: '1234',
  username: 'ddd'
}

database.signUp(data.email, data.password, data.username)
  .then(r => console.log(r))

// Get the modal
var modalSignUp = document.getElementById("modalSignUp");
var modalSignIn = document.getElementById("modalSignIn");

// Get the button that opens the modal
var signup = document.getElementById("signup");
var signin = document.getElementById("signin");

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];

// When the user clicks on the button, open the modal
signup.onclick = function() {
  modalSignUp.style.display = "block";
}

signin.onclick = function() {
    modalSignIn.style.display = "block";
  }

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
  modalSignUp.style.display = "none";
}

span2.onclick = function() {
    modalSignIn.style.display = "none";
  }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalSignUp) {
    modalSignUp.style.display = "none";
  }
  if (event.target == modalSignIn) {
    modalSignIn.style.display = "none";
  }
}