import { BASE_URL } from "./config.js"

function getDeferedPromise() {
  const result = {}
  result.promise = new Promise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

export async function httpGet(path, meta) {
  const deferred = getDeferedPromise()
  const request = new XMLHttpRequest()

  const queryString = meta?.body ? `?${Object.keys(meta.body).map(key => `${key}=${encodeURIComponent(meta.body[key])}`).join('&')}` : ''

  let token
  const storedToken = localStorage.getItem('token')
  if (storedToken) {
    token = storedToken
  } else {
    token = window.prompt('Please enter your token')
    localStorage.setItem('token', token)
  }

  request.open('GET', `${BASE_URL}${path}${queryString}`, true)
  request.setRequestHeader('token', token)
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
    if (this.status === 401) {
      localStorage.removeItem('token')
      token = window.prompt('Please enter your token')
      localStorage.setItem('token', token)
      request.send()
    }
    if (this.status < 200 || this.status >= 400 || response?.status === 'error') {
      deferred.reject(response.error || response)
    } else {
      deferred.resolve(response.data || response)
    }
  }

  request.onerror = () => {
    // There was a connection error of some sort
    deferred.reject(new Error('Network Error'))
  }

  request.send()

  return deferred.promise
}

export async function httpPost(path, meta) {
  const deferred = getDeferedPromise()
  const request = new XMLHttpRequest()

  request.open('POST', `${BASE_URL}${path}`, true)
  request.setRequestHeader('token', token)
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
    if (this.status === 401) {
      localStorage.removeItem('token')
      token = window.prompt('Please enter your token')
      localStorage.setItem('token', token)
      request.send()
    }
    if (this.status < 200 || this.status >= 400 || response?.status === 'error') {
      deferred.reject(response.error || response)
    } else {
      deferred.resolve(response.data || response)
    }
  }

  request.onerror = () => {
    // There was a connection error of some sort
    deferred.reject(new Error('Network Error'))
  }

  request.send(JSON.stringify(meta.body))

  return deferred.promise
}