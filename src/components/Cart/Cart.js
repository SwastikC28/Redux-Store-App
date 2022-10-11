import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartData = useSelector((state) => state.cart.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartData.map((cart) => (
          <CartItem
            key={cart.id}
            item={{
              title: cart.title,
              quantity: cart.quantity,
              total: cart.totalPrice,
              price: cart.price,
              id: cart.id,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
