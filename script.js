const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

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
