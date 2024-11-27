const { Router } = require("express");
const multer = require("multer");
const TicketController = require("../controllers/TicketController");

const upload = multer();
const router = Router();

router.post("/images", upload.single("file"), TicketController.uploadImage);

router.get("/:ticketId", TicketController.getTicketById);

router.get("/expense/:expenseId", TicketController.getTicketsByExpenseId);

router.post("/", TicketController.addTicket);

router.delete("/:ticketId", TicketController.deleteTicket);

module.exports = router;
