import * as database from './database.js'

// database.canvasCreate('test2', { canvas: 'yes' }, 2)
//   .then(data => {
//     console.log(res)
//     if (res.error) throw res.error
//   })
//   .catch(err => console.log(err))

// database.canvasGet()
//   .then(data => {
//     for (const canvas of data) {
//       console.log(canvas)
//     }
//   })

var prevScrollPos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    document.getElementById("header-nav").style.top = "0";
  } else {
    document.getElementById("header-nav").style.top = "-80px";
  }
  prevScrollPos = currentScrollPos;
}

const formBg = $("#form-bg")
const signUpForm = $("#form-sign-up");
const signInForm = $("#form-sign-in");
const signUpFormContainer = $('#form-sign-up-container')
const signInFormContainer = $('#form-sign-in-container')

// When the user clicks on the button, open the form
$('#btn-sign-up').click(_ => {
  signUpFormContainer.show()
  formBg.show()
})
$('#btn-sign-in').click(_ => {
  signInFormContainer.show()
  formBg.show()
})

// When the user clicks on <span> (x) or form background, close the form
$('.close').click(_ => hideForm())
$(formBg).click(_ => hideForm())

$(signUpForm).submit(event => {
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
      $('#form-sign-up .error').text('')
    })
    .catch(err => $('#form-sign-up .error').text(err))
})

$(signInForm).submit(event => {
  event.preventDefault()
  const email = event.target[0].value
  const password = event.target[1].value
  database.userGet(email, password)
    .then(res => {
      if (res.error) throw res.error
    })
    .catch(err => $('#form-sign-in .error').text(err))
})

const hideForm = () => {
  formBg.hide()
  signUpFormContainer.hide()
  signInFormContainer.hide()
}