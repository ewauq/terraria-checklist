import ChapterPage from './ChapterPage.js'

export default class Router {
  constructor(data) {
    this.data = data
    this.sections = data.sections
  }

  init() {
    let chapterId = window.location.hash.slice(1)

    if (chapterId) {
      this.openPage(chapterId)
    } else {
      const page = new ChapterPage(this.data.home)
      page.open()
    }

    const self = this
    window.addEventListener('popstate', function () {
      chapterId = this.window.location.hash.slice(1)
      self.openPage(chapterId)
    })

    console.log('%cRouter initialized', 'color: #1fc600')
  }

  openPage(chapterId) {
    this.sections.map((section) => {
      section.chapters.map((chapter) => {
        if (chapter.id === chapterId) {
          const page = new ChapterPage(chapter)
          page.open()
        }
      })
    })
  }
}
