import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,

  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
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
import colors from '../constant/colors';
import { ToastContainer } from 'react-toastify';

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

  useEffect(() => {
    handleFilter();
  }, [category]);

  return (
    <Container maxWidth={1300} sx={{ py: 4 }}>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        gap={2}
        mb={4}
      >
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>

        {/* <Box
    display="flex"
    flexDirection={{ xs: 'column', sm: 'row' }}
    alignItems={{ xs: 'stretch', sm: 'center' }}
    justifyContent="flex-end"
    gap={2}
    width={{ xs: '100%', sm: 'auto' }}
  >
    <FormControl fullWidth sx={{ minWidth: 200 }}>
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

    <CustomButton onClick={handleFilter}>Filter</CustomButton>

    <CustomButton
sx={{
  whiteSpace:'nowrap'
}}      onClick={() => {
        setCategory('');
        dispatch(clearFilter());
      }}
    >
      Clear Filter
    </CustomButton>
  </Box> */}
      </Box>
      <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}>
        <Box>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="flex-end"
            gap={2}
            width={{ xs: "100%", sm: "auto" }}
          >
            <FormControl component="fieldset" sx={{ minWidth: 200 }}>
              <Box display={'flex'} justifyContent={'space-between'}>
                <FormLabel component="legend">Category</FormLabel>
                <Typography
                  sx={{ whiteSpace: "nowrap", cursor: 'pointer', color: colors.cardBG }}
                  onClick={() => {
                    setCategory("");
                    dispatch(clearFilter());
                  }}
                >
                  Clear Filter
                </Typography>
              </Box>
              <RadioGroup

                value={category}
                onChange={(e) => {
                  const selectedCategory = e.target.value;
                  setCategory(selectedCategory);
                  handleFilter(selectedCategory); // Auto apply filter on select
                }}
              >
                <FormControlLabel value="" control={<Radio />} label="All" />
                <FormControlLabel value="men" control={<Radio />} label="Fashion" />
                <FormControlLabel value="jewelery" control={<Radio />} label="Jewelery" />
                <FormControlLabel value="electronics" control={<Radio />} label="Electronics" />
              </RadioGroup>
            </FormControl>



          </Box>
        </Box>
        <Box display="flex" flexWrap="wrap" gap={3} maxWidth={1280} justifyContent={'center'} margin={'2rem auto'}>
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </Box>
      </Box>



    </Container>
  );
};

export default Home;
