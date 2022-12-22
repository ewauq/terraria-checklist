/* eslint-disable unicorn/no-keyword-prefix */
import { Data } from '../type/data'
import { Item } from '../type/item'

export class TodoFactory {
  totolistElement: HTMLDivElement | null

  constructor() {
    this.totolistElement = document.querySelector('div.todolist')
  }

  addSection(title: string, id: string): HTMLElement {
    const sectionTitleElement: HTMLHeadingElement = document.createElement('h1')
    sectionTitleElement.innerHTML = title

    const sectionElement: HTMLElement = document.createElement('section')
    sectionElement.id = id
    sectionElement.append(sectionTitleElement)

    if (this.totolistElement) this.totolistElement.append(sectionElement)

    return sectionElement
  }

  addItem(sectionElement: HTMLElement, item: Item, id: string): void {
    const itemElement: HTMLDivElement = document.createElement('div')
    const textElement: HTMLDivElement = document.createElement('div')
    const checkboxWrapperElement: HTMLDivElement = document.createElement('div')
    const checkboxElement: HTMLInputElement = document.createElement('input')

    itemElement.className = 'todo-item'
    itemElement.id = id
    textElement.className = 'text'
    textElement.append(
      ['[[', '{{'].some((pattern) => item.includes(pattern)) ? this.formatMarkup(item) : item,
    )

    checkboxElement.type = 'checkbox'
    checkboxWrapperElement.append(checkboxElement)
    checkboxWrapperElement.className = 'checkbox-wrapper'
    itemElement.append(checkboxWrapperElement)
    itemElement.append(textElement)
    sectionElement.append(itemElement)

    // On click events
    checkboxElement.addEventListener('click', (event) => {
      const target = <HTMLDivElement>event.target
      target.parentElement?.parentElement?.classList.toggle('completed')
    })
  }

  formatMarkup(itemText: string): Node | string {
    const itemElement: HTMLDivElement = document.createElement('div')

    const textParts = itemText.split(/(\[\[[^]+?]]|{{[^}]+?}})/g)

    for (const textPart of textParts) {
      if (textPart.includes('{{')) {
        const [type, name, icon, url] = textPart.replaceAll(/[{}]+/g, '').split('|')

        const spanElement: HTMLSpanElement = document.createElement('span')
        const imageElement: HTMLImageElement = document.createElement('img') as HTMLImageElement
        const linkElement: HTMLAnchorElement = document.createElement('a')

        imageElement.src = `media/${type}/${icon}`
        linkElement.href = url
        linkElement.innerHTML = name
        linkElement.target = '_blank'
        spanElement.className = type

        spanElement.append(imageElement)
        spanElement.append(linkElement)
        itemElement.append(spanElement)
      } else if (textPart.includes('[[')) {
        const [text, url] = textPart.replaceAll(/[[\]]/g, '').split('|')

        const linkElement: HTMLAnchorElement = document.createElement('a')
        linkElement.href = url
        linkElement.target = '_blank'
        linkElement.innerHTML = text

        itemElement.append(linkElement)
      } else {
        itemElement.append(textPart)
      }
    }

    return itemElement
  }

  build(data: Data): void {
    let sectionId = 1

    for (const section of data.sections) {
      const sectionElement: HTMLElement = this.addSection(section.title, `section-${sectionId}`)

      let itemId = 1
      for (const item of section.items) {
        this.addItem(sectionElement, item, `section-${sectionId}-item-${itemId}`)
        itemId++
      }

      sectionId++
    }

    const todolistLoadingElement: HTMLElement | null =
      document.querySelector('div.todolist-loading')
    todolistLoadingElement?.remove()
  }
}
