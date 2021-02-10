import * as database from './database.js'

// Get the modal
var modalSignUp = $("#modalSignUp");
var modalSignIn = $("#modalSignIn");

// When the user clicks on the button, open the modal
$('#btn-sign-up').click(_ => modalSignUp.css("display", "block"))
$('#btn-sign-in').click(_ => modalSignIn.css("display", "block"))

// When the user clicks on <span> (x), close the modal
$('.close').click(_ => {
  modalSignUp.hide()
  modalSignIn.hide()
})

// Check if the user clicks on the modal background and closes the form if he does
$(modalSignUp).click(event => $(event.target).is(modalSignUp) && modalSignUp.hide())
$(modalSignIn).click(event => $(event.target).is(modalSignIn) && modalSignIn.hide())

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