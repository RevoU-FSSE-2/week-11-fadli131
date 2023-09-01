const { Router } = require("express");

const {
    createOrder,
    getOrders,
    updateOrder,
    deleteOrder
  } = require("../service/order-service.js");
  const authorizationMiddleware = require("../middleware/authorization-middleware");

const orderRouter = Router ();

orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);

orderRouter.patch(
    "/:id",
    authorizationMiddleware(["maker", "admin"]),
    updateOrder
  );
  
  orderRouter.delete(
    "/:id",
    authorizationMiddleware(["admin"]),
    deleteOrder
  );
  
  orderRouter.get(
    "/history",
    authorizationMiddleware(["admin"]),
    getOrders
  );

  module.exports = orderRouter;