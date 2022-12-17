const world = 'world'

const hello = (who: string = world): string => `Hello ${who}!`

console.log(hello())
