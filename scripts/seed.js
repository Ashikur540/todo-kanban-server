
import Product from '../models/product.schema.js';
import connectDB from '../utils/connectDb.js';

const products = [
    {
        name: 'Wireless Mouse',
        price: 29.99,
        stock: 50,
        description: 'Ergonomic wireless mouse with long battery life'
    },
    {
        name: 'Mechanical Keyboard',
        price: 89.99,
        stock: 30,
        description: 'RGB mechanical keyboard with cherry MX switches'
    },
    {
        name: 'Gaming Headset',
        price: 59.99,
        stock: 25,
        description: '7.1 surround sound gaming headset with noise-canceling mic'
    },
    {
        name: 'USB-C Hub',
        price: 45.99,
        stock: 40,
        description: '7-in-1 USB-C hub with HDMI and power delivery'
    },
    {
        name: 'Laptop Stand',
        price: 24.99,
        stock: 60,
        description: 'Adjustable aluminum laptop stand with ventilation'
    },
    {
        name: 'Webcam',
        price: 79.99,
        stock: 20,
        description: '1080p HD webcam with auto focus and dual microphones'
    },
    {
        name: 'External SSD',
        price: 119.99,
        stock: 15,
        description: '1TB portable SSD with USB 3.2 Gen 2'
    },
    {
        name: 'Monitor',
        price: 249.99,
        stock: 10,
        description: '27" 1440p IPS monitor with 165Hz refresh rate'
    },
    {
        name: 'Wireless Charger',
        price: 34.99,
        stock: 45,
        description: '15W fast wireless charger with LED indicator'
    },
    {
        name: 'Graphics Tablet',
        price: 149.99,
        stock: 12,
        description: 'Digital drawing tablet with 8192 pressure levels'
    }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        connectDB()

        // Clear existing products
        // await Product.deleteMany({});
        // console.log('Cleared existing products');

        // Insert new products
        const insertedProducts = await Product.insertMany(products);
        console.log(`Successfully inserted ${insertedProducts.length} products`);

        // Log the inserted products
        console.log('\nInserted products:');
        insertedProducts.forEach(product => {
            console.log(`- ${product.name} ($${product.price})`);
        });

        console.log('\nDatabase seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
    //   } finally {
    //     // Close the database connection
    //     await mongoose.connection.close();
    //     console.log('Database connection closed');
    //   }
};

// Run the seed function
seedDatabase();