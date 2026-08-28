const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const inputInvalid = document.getElementById("input-invalid");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("items-clear");
const itemFilter = document.getElementById("filter");

function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;
  if (newItem === "") {
    inputInvalid.innerText = "please add an item";
    return;
  } else {
    inputInvalid.innerText = "";
  }
  addItemToDOM(newItem);

  addItemToStorage(newItem);

  itemInput.value = "";
  checkUI();
}

function addItemToDOM(item) {
  const li = document.createElement("li");
  li.className = "list-item";
  li.textContent = item;

  const icon = document.createElement("i");
  icon.className = "bi bi-x fs-5 text-danger";

  li.appendChild(icon);
  itemList.appendChild(li);
}

function addItemToStorage(item) {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    let itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  itemsFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function onClickItem(e) {
  if (e.target.classList.contains("bi-x")) {
    e.target.parentElement.remove();
    checkUI();
  }
}

function onClickClear() {
  itemList.innerHTML = "";
  checkUI();
}

function checkUI() {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}
// Event Listener

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", onClickItem);
clearBtn.addEventListener("click", onClickClear);
itemFilter.addEventListener("input", filterItems);

checkUI();
