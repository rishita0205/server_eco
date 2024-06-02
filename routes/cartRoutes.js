// routes/cartRoutes.js
import express from 'express';
import Cart from '../models/Cart.js';

const router = express.Router();

// Get cart for user
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add to cart
router.post('/', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // If cart exists, update it
      const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));

      if (itemIndex > -1) {
        // If product exists in the cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If product does not exist, add new item
        cart.items.push({ productId, quantity });
      }
    } else {
      // If no cart exists, create a new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity }]
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Update item quantity
router.put('/', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));

    if (itemIndex > -1) {
      // If product exists in the cart, update the quantity
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove item from cart
router.delete('/', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => !item.productId.equals(productId));

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
