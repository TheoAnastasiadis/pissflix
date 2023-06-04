const fileSizeRegEx = /\s(?:(?<GB>[0-9.]*)\sGB)|(?:(?<MB>[0-9.]*)\sMB)|(?:(?<KB>[0-9.]*)\sKB)/m

export const parseFileSize: (title: string) => number = (title) => {

    const GB = Number(title.match(fileSizeRegEx)?.groups?.GB) * 1e9
    const MB = Number(title.match(fileSizeRegEx)?.groups?.MB) * 1e6
    const KB = Number(title.match(fileSizeRegEx)?.groups?.KB) * 1e3

    if (!isNaN(GB)) return GB
    else if (!isNaN(MB)) return MB
    else if (!isNaN(KB)) return KB
    else return 0
}
