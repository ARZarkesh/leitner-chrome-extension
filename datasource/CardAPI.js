import { httpGet } from "../helper.js"

export async function API_Card_GetSuggestions(body) {
  return httpGet('/api/translate', { body })
}

export async function API_Card_AddWord(body) {
  return httpGet('/api/card/add', { body })
}