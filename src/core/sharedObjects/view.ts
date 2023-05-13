import { pipe } from "fp-ts/lib/function"
import * as O from "fp-ts/Option"
import * as t from "io-ts"
import { MsxContentRoot } from "../msxUI/contentObjects"
import { MsxMenu } from "../msxUI/menuObject"

type View<ArgsType extends any[]> = {
    _name: string
    render: (...args: ArgsType) => (params: any) => MsxContentRoot | MsxMenu //no validation of the parameters should happen here
}

type ErrorMessage = (s: string) => MsxContentRoot | MsxMenu

const viewRenderer =
    <A extends any[], P extends t.TypeC<any> | t.UnionC<any> = t.TypeC<{}>>(
        view: View<A>
    ) =>
    (args: A) =>
    (paramsType: P) =>
    (onError: ErrorMessage) =>
    (recievedParams: unknown) => {
        const validateParams = (type: P) => (params: unknown) => type.is(params)

        return pipe(
            recievedParams,
            O.fromPredicate(validateParams(paramsType)),
            O.match(
                () =>
                    onError(
                        `Params {${recievedParams}} do not match required params`
                    ),
                view.render(...args)
            )
        )
    }

export { viewRenderer, View }
