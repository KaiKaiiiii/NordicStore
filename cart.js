window.addEventListener("load", () => {
  function cartQuantity() {
    const cartQty = document.querySelector(".cart-qty");
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart == null) cart = [];
    const total = cart.reduce((total, current) => {
      return (total += current.qty);
    }, 0);
    console.log(cartQty);
    cartQty.innerHTML = total;
  }
  cartQuantity();

  //RENDER TỪ LOCALSTORAGE
  function renderCart() {
    const cartList = document.querySelector(".cart-list");

    //getItem
    const cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach((item) => {
      const template = `  <div id=${
        item.id
      } class="cart-item flex justify-between items-center mb-4  border-b-2 pb-4">
        <div class="w-28 h-28 border-1 rounded-full border-black">
          <img
            class="w-full h-full object-cover rounded-full"
            src="${item.image}"
            alt=""
          />
        </div>
        <h3 class="w-80">${item.title}</h3>
        <div class="flex items-center justify-between">
        <img class="w-4 h-4 icon-decrease cursor-pointer" src="https://img.icons8.com/material-outlined/50/000000/minus.png"/>

        <input class="item-qty w-8 text-center text-2xl pointer-events-none" type="text" value="${
          item.qty
        }" />
        <img class="w-4 h-4 icon-increase cursor-pointer" src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/50/000000/external-plus-user-interface-tanah-basah-glyph-tanah-basah-2.png"/>
        </div>
        <span>$${item.price * item.qty}</span>
        <svg class="text-xl svg-icon" viewBox="0 0 20 20">
          <path
            fill="none"
            d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
          ></path>
        </svg>
      </div>`;
      cartList.insertAdjacentHTML("afterbegin", template);
    });
    document.querySelector(".icon-decrease").addEventListener("click", () => {
      // alert(document.querySelector(".item-qty"));
    });

    // //handleChangeQty
    // const iconDecrease = document.querySelectorAll(".icon-decrease");
    // const iconIncrease = document.querySelectorAll(".icon-increase");
    // const itemQty = document.querySelectorAll(".item-qty");
    // console.log(itemQty);

    // //handleDecrease
    // iconDecrease.forEach((item) => {
    //   item.addEventListener("click", handleDecrease);
    // });
    // function handleDecrease(e) {
    //   const currentId = e.target.parentNode.parentNode.id;
    //   const currentItem = document.querySelector(`#${currentId}`);
    //   const itemQty = currentItem.querySelector(".item-qty");
    //   console.log(currentItem);
    //   itemQty.value--;
    // }
  }

  (function start() {
    renderCart();
  })();
});
