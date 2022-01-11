import { BASE_URL } from "./config.js"

function getDeferedPromise() {
  const result = {}
  result.promise = new Promise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

export async function httpRequest(path, meta) {
  const deferred = getDeferedPromise()
  const request = new XMLHttpRequest()

  request.open('POST', `${BASE_URL}${path}`, true)
  request.setRequestHeader('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4MCwidGltZSI6MTY0MTU3NTg2NDUxNjk5MDc2MX0.st7Kj7os3CYj7sSxm92B1AI2RljXd_YEerpgsENz6qU')
  if (meta.headers) {
    for (const header in meta.headers) {
      request.setRequestHeader(header, meta.headers[header])
    }
  }

  request.onload = async function () {
    let response
    try {
      response = JSON.parse(request.responseText)
    } catch(err) {
      console.log(err)
      deferred.reject(new Error('Unpacking Error'))
      return
    }
    if (this.status < 200 || this.status >= 400 || response?.status === 'error') {
      deferred.reject(response.error || response)
    } else {
      deferred.resolve(response.data || response)
    }
    if (self.logNetwork) {
      const style = 'color:white;background:#158C73;border-radius:3px;padding:2px 6px;'
      console.log(`%c${baseURL}`, style, path ,meta.body ?? 'NO_BODY', response ?? 'ERR_RESPONSE')
    }
  }

  request.onerror = () => {
    // There was a connection error of some sort
    deferred.reject(new Error('Network Error'))
  }

  request.send(JSON.stringify(meta.body))

  return deferred.promise
}
