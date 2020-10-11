const CLIENT_ID = process.env.SOLID_APP_CLIENT_ID
const ACCESS_TOKEN = 'access_token'

export default class ApiService {
  static async getAccessToken () {
    if (sessionStorage.getItem(ACCESS_TOKEN) !== null) {
      return new Promise((resolve, reject) => resolve(sessionStorage.getItem(ACCESS_TOKEN)))
    } else {
      const body = new URLSearchParams()
      body.append('grant_type', 'https://oauth.reddit.com/grants/installed_client')
      body.append('device_id', 'DO_NOT_TRACK_THIS_DEVICE')

      return new Promise((resolve, reject) => {
        fetch('https://www.reddit.com/api/v1/access_token', {
          method: 'POST',
          body: body,
          headers: {
            Authorization: `Basic ${btoa(`${CLIENT_ID}:` + '')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(res => res.json())
          .then(data => {
            sessionStorage.setItem(ACCESS_TOKEN, data.access_token)
            resolve(data.accessToken)
          })
          .catch(e => reject(e))
      })
    }
  }

  static async get (url) {
    return ApiService.getAccessToken().then(accessToken => {
      if (accessToken !== null) {
        return new Promise((resolve, reject) => {
          fetch(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(e => reject(e))
        })
      } else {
        return new Promise((resolve, reject) => {
          reject(new Error('No valid access token'))
        })
      }
    })
  }
}
