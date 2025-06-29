// ✅ Firebase compat version માટે યોગ્ય config
const firebaseConfig = {
  apiKey: "AIzaSyC3xHS2Za5to035x_Sd14RUeNY1k978yLw",
  authDomain: "men-s-kurta.firebaseapp.com",
  databaseURL: "https://men-s-kurta-default-rtdb.firebaseio.com",
  projectId: "men-s-kurta",
  storageBucket: "men-s-kurta.appspot.com",
  messagingSenderId: "11029697506",
  appId: "1:11029697506:web:b07393d4e49e29aa731fbb"
};

// ✅ compat Firebase libraries (compatible with GitHub Pages)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => window.location = "dashboard.html")
    .catch(err => alert(err.message));
}

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Signup successful! Now login."))
    .catch(err => alert(err.message));
}

function logout() {
  auth.signOut().then(() => window.location = "login.html");
}

function addProduct() {
  const photo = document.getElementById("photoURL").value;
  const price = document.getElementById("price").value;
  const newProductRef = db.ref("products").push();
  newProductRef.set({ photo, price });
}

if (document.getElementById("productList")) {
  db.ref("products").on("value", snapshot => {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    snapshot.forEach(child => {
      const data = child.val();
      productList.innerHTML += `
        <div style="border:1px solid #ccc;padding:10px;margin:10px;">
          <img src="${data.photo}" width="150"><br>
          <strong>Price:</strong> ₹${data.price}
        </div>
      `;
    });
  });
}
