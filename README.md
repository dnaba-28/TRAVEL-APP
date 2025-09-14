# WANDER APP
## 📖 About the Project

The Travel App is a full-stack web application designed for travel enthusiasts to explore, share, and manage travel destinations.To enhance the experience, the app integrates an interactive map using Leaflet, allowing users to visualize destinations directly on a map. Images are stored with Cloudinary, and data is managed using MongoDB Atlas.
This project is built with Node.js, Express.js, MongoDB, EJS templates, and Leaflet maps, providing a smooth, modern, and responsive travel platform. The goal of this project is to create a platform where users can:
*  Discover beautiful travel spots around the world.
* Share their own experiences by adding new listings.
* Upload photos and write descriptions of destinations.
* Interact with the community through reviews and ratings.

## Customer Features

* 🔍 Browse Destinations – Explore travel spots with descriptions, images, and location details.
* 🗺️ Interactive Map (Leaflet) – View listings on a dynamic, zoomable map.
* 📝 Create Listings – Add new travel destinations with photos and descriptions.
* ✏️ Manage Listings – Edit or delete your own destinations.
* 📸 Image Uploads – Upload multiple images for each listing (via Cloudinary).
* 💬 Reviews & Ratings – Leave feedback and rate destinations.
* 🔐 User Accounts – Secure signup, login, and session-based authentication.
* 📱 Responsive Design – Works smoothly on mobile, tablet, and desktop.

## Admin Features

* 📦 Product Management (CRUD Functionality)
* ➕ Create – Add new destinations with title, description, price, images, and location.
* 👁️ Read – View all listings or a single listing with details and map integration.
* ✏️ Update – Edit existing listings (update information, replace images, etc.).
* ❌ Delete – Remove listings permanently.

## 🛠️ Technologies Used

### FRONTEND

* HTML5, CSS3, Bootstrap – for responsive UI
* JavaScript (EJS Templates) – for dynamic rendering

### BACKEND

* Node.js – runtime environment
* Express.js – backend framework
* MongoDB Atlas – cloud database
* Mongoose – ODM for MongoDB
  
### MAPS AND MEDIA

* Leaflet.js – interactive maps
* Cloudinary – image storage and management
  
### AUTHENTICATION AND SECURITY

* Passport.js  – user authentication & password security
* Express-Session – session management
  
### OTHER TOOLS

* Git & GitHub – version control
* Render  – deployment (or whichever platform you used)

## 🚀 Getting Started

1. Clone the Repository
git clone https://github.com/your-username/travel-app.git
cd travel-app

2. Install Dependencies
npm install

3. Set Up Environment Variables

Create a .env file in the root directory and add the following:

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
ATLASDB_URL=your_mongodb_atlas_url
SECRET=session_secret_key
4. Run the App
node app.js

🚀 Deployment on Render

The project is deployed on Render, a cloud hosting platform for web applications.

1)Steps to Deploy:

* Push Code to GitHub
* Make sure your project is in a GitHub repository.
  
2)Create a New Web Service on Render
  
* Log in to Render
* Click New → Web Service.
* Connect your GitHub repository.


3)Configure Settings
  
* Environment: Node
* Build Command:npm install
* Start Command:npm app.js
  
4)Set Environment Variables
  
* In Render dashboard, go to Environment tab.Add your keys (from .env file):
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
ATLASDB_URL=your_mongodb_atlas_url
SECRET=session_secret_key

5)Deploy & Access
  
* Click Deploy Web Service.
* Once deployed, your app will be available at:https://your-app-name.onrender.com

## Contributing 🙏

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/SantanuDas7095/Ecommerce/issues).

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'feat: Add a new feature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## License 📜

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact 📧

* Nabanita Debnath
* Email : dnnabanita@gmail.com
* **Github :** [Github](https://github.com/dnaba-28)
* **Linkedin :** [Linkedin](https://www.linkedin.com/in/nabanita-debnath-524018336/)

Project Link: [Travel App](https://travel-app-vgj9.onrender.com)
