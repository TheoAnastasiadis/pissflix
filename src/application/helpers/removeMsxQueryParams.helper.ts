const versionRegex = /v=\d\.\d\.\d{1,}/
const timestampRegex = /t=\d{13}/

export const removeMsxQueryParams = (path: string) =>
    path.replace(versionRegex, "").replace(timestampRegex, "")
