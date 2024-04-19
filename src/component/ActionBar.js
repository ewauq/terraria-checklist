export default class ActionBar {
  constructor() {
    // this.actionBarNode = document.querySelector('div.action-bar')
    this.drawerToggleButton = document.querySelector('button.drawer-toggle')
    this.drawerNode = document.querySelector('div.drawer')
  }

  init() {
    this.drawerToggleButton.addEventListener('click', () => {
      this.drawerNode.classList.toggle('open')
    })
  }
}
