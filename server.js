const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
//const socketIo = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
dotenv.config();

// First initialize `app`
const app = express();

// Then use it to create the server
const server = http.createServer(app);

//  Now set up Socket.IO
// const io = socketIo(server, {
//   cors: {
//     origin: '*',  // set your frontend origin
//     methods: ['GET', 'POST']
//   }
// });
// require('./socket')(io);
// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());


// Routes
const authRoutes = require('./routes/authRoutes');
const featuredinRoutes = require('./routes/featuredinRoutes');
const collectionsRoutes = require('./routes/collectionsRoutes');
const productRoutes = require('./routes/productRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const cartItemRoutes = require('./routes/cartItemRoutes');
const wishlistItemsRoutes = require('./routes/wishlistItemsRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewsRoutes = require('./routes/reviewRoutes');
const subscriptionsRoutes = require('./routes/subscriptionsRoutes');
const uploader = require('./routes/uploaderRoutes');
const giftcardsRoutes = require('./routes/giftcardsRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authenticate = require('./middleware/authMiddleware.js');

app.use('/api/auth', authRoutes);
// app.use('/api/product', authenticate, productRoutes);
// app.use('/api/brands', authenticate, brandsRoutes);
// app.use('/api/enquiries', authenticate, enquiriesRoutes);
// app.use('/api/notification', authenticate, notificationRoutes);
// app.use('/api/categories', authenticate, categoriesRoutes);
// app.use('/api/cartItem', authenticate, cartItemRoutes);
// app.use('/api/wishlistItems', authenticate, wishlistItemsRoutes);
// app.use('/api/order', authenticate, orderRoutes);
// app.use('/api/review', authenticate, reviewsRoutes);
// app.use('/api/upload', authenticate, uploader);
// app.use('/api/payment',authenticate, paymentRoutes);
// app.use('/api/brands',  brandsRoutes);
// app.use('/api/enquiries', enquiriesRoutes);
app.use('/api/giftcards', giftcardsRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);
app.use('/api/categories',  categoriesRoutes);
app.use('/api/featuredin',  featuredinRoutes);
app.use('/api/collections',  collectionsRoutes);
app.use('/api/product',  productRoutes);
app.use('/api/cartItem',  cartItemRoutes);
app.use('/api/wishlistItems',  wishlistItemsRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/review', reviewsRoutes);
app.use('/api/upload',  uploader);
app.use('/api/payment', paymentRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Default route
// app.get('/', (req, res) => {
//   res.send('Socket server running');
// });

app.get('/', (req, res) => {
  res.send('Socket server running');
});
if (process.env.NODE_ENV === 'production') {

  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

 
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}
// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
