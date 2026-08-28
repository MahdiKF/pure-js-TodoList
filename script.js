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
    checkUI();
  }

  const li = document.createElement("li");
  li.className = "list-item";
  li.textContent = newItem;

  const icon = document.createElement("i");
  icon.className = "bi bi-x fs-5 text-danger";

  li.appendChild(icon);
  itemList.appendChild(li);

  itemInput.value = "";
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
  }else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

// Event Listener

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", onClickItem);
clearBtn.addEventListener("click", onClickClear);


checkUI();
