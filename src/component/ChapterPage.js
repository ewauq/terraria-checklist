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
    this.notes = chapter.notes
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
    const pageLinesNodes = document.querySelectorAll('.content p')
    pageLinesNodes.forEach((node) => node.remove())

    // Add new lines
    const linesNode = createElement('p')
    const linesCount = this.lines.filter((line) => !line.startsWith('~~')).length

    let lineIndex = 0
    this.lines.map((line) => {
      if (line.startsWith('~~')) lineIndex--
      const newLine = new Line(`${this.id}-${lineIndex}`, line, this.id, linesCount)
      newLine.add(linesNode)
      lineIndex++
    })

    page.appendChild(linesNode)

    if (this.notes) {
      const notesNode = createElement('p', { class: 'notes' })
      notesNode.innerHTML = markdownToHtml(this.notes)
      page.appendChild(notesNode)
    }
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
