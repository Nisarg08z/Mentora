import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { addReview, getAllReviews, getCourseReviews } from "../controllers/reviewController.js"



let reviewRouter = express.Router()

reviewRouter.post("/givereview",isAuth,addReview)
reviewRouter.get("/allReview",getAllReviews)
reviewRouter.get("/getCourseReviews/:courseId", getCourseReviews)


export default reviewRouter