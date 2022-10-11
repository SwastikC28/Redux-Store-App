import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { getData, sendCartData } from './store/cart-action';
import Notification from './components/UI/Notification';

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const isVisible = useSelector((state) => state.ui.isVisible);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          title={notification.title}
          status={notification.status}
          message={notification.message}
        />
      )}
      <Layout>
        {isVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
