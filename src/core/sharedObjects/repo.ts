import { Result } from "./result"

export type IRepo = {
    [key: string]: (...args: any) => Promise<Result<any>> | Result<any> //repos return results or promises of results
}
