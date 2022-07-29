import { Card_AddWord, Card_GetSuggestions } from "./repository/Card.js"

const frontTextInput = document.getElementById('front_text')
const backTextInput = document.getElementById('back_text')
const submitButton = document.getElementById('submit')

let front_text = ''
let back_text = ''

frontTextInput.onchange = (event) => {
  front_text = event.target.value
  Card_GetSuggestions({ query: front_text })
    .then(response => {
      backTextInput.value = response.translate
      back_text = response.translate
    })
}

submitButton.onclick = () => {
  Card_AddWord({ front_text, back_text })
    .then(() => {
      alert('The word successfully added')
    })
}