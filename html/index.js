let toggle = document.querySelector('#sidebar-toggle')
let sidebar = document.querySelector('#sidebar')
let container = document.querySelector('#container')

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
