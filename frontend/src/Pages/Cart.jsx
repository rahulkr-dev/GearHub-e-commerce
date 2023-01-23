const Cart = ({ cartItems }) => {
    return (
      <Stack spacing={4}>
        {cartItems.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
      </Stack>
    );
  };
  export default Cart