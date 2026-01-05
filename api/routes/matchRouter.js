// import modules
const express = require("express");
const { getAllMatchResults, getSpecificResults } = require("../controllers/matchController");

// router initialization
const router = express.Router();

// implement paths
router.get("/", getAllMatchResults);
router.get("/specific", getSpecificResults);

module.exports = router;