document.addEventListener('DOMContentLoaded', () => {
  let content = document.querySelector('.content')
  let sidebar = document.querySelector('#sidebar')
  let sidebarToggle = document.querySelector('.sidebar-header-toggle')
  let toggleIcon = document.querySelector('.sidebar-header-toggle-icon')
  let colerList = document.querySelector(".coler-list")
  // let favouriteElements = document.querySelector(".favourite-elements")
  // let favouriteContent = document.querySelector(".favourite-content")
  // let favouriteHeader = document.querySelector(".favourite-header")
  // let favouriteHeaderIcon = document.querySelector(".favourite-header-icon")

  generateColers()

  function generateColers() {
    window.colers.forEach(coler => {
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
        changeColor(coler.id, coler.color)
        selectColer(this, coler)
        // favouriteOpen()
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
      let colerTick = document.createElement('img')
      colerTick.classList.add('coler-tick')
      colerTick.src = './img/tick.svg'
      colerElement.appendChild(colerTick)
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

  // favouriteHeader.addEventListener('click', function () {
  //   favouriteToggle()
  // })

  // function favouriteOpen() {
  //   favouriteContent.classList.add('show', 'transition')
  //   favouriteHeaderIcon.classList.add('mirror-y', 'transition')
  // }

  // function favouriteToggle() {
  //   if (favouriteContent.classList.contains('show')) {
  //     favouriteContent.classList.remove('show')
  //     favouriteHeaderIcon.classList.remove('mirror-y')
  //   } else {
  //     favouriteOpen()
  //   }
  // }

  function selectColer(element, coler) {
    if (element.classList.contains('selected')) {
      element.classList.remove('selected')
      // let colers = removeElementFromLocalStorage(coler)
      // removeFavourites(coler)
    } else {
      element.classList.add('selected')
      // let colers = addElementToLocalStorage(coler)
      // addFavourites(coler)
    }
  }

  // function updateFavourites(colers) {
  //   colers.forEach(coler => {
  //     addFavourites(coler)
  //   })
  // }

  // function addFavourites(coler) {
  //   // favouriteElement
  //   let favouriteElement = document.createElement('div')
  //   favouriteElement.dataset.id = coler.id
  //   favouriteElement.classList.add('favourite-element')
  //   favouriteElement.style.background = coler.color
  //   favouriteElement.setAttribute('title', coler.id)
  //   favouriteElement.addEventListener('click', function () {
  //     changeColor(coler.id, coler.color)
  //     selectColer(this, coler)
  //   })
  //   // favouriteIdent
  //   let favouriteIdent = document.createElement('div')
  //   favouriteIdent.classList.add('coler-ident')
  //   favouriteIdent.innerText = coler.id
  //   favouriteElement.appendChild(favouriteIdent)
  //
  //   favouriteElements.appendChild(favouriteElement)
  // }

  // function removeFavourites(element, coler) {
  //   console.log(colers)
  // }

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

  function changeColor(colerId, color, element = 'first') {
    let backgroundElement = document.querySelector(`#background-${element}`)
    let colerIdElement = document.querySelector(`#coler-${element}-id`)
    backgroundElement.style.backgroundColor = color
    colerIdElement.textContent = colerId
  }
})

