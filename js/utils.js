// select dom elements
let selectElement = (selector, parent = document) => {
  return parent.querySelector(selector);
};

// Create DOM elements
let createElement = (elementName) => {
  return document.createElement(elementName);
};
