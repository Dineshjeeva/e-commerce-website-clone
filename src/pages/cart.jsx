// src/pages/Cart.jsx

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { removeFromCart } from '../redux/actions/productActions';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.products);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Card
              key={item.id}
              sx={{
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 2,
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{ width: 80, height: 80, objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography variant="subtitle1">{item.title}</Typography>
                  <Typography color="primary">${item.price}</Typography>
                </CardContent>
              </Box>

              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </Button>
            </Card>
          ))}

          <Box textAlign="right" mt={2}>
            <Typography variant="h6">Total: ${total}</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 1 }}>
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;
