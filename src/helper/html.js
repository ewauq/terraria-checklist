// Create a new HTML element with the given tag name, attributes, and innerHTML
// ex: createElement('div', { name: 'item', class: 'item' }, 'Hello, World!')
export function createElement(tagName, attributes = null, innerHTML = null) {
  const booleanAttributes = [
    'allowfullscreen',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'defer',
    'disabled',
    'formnovalidate',
    'hidden',
    'ismap',
    'itemscope',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'readonly',
    'required',
    'reversed',
    'selected',
  ]

  const element = document.createElement(tagName)

  if (innerHTML) element.innerHTML = innerHTML
  if (!attributes) return element

  Object.keys(attributes).forEach((attribute) => {
    // Boolean attributes
    if (booleanAttributes.includes(attribute)) {
      if (attributes[attribute]) element.setAttribute(attribute, '')
      return
    }

    // Event listeners
    if (typeof attributes[attribute] === 'function') {
      const event = attribute.startsWith('on') ? attribute.slice(2) : attribute
      element.addEventListener(event.toLowerCase(), attributes[attribute])
      return
    }

    // Regular attributes
    element.setAttribute(attribute, attributes[attribute])
  })

  return element
}
