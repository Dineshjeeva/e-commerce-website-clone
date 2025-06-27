import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import {
  addToCart,
  fetchProductDetail,
  fetchProducts,
} from '../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

import ProductCard from '../components/Productcard/productCard';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
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

  return (
    <Container sx={{ py: 4 }}>
      {/* Main Product Details */}
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4} mb={6}>
        <CardMedia
          component="img"
          image={productDetail.image}
          alt={productDetail.title}
          sx={{ width: 300, objectFit: 'contain', borderRadius: 2 }}
        />

        <Box flex={1}>
          <Typography variant="h4" gutterBottom>
            {productDetail.title}
          </Typography>

          <Typography variant="h6" color="primary" gutterBottom>
            ${productDetail.price}
          </Typography>

          <Typography variant="body1" paragraph>
            {productDetail.description}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(addToCart(productDetail))}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom>
            Related Products
          </Typography>

          <Grid container spacing={3}>
            {relatedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ProductDetail;
