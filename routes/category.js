const express = require("express");
const router = express.Router();

const { create, categoryById, read } = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post("/category/create/:userId", requireSignin, isAdmin, create);
router.get("/category/:categoryId", read)

router.param("categoryId", categoryById);
router.param("userId", userById);
module.exports = router;
