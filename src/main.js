import ChapterPage from './component/ChapterPage.js'
import Drawer from './component/Drawer.js'

class App {
  constructor() {
    this.data = null
  }

  async init() {
    console.log('App initialization...')

    const response = await fetch('./data.json')
    this.data = await response.json()

    if (!this.data) {
      console.error('Data not found')
      return
    }

    const drawer = new Drawer()
    this.data.sections.map((section) => drawer.addSection(section.name, section.chapters))

    let chapterId = window.location.hash.slice(1)
    if (chapterId) {
      this.openPage(chapterId)
    }

    const self = this
    window.addEventListener('popstate', function () {
      chapterId = this.window.location.hash.slice(1)
      self.openPage(chapterId)
    })

    console.log('App loaded')
  }

  openPage(chapterId) {
    this.data.sections.map((section) => {
      section.chapters.map((chapter) => {
        if (chapter.id === chapterId) {
          const page = new ChapterPage(chapter)
          page.open()
        }
      })
    })
  }
}

const app = new App()
app.init()
