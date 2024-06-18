const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/relation_db')
    .then((result) => {
        console.log("Connected to mongodb");

    }).catch((err) => {
        console.log(err);

    });

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['summer', 'spring', 'fall', 'winter', 'all']
    }
});

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

const Farm = mongoose.model('Farm', farmSchema);
const Product = mongoose.model('Product', productSchema);

// Product.insertMany([
//     {
//         name: 'Melon',
//         price: 9,
//         season: 'summer'
//     },
//     {
//         name: 'Apple',
//         price: 15,
//         season: 'spring'
//     },
//     {
//         name: 'Watermelon',
//         price: 6,
//         season: 'all'
//     },
// ]);

const makeFarm = async () => {
    const farm = new Farm({
        name: "Rossi's Farm",
        city: 'Bandung',
    });

    const melon = await Product.findOne({ name: 'Melon' });

    farm.products.push(melon);
    await farm.save();
    console.log(farm);
};

const addProduct = async(id) => {
    const farm = await Farm.findById(id);
    const apple = await Product.findOne({ name: "Apple" });

    farm.products.push(apple);
    await farm.save();
    console.log(farm);
};

// addProduct('6670410a5ff474d0c976c303');

// makeFarm();

// nampilin dat turunan relation one to many
Farm.findOne({ name: "Rossi's Farm" }).populate('products')
    .then((farm) => {
        console.log(farm);

    }).catch((err) => {
        console.log(err);

    });