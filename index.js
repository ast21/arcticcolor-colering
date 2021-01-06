document.addEventListener('DOMContentLoaded', () => {
  let content = document.querySelector('.content')
  let containerHeader = document.querySelector('.content-header')
  let sidebar = document.querySelector('#sidebar')
  let sidebarToggle = document.querySelector('#sidebar-toggle')
  let sidebarHeader = document.querySelectorAll(".sidebar-header")
  let colerList = document.querySelector(".coler-list")

  console.log(content)
  // displayActiveSidebarContent()
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

        // change color
        colorSecond.style.backgroundColor = colorFirst.style.backgroundColor
        colorFirst.style.backgroundColor = this.style.backgroundColor
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
      sidebarToggle.classList.remove('sidebar-hide')
    } else {
      sidebar.classList.add('sidebar-hide', 'transition')
      content.classList.add('content-full', 'transition')
      sidebarToggle.classList.add('sidebar-hide', 'transition')
    }
  })

  // sidebarTabs.forEach(function (elem) {
  //   elem.addEventListener("click", function () {
  //     let sidebarThisTab = this
  //     let sidebarThisTabContent = document.querySelector(`#${sidebarThisTab.dataset.content}`)
  //     let sidebarActiveTab = document.querySelector(".sidebar-tab.active")
  //     let sidebarActiveTabContent = document.querySelector(`#${sidebarActiveTab.dataset.content}`)
  //     if (sidebarThisTab !== sidebarActiveTab) {
  //       // active => disable
  //       sidebarActiveTab.classList.remove('active')
  //       sidebarActiveTabContent.style.display = 'none'
  //       // this => active
  //       sidebarThisTab.classList.add('active')
  //       sidebarThisTabContent.style.display = 'block'
  //     }
  //   })
  // })
})

