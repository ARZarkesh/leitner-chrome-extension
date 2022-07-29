import { Card_AddWord, Card_GetSuggestions } from "./repository/Card.js"

const frontTextInput = document.getElementById('front_text')
const backTextInput = document.getElementById('back_text')
const submitButton = document.getElementById('submit')

let front_text = ''
let back_text = ''

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

frontTextInput.oninput = debounce((event) => {
  front_text = event.target.value

  const loading = document.getElementsByClassName('input-container__loading')[0]
  loading.style.display = 'block'
  Card_GetSuggestions({ query: front_text })
    .then(response => {
      backTextInput.value = response.translate
      back_text = response.translate
    })
    .finally(() => {
      loading.style.display = 'none'
    })
}, 500)

backTextInput.oninput = (event) => {
  back_text = event.target.value
}

submitButton.onclick = () => {
  Card_AddWord({ front_text, back_text })
    .then(() => {
      frontTextInput.value = ''
      backTextInput.value = ''
      alert('The card has been added')
    })
}