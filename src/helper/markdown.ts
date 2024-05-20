export default function markdownToHtml(text: string): string {
  const wikiUrl = 'https://terraria.wiki.gg/wiki'

  const markdownRules = [
    // LINK
    {
      regex: /\[(?<text>[\w\s'-]+)\]\((?<pageName>[\w_#':-]+(\(\w+\))?)\)/g,
      replacement: `<a href="${wikiUrl}/$<pageName>" target="_blank">$<text></a>`,
    },
    // BOLD
    {
      regex: /\*\*(?<text>[\w\s\?!,'-\.]+)\*\*/g,
      replacement: '<strong>$<text></strong>',
    },
    // ENTITY
    {
      regex: /{(npc|event|boss)\s(?<name>[\w\s']+)}\((?<pageName>[\w_']+)\)/g,
      replacement: (_: never, type: string, name: string, pageName: string): string => {
        const icon = `image/entity/${type}/${name
          .toLowerCase()
          .replace(/ /g, '-')
          .replace("'", '')}.png`
        return `
          <span class="entity ${type}">
            <img src="${icon}" alt="${type} ${name}">
            <a href="${wikiUrl}/${pageName}" target="_blank">${name}</a>
          </span>`
      },
    },
  ]

  return markdownRules.reduce(
    (html, { regex, replacement }) => html.replace(regex, replacement as string),
    text,
  )
}
