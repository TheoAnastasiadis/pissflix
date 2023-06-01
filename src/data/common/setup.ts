// import { Request, Response, Router } from "express"
// import { ResponseAdaptor } from "../../core/sharedObjects/addaptors"
// import {
//     responseAdaptorsRecord,
//     setUpFunctionsRecord,
// } from "../../domain/movies/setup"

// export const expressAdaptor: responseAdaptorsRecord = {
//     view: new ResponseAdaptor<Request, Response>(
//         (req) => req.query,
//         (res) => res.json
//     ),
//     //params will come from the query string
//     //responses will be sent as json objects
// }

// export const expressSetup = (app: Router): setUpFunctionsRecord => ({
//     view: (path, handler) => app.get(path, handler),
//     //`view`s will be handled as GET requests
// })
