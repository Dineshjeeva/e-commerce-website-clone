import {
  Box,
  Breadcrumbs,
  Button,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link,
  Rating,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  addToCart,
  fetchProductDetail,
  fetchProducts,
} from '../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '../shared-frontend/customButon';
import ProductCard from '../components/Productcard/productCard';
import { Link as RouterLink } from 'react-router-dom';
import colors from '../constant/colors';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail, productList } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductDetail(id));
    dispatch(fetchProducts());
  }, [dispatch, id]);

  if (!productDetail) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = productList.filter(
    (product) =>
      product.category === productDetail.category && product.id !== productDetail.id
  );

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
    <Container sx={{ py: 4 }}>

      {/* Breadcrumbs */}
      <Box mb={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            component={RouterLink}
            underline="hover"
            color="inherit"
            to="/"
          >
            Home
          </Link>
          <Typography color="text.primary">
            {productDetail.title.length > 40
              ? productDetail.title.slice(0, 40) + '...'
              : productDetail.title}
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Main Product Details */}
      <Box display="flex" boxShadow={'rgba(1, 6, 12, 0.14) 0px 4px 25px 0px'} borderRadius={'16px'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={'center'} padding={'3rem'} gap={{ xs: 4, sm: 4, md: 12 }} mb={6}>
        <CardMedia
          component="img"
          image={productDetail.image}
          alt={productDetail.title}
          sx={{ maxWidth: 300, objectFit: 'contain', borderRadius: 2 }}
        />

        <Box flex={1}>
          <Typography textAlign={'center'} fontSize={{ xs: '18px', sm: '18px', md: '32px' }} color={colors.cardBG} gutterBottom>
            {productDetail.title}
          </Typography>



          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            width="100%"
          >
            {/* Price Line */}
            <Box display="flex" flexWrap="wrap">
              <Typography fontSize="18px" fontWeight={600} color={colors.cardBG} mr={1}>
                Price:
              </Typography>
              <Typography fontSize="18px" color={colors.Black}>
                ₹{productDetail.price}
              </Typography>
            </Box>
            <Box>
              <Rating size='small' value={productDetail.rating.rate} />

            </Box>

            {/* Description Line */}
            <Box display="flex" flexWrap="wrap">
              <Typography fontSize="18px" fontWeight={600} color={colors.cardBG} mr={1}>
                Description:
              </Typography>
              <Typography fontSize="18px" color={colors.Black}>
                {productDetail.description}
              </Typography>
            </Box>

            {/* Add to Cart Button */}
            <CustomButton
              sx={{ width: 'fit-content', mt: 2 }}
              onClick={() => handleAddtoCart(productDetail)}
            >
              Add to Cart
            </CustomButton>
          </Box>


        </Box>
      </Box>

      <Divider sx={{
        width: '100%',
        maxWidth: 1300,
        height: '2px',
        background: 'black'
      }} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Box margin={'2rem auto'}>
          <Typography variant="h5" gutterBottom>
            Related Products
          </Typography>

          <Grid container spacing={2} justifyContent={'center'}>
            {relatedProducts.slice(0, 4).map((product) => (
              <Grid item xs={12} sm={6} md={3} lg={3} key={product.id} >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ProductDetail;
