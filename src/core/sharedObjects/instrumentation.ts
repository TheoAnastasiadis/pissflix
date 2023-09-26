import * as R from "fp-ts-routing"
import { Controller, Redirection, Response } from "./controller"
import { pipe } from "fp-ts/lib/function"
import * as A from "fp-ts/Array"

const createControllerRegistry: <
    const C extends Record<
        string,
        Controller<any, any> | Redirection<any, any> | Response<any, any>
    >
>(
    controllers: C
) => <const M extends Record<string, R.Match<any>>>(
    matchers: M
) => { controller: C[string]; matcher: M[string] }[] =
    (controllers) => (matchers) =>
        Object.keys(controllers).map((key) => ({
            controller: controllers[key as keyof typeof controllers & string],
            matcher: matchers[key as keyof typeof matchers & string],
        })) as {
            controller: (typeof controllers)[string]
            matcher: (typeof matchers)[string]
        }[]

const registerRoutes: <
    const C extends Record<
        string,
        Controller<any, any> | Redirection<any, any> | Response<any, any>
    >,
    const M extends Record<string, R.Match<any>>
>(
    context: Record<"matchers", M> & Record<string, any>,
    applicationRouter: any
) => (registry: { controller: C[string]; matcher: M[string] }[]) => any =
    (context, applicationRouter) => (registry) =>
        pipe(
            registry,
            A.map(({ controller, matcher }) =>
                matcher.parser.map((params) => ({
                    result: controller.render(context)(params as any),
                    _tag: controller._tag,
                }))
            ), //map matchers to controllers
            A.reduce(applicationRouter, (router, parser) => router.alt(parser)) //register alternative paths to router
        )

export class EndPoint {
    withPaths<const Paths extends ReadonlyArray<string>>(paths: Paths) {
        return {
            withParams<const Params extends ReadonlyArray<any>>(
                params: Params
            ) {
                return {
                    registerMatchers<
                        const Matchers extends Record<
                            Paths[number],
                            R.Match<any>
                        >
                    >(matchers: Matchers) {
                        return {
                            withContext<
                                const Context extends Record<
                                    "matchers",
                                    Matchers
                                > &
                                    Record<string, any>
                            >() {
                                return {
                                    registerControllers<
                                        const Controllers extends Record<
                                            Paths[number],
                                            | Controller<Context, any>
                                            | Redirection<Context, any>
                                            | Response<Context, any>
                                        >
                                    >(controllers: Controllers) {
                                        return {
                                            createRouter(context: Context) {
                                                return {
                                                    registerWith(
                                                        applicationRouter: any
                                                    ) {
                                                        return pipe(
                                                            matchers,
                                                            createControllerRegistry(
                                                                controllers
                                                            ),
                                                            registerRoutes(
                                                                context,
                                                                applicationRouter
                                                            )
                                                        )
                                                    },
                                                }
                                            },
                                        }
                                    },
                                }
                            },
                        }
                    },
                }
            },
        }
    }
}
