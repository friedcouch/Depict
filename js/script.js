import * as database from './database.js'

$(document).ready(() => {
  $('#loader').show()
  const body = $('body')
  if (body.hasClass('profile') && !!localStorage.user)
    loadPosts(JSON.parse(localStorage.user).user_id)
  else if (body.hasClass('other-profile'))
    loadPosts(JSON.parse(localStorage.other_user))
  else if (body.hasClass('canvas'))
    loadPosts()
  setTimeout(() => $('#loader').hide(), 600)

  if (!!localStorage.user) hideLoginButtons()
  else showLoginButtons()
})

const loadPosts = (userId) => {
  database.canvasGet(userId)
    .then(data => {
      if (data.error) throw data.error
      let totalLikeCount = 0;
      for (const canvas of data) {
        totalLikeCount += canvas.like_count
        $('#canvasses').append(`
          <div class="post" data-is-liked="false" data-canvas-id="${canvas.canvas_id}" data-user-id="${canvas.user.user_id}">
            <div class="canvas-container">${canvas.image}</div>
            
            <div class="user-info">
              <span class="canvas-name">${canvas.name}</span><br />
              <div class="like-container">
                <img src="img/heart.svg">
                <span class="like-count">${canvas.like_count}</span>
              </div>
              <a href="other_profile.html"><span class="username">${canvas.user.username}</span></a>
            </div>
          </div>
        `)
      }
      const canvas = data[0]
      if (userId && canvas) {
        $('#username').text(canvas.user.username)
        $('#total-likes span').text(totalLikeCount)
      }
      else 
        $('#total-likes span').text(0)

      if (localStorage.user) {
        database.userLikesGet(JSON.parse(localStorage.user).user_id)
          .then(data => {
            if (data.error) throw data.error
            for (const row of data) {
              $(`[data-canvas-id="${row.canvas_id}"]`).attr('data-is-liked', 'true')
              $(`[data-canvas-id="${row.canvas_id}"] img`).attr('src', 'img/heart_liked.svg')
            }
          })
          .catch(err => console.error(err))
      }

    })
    .catch(err => console.error(err))
}

const displayProfile = (user) => {
  $('#username').text(user.username)

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
const createCanvasContainer = $('#create-canvas-container')
const spinner = $('#spinner')

const hideLoginButtons = () => {
  $('#btn-sign-up').hide()
  $('#btn-sign-in').hide()
  $('#btn-sign-out').show()
  $('#btn-profile').show()
  $('#btn-create-canvas').show()
}

const showLoginButtons = () => {
  $('#btn-sign-up').show()
  $('#btn-sign-in').show()
  $('#btn-sign-out').hide()
  $('#btn-profile').hide()
  $('#btn-create-canvas').hide()
}

const hideForm = () => {
  formBg.hide()
  signUpFormContainer.hide()
  signInFormContainer.hide()
  createCanvasContainer.hide()
} 

// When the user clicks on the button, open the form
$('#btn-sign-up').click(_ => {
  signUpFormContainer.show()
  formBg.show()
})
$('#btn-sign-in').click(_ => {
  signInFormContainer.show()
  formBg.show()
})
$('#btn-create-canvas').click(_ => {
  createCanvasContainer.show()
  formBg.show()
})

// Sign out
$('#btn-sign-out').click(_ => {
  localStorage.removeItem('user')
  window.location.reload()
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

  database.userCreate(email, password, username)
    .then(res => {
      if (res.error) throw res.error
      else if (password !== confirmpassword) throw 'Passwords do not match!'
      localStorage.user = JSON.stringify(res)
      $('#form-sign-up .error').text('')
      window.location.reload()
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
      localStorage.user = JSON.stringify(res)
      $('#form-sign-in .error').text('')
      window.location.reload()
    })
    .catch(err => $('#form-sign-in .error').text(err))
  spinner.show().delay(3000).fadeOut();
})

$('#canvasses').on('click', '.username', event => {
  const post = $(event.target).closest('.post')
  localStorage.other_user = JSON.stringify(post.data('userId'))
})

$('#canvasses').on('click', '.like', event => {
  if (!localStorage.user) return;

  const post = $(event.target).closest('.post')
  const canvasId = post.data('canvasId')
  const postUserId = post.data('userId') // Post user's id
  const isLiked = !(post.data('isLiked')) // Change the value of isLiked
  const userId = JSON.parse(localStorage.user).user_id // Logged in user's id

  let action = isLiked
    ? database.userLikesCreate(userId, canvasId)
    : database.userLikesDelete(userId, canvasId)

  action
    .then(data => {
      if (data.error) throw '1' + data.error
      return database.canvasUpdate(canvasId, isLiked) 
    })
    .then(data => {
      if (data.error) throw data.error
      $('img', post).attr('src', `img/heart${isLiked ? '_liked' : ''}.svg`)
      $('.like-count', post).text(data.like_count)
      $(post).data('isLiked', isLiked)

      if ($('body').hasClass('profile') || $('body').hasClass('other-profile')
        // && !!localStorage.user 
        // && userId === JSON.parse(localStorage.user).user_id
      ) {
        database.canvasGet(postUserId)
          .then(data => {
            if (data.error) throw data.error
            let totalLikeCount = 0;
            for (const canvas of data) totalLikeCount += canvas.like_count
            $('#total-likes span').text(totalLikeCount)
          })
          .catch(err => console.error(err))
      }
    })
    .catch(err => console.error(err))
})