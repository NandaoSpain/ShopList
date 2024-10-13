const form = document.querySelector('form')
const input = document.querySelector('input')
const newItem = document.querySelector('ul')
const buttonModals = document.getElementsByClassName('close')
const modals = document.getElementsByClassName('hide')
const aviso = document.getElementById('modal')

Array.from(buttonModals).forEach(buttonModal => {
  buttonModal.onclick = () => {
    const modal = document.querySelector('.modal')
    if (modal) {
      modal.classList.add('hide')
    }
  };
});

document.addEventListener('DOMContentLoaded', () => {
  const savedItems = JSON.parse(localStorage.getItem('listaItens')) || []
  savedItems.forEach(item => {
    addItem(item.text, item.checked)
  })
  aviso.classList.add('hide')
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const newItemText = input.value
  if (newItemText.trim() !== '') {
    addItem(newItemText, false)
    saveLocalStorage(newItemText, false)
    input.value = ''
  }
})

function addItem(text, checked) {
  let newElementLi = document.createElement('li')
  let newElementDiv = document.createElement('div')
  let newElementCheckbox = document.createElement('input')
  let newElementLabel = document.createElement('label')
  let newElementButton = document.createElement('button')
  let newElementIcon = document.createElement('i')

  newElementCheckbox.type = 'checkbox'
  newElementCheckbox.checked = checked
  newElementLabel.textContent = text
  newElementIcon.classList.add('ph', 'ph-trash')
  newElementButton.appendChild(newElementIcon)

  newElementDiv.appendChild(newElementCheckbox)
  newElementDiv.appendChild(newElementLabel)
  newElementLi.appendChild(newElementDiv)
  newElementLi.appendChild(newElementButton)
  newItem.appendChild(newElementLi)

  newElementCheckbox.addEventListener('change', () => {
    attLocalStorage()
  })

  newElementButton.addEventListener('click', () => {
    newElementLi.remove()
    if (modals)
      aviso.classList.remove('hide')
    attLocalStorage()
  })
}

function saveLocalStorage(text, checked) {
  const listaItens = JSON.parse(localStorage.getItem('listaItens')) || []
  listaItens.push({ text, checked })
  localStorage.setItem('listaItens', JSON.stringify(listaItens))
}

function attLocalStorage() {
  const attList = []
  newItem.querySelectorAll('li').forEach(li => {
    const checkbox = li.querySelector('input[type="checkbox"]')
    const label = li.querySelector('label')
    attList.push({ text: label.textContent, checked: checkbox.checked })
  })
  localStorage.setItem('listaItens', JSON.stringify(attList))
}


