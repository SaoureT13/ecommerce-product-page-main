const navBar = document.querySelector(".nav");
const btnBurger = document.querySelectorAll(".burger");
const previousBtn = document.querySelectorAll(".previous");
const nextBtn = document.querySelectorAll(".next");
const listImgBox = document.querySelectorAll(".img-box");
const modalTrigger = document.querySelectorAll(".modal-trigger");
const modal = document.querySelector(".light-box");
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const quantity = document.querySelector(".qty");
const btnAdd = document.querySelector(".btn-add");
const Recap = document.querySelector(".cartRecap empty");

//Ajout au panier
// let productName;
// let productDescription;
// let productReduction;
// let productPrice;
// let productImg

let listImg = [];
let thumbnailList = [];
let qty = 0;

function handleScreenSizeChange(matches) {
  const [visibleIndex, hiddenIndex] = matches ? [0, 1] : [1, 0];

  listImgBox[visibleIndex].classList.add("visible");
  listImgBox[hiddenIndex].classList.remove("visible");

  listImgBox.forEach((box) => {
    if (box.classList.contains("visible")) {
      listImg = box.querySelector(".product-box").querySelectorAll("img");
      thumbnailList = box.querySelector(".thumbnail").querySelectorAll("img");
      box.querySelector(".thumbnail").classList.add("active");
    }
  });
}

function checkScreenSize() {
  const mediaQuery = window.matchMedia("(min-width: 780px)");

  // Vérifier la taille de l'écran au chargement de la page
  handleScreenSizeChange(mediaQuery.matches);

  // Ajouter un écouteur pour les changements de taille d'écran
  mediaQuery.addEventListener("change", (e) => {
    handleScreenSizeChange(e.matches);
  });
}

// Appeler la fonction au chargement de la page
checkScreenSize();

// Ajouter un écouteur pour le redimensionnement de la fenêtre
window.addEventListener("resize", checkScreenSize);

// listImgBox.forEach((box) => {
//   if(box.classList.contains("visible")){
//     console.log(box)
//   }
// });

const displayModal = () => {
  modal.classList.toggle("active");
  // listImgBox.forEach((box) => {
  //   box.classList.toggle("visible");
  //   if (box.classList.contains("visible")) {
  //     console.log(box)
  //   }
  // });
};
modalTrigger.forEach((elem) => {
  elem.addEventListener("click", displayModal);
});

thumbnailList.forEach((elem, j) => {
  elem.addEventListener("click", (e) => {
    thumbnailList.forEach((c) => {
      c.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    currentImg = j + 1;

    listImg.forEach((img, i) => {
      if (j === i) {
        img.classList.add("active");
      } else {
        img.classList.remove("active");
      }
    });
  });
});

let currentImg = 1;
previousBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentImg--;
    updateImg();
  });
});

nextBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentImg++;
    updateImg();
  });
});

function updateImg() {
  if (currentImg > listImg.length) {
    currentImg = 1;
  } else if (currentImg < 1) {
    currentImg = listImg.length;
  }

  listImg.forEach((img, i) => {
    if (i + 1 == currentImg) {
      img.classList.add("active");
    } else {
      img.classList.remove("active");
    }
  });

  thumbnailList.forEach((img, i) => {
    if (i + 1 == currentImg) {
      img.classList.add("active");
    } else {
      img.classList.remove("active");
    }
  });
}

const handleClick = () => {
  navBar.classList.toggle("active");
};
btnBurger.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});

minus.addEventListener("click", (e) => {
  if (qty <= 0) {
    qty = 0;
  } else {
    qty--;
  }
  quantity.textContent = qty;
});

plus.addEventListener("click", (e) => {
  qty++;
  quantity.textContent = qty;
});

let addInRecap = (e) => {
  e.preventDefault();

  let productName, productReduction, productPrice, productImg, truePrice = 0;
  debugger
  productName = document
    .querySelector(".product-name")
    .querySelector("h1").innerText;
  productReduction = document
    .querySelector(".product-price")
    .querySelector(".reduction").innerText;
  productPrice = document
    .querySelector(".product-price")
    .querySelector(".price").innerText;
  productImg = document.querySelector(".productImg").getAttribute("src"); 

  
  productPrice = parseFloat(productPrice.replace("$", ""));
  productReduction = parseFloat(productReduction.replace("$", ""));
  let reduc = (productPrice * productReduction) / 100

  if (qty === 0) {
    return;
  } else if (productReduction === 0) {
    truePrice = productPrice;
  } else {
    truePrice = reduc * qty;
  }

  addOnCart(productName, reduc, qty, truePrice, productImg)
};

function addOnCart(name, price, quantity, tr, image){
  

  recapTemplate.querySelector(".product-name").textContent = name
  recapTemplate.querySelector(".price").textContent = ""
  recapTemplate.querySelector(".price").textContent = `$${price}.00 x ${quantity}`
  recapTemplate.querySelector(".tl-price").textContent = ""
  recapTemplate.querySelector(".tl-price").textContent = 
  `$${tr}.00`
  recapTemplate.querySelector(".product-img").setAttribute("src", image)

  const parent = document.querySelector(".cartRecap")
  parent.classList.remove("empty")
  const nextSibling = parent.querySelector(".cartRecap_BtnValidation")

  parent.insertBefore(recapTemplate, nextSibling)
}

btnAdd.addEventListener("click", addInRecap);
