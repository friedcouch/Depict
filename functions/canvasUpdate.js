const supabase = require('./modules.js')

exports.handler = async (event, context) => {
  const data = ''
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}