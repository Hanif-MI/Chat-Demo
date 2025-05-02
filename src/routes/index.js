import express from 'express'
import { userRoute } from './user.route.js'

export const route = express.Router()


route.use("/user", userRoute)
