import { createElement } from '../helper/html.js'

export default class Section {
  constructor(name, chapters) {
    this.name = name
    this.chapters = chapters
    this.drawerNode = document.querySelector('div.drawer')
  }

  add(sectionsNode) {
    const sectionNode = createElement('section')
    const sectionHeadingNode = createElement('h3', null, this.name)
    const sectionChaptersNode = createElement('div', { class: 'chapters' })

    this.chapters.map((chapter) => {
      const itemsCount = chapter.lines.filter((line) => !line.startsWith('~~')).length
      const chapterNode = createElement(
        'a',
        {
          class: 'chapter',
          href: `#${chapter.id}`,
          onclick: () => {
            this.drawerNode.classList.remove('open')
            window.scrollTo(0, 0)
          },
        },
        `${chapter.name} (0/${itemsCount})`,
      )
      sectionChaptersNode.appendChild(chapterNode)
    })
    sectionNode.append(sectionHeadingNode, sectionChaptersNode)
    sectionsNode.appendChild(sectionNode)
    console.log(`%cSection ${this.name} added`, 'color: #1fc600')
  }
}
