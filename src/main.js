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

    const actionBar = new ActionBar()
    actionBar.init()

    const drawer = new Drawer(this.data.sections)
    drawer.init()

    const router = new Router(this.data)
    router.init()

    console.log('%cApp initialized', 'color: #fff;background: #0a5d00;')
  }
}

const app = new App()
app.init()
