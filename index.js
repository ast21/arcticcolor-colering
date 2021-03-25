window.onload = function () {
  if (window.location.href.includes('product')) calculate()
}

document.addEventListener('DOMContentLoaded', () => {
  let content = document.querySelector('.content')
  let sidebar = document.querySelector('#sidebar')
  let sidebarToggle = document.querySelector('.sidebar-header-toggle')
  let toggleIcon = document.querySelector('.sidebar-header-toggle-icon')
  let colerList = document.querySelector(".coler-list")
  let based = document.querySelector('#based')
  let compared = document.querySelector('#compared')
  let colerSearch = document.querySelector('#coler-search')
  let toggleImage = document.querySelector('.toggle-image')
  let facade = document.querySelector('#facade')
  let interior = document.querySelector('#interior')
  let imageTemplate = document.querySelector('.image-template')
  let colerSelected = document.querySelector('.coler-selected')
  let colerSelectButton = document.querySelector('.coler-select-button')
  let coleringOption = document.querySelector('#colerPick')?.dataset.colering_type ?? 'interior'

  if (coleringOption === 'facade') {
    facade.classList.remove('d-none')
    interior.classList.add('d-none')
    imageTemplate.classList.add('image-template-url')
  }

  addEvents()
  generateColers(window.colers)
  loadChanges()

  function getColerById(id) {
    return window.colers.find(coler => coler.id === id)
  }

  function loadChanges() {
    let basedColerId = localStorage.getItem('basedColerId')
    let comparedColerId = localStorage.getItem('comparedColerId')
    let element

    if (basedColerId) {
      element = document.querySelector(`#coler-element-${basedColerId}`)
      selectColer(element, getColerById(basedColerId), 'based')
    }
    if (comparedColerId) {
      element = document.querySelector(`#coler-element-${comparedColerId}`)
      selectColer(element, getColerById(comparedColerId), 'compared')
    }
  }

  function generateColers(colers) {
    while (colerList.firstChild) {
      colerList.removeChild(colerList.firstChild);
    }

    colers.forEach(coler => {
      // colergroup
      let groupIdent = null
      let colergroup = document.querySelector(`#coler-group-${coler.group}`)
      if (colergroup === null) {
        colergroup = document.createElement('div')
        colergroup.id = `coler-group-${coler.group}`
        colergroup.classList.add('coler-group')
        colerList.appendChild(colergroup)

        // groupIdent
        groupIdent = document.createElement('div')
        groupIdent.classList.add('group-ident')
        groupIdent.innerText = coler.group
      }
      // colerElement
      let colerElement = document.createElement('div')
      colerElement.id = `coler-element-${coler.id}`
      colerElement.classList.add('coler-element')
      colerElement.style.background = coler.color
      colerElement.setAttribute('title', coler.id)
      colerElement.addEventListener('click', function () {
        let activeTab = document.querySelector('.color-side.changed').id
        selectColer(this, coler, activeTab)
      })
      colergroup.appendChild(colerElement)

      // groupIdent
      if (groupIdent !== null) colerElement.appendChild(groupIdent)

      // colerIdent
      let colerIdent = document.createElement('div')
      colerIdent.classList.add('coler-ident')
      colerIdent.innerText = coler.id
      colerElement.appendChild(colerIdent)

      // colerTick
      // let colerTick = document.createElement('img')
      // colerTick.classList.add('coler-tick')
      // colerTick.src = './img/tick.svg'
      // colerElement.appendChild(colerTick)

      // based
      let based = document.createElement('img')
      based.classList.add('based-img')
      based.src = '/wp-content/uploads/2021/01/based.svg'
      colerElement.appendChild(based)

      // compared
      let compared = document.createElement('img')
      compared.classList.add('compared-img')
      compared.src = '/wp-content/uploads/2021/01/compared.svg'
      colerElement.appendChild(compared)
    })
  }

  sidebarToggle.addEventListener('click', function () {
    sidebar.classList.toggle('sidebar-hide')
    content.classList.toggle('content-full')
    toggleIcon.classList.toggle('mirror-x')
  })

  function selectColer(element, coler, activeTab) {
    let selected = document.querySelector(`.coler-element.${activeTab}`)
    changeColor(coler.id, coler.color, activeTab)
    console.log(coler.color)
    if (activeTab === 'based') updateColerSelected(coler)
    colerSelectButton.textContent = 'Цвет выбран'
    colerSelectButton.classList.remove('disabled')

    if (element.classList.contains(activeTab)) {
      element.classList.remove(activeTab)
    } else {
      element.classList.add(activeTab)
      selected && selected.classList.remove(activeTab)
    }

    localStorage.setItem(`${activeTab}ColerId`, coler.id)
  }

  function updateColerSelected(coler) {
    colerSelected.style.background = coler.color;
    colerSelected.textContent = coler.id;
    colerSelected.dataset.coler_id = coler.id;
    colerSelected.dataset.interior_id = coler.interior_id;
    colerSelected.dataset.facade_id = coler.facade_id;
    colerSelected.dataset.interior_price = coler.interior_price;
    colerSelected.dataset.facade_price = coler.facade_price;
  }

  function changeColor(colerId, color, element) {
    let backgroundElement = document.querySelector(`#background-${element}`)
    let colerIdElement = document.querySelector(`#coler-${element}-id`)
    backgroundElement.style.backgroundColor = color
    colerIdElement.textContent = colerId
  }

  function addEvents() {
    colerSelectButton.addEventListener('click', () => {
      if (window.location.href.includes('product')) {
        calculate()
        jQuery.magnificPopup.close()
      } else {
        window.location.href = `/shop/?filter_colering=${coleringOption}`
      }
    })

    toggleImage.addEventListener('click', () => {
      coleringOption = coleringOption === 'interior' ? 'facade' : 'interior'
      if (coleringOption === 'interior') {
        facade.classList.add('d-none')
        interior.classList.remove('d-none')
        imageTemplate.classList.remove('image-template-url')
      } else {
        facade.classList.remove('d-none')
        interior.classList.add('d-none')
        imageTemplate.classList.add('image-template-url')
      }
    })

    based.addEventListener('click', () => {
      let selected = document.querySelector(`.coler-element.based`)
      if (selected) updateColerSelected(getColerById(selected.title))
      based.classList.add('changed')
      compared.classList.remove('changed')
    })

    compared.addEventListener('click', () => {
      compared.classList.add('changed')
      based.classList.remove('changed')
    })

    colerSearch.addEventListener('input', function () {
      window.colers.forEach(coler => {
        let colerElement = document.getElementById(`coler-element-${coler.id}`)
        if (coler.id.includes(this.value.toLowerCase()) || coler.tone.includes(this.value.toLowerCase())) {
          colerElement.style.display = 'block'
        } else {
          colerElement.style.display = 'none'
        }
      })
    });
  }
})

function calculate() {
  let colerSelected = document.querySelector('.coler-selected')
  let coleringOption = document.querySelector('#colerPick')?.dataset.colering_type ?? 'interior'

  document.querySelector('#colerProductId').value = colerSelected.dataset[`${coleringOption}_id`]
  document.querySelector('#coler-id').textContent = colerSelected.dataset.coler_id
  document.querySelector('#coler-price').textContent = colerSelected.dataset[`${coleringOption}_price`]
  document.querySelector('#coler-color').style.backgroundColor = colerSelected.style.background

  let price = +document.querySelector('#itemPrice').value;
  let count = +document.querySelector('input.qty').value;
  let colerPrice = +document.querySelector('#coler-price').textContent;
  let sum = document.querySelector('#cart-size-count');
  let total = document.querySelector('#cart-sum-count');
  let valueSum = price + colerPrice;
  sum.textContent = valueSum;
  total.textContent = valueSum * count;
}
