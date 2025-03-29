import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.bookID}>
                {item.title}: ${item.price} Quantity: {item.quantity} Subtotal:
                ${(item.price * item.quantity).toFixed(2)}
                <button onClick={() => removeFromCart(item.bookID)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total: ${total.toFixed(2)}</h3>
      <br></br>
      <button>Checkout</button>
      {'    '}
      <button onClick={() => navigate('/books')}>Continue Shopping</button>
    </div>
  );
}

export default CartPage;
