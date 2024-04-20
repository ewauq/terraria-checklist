import Drawer from './component/Drawer.js'
import ActionBar from './component/ActionBar.js'
import Router from './component/Router.js'

class App {
  constructor() {
    this.data = null
  }

  async init() {
    console.log('%cApp initialization...', 'color: #000;background: orange;')

    const response = await fetch('./data.json')
    this.data = await response.json()

    if (!this.data) {
      console.error('Data not found')
      return
    }

    // Remove outdated local storage items
    let linesIds = []
    this.data.sections.map((section) => {
      section.chapters.map((chapter) => {
        const lines = chapter.lines.filter((line) => !line.startsWith('~~'))

        linesIds = linesIds.concat(lines.map((_, index) => `${chapter.id}-${index}`))
      })
    })

    Object.keys(localStorage).map((key) => {
      if (!linesIds.includes(key)) {
        localStorage.removeItem(key)
      }
    })

    const resetButtonsNodes = document.querySelectorAll('.reset')

    resetButtonsNodes.forEach((resetButton) => {
      resetButton.addEventListener('click', () => {
        const confirmation = confirm('Are you sure you want to reset your progression?')
        if (!confirmation) return
        localStorage.clear()
        location.href = '#journeys-beginning'
      })
    })

    const actionBar = new ActionBar()
    actionBar.init()

    const drawer = new Drawer(this.data.sections)
    drawer.render()

    const router = new Router(this.data)
    router.init()

    console.log('%cApp initialized', 'color: #fff;background: #0a5d00;')
  }
}

const app = new App()
app.init()
