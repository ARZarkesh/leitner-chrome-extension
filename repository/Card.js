import { API_Card_GetSuggestions } from "../datasource/CardAPI.js"

export async function Card_GetSuggestions(body) {
  const result = await API_Card_GetSuggestions(body)
  return result
}