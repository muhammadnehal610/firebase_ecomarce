import {
  auth,
  storage,
  db,
  onAuthStateChanged,
  signOut,
  doc,
  getDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  addDoc,
  collection,
} from "../utils/utils.js";
console.log(auth);
// console.log(storage);
// console.log(db);

const log_out = document.getElementById("log_out");
const user_img = document.getElementById("user_img");
const phone_num = document.getElementById("phone_num");
const user_email = document.getElementById("user_email");
const submit_btn = document.getElementById("submit_btn");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log("hellow");
    getUserInfo(uid);
    // ...
  } else {
    window.location.href = `../auth/signin/index.html`;
  }
});
log_out.addEventListener("click", () => {
  signOut(auth);
});

function getUserInfo(uid) {
  const userRef = doc(db, "users", uid);
  getDoc(userRef).then((data) => {
    console.log(data.data());
    user_img.src = data.data().img;
    // phone_num.innerText = data.data().phone;
    // user_email.innerText = data.data().email;
  });
}

const order_form = document.getElementById("order_form");
order_form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(e.target[0]);
  const order_img = e.target[0].files[0];
  const order_title = e.target[1].value;
  const order_price = e.target[2].value;
  const order_catagery = e.target[3].value;

  const order_obj = {
    order_img,
    order_title,
    order_price,
    order_catagery,
  };
  console.log(order_obj);

  const orderRef = ref(storage, order_obj.order_img.name);

  submit_btn.innerHTML = `<button class="btn btn-primary" type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>`;
  uploadBytes(orderRef, order_obj)
    .then(() => {
      console.log("img upload ho gai");

      getDownloadURL(orderRef)
        .then((url) => {
          console.log("url bhi aa gya", url);
          order_obj.order_img = url;

          const orderCollection = collection(db, "product");
          addDoc(orderCollection, order_obj)
            .then((spanshot) => {
              console.log("snapshot aa gya");
              window.location.href = "/";
            })
            .catch(() => {
              console.log("snapshot nhi arha");
              submit_btn.innerHTML = `  <button
                      type="submit"
                      id="submit_btn"
                      class="btn btn-dark btn-lg rounded-1 text-white"
                    >`;
            });
        })
        .catch((err) => {
          console.log("url nhi aarha");
          submit_btn.innerHTML = `  <button
          type="submit"
          id="submit_btn"
          class="btn btn-dark btn-lg rounded-1 text-white"
        >`;
        });
    })
    .catch(() => {
      console.log("img upload nhi ho rhi");
      submit_btn.innerHTML = `  <button
      type="submit"
      id="submit_btn"
      class="btn btn-dark btn-lg rounded-1 text-white" 
    >`;
    });
});
