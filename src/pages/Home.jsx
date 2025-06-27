import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import {
  clearFilter,
  fetchProducts,
  setFilteredProducts,
} from '../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import CustomButton from "../shared-frontend/customButon"
import ProductCard from '../components/Productcard/productCard';

const Home = () => {
  const dispatch = useDispatch();
  const { productList, filteredProducts } = useSelector((state) => state.products);
  const [category, setCategory] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleFilter = () => {
    if (category === '') {
      dispatch(clearFilter());
    } else {
      const filtered = productList.filter((p) =>
        p.category.toLowerCase().includes(category.toLowerCase())
      );
      dispatch(setFilteredProducts(filtered));
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Box display="flex" gap={2} alignItems="center" justifyContent={'end'} mb={4}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="men">Fashion</MenuItem>
            <MenuItem value="jewelery">Jewelery</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
          </Select>
        </FormControl>

        
        <CustomButton onClick={handleFilter}>
          Filter
</CustomButton>
 <CustomButton onClick={() => {
    setCategory('');
    dispatch(clearFilter());
  }}>
         Clear Filter
</CustomButton>
       
      </Box>
      </Box>

      <Box display="flex" flexWrap="wrap" gap={3} maxWidth={1280} justifyContent={'center'} margin={'auto'}>
        {filteredProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </Box>
    </Container>
  );
};

export default Home;
