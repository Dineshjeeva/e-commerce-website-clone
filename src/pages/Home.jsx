import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import {
  clearFilter,
  fetchProducts,
  setFilteredProducts,
} from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ProductCard from "../components/Productcard/productCard";
import colors from "../constant/colors";

const Home = () => {
  const dispatch = useDispatch();
  const { productList, filteredProducts } = useSelector(
    (state) => state.products
  );
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleFilter = () => {
    if (category === "") {
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
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        gap={2}
        mb={4}
      >
        <Typography maxWidth={1200} margin={"auto"} variant="h4" gutterBottom>
          Products
        </Typography>
      </Box>
      <Box
        maxWidth={1300}
        margin={"auto"}
        display={"flex"}
        flexDirection={{ xs: "column", sm: "row", md: "row" }}
      >
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
              <Box display={"flex"} justifyContent={"space-between"}>
                <FormLabel component="legend">Category</FormLabel>
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    color: colors.cardBG,
                  }}
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
                <FormControlLabel
                  value="men"
                  control={<Radio />}
                  label="Fashion"
                />
                <FormControlLabel
                  value="jewelery"
                  control={<Radio />}
                  label="Jewelery"
                />
                <FormControlLabel
                  value="electronics"
                  control={<Radio />}
                  label="Electronics"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
        <Box
  maxWidth={1280}
  margin="2rem auto"
  px={2}
>
  <Grid container spacing={3} justifyContent="space-between">
    {filteredProducts.map((product) => (
      <Grid
       item
        key={product.id}
        xs={12}    // 📱 1 card on mobile
        sm={6}     // 🧾 2 cards on tablets
        md={4}
        lg={4}  
      >
        <ProductCard product={product} />
      </Grid>
    ))}
  </Grid>
</Box>
      </Box>
    </Container>
  );
};

export default Home;
