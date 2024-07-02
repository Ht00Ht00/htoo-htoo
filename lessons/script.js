const newMenuBtn = document.querySelector(".new-menu");
const addEditMenuBtn = document.querySelector(".add-edit-menu-btn");
const modal = document.querySelector(".modal");
const menuForm = document.querySelector("#menu-form");
const menuContainer = document.querySelector(".menu-container");
let menus = [];
let currentMenuId = null;

newMenuBtn.addEventListener("click", () => {
  currentMenuId = null;
  addEditMenuBtn.innerText = "Add Menu";
  menuForm.reset();
  modal.style.display = "flex";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

addEditMenuBtn.addEventListener("click", () => {
  const fd = new FormData(menuForm);
  const existingMenu =
    currentMenuId !== null
      ? menus.find((menu) => menu.id === currentMenuId)
      : null;

  const getImage = () => {
    if (existingMenu) {
      return existingMenu.image;
    } else if (fd.get("image")) {
      return URL.createObjectURL(fd.get("image"));
    }
    return null;
  };

  const menu = {
    id: currentMenuId ? currentMenuId : menus.length + 1,
    name: fd.get("name"),
    price: Number(fd.get("price")),
    isAvailable: fd.get("isAvailable") ? true : false,
    image: getImage(),
  };
  if (currentMenuId) {
    menus = menus.map((item) => (item.id === currentMenuId ? menu : item));
  } else {
    menus.push(menu);
  }
  modal.style.display = "none";
  showMenu();
});

const showMenu = () => {
  menuContainer.innerHTML = "";
  menus.forEach((menu) => {
    const menuCard = document.createElement("div");
    menuCard.classList.add("menu-card");
    menuCard.innerHTML = `
        <div class="menu-card-header">
            <h3>${menu.name}</h3>
            <p>${menu.price}</p>
        </div>
        <div class="menu-card-body">
            <img src="${menu.image}" alt="menu-image" width="300">
        </div>
        <div class="menu-card-footer mt-2">
            <button class="btn btn-primary edit-menu-btn" data-id="${menu.id}">Edit</button>
            <button class="btn btn-primary delete-menu-btn" data-id="${menu.id}">Delete</button>
        </div>
        `;
    menuContainer.appendChild(menuCard);
  });

  // Add event listeners for edit and delete buttons
  document.querySelectorAll(".edit-menu-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      currentMenuId = Number(event.target.dataset.id);
      const menu = menus.find((menu) => menu.id === currentMenuId);
      menuForm.name.value = menu.name;
      menuForm.price.value = menu.price;
      menuForm.isAvailable.checked = menu.isAvailable;
      addEditMenuBtn.innerText = "Update Menu";
      modal.style.display = "flex";
    });
  });

  document.querySelectorAll(".delete-menu-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const menuId = Number(e.target.dataset.id);
      menus = menus.filter((menu) => menu.id !== menuId);
      showMenu();
    });
  });
};