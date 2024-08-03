const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// const addCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     console.log("User ID:", userId);

//     const { productId, quantity } = req.body;
//     console.log("Product ID:", productId, "Quantity:", quantity);

//     let cart = await Cart.findOne({ user_id: userId });
//     console.log("In Cart:", cart);

//     if (cart) {
//       const isProduct = cart.products.find(p => p.productId === productId);
//       if (isProduct) {
//         isProduct.quantity = (parseInt(isProduct.quantity) + parseInt(quantity)).toString();
//       } else {
//         cart.products.push({ productId, quantity });
//       }
//       await cart.save();
//       res.send(cart);
//     } else {
//       const newCart = new Cart({ user_id: userId, products: [{ productId, quantity }] });
//       await newCart.save();
//       res.send(newCart);
//     }
//   } catch (err) {
//     console.log("Error:", err);
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// };
const addCart = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID:", userId);

    const { productId, quantity } = req.body;
    console.log("Product ID:", productId, "Quantity:", quantity);

    let cart = await Cart.findOne({ user_id: userId });
    console.log("In Cart:", cart);

    if (cart) {
      const isProduct = cart.products.find(p => p.productId === productId);
      if (isProduct) {
        isProduct.quantity = (parseInt(isProduct.quantity) + parseInt(quantity)).toString();
      } else {
        cart.products.push({ productId, quantity });
      }
      await cart.save();
      res.send(cart);
    } else {
      const newCart = new Cart({ user_id: userId, products: [{ productId, quantity }] });
      await newCart.save();
      res.send(newCart);
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
const getCart = async (req, res) => {
  try {
      const userId = req.user.id;
      
      const cart = await Cart.findOne({ user_id: userId });
      if (cart) {
          
          const productIds = cart.products.map(product => product.productId);
          
          const products = await Product.find({ id: { $in: productIds } }, { title: 1, description: 1, image: 1, price: 1, _id: 0 });
          let subtotal = 0;
          products.forEach((product, index) => {
              const cartProduct = cart.products[index];
              subtotal += product.price * parseInt(cartProduct.quantity);
          });
          res.send({ products, subtotal });
      } else {
          res.send({ message: "empty cart", subtotal: 0 });
      }
  } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Internal server error" });
  }
};

const deleteCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    let cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productInCart = cart.products.find(item => item.productId == productId);

    if (productInCart) {
      if (parseInt(productInCart.quantity) > 1) {
      
        productInCart.quantity = (parseInt(productInCart.quantity) - 1).toString();
      } else {
        
        cart.products = cart.products.filter(item => item.productId != productId);
      }
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    
    if (cart.products.length === 0) {
      await Cart.deleteOne({ user_id: userId });
      return res.json({ message: 'Cart deleted because it was empty' });
    } else {
      await cart.save();
      return res.json({ message: 'Product quantity decreased or removed', cart });
    }

  } catch (error) {
    console.error('Error deleting product from cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { addCart, getCart ,deleteCart};

