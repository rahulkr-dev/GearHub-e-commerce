
router.patch('/:cartId/add', async (req, res) => {
    try {
        const product = await Product.findById(req.body.productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const cart = await Cart.findById(req.params.cartId);
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        // check if product is already in cart
        let cartItem = cart.items.find(
            item => item.product.toString() === req.body.productId
        );
        if (cartItem) {
            cartItem.quantity += req.body.quantity;
        } else {
            cartItem = {
                product: req.body.productId,
                quantity: req.body.quantity
            };
            cart.items.push(cartItem);
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});