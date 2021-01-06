document.addEventListener('DOMContentLoaded', () => {
  let content = document.querySelector('.content')
  let containerHeader = document.querySelector('.content-header')
  let sidebar = document.querySelector('#sidebar')
  let sidebarToggle = document.querySelector('#sidebar-toggle')
  let sidebarTabs = document.querySelectorAll(".sidebar-tab")
  let colerList = document.querySelector(".coler-list")

  console.log(content)
  displayActiveSidebarContent()
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
      colergroup.appendChild(colerElement)

      colerElement.style.background = coler.color
      colerElement.setAttribute('title', coler.id)
      colerElement.addEventListener('click', () => {
        console.log(coler.id, coler.color, coler.price)
      })

      // groupIdent
      if (groupIdent !== null) colerElement.appendChild(groupIdent)

      // colerIdent
      let colerIdent = document.createElement('div')
      colerIdent.classList.add('coler-ident')
      colerElement.appendChild(colerIdent)

      colerIdent.innerText = coler.id
    })
  }

  function displayActiveSidebarContent() {
    let sidebarActiveTab = document.querySelector(".sidebar-tab.active")
    let sidebarActiveTabContent = document.querySelector(`#${sidebarActiveTab.dataset.content}`)
    sidebarActiveTabContent.style.display = 'block'
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

  sidebarTabs.forEach(function (elem) {
    elem.addEventListener("click", function () {
      let sidebarThisTab = this
      let sidebarThisTabContent = document.querySelector(`#${sidebarThisTab.dataset.content}`)
      let sidebarActiveTab = document.querySelector(".sidebar-tab.active")
      let sidebarActiveTabContent = document.querySelector(`#${sidebarActiveTab.dataset.content}`)
      if (sidebarThisTab !== sidebarActiveTab) {
        // active => disable
        sidebarActiveTab.classList.remove('active')
        sidebarActiveTabContent.style.display = 'none'
        // this => active
        sidebarThisTab.classList.add('active')
        sidebarThisTabContent.style.display = 'block'
      }
    })
  })
})

