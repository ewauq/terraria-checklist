import Section from './Section.js'

export default class Drawer {
  constructor(sections) {
    this.sectionsNode = document.querySelector('div.sections')
    this.sections = sections
  }

  render() {
    this.sections.map((drawerSection) => {
      const section = new Section(drawerSection.name, drawerSection.chapters)
      section.add(this.sectionsNode)
    })

    const pageNode = document.querySelector('.content')
    pageNode.addEventListener('click', (_) => {
      const drawerNode = document.querySelector('.drawer')
      drawerNode.classList.remove('open')
    })

    console.log(`%cDrawer initialized`, 'color: #1fc600')
  }
}
