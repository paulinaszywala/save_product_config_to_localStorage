// URL of the store the script was written for: https://www.tophifi.pl/

//  function responsible for saving product's configuration and saving it to localStorage
function saveProductToLocalStorage() {
  // DOM elements we need an access to
  const productComponent = document.querySelector(".product-info-main");
  const specificationComponent = document.querySelector("#product-attribute-specs-table");
  const imageContainer = document.querySelector(".fotorama__stage");

  // create an object storing product's config
  const product = {
    // get current page's URL
    productURL: window.location.href,
    productName: productComponent.querySelector(".page-title")?.textContent || "", // empty string in order to prevent errors
    productPrice: productComponent.querySelector(".price")?.textContent || "",
    productBrand: productComponent.querySelector(".product-brand")?.textContent || "",
    productCategory: productComponent.querySelector(".product-category")?.textContent || "",
    productSpecification: [],
    productImages: [],
  };

  // in order to store specification data correctly, we separate the table available on https://www.tophifi.pl/ into
  // labels and data
  const specificationLabels = specificationComponent.querySelectorAll("th") || "";
  const specificationData = specificationComponent.querySelectorAll("td") || "";


  // merge specification data, display it as "label: data"
  if (specificationLabels.length === specificationData.length) {
    for (let i = 0; i < specificationLabels.length; i++) {
      const label = specificationLabels[i];
      const data = specificationData[i];

      // push merged data to productSpecification array of product object
      product.productSpecification.push(label.textContent + ": " + data.textContent);
    }
  }

  // in case more images were displayed on the webpage, store all product's images (all angles)
  const imageElements = imageContainer.querySelectorAll(".fotorama__img") || "";

  
  // push possible images to productImages array of product object
  imageElements.forEach((element) => {product.productImages.push(element.src);});

  // check if localStorage contains an existing object storing viewedProducts
  let viewedProducts = JSON.parse(localStorage.getItem("viewedProducts")) || [];

  // add viewed product
  viewedProducts.push(product);

  // save viewedProducts array to localStorage
  localStorage.setItem("viewedProducts", JSON.stringify(viewedProducts));
}

// run 
saveProductToLocalStorage();

// ADDITIONAL
// log to consol in order to check if products in localStorage are stored correctly

const storedProducts = JSON.parse(localStorage.getItem("viewedProducts"));

console.log(storedProducts);
