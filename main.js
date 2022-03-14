window.addEventListener("load", () => {
  const productContainer = document.querySelector(".product-container");
  const sortProduct = document.querySelector(".sort-product");
  const URL = "https://fakestoreapi.com/products";

  //FETCH URL
  function getProduct(callback) {
    fetch(URL)
      .then((res) => res.json())
      .then(callback);
  }

  //EVENT SORT PRICE
  const sortPrice = document.querySelector(".sort-price");
  sortPrice.addEventListener("change", handleSortPrice);
  function handleSortPrice() {
    productContainer.innerHTML = "";
    const sortValue = sortPrice.value;
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        const cart = data;
        if (sortValue === "0") {
          getProduct(renderProduct);
        }
        if (sortValue === "1") {
          renderProduct(
            cart.filter((item) => {
              return Math.floor(item.price) < 50;
            })
          );
        }
        if (sortValue === "2") {
          renderProduct(
            cart.filter((item) => {
              return Math.floor(item.price) > 50;
            })
          );
        }
        if (sortValue === "3") {
          renderProduct(
            cart.filter((item) => {
              return Math.floor(item.price) > 100;
            })
          );
        }
        if (sortValue === "4") {
          renderProduct(
            cart.filter((item) => {
              return Math.floor(item.price) > 500;
            })
          );
        }
      });
  }

  //EVENT SORT CATEGORY
  const sortCategory = document.querySelector(".sort-category");
  sortCategory.addEventListener("change", handleSortCategory);
  function handleSortCategory() {
    productContainer.innerHTML = "";
    const sortValue = sortCategory.value;
    if (sortValue === "0") {
      getProduct(renderProduct);
    }
    fetch(`${URL}/category/${sortValue}`)
      .then((res) => res.json())
      .then((data) => {
        const cart = data;
        sortProduct.addEventListener("change", handleSortProduct);
        renderProduct(cart);
      });
  }

  //EVENT SORT
  sortProduct.addEventListener("change", handleSortProduct);
  function handleSortProduct() {
    productContainer.innerHTML = "";
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        const cart = data;
        const sortValue = sortProduct.value;
        if (sortValue === "1") {
          cart.sort((a, b) => {
            return b.price - a.price;
          });
          renderProduct(cart);
        }
        if (sortValue === "2") {
          cart.sort((a, b) => {
            return a.price - b.price;
          });
          renderProduct(cart);
        }
        if (sortValue === "3") {
          cart.sort((a, b) => {
            return -a.title.toLowerCase().localeCompare(b.title.toLowerCase());
          });
          renderProduct(cart);
        }
        if (sortValue === "4") {
          cart.sort((a, b) => {
            return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
          });
          renderProduct(cart);
        }
      });
  }

  function renderProduct(products) {
    products.map((item) => {
      const productTemplate = `
        <div class="product-item w-full p-12"  id="${item.id}">
                <a href="#" class="">
                  <div class="w-auto h-80 ">
                  <img class=" hover:grow hover:shadow-lg w-full h-full object-cover"src="${item.image}"/></div>
                 <div class=" pt-3 flex items-center justify-between">
                    <p class="">${item.title}</p>
                   <button class="add-button  w-auto  border-2 p-1 hover:bg-gray-500 hover:text-white hover:border-0 hover:ease-in duration-300  value="">Add</button>
                  </div>
                  <p class=" pt-1 text-gray-900">${item.price} $</p>
                </a>
          </div>
        `;
      productContainer.insertAdjacentHTML("afterbegin", productTemplate);
    });
    //VIEW ITEM
    const productItem = document.querySelectorAll(".product-item");
    productItem.forEach((item) => {
      item.addEventListener("click", handleViewProductItem);
    });

    //FUNCTION VIEW ITEM
    function handleViewProductItem(e) {
      e.preventDefault();
      const currentId = e.currentTarget.id;
      const product = products.find((item) => {
        return item.id == currentId;
      });
      const template = ` <div class="pop-up-container container inset-0 fixed z-40">
      <div
        class="pop-up w-2/4 h-3/4 bg-white -10 absolute flex items-center justify-between p-4"
      >
        <div class="w-2/4 h-full">
          <img
            class="w-full h-full object-cover"
            src="${product.image}"
            alt=""
          />
        </div>
        <div class="p-4 h-full border-2 mx-4 flex flex-col justify-between w-1/2">
          <div class="h-1/2 flex flex-col items-left justify-between">
            <h3 class="text-2xl">${product.title}</h3>
            <div class="flex justify-between items-center">
              <span class="text-xl">${product.price} $</span>
              <button
                class="w-auto border-2 p-1 hover:bg-gray-500 hover:text-white hover:border-0 hover:ease-in duration-300"
              >
                Add to cart
              </button>
            </div>
          </div>
      <button class=" exit-button w-full justify-self-end	text-2xl">X</button>

        </div>

      </div>
    </div>`;
      document.body.insertAdjacentHTML("beforeend", template);
      const exitButton = document.querySelector(".exit-button");
      exitButton.addEventListener("click", (e) => {
        e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
          document.querySelector(".pop-up-container")
        );
      });
    }

    const addButton = document.querySelectorAll(".add-button");
    addButton.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const currentId = e.target.parentNode.parentNode.parentNode.id;

        //LOCALSTORAGE GET ITEM
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart == null) cart = [];

        //SET ITEM INTO CART
        let index = cart.findIndex((item) => {
          return item.id == currentId;
        });
        if (index == -1) {
          const product = products.find((product) => {
            return product.id == currentId;
          });
          let item = {
            id: currentId,
            title: product.title,
            image: product.image,
            qty: 1,
            price: product.price,
          };
          cart.push(item);
        } else {
          cart[index].qty++;
        }

        //LOCALSTORAGE SET ITEM
        localStorage.setItem("cart", JSON.stringify(cart));
      });
    });
  }

  //UPDATE QUANTITY
  function cartQuantity() {
    const cartQty = document.querySelector(".cart-qty");
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart == null) cart = [];
    const total = cart.reduce((total, current) => {
      return (total += current.qty);
    }, 0);
    cartQty.innerHTML = total;
  }

  function start() {
    getProduct(renderProduct);
    cartQuantity();
  }
  start();
});
