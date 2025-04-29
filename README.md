# Young Journalists Platform

A web-based platform designed to empower young journalists by providing them with a space to create, share, and engage with video content. The platform includes special features for parents to monitor their children's activities and progress.

![Young Journalists Platform](screenshot.png)

## 🌟 Features

### For Young Journalists
- **User Authentication**: Secure login and registration system
- **Video Upload**: Easy-to-use interface for uploading video content
- **Profile Management**: Personal profiles with activity history
- **Engagement Metrics**: Track likes and views on uploaded content
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### For Parents
- **Parent Dashboard**: Monitor your child's activities and progress
- **Progress Monitoring**: Track video uploads and likes received
- **Secure Access**: Dedicated parent login with role-based authentication

### For Journalists
- **Journalist Dashboard**: Special interface for professional journalists

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Firebase account
- Modern web browser

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/young-journalists.git
cd young-journalists
```

2. Install dependencies
```bash
npm install
```

3. Set up Firebase
- Create a Firebase project
- Enable Authentication and Firestore
- Add your Firebase configuration to the project

4. Start the server
```bash
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project
2. Enable Email/Password authentication
3. Set up Firestore database
4. Update the Firebase configuration in `public/js/firebase-config.js`

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

## 📁 Project Structure

```
young-journalists/
├── public/
│   ├── css/
│   ├── js/
│   │   ├── firebase-config.js
│   │   ├── parent-auth.js
│   │   └── ...
│   ├── views/
│   │   ├── index.html
│   │   ├── loginparent.html
│   │   ├── parent.html
│   │   └── ...
│   └── ...
├── server.js
├── package.json
└── README.md
```

## 🔐 Security Features

- Role-based authentication (Parent, Journalist, User)
- Secure password handling
- Protected routes
- Data validation
- Firebase security rules

## 🎨 Design

The platform features a modern, user-friendly interface with:
- Clean and intuitive navigation
- Responsive design for all devices
- Consistent color scheme and typography
- Engaging visual elements

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Firebase for backend services
- Tailwind CSS for styling
- All contributors and supporters of the project

## 📞 Support

For support, email support@youngjournalists.com or open an issue in the GitHub repository.

---

Made with ❤️ for young journalists everywhere 
