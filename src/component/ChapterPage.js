import { createElement } from '../helper/html.js'
import Line from './Line.js'
import { markdownToHtml } from '../helper/markdown.js'

export default class ChapterPage {
  constructor(chapter) {
    this.id = chapter.id
    this.name = chapter.name
    this.background = chapter.background
    this.lines = chapter.lines
    this.description = chapter.description
  }

  setCover() {
    const titleNode = document.querySelector('.content .cover h1')
    const coverNode = document.querySelector('.content .cover')
    titleNode.innerHTML = this.name
    coverNode.style.background = this.background
    if (this.id === 'home') {
      coverNode.style.backgroundPosition = 'center'
      coverNode.style.backgroundSize = 'cover'
    }
  }

  setLines() {
    const page = document.querySelector('.content')

    // Remove previous lines
    const pageLinesNode = document.querySelector('.content p')
    if (pageLinesNode) pageLinesNode.remove()

    // Add new lines
    const linesNode = createElement('p')

    const linesCount = this.lines.filter((line) => !line.startsWith('~~')).length
    const lines = this.lines.filter((line) => !line.startsWith('~~'))

    lines.map((line, index) => {
      const newLine = new Line(`${this.id}-${index}`, line, this.id, linesCount)
      newLine.add(linesNode)
    })

    page.appendChild(linesNode)
  }

  setHomeDescription() {
    const page = document.querySelector('.content')
    const linesNode = createElement('p', { class: 'welcome-text' })
    linesNode.innerHTML = markdownToHtml(this.description)
    page.appendChild(linesNode)
  }

  open() {
    this.setCover()
    if (this.lines) this.setLines()
    if (this.id === 'home') this.setHomeDescription()
  }
}
