import * as database from './database.js'

$(document).ready(() => {
  if ($('body').hasClass('canvas')) loadPosts()
})
const loadPosts = () => {
  database.canvasGet()
    .then(data => {
      if (data.error) throw data.error
      for (const canvas of data) {
        console.log(canvas)
        $('#canvasses').append(`
          <div class="post" data-canvas-id="${canvas.canvas_id} data-user-id="${canvas.user.user_id}">
            <div class="canvas-container">${canvas.image}</div>
            
            <div class="user-info">
              <span class="canvas-name">${canvas.name}</span><br />
              <span class="username">${canvas.user.username}</span>
              <div class="like-container">
                <button class="like">like</button>
                <span class="like-count">${canvas.like_count}</span>
              </div>
            </div>
          </div>
        `)
      }
      console.log(data)
    })
    .catch(err => console.error(err))
}

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

const hideLoginButtons = () => {
  $('#btn-sign-up').hide()
  $('#btn-sign-in').hide()
  $('#btn-sign-out').show()
  $('#btn-profile').show()
}

const showLoginButtons = () => {
  $('#btn-sign-up').show()
  $('#btn-sign-in').show()
  $('#btn-sign-out').hide()
  $('#btn-profile').hide()
}

hideLoginButtons()
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