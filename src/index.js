let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
document.addEventListener('DOMContentLoaded', function(){
//MY CODE
const toyForm = document.querySelector('.add-toy-form');

//Build Toy Cards
function renderToy(toy){
let toyBox = document.getElementById('toy-collection');
    let toyCard = document.createElement('div')
    toyCard.className = 'card';
    const cardName = toy.toyName ? toy.toyName : toy.name; 
    toyCard.innerHTML = `
    <h2>${cardName}</h2>
    <img src="${toy.image}" class="toy-avatar"/>
    <p class="likes">${toy.likes}</p>
    <button class="like-btn" id="[${toy.id}]">Like ❤️</button>
    `
    toyCard.querySelector('.like-btn').addEventListener('click', function likeToy(){
      toy.likes+= 1
      toyCard.querySelector('.likes').textContent = toy.likes
      updateLikes(toy)
    })
//Attach Toy Card to DOM
toyBox.append(toyCard)
}
//MY CODE ^

// Fetch GET Request for existing toys
// document.addEventListener('DOMContentLoaded', function(){

  fetch('http://localhost:3000/toys')
    .then(function(response){
    return response.json(); 
})
    .then(function(data){
    data.forEach(toy => renderToy(toy))
})

//Fetch POST Request for new toys & prevent default form behavior
toyForm.addEventListener('submit', function(event){
  event.preventDefault();

const toyName = document.querySelector('[name="name"]').value; 
const image = document.querySelector('[name="image"]').value; 
const likes = 0; 

  let newToy = {
    toyName: toyName, 
    image: image, 
    likes: likes
  };

fetch('http://localhost:3000/toys',{
  method: 'POST', 
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newToy)
})
.then(function (response){
  return response.json();
}) 
.then(function(data){
 return renderToy(data) 
})
})

//Fetch PATCH Request for likes of all toys
function updateLikes(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method:'PATCH', 
    headers:{
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(toy)
  })
  .then(function(response){
    return response.json();
  })
  .then(function(toy){
    console.log(toy)
    return toy
  })
}

})