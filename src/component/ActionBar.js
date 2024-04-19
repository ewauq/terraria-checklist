export default class ActionBar {
  constructor() {
    this.drawerToggleButton = document.querySelector('button.drawer-toggle')
    this.drawerNode = document.querySelector('div.drawer')
  }

  init() {
    this.drawerToggleButton.addEventListener('click', () => {
      this.drawerNode.classList.toggle('open')
    })
  }
}
