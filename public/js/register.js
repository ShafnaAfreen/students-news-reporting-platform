
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
  import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
  import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

  
  // ✅ Your Firebase config goes here
  const firebaseConfig = {
            apiKey: "##",
            authDomain: "##",
            projectId: "##",
            storageBucket: "##",
            messagingSenderId: "##",
            appId: "##",
            measurementId: "##",
        };
  
  // ✅ Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  // ✅ Register user

  const logsubmit = document.getElementById("logsubmit");
  
  const submit = document.getElementById("submit");
  submit.addEventListener("click", function(event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const firstname = document.getElementById("firstname").value;
      const lastname = document.getElementById("lastname").value;
      const dob = document.getElementById("dob").value;
      createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Save user data to Firestore
      return setDoc(doc(db, "users", user.uid), {
        email: email,
        uid: user.uid,
        firstname: firstname,
        lastname: lastname,
        dob: dob
      });
    })
    .then(() => {
      alert("User created successfully!");
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

 logsubmit.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('loginEmail').value;
    const password=document.getElementById('loginPassword').value;


    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        alert("Login successful!");
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='/user';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            alert("Login failed. Please check your email and password.");
        }
        else{
            alert('Account does not Exist');
        }
    })
 })
