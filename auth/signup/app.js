import {
  auth,
  createUserWithEmailAndPassword,
  doc,
  storage,
  setDoc,
  ref,
  db,
  uploadBytes,
  getDownloadURL,
} from "../../utils/utils.js";

const signup_form = document.getElementById("signup_form");
const submit_btn = document.getElementById("submit_btn");
signup_form.addEventListener("submit", function (e) {
  e.preventDefault();
  const img = e.target[0].files[0];
  const first_name = e.target[1].value;
  const last_name = e.target[2].value;
  const email = e.target[3].value;
  const password = e.target[4].value;
  const phone = e.target[6].value;

  const userInfo = {
    img,
    first_name,
    last_name,
    email,
    password,
    phone,
  };

  //   creat account
  submit_btn.innerHTML = `<button class="btn btn-primary" type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>`;

  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(("user", user));

      //upload your image

      const userRef = ref(storage, `user/${user.user.uid}`);

      uploadBytes(userRef, img)
        .then(() => {
          console.log("user image uploaded");
          getDownloadURL(userRef)
            .then((url) => {
              console.log("url aa gya bhai", url);
              userInfo.img = url;
              const userDbRef = doc(db, "users", user.user.uid);

              setDoc(userDbRef, userInfo).then(() => {
                console.log("user obj updated into db");
                window.location.href = "../../product/index.html";
              });
            })
            .catch((err) => {
              console.log("url nhi aaya");
              submit_btn.innerHTML`  <button
                  type="submit"
                  id="submit_btn"
                  class="btn btn-dark btn-lg rounded-1"
                >
                  Register it now
                </button>`;
            });
        })
        .catch(() => {
          console.log("image upload nhi hui");
          submit_btn.innerHTML = `  <button
                  type="submit"
                  id="submit_btn"
                  class="btn btn-dark btn-lg rounded-1"
                >
                  Register it now
                </button>`;
        });
    })
    .catch((err) => {
      alert(err);
      submit_btn.innerHTML = `  <button
                  type="submit"
                  id="submit_btn"
                  class="btn btn-dark btn-lg rounded-1"
                >
                  Register it now
                </button>`;
    });
  console.log(userInfo);
});
