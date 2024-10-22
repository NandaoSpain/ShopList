
// variaveis que selecionam elementos na DOM
const form = document.querySelector('form')
const input = document.querySelector('input')
const newItem = document.querySelector('ul')
const buttonModals = document.getElementsByClassName('close')
const modals = document.getElementsByClassName('hide')
const aviso = document.getElementById('modal')

/*
fecha o modal de item excluido cada vez que clica no botao do X, 
faz isso adicionando a class 'hide'
*/
Array.from(buttonModals).forEach(buttonModal => {
  buttonModal.onclick = () => {
    const modal = document.querySelector('.modal')
    if (modal) {
      modal.classList.add('hide')
    }
  }
})

/*
recupera o array salvo no localstorage do navegador, itera sobre ele
e usa a função addItem para reexibir
*/
document.addEventListener('DOMContentLoaded', () => {
  const savedItems = JSON.parse(localStorage.getItem('listaItens')) || []
  savedItems.forEach(item => {
    addItem(item.text, item.checked)
  })
  aviso.classList.add('hide')
})

/*
recupera o input do usuario removendo os espaços em branco no inicio e final 
com o metodo trim e se a string não é vazia add uma nova tarefa passando 
'false' como segundo parametro para indicar que a tarefa nao é 'checked'
*/
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const newItemText = input.value
  if (newItemText.trim() !== '') {
    addItem(newItemText, false)
    saveLocalStorage(newItemText, false)
    input.value = ''
  }
})

/*
cria um elemento na lista de tarefas com seu checkbox, add um listener para 
quando o elemento for excluido exibir o modal e outro para quando o elemento
for checked exibir o texto com um tachado
*/
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
    if (newElementCheckbox.checked) {
      newElementLabel.style.textDecoration = 'line-through' 
    } else {
      newElementLabel.style.textDecoration = 'none' 
    }
    attLocalStorage()
  })

  newElementButton.addEventListener('click', () => {
    newElementLi.remove()
    if (modals)
      aviso.classList.remove('hide')
    attLocalStorage()
  })
}

/*
recupera o array no localstorage e adiciona um item ao final do array, 
depois salva novamente esse array no localstorage
*/
function saveLocalStorage(text, checked) {
  const listaItens = JSON.parse(localStorage.getItem('listaItens')) || []
  listaItens.push({ text, checked })
  localStorage.setItem('listaItens', JSON.stringify(listaItens))
}

/*
atualiza a lista de itens no localstorage
*/
function attLocalStorage() {
  const attList = []
  newItem.querySelectorAll('li').forEach(li => {
    const checkbox = li.querySelector('input[type="checkbox"]')
    const label = li.querySelector('label')
    attList.push({ text: label.textContent, checked: checkbox.checked })
  })
  localStorage.setItem('listaItens', JSON.stringify(attList))
}
