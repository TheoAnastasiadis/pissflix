import { ContentRootItem } from "../msxUI/contentObjects"
import { MsxMenu } from "../msxUI/menuObject"
import { Result } from "./result"

type urlParams = { [key: string]: string | number | boolean }

export interface View<T extends MsxMenu | ContentRootItem> {
    externalUrl: `${string}/` //https://www.example.com/
    groupUrl: `${string}/` //movie/
    specialUrl: `${string}/` //menu/
    urlParams: URLSearchParams
    standalone: boolean //is it a standalone element or a replace action/ panel item
    renderer: (
        params?: URLSearchParams
    ) => Promise<Result<T>> | Result<T> | null
    getAbsolutePath: (params?: urlParams) => string //https://www.example.com/movie/menu
    render: () => Promise<Result<T>> | Result<T>
}
