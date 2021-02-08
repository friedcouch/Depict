// const supabase = require('../modules.js')

// exports.handler = async (event, context) => {
//   const sub = supabase
//     .from('users')
//     .on('insert', payload => {
//       console.log(`payload:\n${payload}`)
//     })
//     .subscribe()
//   const data = supabase.getSubscriptions()
//   return {
//     statusCode: 200,
//     body: JSON.stringify(data)
//   }
// }


const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://kjnngsvjfaytvrealxci.supabase.co'
const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMjYyOTQ3NywiZXhwIjoxOTI4MjA1NDc3fQ.0LIh-Q8TjLp18JAD6lqo2pq-HfLdK-AYoth2HpI3FFM"
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  const email = 'a@a.a'
  const username = 'aaa'
  const password = 'aaa'
  console.log(email, password, username)
  const data = supabase
    .from('users')
    .select('username')
    .eq('username', username) // Checks if the username exists
    .then(res => {
      if (res.data[0]) throw 'Username taken'
      return supabase.auth
        .signUp({ email, password })
    })
    .then(res => {
      if (res.error) { throw res.error }
      return supabase
        .from('users')
        .insert({ username: username, uuid: res.user.id })
    })
    .then(res => {
      if (res.error) { throw res.error }
      return res.data[0]
    })
    .catch(err => console.error(err))