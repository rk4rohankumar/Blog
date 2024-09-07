import express from "express";
import authmiddleware from "../middlewares/authmiddleware.js";
import {fetchAllPosts,fetchPost,fetchPostbyId,updatePost,deletePost,createPost } from "../controllers/userController.js";
const router = express.Router();

router.get("/posts/:id",authmiddleware, fetchPostbyId);
router.get("/postsAll",authmiddleware, fetchAllPosts);
router.get("/posts",authmiddleware, fetchPost);
router.post("/posts",authmiddleware, createPost);
router.put("/posts/:id",authmiddleware, updatePost);
router.delete("/posts/:id",authmiddleware, deletePost);

export default router;