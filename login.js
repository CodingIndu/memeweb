import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBxdNmLs7VGgCXSInYr_8fLaAQ2_6Rwcpo",
  authDomain: "fir-login-9ac7b.firebaseapp.com",
  databaseURL: "https://fir-login-9ac7b-default-rtdb.firebaseio.com",
  projectId: "fir-login-9ac7b",
  storageBucket: "fir-login-9ac7b.appspot.com",
  messagingSenderId: "187730649914",
  appId: "1:187730649914:web:ac667ed8da9ab6ee6aa603",
  measurementId: "G-DM82VGBQJR",
};

const app = initializeApp(firebaseConfig);

import {
  getDatabase,
  ref,
  set,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

const db = getDatabase();

const username = document.getElementById("userInp");
const pass = document.getElementById("passInp");
const submit = document.getElementById("sub_btn");

function AuthinticateUser() {
  const dbRef = ref(db);

  get(child(dbRef, "UsersList/" + username.value)).then((snapshot) => {
    if (snapshot.exists()) {
      let dbpass = decPass(snapshot.val().password);
      if (dbpass == pass.value) {
        login(snapshot.val());
      } else {
        alert("-User does not exsit\n-Check your Password and Username");
      }
    } else {
      set(ref(db, "UsersList/" + username.value), {
        fullname: name.value,
        email: email.value,
        username: username.value,
        password: encPass(),
      })
        .then(() => {
          alert("User added succesfully");
        })
        .catch((error) => {
          alert("error" + error);
        });
    }
  });
}

function decPass(dbpass) {
  var pass12 = CryptoJS.AES.decrypt(dbpass, pass.value);
  return pass12.toString(CryptoJS.enc.Utf8);
}

function login(user) {
  let keepLoggedIn = document.getElementById("flexSwitchCheckChecked").checked;

  if (!keepLoggedIn) {
    sessionStorage.setItem("user", JSON.stringify(user));
    window.location = "home.html";
  } else {
    localStorage.setItem("keepLoggedIn", "yes");
    localStorage.setItem("user", JSON.stringify(user));
    window.location = "home.html";
  }
}

submit.addEventListener("click", AuthinticateUser);
