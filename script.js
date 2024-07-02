const NewMenuButton = document.querySelector('.btn');
const modal = document.querySelector('.modal');
const addeditmenubtn = document.querySelector('.add-edit-menu-btn');
const menuForm = document.querySelector('#menu-form');
const menuContainer = document.querySelector('.menu-container');

let menus = [];
let currentMenuId = null;
NewMenuButton.addEventListener('click',()=> {
    modal.style.display = 'flex'
    addeditmenubtn.innerText = 'Add Menu';
    menuForm.reset();
})

window.addEventListener('click',(event)=>{
    if(event.target=== modal){
        modal.style.display = 'none'
    }
})

addeditmenubtn.addEventListener('click',()=>{
    menuContainer.innerHTML = ''
    const fd = new FormData (menuForm)
    const menu = {
        id: menus.length +1 ,
        name : fd.get ('name'),
        price : Number(fd.get ('price')),
        isAvailable: fd.get ('isAvailable') ? true : false,
        image: URL.createObjectURL(fd.get('image'))     
    }
    if(currentMenuId){
       menus = menus.map(item => item.id === currentMenuId ? menu : item) 
    }else{
        menus.push (menu);

    }
   modal.style.display = 'none'
   showMenu();
})

const showMenu = () =>{
    menus.forEach((menu)=>{
      menuContainer.innerHTML ='';
        const menuCard =document.createElement('div');
        menuCard.classList.add('menu-card');
        menuCard.innerHTML  = `
        <div class='menu-card-header'>
            <h3> ${menu.name}</h3>
            <p>${menu.price}</p>
        </div>
        <div class='menu-card-body'>
            <img src=${menu.image} alt ='menu-image' width='300'>
        </div>
       <div class="menu-card-footer mt-2">
            <button class="btn btn-primary edit-menu-btn" data-id="${menu.id}">Edit</button>
            <button class="btn btn-primary delete-menu-btn" data-id="${menu.id}">Delete</button>
        </div>
        `;
      menuContainer.appendChild (menuCard)  ;
    })
    document.querySelectorAll('.edit-menu-btn').forEach((button)=>{
        button.addEventListener('click',async(event)=>{
         currentMenuId = Number(event.target.dataset.id);
        const menu = menus.find((menu)=>menu.id === currentMenuId);
        menuForm.name.value = menu.name;
        menuForm.price.vale = menu.price;
        menuForm.isAvailable.checked = menu.isAvailable;
        addeditmenubtn.innerText = 'Update Menu';
        modal.style.display = 'flex';
        })
      })
      document.querySelectorAll(".delete-menu-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
          const menuId = Number(e.target.dataset.id);
          console.log(menuId)
          menus = menus.filter((menu) => menu.id !== menuId);
          showMenu();
        });
      });
      
}


