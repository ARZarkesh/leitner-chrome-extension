import { BASE_URL } from "./config.js"

const token = 'BQpQ05TAvA6wK5ftsIvGaENehYS7ZZk1'

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

  const queryString = meta?.body ? `?${Object.keys(meta.body).map(key => `${key}=${meta.body[key]}`).join('&')}` : ''

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