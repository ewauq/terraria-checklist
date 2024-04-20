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
      const doneCount = Object.keys(localStorage).filter(
        (key) => key.startsWith(chapter.id) && localStorage.getItem(key) === 'true',
      ).length

      const chapterNode = createElement(
        'a',
        {
          id: `chapter-${chapter.id}`,
          class: 'chapter',
          href: `#${chapter.id}`,
          onclick: () => {
            this.drawerNode.classList.remove('open')
            window.scrollTo(0, 0)
          },
        },
        `${chapter.name} <span class="done-count">(${doneCount}/${itemsCount})</span>`,
      )

      if (doneCount === itemsCount) chapterNode.classList.add('done')
      sectionChaptersNode.appendChild(chapterNode)
    })
    sectionNode.append(sectionHeadingNode, sectionChaptersNode)
    sectionsNode.appendChild(sectionNode)
    console.log(`%cSection ${this.name} added`, 'color: #1fc600')
  }
}
