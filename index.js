document.addEventListener('DOMContentLoaded', () => {
  let content = document.querySelector('.content')
  let sidebar = document.querySelector('#sidebar')
  let sidebarToggle = document.querySelector('.sidebar-header-toggle')
  let toggleIcon = document.querySelector('.sidebar-header-toggle-icon')
  let colerList = document.querySelector(".coler-list")
  let based = document.querySelector('#based')
  let compared = document.querySelector('#compared')
  let colerSearch = document.querySelector('#coler-search')
  // let favouriteElements = document.querySelector(".favourite-elements")
  // let favouriteContent = document.querySelector(".favourite-content")
  // let favouriteHeader = document.querySelector(".favourite-header")
  // let favouriteHeaderIcon = document.querySelector(".favourite-header-icon")

  based.addEventListener('click', () => {
    based.classList.add('changed')
    compared.classList.remove('changed')
  })

  compared.addEventListener('click', () => {
    compared.classList.add('changed')
    based.classList.remove('changed')
  })

  colerSearch.addEventListener('input', function() {
    let filteredColers = window.colers.filter(coler => {
      return coler.id.includes(this.value) || coler.tone.includes(this.value)
    })
    generateColers(filteredColers)
  });

  generateColers(window.colers)

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
        selectColer(this, coler)
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
      based.src = './img/based.svg'
      colerElement.appendChild(based)

      // compared
      let compared = document.createElement('img')
      compared.classList.add('compared-img')
      compared.src = './img/compared.svg'
      colerElement.appendChild(compared)
    })
  }

  sidebarToggle.addEventListener('click', function () {
    if (sidebar.classList.contains('sidebar-hide')) {
      sidebar.classList.remove('sidebar-hide')
      content.classList.remove('content-full')
      toggleIcon.classList.remove('mirror-x')
    } else {
      sidebar.classList.add('sidebar-hide', 'transition')
      content.classList.add('content-full', 'transition')
      toggleIcon.classList.add('mirror-x')
    }
  })

  function selectColer(element, coler) {
    let changedId = document.querySelector('.color-side.changed').id
    let selected = document.querySelector(`.coler-element.${changedId}`)
    changeColor(coler.id, coler.color, changedId)

    if (element.classList.contains(changedId)) {
      element.classList.remove(changedId)
    } else {
      element.classList.add(changedId)
      selected && selected.classList.remove(changedId)
    }
  }

  // function addElementToLocalStorage(coler) {
  //   let colers = JSON.parse(localStorage.getItem('colers'))
  //   if (colers) {
  //     colers.push(coler)
  //     localStorage.setItem('colers', JSON.stringify(colers))
  //     return colers
  //   }
  //   localStorage.setItem('colers', JSON.stringify([coler]))
  //   return [coler]
  // }

  // function removeElementFromLocalStorage(coler) {
  //   let colers = JSON.parse(localStorage.getItem('colers'))
  //   if (colers) {
  //     colers.shift(coler)
  //     localStorage.setItem('colers', JSON.stringify(colers))
  //     return colers
  //   }
  //   return []
  // }

  function changeColor(colerId, color, element) {
    let backgroundElement = document.querySelector(`#background-${element}`)
    let colerIdElement = document.querySelector(`#coler-${element}-id`)
    backgroundElement.style.backgroundColor = color
    colerIdElement.textContent = colerId
  }
})

