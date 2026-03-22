# WanderLust - Travel Listing Platform

A full-stack web application for discovering and sharing travel accommodations, inspired by Airbnb. Users can browse listings, leave reviews, and plan their travels.

## 🌟 Features

### Core Features
- **User Authentication** - Sign up, login, logout with secure session management
- **Listing Management** - Create, read, update, delete (CRUD) listings
- **Search Functionality** - Search listings by title, location, country, and description
- **Reviews System** - Leave ratings and comments on listings
- **Dark/Light Theme** - Toggle between dark and light themes with localStorage persistence
- **Responsive Design** - Fully responsive mobile-friendly interface
- **Image Upload** - Upload listing images with Cloudinary integration
- **Location Mapping** - Mapbox integration for showing listing locations

### User Roles
- **Guest Users** - Browse and review listings
- **Hosts** - Create and manage their property listings
- **Admins** - Full platform management (optional)

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Markup structure
- **EJS** - Template engine for dynamic views
- **Bootstrap 5** - CSS framework for responsive design
- **Font Awesome 7** - Icon library
- **CSS3** - Custom styling
- **JavaScript** - Client-side interactivity

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Passport.js** - Authentication middleware
- **Express-session** - Session management
- **Connect-flash** - Flash messaging
- **Joi** - Schema validation
- **Multer** - File upload handling
- **Cloudinary** - Cloud image storage

### External APIs
- **Mapbox GL JS** - Interactive maps
- **Mapbox Geocoding API** - Location services
- **Font Awesome CDN** - Icon library

### Development Tools
- **Nodemon** - Auto-restart development server
- **Dotenv** - Environment variable management

## 📋 Project Structure

```
WanderLust/
├── app.js                    # Main application file
├── cloudConfig.js            # Cloudinary configuration
├── middleware.js             # Custom middleware
├── schema.js                 # Joi validation schemas
├── package.json              # Project dependencies
├── controllers/
│   ├── listing.js           # Listing controller
│   ├── review.js            # Review controller
│   └── user.js              # User controller
├── models/
│   ├── listing.js           # Listing database model
│   ├── review.js            # Review database model
│   └── user.js              # User database model
├── routes/
│   ├── listing.js           # Listing routes
│   ├── review.js            # Review routes
│   └── user.js              # User routes
├── public/
│   ├── css/
│   │   ├── style.css        # Main styles
│   │   └── rating.css       # Rating component styles
│   └── js/
│       ├── script.js        # Main JavaScript
│       └── map.js           # Mapbox integration
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs  # Main layout template
│   ├── includes/
│   │   ├── navbar.ejs       # Navigation bar
│   │   ├── footer.ejs       # Footer
│   │   └── flash.ejs        # Flash messages
│   ├── listings/
│   │   ├── index.ejs        # All listings page
│   │   ├── new.ejs          # Create listing page
│   │   ├── edit.ejs         # Edit listing page
│   │   └── show.ejs         # Listing details page
│   ├── users/
│   │   ├── login.ejs        # Login page
│   │   └── signup.ejs       # Signup page
│   └── error.ejs            # Error page
├── utils/
│   ├── ExpressError.js      # Custom error class
│   └── wrapAsync.js         # Async error wrapper
└── init/
    ├── index.js             # Database initialization
    └── data.js              # Sample data
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)
- Cloudinary account
- Mapbox account
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables**
   ```bash
   touch .env
   ```
   
   Add the following to `.env`:
   ```
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret_key
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   MAP_TOKEN=your_mapbox_api_token
   ```

4. **Initialize database with sample data (optional)**
   ```bash
   node init/index.js
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   nodemon app.js
   ```

6. **Open in browser**
   ```
   http://localhost:8080
   ```

## 🔐 Security Features

- **Authentication** - Passport.js with local strategy
- **Password Security** - Hashed passwords with bcrypt
- **Session Management** - Secure session handling
- **Input Validation** - Joi schema validation
- **Authorization** - Role-based access control
- **Error Handling** - Global error handling middleware
- **Flash Messages** - User feedback with flash middleware

## 🎨 Features Deep Dive

### Search Functionality
- Search by listing title
- Search by location/city
- Search by country
- Case-insensitive matching
- Returns filtered results on index page

### Image Management
- Upload images via Multer
- Store in Cloudinary cloud
- Responsive image sizing
- Image optimization

### Review System
- Star ratings (1-5)
- Text comments
- Display average rating
- Show all reviews on listing page

### Mapping Integration
- Display listing location on Mapbox
- Interactive map on listing show page
- Geocoding for location conversion

## 🔄 Database Schema

### User Model
```javascript
{
  username: String,
  email: String,
  password: String,
  listings: [ObjectId],
  reviews: [ObjectId]
}
```

### Listing Model
```javascript
{
  title: String,
  description: String,
  location: String,
  country: String,
  price: Number,
  image: { url, filename },
  owner: ObjectId (User),
  reviews: [ObjectId],
  geometry: { type, coordinates }
}
```

### Review Model
```javascript
{
  rating: Number (1-5),
  comment: String,
  author: ObjectId (User),
  listing: ObjectId
}
```

## 🐛 Known Issues & Limitations

- Booking system not implemented
- Payment integration pending
- Messaging system not available
- Single image per listing (multiple images coming soon)
- Mobile responsive improvements needed

## 📝 API Endpoints

### Listings
- `GET /listings` - Get all listings
- `POST /listings` - Create new listing (requires auth)
- `GET /listings/:id` - Get listing details
- `PUT /listings/:id` - Update listing (requires ownership)
- `DELETE /listings/:id` - Delete listing (requires ownership)
- `GET /listings/search` - Search listings
- `GET /listings/new` - Show create listing form

### Users
- `POST /signup` - Register new user
- `POST /login` - Login user
- `GET /logout` - Logout user

### Reviews
- `POST /listings/:id/reviews` - Create review (requires auth)
- `DELETE /listings/:id/reviews/:reviewId` - Delete review (requires ownership)

## 🚀 Future Enhancements

- [ ] Booking system with date selection
- [ ] Payment gateway (Stripe/Razorpay)
- [ ] Messaging between hosts and guests
- [ ] Host analytics dashboard
- [ ] Advanced filtering and sorting
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Multiple images per listing
- [ ] User verification badges
- [ ] Amenities tags

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Vishnu Maddheshiya**
- GitHub: [@vishnumaddheshiya](https://github.com/vishnumaddheshiya)


## 🙏 Acknowledgments

- Express.js documentation
- MongoDB/Mongoose guides
- Bootstrap for UI components
- Mapbox for mapping services
- Cloudinary for image hosting
- Font Awesome for icons

---

**Happy Traveling! 🌍✈️**
