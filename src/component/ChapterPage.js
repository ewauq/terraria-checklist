import { createElement } from '../helper/html.js'
import Line from './Line.js'

export default class ChapterPage {
  constructor(chapter) {
    this.id = chapter.id
    this.name = chapter.name
    this.color = chapter.color
    this.lines = chapter.lines
  }

  setCover() {
    const titleNode = document.querySelector('.checklist .cover h1')
    const coverNode = document.querySelector('.checklist .cover')
    titleNode.innerHTML = this.name
    coverNode.style.background = this.color
  }

  setLines() {
    const page = document.querySelector('.checklist')

    // Remove previous lines
    const welcomeTextNode = document.querySelector('.checklist .welcome-text')
    const pageLinesNode = document.querySelector('.checklist .checklist-items')
    if (welcomeTextNode) welcomeTextNode.remove()
    if (pageLinesNode) pageLinesNode.remove()

    // Add new lines
    const linesNode = createElement('div', { class: 'checklist-items' })

    let lineIndex = 0
    this.lines.map((line) => {
      if (line.startsWith('~~')) lineIndex--
      const newLine = new Line(`${this.id}-${lineIndex}`, line)
      newLine.add(linesNode)
      lineIndex++
    })

    page.appendChild(linesNode)
  }

  open() {
    this.setCover()
    this.setLines()
  }
}
