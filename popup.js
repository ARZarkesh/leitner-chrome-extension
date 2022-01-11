import { Card_GetSuggestions } from "./repository/Card.js"

const frontTextInput = document.getElementById('front_text')
const backTextInput = document.getElementById('back_text')

frontTextInput.onchange = (event) => {
  const front_text = event.target.value
  Card_GetSuggestions({ front_text })
    .then(response => {
      backTextInput.value = response.back_text
    })
}
