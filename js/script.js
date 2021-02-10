import * as database from './database.js'

// Get the modal
var modalSignUp = $("#modalSignUp");
var modalSignIn = $("#modalSignIn");

// Get the button that opens the modal
var signup = $("#signup");
var signin = $("#signin");
console.log(signup);

// Get the <span> element that closes the modal
var span1 = $(".close")[0];
var span2 = $(".close")[1];

// When the user clicks on the button, open the modal
signup.click(_ => modalSignUp.css("display", "block"))
signin.click(_ => modalSignIn.css("display", "block"))

signin.onclick = function () {
  modalSignIn.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span1.onclick = function () {
  modalSignUp.style.display = "none";
}

span2.onclick = function () {
  modalSignIn.style.display = "none";
}

modalSignUp.submit(event => {
  event.preventDefault()
  const username = event.target[0].value
  const email = event.target[1].value
  const password = event.target[2].value
  const confirmpassword = event.target[3].value
  console.log(email, password, username)
  database.userCreate(email, password, username)
    .then(res => {
      console.log(res)
      if (res.error) throw res.error
      else if (password !== confirmpassword) throw 'Passwords do not match!'
    })
    .catch(err => $('#modalSignUp .error').text(err))

})

modalSignIn.submit(event => {
  event.preventDefault()
  const email = event.target[0].value
  const password = event.target[1].value
  database.userGet(email, password)
    .then(res => {
      if (res.error) throw res.error
    })
    .catch(err => $('#modalSignIn .error').text(err))
})
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modalSignUp) {
    modalSignUp.style.display = "none";
  }
  if (event.target == modalSignIn) {
    modalSignIn.style.display = "none";
  }
}