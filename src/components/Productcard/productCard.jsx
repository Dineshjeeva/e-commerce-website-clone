import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import CustomButton from '../../shared-frontend/customButon';

const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  const handleNavigateProductDetail = () => {
    navigate(`/product/${product.id}`)
  }
  return (
    <Link
      style={{ textDecoration: 'none' }}
      to={`/product/${product.id}`}
    >
      <Card
        sx={{
          width: 350,
          height: 400, // ✅ Set fixed height
          borderRadius: 3,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // evenly space image + content
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.03)',
          },
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            height: 150,
            objectFit: 'contain',
            padding: 2,
            margin: '0 auto',
            width: 'auto',
            maxWidth: '100%',
          }}
        />

        <CardContent
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          }}
        >
          <Typography fontSize={'20px'} fontWeight="bold" gutterBottom>
            {product.title.length > 30
              ? `${product.title.slice(0, 30)}...`
              : product.title}
          </Typography>

          <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={1}>
            <Typography color="primary">${product.price}</Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'line-through' }}
            >
              ${(product.price * 2).toFixed(2)}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, flexGrow: 1 }}
          >
            {product.description.slice(0, 60)}...
          </Typography>

          <CustomButton
            
            onClick={handleNavigateProductDetail}
          >
            Buy Now
          </CustomButton>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
