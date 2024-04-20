import { markdownToHtml } from '../helper/markdown.js'
import { createElement } from '../helper/html.js'

export default class Line {
  constructor(lineId, text, chapterId, chapterLinesCount) {
    this.lineId = lineId
    this.text = text
    this.chapterId = chapterId
    this.chapterLinesCount = chapterLinesCount
  }

  add(linesNode) {
    const lineNode = createElement('div', { class: 'line' })

    if (!this.text.startsWith('~~')) {
      const lineCheckboxNode = createElement('input', {
        id: this.lineId,
        type: 'checkbox',
        checked: localStorage.getItem(this.lineId) === 'true',
        onClick: () => {
          localStorage.setItem(this.lineId, lineCheckboxNode.checked)
          lineNode.classList.toggle('done')

          // Update chapter progress
          const chapterLinkNode = document.querySelector(`a[id="chapter-${this.chapterId}"]`)
          const chapterDoneCountNode = document.querySelector(
            `a[id="chapter-${this.chapterId}"] .done-count`,
          )
          const doneCount = Object.keys(localStorage).filter(
            (key) => key.startsWith(this.chapterId) && localStorage.getItem(key) === 'true',
          ).length

          chapterDoneCountNode.textContent = `(${doneCount}/${this.chapterLinesCount})`

          if (doneCount === this.chapterLinesCount) {
            chapterLinkNode.classList.add('done')
          } else {
            chapterLinkNode.classList.remove('done')
          }
        },
      })
      if (lineCheckboxNode.checked) lineNode.classList.add('done')
      lineNode.appendChild(lineCheckboxNode)
    }

    const lineTextNode = createElement('span', { class: 'text' }, markdownToHtml(this.text))

    lineNode.appendChild(lineTextNode)
    linesNode.appendChild(lineNode)
  }
}
