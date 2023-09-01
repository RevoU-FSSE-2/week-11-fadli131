const { ObjectId } = require("mongodb");

const createOrder = async (req, res) => {
    const { menuItemId, quantity } = req.body;
    const { role } = req.user;
  
    if (role === "maker") {
      const newOrder = {
        menuItemId,
        quantity,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await req.db.collection("orders").insertOne(newOrder);
      res.status(200).json({ newOrder });
    } else {
      res.status(403).json({ error: "Orders Cannot Proccessed" });
    }
  };
  
  const getOrders = async (req, res) => {
    const { userId } = req.user;
    const orders = await req.db
      .collection("orders")
      .find({
        userId,
        $or: [{ isDeleted: { $exists: false } }, { isDeleted: false }],
      })
      .toArray();
  
    res.status(200).json(orders);
  };
  
  const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const existingOrder = await req.db
        .collection("orders")
        .findOne({ _id: new ObjectId(id) });
  
      if (!existingOrder) {
        return res.status(404).json({ error: "Orders Cannot be Found" });
      }
  
      if (existingOrder.status !== "pending") {
        return res
          .status(403)
          .json({ error: "Just Pending Orders Can Update" });
      }
  
      const result = await req.db
        .collection("orders")
        .updateOne({ _id: new ObjectId(id) }, { $set: { status } });
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Orders Cannot be Found" });
      }
  
      if (result.modifiedCount === 1) {
        return res
          .status(200)
          .json({ message: "Orders Update Succeess" });
      }
  
      return res.status(400).json({ error: "Cannot Update Orders" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Internal server error: ${error.message}` });
    }
  };
  
  const deleteOrder = async (req, res) => {
    const orderId = req.params.id;
  
    try {
      const decodedToken = req.user;
  
      if (decodedToken.role !== "admin") {
        res.status(403).json({ error: "Rejected" });
        return;
      }
  
      const order = await req.db
        .collection("orders")
        .findOne({ _id: new ObjectId(orderId) });
  
      if (!order) {
        res.status(404).json({ message: "Orders Cannot be Found" });
        return;
      }
  
      if (order.status !== "pending") {
        res.status(403).json({ message: "Just Pending Orders Can Deleted" });
        return;
      }
  
      const result = await req.db
        .collection("orders")
        .updateOne({ _id: new ObjectId(orderId) }, { $set: { isDeleted: true } });
  
      if (result.modifiedCount === 0) {
        res.status(404).json({ message: "Order not found or has been deleted" });
        return;
      }
  
      res.status(200).json({ message: "Order temporarily deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  module.exports = {
    createOrder,
    getOrders,
    updateOrder,
    deleteOrder
  };