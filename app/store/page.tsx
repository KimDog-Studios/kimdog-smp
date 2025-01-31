"use client";
import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import { Container, Grid, Card, CardContent, Typography, Button, TextField, IconButton, Badge, Box, AppBar, Toolbar, Drawer, List, ListItem, ListItemText, ListItemSecondaryAction, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel, Slider } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { products } from '../../config/store';

const StorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 10]);
  const [cart, setCart] = useState<{ id: number; name: string; price: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ id: number; name: string; description: string; detailedDescription: string; price: number; image: string } | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const addToCart = (product: { id: number; name: string; price: number }) => {
    setCart([...cart, product]);
    setSelectedProduct(null); // Close the dialog after adding to cart
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(product => product.id !== productId));
  };

  const filteredProducts = products.filter(product => {
    return (
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  });

  const total = cart.reduce((acc, product) => acc + product.price, 0);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleViewProduct = (product: { id: number; name: string; description: string; detailedDescription: string; price: number; image: string }) => {
    setSelectedProduct(product);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-minecraft">
      <Navigation />
      <Container>
        <AppBar position="static" style={{ backgroundColor: '#333', marginBottom: '20px' }}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              KimDog SMP Store
            </Typography>
            <IconButton color="inherit" onClick={toggleCart}>
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
          <Box p={2} width={300} role="presentation">
            <Typography variant="h5" component="div" gutterBottom>
              Your Cart
            </Typography>
            {cart.length === 0 ? (
              <Typography variant="body1">Your cart is empty.</Typography>
            ) : (
              <List>
                {cart.map(product => (
                  <ListItem key={product.id}>
                    <ListItemText primary={product.name} secondary={`$${product.price.toFixed(2)}`} />
                    <ListItemSecondaryAction>
                      <Button onClick={() => removeFromCart(product.id)} variant="contained" color="secondary" size="small">Remove</Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                <ListItem>
                  <ListItemText primary="Total" />
                  <Typography variant="h6">${total.toFixed(2)}</Typography>
                </ListItem>
                <ListItem>
                  <Button variant="contained" color="primary" fullWidth>Checkout</Button>
                </ListItem>
              </List>
            )}
          </Box>
        </Drawer>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Box p={2} style={{ backgroundColor: '#424242', borderRadius: '8px' }}>
              <Typography variant="h6" gutterBottom>Filters</Typography>
              <Typography variant="subtitle1" gutterBottom>Categories</Typography>
              <FormControlLabel
                control={<Checkbox checked={selectedCategories.includes('Keys')} onChange={() => handleCategoryChange('Keys')} />}
                label="Keys"
              />
              <FormControlLabel
                control={<Checkbox checked={selectedCategories.includes('Ranks')} onChange={() => handleCategoryChange('Ranks')} />}
                label="Ranks"
              />
              <FormControlLabel
                control={<Checkbox checked={selectedCategories.includes('Items')} onChange={() => handleCategoryChange('Items')} />}
                label="Items"
              />
              <Typography variant="subtitle1" gutterBottom>Price Range</Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={10}
                style={{ color: 'white' }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box mb={4} display="flex" justifyContent="center">
              <TextField
                variant="outlined"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                fullWidth
                style={{ backgroundColor: '#424242', borderRadius: '4px' }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
            </Box>
            <Grid container spacing={3}>
              {filteredProducts.map(product => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card style={{ backgroundColor: '#424242', color: 'white' }}>
                    <CardContent>
                      <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
                      <Typography variant="h5" component="div" gutterBottom>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {product.description}
                      </Typography>
                      <Typography variant="h6" component="div" style={{ marginTop: '10px' }}>
                        ${product.price.toFixed(2)}
                      </Typography>
                      <Button onClick={() => handleViewProduct(product)} variant="contained" color="primary" style={{ marginTop: '10px' }}>View</Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        {selectedProduct && (
          <Dialog open={Boolean(selectedProduct)} onClose={handleCloseDialog}>
            <DialogTitle>{selectedProduct.name}</DialogTitle>
            <DialogContent>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', marginBottom: '20px' }} />
              <Typography variant="body1" gutterBottom>
                {selectedProduct.detailedDescription}
              </Typography>
              <Typography variant="h6" gutterBottom>
                ${selectedProduct.price.toFixed(2)}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="secondary">Close</Button>
              <Button onClick={() => addToCart(selectedProduct)} color="primary">Add to Cart</Button>
            </DialogActions>
          </Dialog>
        )}
        <section className="my-12 text-center">
          <Typography variant="h4" component="h2" gutterBottom>
            How to Purchase
          </Typography>
          <Typography variant="body1" component="p" style={{ maxWidth: '600px', margin: '0 auto' }}>
            To purchase an item, click on the "Add to Cart" button and follow the instructions. Your purchase will help support the server and keep it running smoothly.
          </Typography>
        </section>
        <section className="my-12 text-center">
          <Typography variant="h4" component="h2" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" component="p" style={{ maxWidth: '600px', margin: '0 auto' }}>
            If you have any questions or need assistance with your purchase, please contact us at support@kimdog-smp.com.
          </Typography>
        </section>
      </Container>
    </div>
  );
};

export default StorePage;