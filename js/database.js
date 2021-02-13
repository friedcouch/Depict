export const userGet = async (email, password) =>
  request('userGet', { email, password })

export const userCreate = async (email, password, username) =>
  request('userCreate', { email, password, username })

export const canvasCreate = async (name, image, userId) =>
  request('canvasCreate', { name, image, userId })

export const canvasGet = async (userId) =>
  request('canvasGet', { userId })

export const canvasUpdate = async (canvasId) =>
  request('canvasUpdate', { canvasId })

export const canvasDelete = async (canvasId) =>
  request('canvasDelete', { canvasId })

export const userLikesCreate = async (userId, canvasId) =>
  request('userLikesCreate', { userId, canvasId })

export const userLikesGet = async (userId, canvasId) =>
  request('userLikesGet', { userId, canvasId })

export const userLikesDelete = async (userId, canvasId) =>
  request('userLikesDelete', { userId, canvasId })

export const userBadgesCreate = async (userId, badgeId) =>
  request('userBadgesCreate', { userId, badgeId })

export const userBadgesGet = async (userId) =>
  request('userBadgesGet', { userId })

export const request = (path, data) => {
  return fetch(`../.netlify/functions/${path}`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
}