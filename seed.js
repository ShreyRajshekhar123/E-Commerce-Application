const mongoose = require('mongoose');
const Product = require('./models/product');
const db_url = 'mongodb+srv://sb138147:nNlUTw5Tu8T2A52S@cluster0.ggi6hnq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(db_url)
    .then(() => console.log('E-com-15-Oct DB connected!'))
    .catch(err => console.log(err));

const dummy_data = [

    {
        "name": "Laptop",
        "price": 40000,
        "img": "https://p1-ofp.static.pub//medias/25682325308_21JN21JQX_202303130232241699937710738.png",
        "desc": "Lenovo ThinkPad E14 Intel Intel Core i5 12th Gen 1235U - (16 GB/512 GB SSD/Windows 11 Home) TP E14 Gen 4 Thin and Light Laptop"
    },
    {
        "name": "Smartphone",
        "price": 1000,
        "desc": "Latest smartphone with high-resolution camera and advanced features."
    },
    {
        "name": "Headphones",
        "price": 150,
        "desc": "Over-ear headphones with noise cancellation and premium sound quality."
    },
    {
        "name": "Smartwatch",
        "price": 300,
        "desc": "Fitness tracker and smartwatch with heart rate monitoring and GPS."
    },
    {
        "name": "Desktop Computer",
        "price": 60000,
        "desc": "Powerful desktop computer with high-performance specifications for gaming and professional tasks."
    },
    {
        "name": "Tablet",
        "price": 500,
        "desc": "10-inch tablet with a high-resolution display and long battery life."
    },
    {
        "name": "Camera",
        "price": 800,
        "desc": "Mirrorless camera with 24MP sensor, 4K video recording, and advanced autofocus."
    },
    {
        "name": "Wireless Earbuds",
        "price": 120,
        "desc": "True wireless earbuds with touch controls and noise isolation."
    },
    {
        "name": "Printer",
        "price": 200,
        "desc": "All-in-one printer with wireless connectivity and high-quality printing capabilities."
    },
    {
        "name": "External Hard Drive",
        "price": 150,
        "desc": "2TB external hard drive for additional storage and backup solutions."
    },
    {
        "name": "Monitor",
        "price": 300,
        "desc": "27-inch monitor with IPS display and adjustable stand for ergonomic use."
    },
    {
        "name": "Graphics Card",
        "price": 500,
        "desc": "Dedicated graphics card for gaming and video editing with 8GB GDDR6 memory."
    },
    {
        "name": "Wireless Router",
        "price": 80,
        "desc": "Dual-band wireless router with advanced security features and high-speed connectivity."
    },
    {
        "name": "Backpack",
        "price": 50,
        "desc": "Durable backpack with multiple compartments for laptops, tablets, and other essentials."
    },
    {
        "name": "Gaming Mouse",
        "price": 60,
        "desc": "RGB gaming mouse with customizable buttons and high-precision sensor."
    },
    {
        "name": "Home Theater System",
        "price": 700,
        "desc": "5.1 surround sound home theater system with Bluetooth connectivity."
    },
    {
        "name": "Electric Toothbrush",
        "price": 80,
        "desc": "Smart electric toothbrush with pressure sensors and multiple brushing modes."
    },
    {
        "name": "Coffee Maker",
        "price": 100,
        "desc": "Programmable coffee maker with a built-in grinder and thermal carafe."
    },
    {
        "name": "External SSD",
        "price": 120,
        "img": "https://example.com/external-ssd-image.png",
        "desc": "500GB external SSD for fast data transfer and portable storage solutions."
    },
    {
        "name": "Wireless Keyboard and Mouse Combo",
        "price": 70,
        "desc": "Wireless keyboard and mouse combo with ergonomic design and long battery life."
    }

]

async function seed() {
    await Product.deleteMany({});
    await Product.insertMany(dummy_data);
    console.log('DB Seeded!');
}

seed();