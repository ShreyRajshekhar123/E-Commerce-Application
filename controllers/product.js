const Product = require('../models/product');


module.exports.showAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products });
}

module.exports.createProduct = async (req, res) => {
    const { name, img, price, desc } = req.body;
    await Product.create({ name, img, price, desc });

    req.flash('success', 'Product added successfully!');
    res.redirect('/products');
}

module.exports.productForm = (req, res) => {
    res.render('products/new');
}

module.exports.showProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('reviews');
    res.render('products/show', { product });
}

module.exports.productEditForm = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product });
}

module.exports.editProduct = async (req, res) => {
    const { id } = req.params;
    const { name, img, price, desc } = req.body;
    const existingProduct = await Product.findById(id);

    if (name) existingProduct.name = name;
    if (img) existingProduct.img = img;
    if (price) existingProduct.price = price;
    if (desc) existingProduct.desc = desc;

    await existingProduct.save();

    res.redirect('/products');
}

module.exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);

        req.flash('success', 'Product deleted successfully!');
        res.redirect('/products');
    } catch (error) {
        req.flash('error', error.message)
        console.log(error);
    }
}