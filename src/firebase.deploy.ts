import { onRequest } from "firebase-functions/v2/https"
import { initializeApp } from "firebase-admin/app"
import app from "./application"

initializeApp()
export const firebaseFunction = onRequest(app)
