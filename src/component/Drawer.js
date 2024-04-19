import Section from './Section.js'

export default class Drawer {
  constructor(sections) {
    this.sectionsNode = document.querySelector('div.sections')
    this.sections = sections
  }

  init() {
    this.sections.map((drawerSection) => {
      const section = new Section(drawerSection.name, drawerSection.chapters)
      section.add(this.sectionsNode)
    })
    console.log(`%cDrawer initialized`, 'color: #1fc600')
  }
}
