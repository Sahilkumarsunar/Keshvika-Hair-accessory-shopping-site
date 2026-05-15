const express = require('express');
const router = express.Router();

const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  checkout
} = require('../controllers/cartController');

const { protect } = require('../middleware/auth');

// All cart routes require authentication
router.use(protect);

router.route('/')
  .get(getCart)
  .post(addToCart)
  .delete(clearCart);

router.put('/:itemId', updateCartItem);
router.delete('/:itemId', removeFromCart);
router.post('/checkout', checkout);

module.exports = router;
