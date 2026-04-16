import { Router } from "express";
import { getAlbums, getAlbumById } from "../controller/albumController.js"
const router=Router();

router.get('/albums',getAlbums)
router.get('/albums/:id',getAlbumById)

export default router;