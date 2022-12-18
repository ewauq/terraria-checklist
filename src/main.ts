type ChaptersData = {
  chapters: [
    {
      title: string
    },
  ]
}

function buildChapters(data: ChaptersData): void {
  if (!data?.chapters) return

  const { chapters } = data

  const pageWrapperElement: HTMLDivElement | null = document.querySelector('div.page-wrapper')

  for (const chapter of chapters) {
    const chapterTitleElement: HTMLHeadingElement = document.createElement('h1')
    chapterTitleElement.innerHTML = chapter.title

    const chapterElement: HTMLDivElement = document.createElement('div')
    // eslint-disable-next-line unicorn/no-keyword-prefix
    chapterElement.className = 'chapter'

    chapterElement.append(chapterTitleElement)
    if (pageWrapperElement) pageWrapperElement.append(chapterElement)
  }
}

fetch(`${window.location.href}data.json`)
  .then((response) => response.json())
  .then((data) => {
    if (data?.chapters) console.log('✔️ Data successfully loaded')
    buildChapters(data)
  })
  .catch((error) => console.error('Unable to load data.json:', error))
