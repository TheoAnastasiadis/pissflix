const seedersRegEx = /\n\W*(\d*)\s/

export const parseSeeders: (title: string) => number = (title) =>
    Number(title.match(seedersRegEx)?.at(1) || 0)
