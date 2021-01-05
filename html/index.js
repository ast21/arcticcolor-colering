document.addEventListener('DOMContentLoaded', () => {
  let container = document.querySelector('#container')
  let sidebar = document.querySelector('#sidebar')
  let sidebarToggle = document.querySelector('#sidebar-toggle')
  let sidebarTabs = document.querySelectorAll(".sidebar-tab")
  let sidebarTabIcons = document.querySelectorAll(".sidebar-tab-icon")
  let sidebarTabContents = document.querySelectorAll(".sidebar-tab-content")

  displayActiveSidebarContent()

  function displayActiveSidebarContent() {
    let sidebarActiveTab = document.querySelector(".sidebar-tab.active")
    let sidebarActiveTabContent = document.querySelector(`#${sidebarActiveTab.dataset.content}`)
    sidebarActiveTabContent.style.display = 'block'
  }

  sidebarToggle.addEventListener('click', function () {
    if (sidebar.classList.contains('sidebar-hide')) {
      sidebar.classList.remove('sidebar-hide')
      sidebarToggle.classList.remove('sidebar-hide')
    } else {
      sidebar.classList.add('sidebar-hide', 'transition')
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

