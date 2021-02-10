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

export const request = (path, data) => {
  return fetch(`../.netlify/functions/${path}`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
}