const fetch = require('node-fetch')

const handler = async function (req) {
  try {

    console.log(req)

    const params = new URLSearchParams()
    params.append('key', '35214r37fprr4277s5xwm')
    params.append('file', req.file)

    const response = await fetch(req.url, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: params
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.joke }),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
