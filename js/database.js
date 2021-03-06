// users
const userGet = async (email, password) => request('userGet', { email, password })
const userCreate = async (email, password, username) => request('userCreate', { email, password, username })

// canvasses
const canvasCreate = async (name, image, userId) => request('canvasCreate', { name, image, userId })
const canvasGet = async (userId, canvasId) => request('canvasGet', { userId, canvasId })
const canvasUpdate = async (canvasId, isLiked) => request('canvasUpdate', { canvasId, isLiked })
const canvasDelete = async (canvasId) => request('canvasDelete', { canvasId })

// users_likes
const userLikesCreate = async (userId, canvasId) => request('userLikesCreate', { userId, canvasId })
const userLikesGet = async (userId, canvasId) => request('userLikesGet', { userId, canvasId })
const userLikesDelete = async (userId, canvasId) => request('userLikesDelete', { userId, canvasId })

// users_badges
const userBadgesCreate = async (userId, badgeId) => request('userBadgesCreate', { userId, badgeId })
const userBadgesGet = async (userId) => request('userBadgesGet', { userId })

const request = (path, data) => {
  return fetch(`../.netlify/functions/${path}`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
}