const { Router } = require("express");
const multer = require("multer");
const TicketController = require("../controllers/TicketController");
const validateJwt = require("../middlewares/jwt_validator");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

router.post(
  "/:ticketId/images",
  validateJwt,
  upload.single("file"),
  TicketController.uploadImage
);

router.delete("/:ticketId/images", validateJwt, TicketController.deleteImage);

router.get("/:ticketId", validateJwt, TicketController.getTicketById);

router.get(
  "/expense/:expenseId",
  validateJwt,
  TicketController.getTicketsByExpenseId
);

router.post("/", validateJwt, TicketController.addTicket);

router.delete("/:ticketId", validateJwt, TicketController.deleteTicket);

router.patch("/:ticketId", validateJwt, TicketController.updateTicket);

module.exports = router;
