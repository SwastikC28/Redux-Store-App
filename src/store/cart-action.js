import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending....',
          message: 'Sending Cart Data',
        })
      );

      const response = await fetch(
        'https://react-redux-5fe9f-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Sending Cart Data Failed!');
      }
    };

    try {
      await sendData();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Cart Data Saved Successfully',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'failed',
          title: 'Error!',
          message: 'Sending Cart Data Failed',
        })
      );
    }
  };
};

export const getData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-redux-5fe9f-default-rtdb.firebaseio.com/cart.json'
      );

      if (!response.ok) {
        throw new Error('Cound not Fetch Cart Data.');
      }
      const data = await response.json();
      if (data == null) {
        return { items: [], totalQuantity: 0 };
      }
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending Cart Data Failed',
        })
      );
    }
  };
};
