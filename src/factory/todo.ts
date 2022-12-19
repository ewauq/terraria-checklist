import { Data } from '../type/data'
import { Item } from '../type/item'

export class TodoFactory {
  pageWrapperElement: HTMLDivElement | null

  constructor() {
    this.pageWrapperElement = document.querySelector('div.page-wrapper')
  }

  addSection(title: string): HTMLElement {
    const sectionTitleElement: HTMLHeadingElement = document.createElement('h1')
    sectionTitleElement.innerHTML = title

    const sectionElement: HTMLElement = document.createElement('section')
    sectionElement.append(sectionTitleElement)

    if (this.pageWrapperElement) this.pageWrapperElement.append(sectionElement)

    return sectionElement
  }

  addItem(sectionElement: HTMLElement, item: Item): void {
    const itemElement: HTMLDivElement = document.createElement('div')
    itemElement.innerHTML = item

    sectionElement.append(itemElement)
  }

  build(data: Data): void {
    for (const section of data.sections) {
      const sectionElement: HTMLElement = this.addSection(section.title)

      for (const item of section.items) {
        this.addItem(sectionElement, item)
      }
    }
  }
}
