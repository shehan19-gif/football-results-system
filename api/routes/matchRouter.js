// import modules
const express = require("express");
const { getAllMatchResults } = require("../controllers/matchController");

// router initialization
const router = express.Router();

// implement paths
router.get("/", getAllMatchResults);

module.exports = router;