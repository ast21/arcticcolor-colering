document.addEventListener('DOMContentLoaded', () => {
  let content = document.querySelector('.content')
  let sidebar = document.querySelector('#sidebar')
  let sidebarToggle = document.querySelector('.sidebar-header-toggle')
  let toggleIcon = document.querySelector('.sidebar-header-toggle-icon')
  let colerList = document.querySelector(".coler-list")
  let favouriteElements = document.querySelector(".favourite-elements")

  console.log(content)
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
        let colorFirst = document.querySelector('#background-first')
        let colorSecond = document.querySelector('#background-second')
        let colorFirstIdElement = document.querySelector('#coler-first-id')
        let colorSecondIdElement = document.querySelector('#coler-second-id')

        // change color
        colorSecond.style.backgroundColor = colorFirst.style.backgroundColor
        colorSecondIdElement.textContent = colorFirstIdElement.textContent
        colorFirst.style.backgroundColor = this.style.backgroundColor
        colorFirstIdElement.textContent = coler.id
        // colorFirst.classList.add('color-change')
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
})

