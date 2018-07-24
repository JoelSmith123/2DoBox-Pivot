// ===============================================
// GLOBAL VARIABLES
// ===============================================



// ===============================================
// EVENT LISTENERS
// ===============================================
document.addEventListener("DOMContentLoaded", refreshPage);
document.querySelector('.save-btn').addEventListener('click', appendList);
document.querySelector('.user-search-input').addEventListener('keyup', filterNames);
document.querySelector('.bottom-box').addEventListener('click', deleteItem);
document.querySelector('.bottom-box').addEventListener('click', changeQualityUpVote);
document.querySelector('.bottom-box').addEventListener('click', changeQualityDwnVote);

document.querySelector('.bottom-box').addEventListener('keyup', function(e) {
  var key = e.which || e.keyCode;
  if (key === 13){
    editIdea(e);
  }
});

// ===============================================
// FUNCTIONS
// ===============================================
function Idea(id, title, idea, quality) {
  this.id = id;
  this.title = title;
  this.idea = idea;
  this.quality = 'swill';
}

function appendList(e)  {
    e.preventDefault();
    var ideaId = Date.now();
    var ideaTitle = document.querySelector('.user-title-input').value;
    var ideaBody = document.querySelector('.user-body-input').value;
    var newIdea = document.querySelector('.bottom-box');
        addNewCard(ideaId, ideaTitle, ideaBody)
    }

function addNewCard(ideaId, ideaTitle, ideaBody, quality='swill'){
  var newDiv = document.createElement('div');
  var newIdea = document.querySelector('.bottom-box');
  newDiv.innerHTML =
        `<div class="card-container" data-name=${ideaId}>
         <h2 class="title-of-card" contenteditable >${ideaTitle}</h2>
         <button class="delete-button"></button>
         <p class="body-of-card" contenteditable>${ideaBody}</p>
         <button class="upvote"></button>
         <button class="downvote"></button>
         <span class="quality"><p class="quality quality-text">quality:${quality}</p></span>
         <button class="completed">completed</button>
         <hr>
        </div>`
        saveIdea(ideaId, ideaTitle, ideaBody, quality='swill');
        newIdea.appendChild(newDiv);
}

function saveIdea(ideaId, ideaTitle, ideaBody, quality='swill') {
  var idea = new Idea(ideaId, ideaTitle, ideaBody, quality='swill'); 
    localStorage.setItem(`${idea.id}`, JSON.stringify(idea));
    clearOut();
  }

function deleteItem(e) {
    if (e.target.className === 'delete-button') {
        e.target.parentNode.parentNode.remove(document.querySelector('.card-container'));
        removeFromStorage(e)
    } 
};

function removeFromStorage (eventObj) {
  cardId = eventObj.path[1].attributes[1].nodeValue;
  console.log(cardId);
  for(var key in window.localStorage){
  if (key === cardId){
    localStorage.removeItem(key);
  }
 }
}

function clearOut() {
  var ideaTitle = document.querySelector('.user-title-input').value;
  var ideaBody = document.querySelector('.user-body-input').value;
  ideaTitle.value = '';
  ideaBody.value = '';
}

function filterNames() {
  var filterInput = document.querySelector('.user-search-input');
  var filterValue = filterInput.value.toUpperCase();
  var section = document.querySelector('.bottom-box');
  var card = section.querySelectorAll('.card-container');
  for (var i = 0; i < card.length; i++) {
    var title = card[i].getElementsByTagName('h2')[0];
    if (title.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      card[i].style.display = '';      
    } else {
        card[i].style.display = 'none';
      }
    }
}

function editIdea(e) {
  var elementId = $(e.target).parent().data('name');
  var ideaBody = $(e.target).parent().find('p').text(); 
  var ideaTitle = $(e.target).parent().find('h2').text();
  saveIdea(elementId, ideaTitle, ideaBody);
}

function refreshPage() {
  if (localStorage.length > 0){
    for(var key in localStorage){
      idea = JSON.parse(localStorage.getItem(key))
      addNewCard(idea.id, idea.title, idea.idea, idea.quality);
    }
  }
}; 

function changeQualityUpVote(event) {
  if (event.target.className === 'upvote') {
    var key = event.path[1].dataset.name;
    var cardObj = JSON.parse(localStorage.getItem(key));
    if (cardObj.quality === 'swill') {
      cardObj.quality = 'plausible';
      localStorage.setItem(key, JSON.stringify(cardObj));
      event.target.parentNode.children[5].childNodes[0].innerText = 'quality: plausible';
    } else if (cardObj.quality === 'plausible'){
      cardObj.quality = "genuis";
      localStorage.setItem(key, JSON.stringify(cardObj));
      event.target.parentNode.children[5].childNodes[0].innerText = 'quality: genuis';
    }
  }
}

function changeQualityDwnVote(event) {
  if (event.target.className === 'downvote') {
    var key = event.path[1].dataset.name;
    var cardObj = JSON.parse(localStorage.getItem(key));
    if (cardObj.quality === 'genuis') {
      cardObj.quality = 'plausible';
      localStorage.setItem(key, JSON.stringify(cardObj));
      event.target.parentNode.children[5].childNodes[0].innerText = 'quality: plausible';
    }  else if (cardObj.quality === 'plausible') {
      cardObj.quality = 'swill';
      localStorage.setItem(key, JSON.stringify(cardObj));
      event.target.parentNode.children[5].childNodes[0].innerText = 'quality: swill';
    } 
  }
}   


    // document.querySelector('.bottom-box').addEventListener('click', strikeOut);

// document.querySelector('.completed').addEventListener('click', function(){
// if(event.target.className === 'user-title-input'){
//     event.target.setAttribute('class','strike')
// }})

// });

// function greyOut() {
//     if (event.target.className === 'title-of-card' || event.target.className === 'greyed title-of-card') {
//         // event.target.parentNode.classList.toggle('read-button')
//         event.target.classList.toggle('new-button')
//     }
// }
// function myFunction() {
//     var str = "Hello World!";
//     var result = str.strike();
//     document.getElementById("demo").innerHTML = result;
// }

// function strikeOut(e) {
//   e.preventDefault
//   if (e.target.className === 'completed'){
//   var body = document.querySelector('.body-of-card')
//   var title = document.querySelector('.title-of-card')
//   var strike = body.strike();
//   var strike2 = title.strike();
//   // document.querySelector('.body-of-card').innerHTML = strike;
//   // document.querySelector('.title-of-card').innerHTML = strike2;
//   }
// }
