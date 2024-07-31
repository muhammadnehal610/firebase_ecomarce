import { auth, signInWithEmailAndPassword } from "../../utils/utils.js";

const login_form = document.getElementById("login_form");
login_form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = e.target[0].value;
  const password = e.target[1].value;

  const userInfo = {
    email,
    password,
  };

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "../../product/index.html";
    })
    .catch((err) => {
      alert(err);
    });
  //   creat account
  console.log(userInfo);
});
