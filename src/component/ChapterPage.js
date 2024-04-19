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
    const welcomeTextNode = document.querySelector('.content .welcome-text') // ?
    const pageLinesNode = document.querySelector('.content p')
    if (welcomeTextNode) welcomeTextNode.remove()
    if (pageLinesNode) pageLinesNode.remove()

    // Add new lines
    const linesNode = createElement('p')

    let lineIndex = 0
    this.lines.map((line) => {
      if (line.startsWith('~~')) lineIndex--
      const newLine = new Line(`${this.id}-${lineIndex}`, line)
      newLine.add(linesNode)
      lineIndex++
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
