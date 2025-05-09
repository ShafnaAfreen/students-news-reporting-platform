import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
            apiKey: "##",
            authDomain: "##",
            projectId: "##",
            storageBucket: "##",
            messagingSenderId: "##",
            appId: "##",
            measurementId: "##",
        };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Register journalist
const registerJournalist = document.getElementById("registerJournalist");
if (registerJournalist) {
  registerJournalist.addEventListener("click", function(event) {
    event.preventDefault();
    const email = document.getElementById("journalistEmail").value;
    const password = document.getElementById("journalistPassword").value;
    const firstname = document.getElementById("journalistFirstname").value;
    const lastname = document.getElementById("journalistLastname").value;
    const organization = document.getElementById("organization").value;
    const experience = document.getElementById("experience").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Save journalist data to Firestore
        return setDoc(doc(db, "journalists", user.uid), {
          email: email,
          uid: user.uid,
          firstname: firstname,
          lastname: lastname,
          organization: organization,
          experience: experience,
          role: "journalist",
          createdAt: new Date()
        });
      })
      .then(() => {
        alert("Journalist account created successfully!");
        window.location.href = '/loginjournalist';
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  });
}

// Login journalist
const loginJournalist = document.getElementById("loginJournalist");
if (loginJournalist) {
  loginJournalist.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Check if user is a journalist
        return getDoc(doc(db, "journalists", user.uid))
          .then((doc) => {
            if (doc.exists() && doc.data().role === "journalist") {
              localStorage.setItem('loggedInJournalistId', user.uid);
              window.location.href = '/journalist';
            } else {
              throw new Error("Not authorized as a journalist");
            }
          });
      })
      .then(() => {
        alert("Login successful!");
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          alert("Login failed. Please check your email and password.");
        } else if (error.message === "Not authorized as a journalist") {
          alert("This account is not registered as a journalist.");
        } else {
          alert('Account does not exist');
        }
      });
  });
}

// Add this function
async function postAnnouncement() {
    const title = document.getElementById('announcementTitle').value.trim();
    const message = document.getElementById('announcementMessage').value.trim();
    
    if (!title || !message) {
        alert('Please fill in both title and message');
        return;
    }

    try {
        await addDoc(collection(db, 'announcements'), {
            title,
            message,
            timestamp: serverTimestamp(),
            authorId: auth.currentUser.uid,
            authorName: auth.currentUser.displayName || 'Anonymous'
        });

        document.getElementById('announcementTitle').value = '';
        document.getElementById('announcementMessage').value = '';
        alert('Announcement posted successfully!');
    } catch (error) {
        console.error('Error posting announcement:', error);
        alert('Failed to post announcement');
    }
}

// Add this event listener
document.getElementById('postAnnouncement').addEventListener('click', postAnnouncement);
