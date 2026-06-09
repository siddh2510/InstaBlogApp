import express from "express";
import {
  createPost,
  getAllPosts,
  deletePost,
  likePost,
  commentPost
} from "../controller/blog.js";
import auth from "../middleware/auth.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", auth, upload.single("image"), createPost);
router.delete("/:id", auth, deletePost);
router.post("/:id/like", auth, likePost);
router.post("/:id/comment", auth, commentPost);

export default router;
