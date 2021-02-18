const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://kjnngsvjfaytvrealxci.supabase.co'
const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_KEY)

exports.handler = async (event, context) => {
  let { name, image, userId } = JSON.parse(event.body)

  image = image.trim()
  // Add viewBox so that we can scale it in the frontend
  image = image.slice(0, 4) + ' viewBox="-50 -50 500 500"' + image.slice(4)

  const data = await supabase
    .from('canvasses')
    .insert({
      name: name,
      image: image,
      user_id: userId
    })
    .then(res => {
      if (res.error) throw { error: res.error.message }
      return res.data[0]
    })
    .catch(err => err)
    
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}