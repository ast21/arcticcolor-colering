let toggle = document.querySelector('#sidebar-toggle')
let sidebar = document.querySelector('#sidebar')
let container = document.querySelector('#container')
let sidebarTabs = document.querySelectorAll(".sidebar-tab");

toggle.addEventListener('click', function () {
  if (sidebar.classList.contains('sidebar-hide')) {
    sidebar.classList.remove('sidebar-hide');
    toggle.classList.remove('sidebar-hide');
  } else {
    sidebar.classList.add('sidebar-hide', 'transition');
    toggle.classList.add('sidebar-hide', 'transition');
  }
  console.log(sidebar)
})


sidebarTabs.forEach(function (elem) {
  elem.addEventListener("click", function () {
    let sidebarActiveTab = document.querySelector(".sidebar-tab.active");
    if (this !== sidebarActiveTab) {
      this.classList.add('active');
      sidebarActiveTab.classList.remove('active');
    }
  })
})
