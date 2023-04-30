import assert from "assert"
import { MsxContentRoot } from "../msxUI/contentObjects"
import { MsxMenu } from "../msxUI/menuObject"
import { Result } from "./result"

type urlParams = { [key: string]: string | number | boolean }

export abstract class View<T extends MsxMenu | MsxContentRoot> {
    externalUrl: `${string}/` //https://www.example.com/
    groupUrl: `${string}/` //movie/
    specialUrl: `${string}/` //menu/
    requiredParams?: { name: string; type: "string" | "number" | "boolean" }[]
    constructor(
        externalUrl: string,
        groupUrl: string,
        specialUrl: string,
        requiredParams?: {
            name: string
            type: "string" | "number" | "boolean"
        }[]
    ) {
        this.externalUrl = `${externalUrl}/`
        this.groupUrl = `${groupUrl}/`
        this.specialUrl = `${specialUrl}/`
        if (requiredParams) this.requiredParams = requiredParams
    }
    renderer!: (params?: {
        [key: string]: string | number | boolean
    }) => Promise<Result<T>> | Result<T>
    render = (params?: { [key: string]: string | number | boolean }) => {
        for (const param of this.requiredParams || []) {
            assert(params && params[param.name])
            assert(params && typeof params[param.name] == param.type)
        }
        return params ? this.renderer(params) : this.renderer()
    }
}
