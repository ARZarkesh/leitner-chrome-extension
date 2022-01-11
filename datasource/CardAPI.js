import { httpRequest } from "../helper.js"

export async function API_Card_GetSuggestions(body) {
  return httpRequest('/api/card/suggestion', { body })
}

export async function API_Card_AddWord(body) {
  return httpRequest('/api/card/add', { body })
}