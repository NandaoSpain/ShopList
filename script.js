const form = document.querySelector('form')
const input = document.querySelector('input')
const newItem = document.querySelector('ul')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  
  let newElementLi = document.createElement('li')
  let newElementDiv = document.createElement('div')
  let newElementCheckbox = document.createElement('input')
  let newElementLabel = document.createElement('label')
  let newElementButton = document.createElement('button')
  let newElementIcon = document.createElement('i')

  newElementCheckbox.type = 'checkbox'
  newElementLabel.textContent = input.value
  newElementIcon.classList.add('ph', 'ph-trash')

  newElementButton.appendChild(newElementIcon)

  newElementDiv.appendChild(newElementCheckbox)
  newElementDiv.appendChild(newElementLabel)

  newElementLi.appendChild(newElementDiv)
  newElementLi.appendChild(newElementButton)

  newItem.appendChild(newElementLi)
  input.value = ''

  newElementCheckbox.addEventListener('change', (e) => {
    if (newElementCheckbox.checked) {
      newElementLabel.style.textDecoration= 'line-through'
    } else {
      newElementLabel.style.textDecoration = 'none'
    }
  })

  newElementButton.addEventListener('click', () => {
    newElementLi.remove()
  })
})