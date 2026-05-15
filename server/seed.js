// server/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

// Sample products based on your existing products.js
const products = [
  {
    id: 1,
    title: "Satin Silk Scrunchie - Luxe Brown",
    price: 12.99,
    description: "Premium satin silk scrunchie in elegant brown shade. Gentle on hair, perfect for all occasions.",
    image: "/assets/scrunchie.jpg",
    category: "scrunchies",
    rating: 4.8,
    stock: 150,
    colors: ["brown", "chocolate"],
    material: "Satin Silk",
    featured: true
  },
  {
    id: 2,
    title: "Vibrant Pink Silk Scrunchie",
    price: 11.99,
    description: "Bold and beautiful hot pink silk scrunchie. Makes a statement while keeping your hair healthy.",
    image: "/assets/scrunchie1.jpg",
    category: "scrunchies",
    rating: 4.7,
    stock: 120,
    colors: ["pink", "hot pink"],
    material: "Pure Silk",
    featured: true
  },
  {
    id: 3,
    title: "Elegant Silver Satin Bow",
    price: 15.99,
    description: "Sophisticated silver satin bow for a refined look. Perfect for parties and special occasions.",
    image: "/assets/bow1.jpg",
    category: "bows",
    rating: 4.9,
    stock: 80,
    colors: ["silver"],
    material: "Satin",
    featured: true
  },
  {
    id: 4,
    title: "Chocolate Brown Satin Bow",
    price: 14.99,
    description: "Rich chocolate brown satin bow that adds elegance to any hairstyle.",
    image: "/assets/bow2.jpg",
    category: "bows",
    rating: 4.6,
    stock: 90,
    colors: ["brown"],
    material: "Satin",
    featured: false
  },
  {
    id: 5,
    title: "Delicate Floral Hairband",
    price: 13.99,
    description: "Charming hairband with delicate floral pattern. Comfortable and stylish.",
    image: "/assets/hairband.jpg",
    category: "hairbands",
    rating: 4.5,
    stock: 100,
    colors: ["white", "floral"],
    material: "Fabric",
    featured: false
  },
  {
    id: 6,
    title: "Emerald Green Silk Scrunchie",
    price: 12.99,
    description: "Luxurious emerald green silk scrunchie. Adds a pop of color to your hair routine.",
    image: "/assets/scrunchie4.jpg",
    category: "scrunchies",
    rating: 4.8,
    stock: 110,
    colors: ["green", "emerald"],
    material: "Silk",
    featured: true
  },
  {
    id: 7,
    title: "Multi-Color Satin Scrunchie Set",
    price: 24.99,
    description: "Set of 4 premium satin scrunchies in assorted colors. Best value pack!",
    image: "/assets/scrunchie2.jpg",
    category: "scrunchies",
    rating: 5.0,
    stock: 75,
    colors: ["multi", "brown", "pink", "silver", "purple"],
    material: "Satin Silk",
    featured: true
  },
  {
    id: 8,
    title: "Classic Nude Silk Scrunchie",
    price: 11.99,
    description: "Timeless nude shade silk scrunchie. Versatile and elegant for everyday wear.",
    image: "/assets/scrunchie3.jpg",
    category: "scrunchies",
    rating: 4.7,
    stock: 130,
    colors: ["nude", "beige"],
    material: "Silk",
    featured: false
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Seed database
const seedDB = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    console.log('✅ Products cleared');

    // Insert products
    await Product.insertMany(products);
    console.log('✅ Products seeded successfully');

    console.log('\n📊 Database seeded with:');
    console.log(`   - ${products.length} products`);
    console.log('\n✨ You can now start your server!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();