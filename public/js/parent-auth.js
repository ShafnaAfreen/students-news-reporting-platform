import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC2lO2AyIpEKgjoj5CQuj8UMdPjGliaX24",
  authDomain: "news-bd220.firebaseapp.com",
  projectId: "news-bd220",
  storageBucket: "news-bd220.firebasestorage.app",
  messagingSenderId: "525183379799",
  appId: "1:525183379799:web:388bb092f0e2ef11943612",
  measurementId: "G-XYVYNB6C63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Register journalist
const registerJournalist = document.getElementById("parentregister");
if (registerJournalist) {
  registerJournalist.addEventListener("click", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const childName = document.getElementById("childName").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Save journalist data to Firestore
        return setDoc(doc(db, "parents", user.uid), {
          email: email,
          uid: user.uid,
          firstname: firstname,
          lastname: lastname,
          role: "parent",
          childName: childName,
          createdAt: new Date()
        });
      })
      .then(() => {
        alert("Parent account created successfully!");
        window.location.href = '/loginparent';
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  });
}

// Login journalist
const loginJournalist = document.getElementById("parentlogin");
if (loginJournalist) {
  loginJournalist.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Check if user is a journalist
        return getDoc(doc(db, "parents", user.uid))
          .then((doc) => {
            if (doc.exists() && doc.data().role === "parent") {
              localStorage.setItem('loggedInParentId', user.uid);
              window.location.href = '/parent';
            } else {
              throw new Error("Not authorized as a parent");
            }
          });
      })
      .then(() => {
        alert("Login successful!");
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          alert("Login failed. Please check your email and password.");
        } else if (error.message === "Not authorized as a parent") {
          alert("This account is not registered as a parent.");
        } else {
          alert('Account does not exist');
        }
      });
  });
}

// Login form handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Check if user is a parent
        const userDoc = await getDoc(doc(db, 'parents', user.uid));
        if (userDoc.exists() && userDoc.data().role === 'parent') {
            localStorage.setItem('loggedInParentId', user.uid);
            window.location.href = '/parent';
        } else {
            alert('This account is not registered as a parent. Please use the correct login page.');
            await auth.signOut();
        }
    } catch (error) {
        console.error('Login error:', error);
        if (error.code === 'auth/invalid-credential') {
            alert('Invalid email or password. Please try again.');
        } else if (error.code === 'auth/user-not-found') {
            alert('No account found with this email. Please register first.');
        } else {
            alert('Login failed: ' + error.message);
        }
    }
});

// Register form handler
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const childName = document.getElementById('childName').value;

    try {
        // Create the user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save additional user data to Firestore
        await setDoc(doc(db, 'parents', user.uid), {
            firstName,
            lastName,
            childName,
            email,
            role: 'parent',
            createdAt: new Date().toISOString()
        });

        // Show success message and switch to login tab
        document.getElementById('successMsg').classList.remove('hidden');
        document.getElementById('registerForm').reset();
        document.getElementById('loginTab').click();
    } catch (error) {
        console.error('Registration error:', error);
        if (error.code === 'auth/email-already-in-use') {
            alert('This email is already registered. Please use a different email or login.');
        } else if (error.code === 'auth/weak-password') {
            alert('Password is too weak. Please use a stronger password.');
        } else {
            alert('Registration failed: ' + error.message);
        }
    }
});
