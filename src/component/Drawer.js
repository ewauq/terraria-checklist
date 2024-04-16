import Section from './Section.js'

export default class Drawer {
  constructor() {
    this.sectionsNode = document.querySelector('div.drawer-sections')
  }

  addSection(name, chapters) {
    const section = new Section(name, chapters)
    section.add(this.sectionsNode)
  }
}
