import { markdownToHtml } from '../helper/markdown.js'
import { createElement } from '../helper/html.js'

export default class Line {
  constructor(lineId, text) {
    this.lineId = lineId
    this.text = text
  }

  add(linesNode) {
    const lineNode = createElement('div', { name: 'item', class: 'item' })

    if (!this.text.startsWith('~~')) {
      const lineCheckboxNode = createElement('input', {
        id: this.lineId,
        type: 'checkbox',
        checked: localStorage.getItem(this.lineId) === 'true',
        onClick: () => {
          localStorage.setItem(this.lineId, lineCheckboxNode.checked)
          lineNode.classList.toggle('done')
        },
      })
      if (lineCheckboxNode.checked) lineNode.classList.add('done')
      lineNode.appendChild(lineCheckboxNode)
    }

    const lineTextNode = createElement('span', { class: 'line' }, markdownToHtml(this.text))

    lineNode.appendChild(lineTextNode)
    linesNode.appendChild(lineNode)
  }
}
