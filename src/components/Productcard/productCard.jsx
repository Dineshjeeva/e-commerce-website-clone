import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import CustomButton from '../../shared-frontend/customButon';
import {
  addToCart,
} from '../../redux/actions/productActions';
import colors from '../../constant/colors';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

const ProductCard = ({ product }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateProductDetail = () => {
    navigate(`/product/${product.id}`)
  }

  const handleAddtoCart = (product) => {
    toast.success('Product added to cart', {
      autoClose: 2000,
      onClose: () => {
        console.log('Toast closed'); // 👉 this runs when user clicks ✖ or timeout
      },
    });

    dispatch(addToCart(product));
  };
  return (

    <><Card
      sx={{
        maxWidth: { xs: 'auto', sm: 'auto', md: 300 },
        width: '100%',
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
        }} />

      <CardContent
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          background: colors.cardBG
        }}
      >
        <Link
          style={{ textDecoration: 'none' }}
          to={`/product/${product.id}`}
        >  <Typography fontSize={'15px'} color={colors.white} fontWeight="bold" gutterBottom>
            {product.title.length > 30
              ? `${product.title.slice(0, 30)}...`
              : product.title}
          </Typography> </Link>

        <Box display={'flex'} justifyContent={'space-between'}>

          <Box margin={'1rem 0'}>
            <Rating size='small' value={product.rating.rate} />

          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={1}>
            <Typography color={colors.white}>${product.price}</Typography>
            <Typography
              variant="body2"
              color={colors.white} sx={{ textDecoration: 'line-through' }}
            >
              ${(product.price * 2).toFixed(2)}
            </Typography>
          </Box>

        </Box>



        <Typography
          variant="body2"
          color={colors.white} sx={{ mb: 2, flexGrow: 1 }}
        >
          {product.description.slice(0, 60)}...
        </Typography>

        <Box display={'flex'} justifyContent={'space-between'}>
          <CustomButton
            width='100%'

            onClick={handleNavigateProductDetail}
          >
            Buy Now
          </CustomButton>
          <CustomButton
            width='100%'


            onClick={() => handleAddtoCart(product)}
          >
            Add to Cart          </CustomButton>
        </Box>
      </CardContent>
    </Card>
    </>

  );
};

export default ProductCard;
