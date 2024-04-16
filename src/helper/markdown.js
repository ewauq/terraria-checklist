export function markdownToHtml(markdown) {
  const wikiUrl = 'https://terraria.wiki.gg/wiki'
  //const wikiUrl = 'https://terraria.fandom.com/wiki'
  const regexes = {
    entity: /{(npc|event|boss)\s(?<name>[\w\s']+)}\((?<pageName>[\w_']+)\)/g,
    bold: /\*\*(?<text>[\w\s\?!,'-\.]+)\*\*/g,
    heading: /\~\~(?<text>.+)\~\~/g,
    link: /\[(?<text>[\w\s'-]+)\]\((?<pageName>[\w_#':-]+(\(\w+\))?)\)/g,
  }

  let html = markdown

  // Link
  html = html.replace(regexes.link, `<a href="${wikiUrl}/$<pageName>" target="_blank">$<text></a>`)

  // Bold
  html = html.replace(regexes.bold, '<strong>$<text></strong>')

  // Heading
  html = html.replace(regexes.heading, '<h3>$<text></h3>')

  // Entity
  html = html.replace(regexes.entity, (_, type, name, pageName) => {
    const icon = `media/image/entity/${type}/${name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace("'", '')}.png`
    return `
    <span class="entity ${type}">
      <img src="${icon}" alt="${type} ${name}">
      <a href="${wikiUrl}/${pageName}" target="_blank">${name}</a>
    </span>`
  })

  return html
}
