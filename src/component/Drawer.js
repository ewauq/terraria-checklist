import { createElement } from '../helper/html.js'

export default class Drawer {
  constructor(sections) {
    this.sectionsNode = document.querySelector('div.sections')
    this.drawerNode = document.querySelector('div.drawer')
    this.sections = sections
  }

  render() {
    const sectionsToRender = [this.sections.adventure, this.sections.collection]

    sectionsToRender.map((section) => {
      const sectionNode = createElement('section')
      const sectionHeadingNode = createElement('h3', null, section.name)
      const sectionChaptersNode = createElement('div', { class: 'chapters' })

      section.chapters.map((chapter) => {
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
        sectionChaptersNode.appendChild(chapterNode)
      })
      sectionNode.append(sectionHeadingNode, sectionChaptersNode)
      this.sectionsNode.appendChild(sectionNode)
    })

    const pageNode = document.querySelector('.content')
    pageNode.addEventListener('click', (_) => {
      const drawerNode = document.querySelector('.drawer')
      drawerNode.classList.remove('open')
    })

    console.log(`%cDrawer initialized`, 'color: #1fc600')
  }
}
