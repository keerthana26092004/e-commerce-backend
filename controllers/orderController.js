const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const createOrder = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const userId = req.user.id; 
    console.log(userId)
    const user = await User.findById(userId);
    const cart = await Cart.findOne({ user_id: userId });

 
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: 'User not found' });
    }
    if (!cart) {
      console.log("Cart not found for user ID:", userId);
      return res.status(404).json({ message: 'Cart not found' });
    }
    if (!Array.isArray(cart.products)) {
      console.log("Cart products is not an array for user ID:", userId);
      return res.status(400).json({ message: 'Cart products is not an array' });
    }
    let totalAmt = 0;
    for (const item of cart.products) {
      console.log("Processing cart item:", item);

     
      const product = await Product.findOne({ id: item.productId });
      if (!product) {
        console.log(`Product with ID ${item.productId} not found`);
        return res.status(404).json({ message: `Product with ID ${item.productId} not found `});
      }
      totalAmt += product.price * item.quantity; 
    }


    const orderDate = new Date();
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 10);

    const newOrder = new Order({
      user_id: userId,
      name: name || user.username,
      email: user.email,
      address: address || 'N/A',
      phone: phone || 'N/A', 
      products: JSON.stringify(cart.products), 
      totalamount: totalAmt.toString(), 
      orderdate: orderDate,
      deliverydate: new Date(Date.now()+10*24*60*60*1000),
      orderstatus: 'Pending', 
    });

    await newOrder.save();

    await Cart.findOneAndDelete({ user_id: userId });

    res.status(201).send({ order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user_id: userId });
    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }

    let orderDetails = [];
    for (const ord of orders) {
      let subtotal = 0;
      let products = [];

      for (const prod of JSON.parse(ord.products)) {
        const product = await Product.findOne({ id: prod.productId });
        if (!product) {
          console.log(`Product with ID ${prod.productId} not found`);
          continue;
        }
        const productTotal = product.price * prod.quantity;
        subtotal += productTotal;
        products.push({
          product_title: product.title,
          product_price: product.price,
          product_image: product.image,
          product_desc: product.description,
          product_quantity: prod.quantity,
        });
      }

      orderDetails.push({
        order_id: ord._id,
        products,
        order_date: ord.orderdate,
        est_date: ord.deliverydate,
        subtotal,
        order_status: ord.orderstatus,
      });
    }

    res.json(orderDetails);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};





module.exports = { createOrder,getOrder };