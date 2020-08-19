const { Router } = require("express");

const applicationController = require("../controllers/applicationController");

const router = Router();

router.get("/", applicationController.index);

router.get("/download/:id", applicationController.download);

module.exports = router;
