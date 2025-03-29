import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';

function DonatePage() {
  const navigate = useNavigate();
  const { title, price, bookID } = useParams();
  const { addToCart } = useCart();
  const [quantity, setTotalQuantity] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Book Found',
      price: Number(price),
      quantity,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <br></br>
      <h2>Buy {title}</h2>
      <br></br>
      <h3>Price: ${price}</h3>
      <div>
        {' '}
        Quantity:{' '}
        <input
          type="number"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(x) => setTotalQuantity(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <br></br>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default DonatePage;
