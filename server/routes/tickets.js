const { Router } = require("express");
const multer = require("multer");
const TicketController = require("../controllers/TicketController");

const storage = multer.memoryStorage(); // Almacena el archivo en memoria como un Buffer
const upload = multer({ storage })
const router = Router();

router.post("/:ticketId/images", upload.single("file"), TicketController.uploadImage);

router.delete("/:ticketId/images", TicketController.deleteImage);


router.get("/:ticketId", TicketController.getTicketById);

router.get("/expense/:expenseId", TicketController.getTicketsByExpenseId);

router.post("/", TicketController.addTicket);

router.delete("/:ticketId", TicketController.deleteTicket);

router.patch("/:ticketId",TicketController.updateTicket);

module.exports = router;
