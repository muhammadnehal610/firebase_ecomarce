import {
  auth,
  storage,
  db,
  onAuthStateChanged,
  signOut,
  doc,
  getDoc,
  getDocs,
  collection,
} from "../utils/utils.js";

console.log(auth);
// console.log(storage);
// console.log(db);

const phone_num = document.getElementById("phone_num");
const user_email = document.getElementById("user_email");
const product_container = document.getElementById("product_container");

getAllProduct();
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

function getUserInfo(uid) {
  const userRef = doc(db, "users", uid);
  getDoc(userRef).then((data) => {
    console.log(data.data());

    phone_num.innerText = data.data().phone;
    user_email.innerText = data.data().email;
  });
}

async function getAllProduct() {
  try {
    const querySnapshot = await getDocs(collection(db, "product"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);

      const product = doc.data();
      console.log(product);

      const cards = `   <div class="swiper-slide">
              <div
                class="z-1 position-absolute rounded-3 m-3 px-3 border border-dark-subtle"
              >
                New
              </div>
              <div class="card position-relative">
                <a href=""
                  ><img
                    src="${product.order_img}"
                    class="img-fluid rounded-4"
                    alt="image"
                /></a>
                <div class="card-body p-0">
                  <a href="single-product.html">
                    <h3 class="card-title pt-4 m-0">${product.order_title}</h3>
                  </a>

                  <div class="card-text">
                    <span class="rating secondary-font">
                      <iconify-icon
                        icon="clarity:star-solid"
                        class="text-primary"
                      ></iconify-icon>
                      <iconify-icon
                        icon="clarity:star-solid"
                        class="text-primary"
                      ></iconify-icon>
                      <iconify-icon
                        icon="clarity:star-solid"
                        class="text-primary"
                      ></iconify-icon>
                      <iconify-icon
                        icon="clarity:star-solid"
                        class="text-primary"
                      ></iconify-icon>
                      <iconify-icon
                        icon="clarity:star-solid"
                        class="text-primary"
                      ></iconify-icon>
                      5.0</span
                    >

                    <h3 class="secondary-font text-primary">$${product.order_price}</h3>

                    <div class="d-flex flex-wrap mt-3">
                      <a href="#" class="btn-cart me-3 px-4 pt-3 pb-3">
                        <h5 class="text-uppercase m-0">Add to Cart</h5>
                      </a>
                      <a href="#" class="btn-wishlist px-4 pt-3">
                        <iconify-icon
                          icon="fluent:heart-28-filled"
                          class="fs-5"
                        ></iconify-icon>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;

      product_container.innerHTML += cards;
    });
  } catch (err) {
    alert(err);
  }
}
