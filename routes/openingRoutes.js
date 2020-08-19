const { Router } = require("express");
const bodyParser = require("body-parser");

const openingController = require("../controllers/openingController");

const router = Router();

router.get("/", openingController.index);

router.get("/create", openingController.create);

router.post(
  "/",
  bodyParser.urlencoded({ extended: false }),
  openingController.store
);

router.get("/:id/edit", openingController.edit);

router.patch(
  "/:id/update",
  bodyParser.urlencoded({ extended: false }),
  openingController.update
);

router.delete("/:id", openingController.destroy);

router.patch(
  "/:id/apply",
  bodyParser.urlencoded({ extended: false }),
  openingController.apply
);

module.exports = router;
