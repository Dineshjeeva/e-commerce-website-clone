import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const cart = useSelector((state) => state.products.cart);

  return (
    <header style={{ background:'white' }}>
    <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between',maxWidth:'1280px',margin:'auto' }}>
          <Link style={{
        fontSize:'35px',
        textDecoration:'none',
        color:'black'
      }} to="/">
        <img src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg' />
      </Link>
      <Link
  to="/cart"
  style={{
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
  }}
>
  <img
    src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg"
    alt="Cart"
  />

  <p
    style={{
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      background: 'linear-gradient(90deg, #8DC53E 0%, #1A4151 103.11%)',
      color: 'white',
      borderRadius: '50%',
      padding: '2px 6px',
      fontSize: '12px',
      fontWeight: 'bold',
      lineHeight: 1,
    }}
    className="cart_count"
  >
    {cart.length}
  </p>
</Link>

    
    </div>
    </header>
  );
};

export default Header;