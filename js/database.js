export const userGet = async (email, password) =>
  request('userGet', { email, password })

export const userCreate = async (email, password, username) =>
  request('userCreate', { email, password, username })

export const request = (path, data) => {
  return fetch(`../.netlify/functions/${path}`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
}