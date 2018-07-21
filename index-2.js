function appendList(e)  {
    e.preventDefault();
    var ideaId = Date.now();
    var ideaTitle = document.querySelector('.user-title-input').value;
    var ideaBody = document.querySelector('.user-body-input').value;
    var newIdea = document.querySelector('.bottom-box');
    if (ideaTitle == 0 || ideaBody == 0) {
        newIdea.innerText = null
    } else {
        addNewCard(ideaId, ideaTitle, ideaBody)
    }
}

function addNewCard(ideaId, ideaTitle, ideaBody, quality='swill'){
  var ideaBody = document.querySelector('.user-body-input').value;
  var ideaTitle = document.querySelector('.user-title-input').value;
  var newDiv = document.createElement('div');
  var newIdea = document.querySelector('.bottom-box');
  newDiv.innerHTML =
        `<div class="card-container" data-name=${ideaId}>
         <h2 class="title-of-card" contenteditable >${ideaTitle}</h2>
         <button class="delete-button"></button>
         <p class="body-of-card" contenteditable>${ideaBody}</p>
         <button class="upvote"></button>
         <button class="downvote"></button>
         <span class="quality"><p>quality:${quality}</p></span>
         <hr>
        </div>`
        saveIdea(ideaTitle, ideaBody, ideaId);
        newIdea.appendChild(newDiv);
}

function deleteItem(e) {
  if (e.target.className === 'delete-button') {
    var cardId = e.path[3].attributes[1].value
    removeFromStorage(cardId)
    e.target.parentNode.parentNode.parentNode.remove(document.querySelector('.bottom-box'));
  }
}

function removeFromStorage(cardId){
  for(var key in localStorage){
    if(key == cardId){
      localStorage.removeItem(key)
    }
  }
}

function clearOut() {
  var ideaTitle = document.querySelector('.user-title-input').value;
  var ideaBody = document.querySelector('.user-body-input').value;
  ideaTitle.value = '';
  ideaBody.value = '';
}

function Idea(title, idea, id, quality) {
  this.title = title;
  this.idea = idea;
  this.id = id;
  this.quality = quality || 'swill';
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

function saveIdea(ideaTitle, ideaBody, ideaId) {
  var idea = new Idea(ideaTitle, ideaBody, ideaId);
  if (localStorage.getItem('idea') === null) {    
    localStorage.setItem(`${idea.id}`, JSON.stringify(idea));
    clearOut();
  }
}

function editIdea(e) {
  var elementId = $(e.target).parent().data('name');
  var ideaBody = $(e.target).parent().find('p').text(); 
  var ideaTitle = $(e.target).parent().find('h2').text();
  saveIdea(ideaTitle, ideaBody, elementId);
}

 document.addEventListener("DOMContentLoaded", function(){
  if (localStorage.length > 0){
  for(var key in localStorage){
      idea = JSON.parse(localStorage.getItem(key))
      addNewCard(idea.id, idea.title, idea.idea, idea.quality) 
   }
 }
 });

document.querySelector('.save-btn').addEventListener('click', appendList);
document.querySelector('.user-search-input').addEventListener('keyup', filterNames);
document.querySelector('.bottom-box').addEventListener('click', deleteItem);
document.querySelector('.bottom-box').addEventListener('keyup', function(e) {
  var key = e.which || e.keyCode;
  if (key === 13){
    editIdea(e);
  }
});

document.querySelector('.bottom-box').addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target.className === 'delete-button') {
        e.target.parentNode.parentNode.parentNode.remove(document.querySelector('ul'));
    } 
});

document.querySelector('.bottom-box').addEventListener('click', changeQualityUpVote)
document.querySelector('.bottom-box').addEventListener('click', changeQualityDwnVote)
function changeQualityUpVote() {
    if (event.target.className === 'up-pic' && quality === 'swill') {
    quality = "plausible";
    document.querySelector('.quality-btn').innerText = "quality: plausible";
  } else if (event.target.className === 'up-pic' && quality === 'plausible'){
    quality = "genuis";
    document.querySelector('.quality-btn').innerText = "quality: genuis";
  }
    }
function changeQualityDwnVote() {
 if (event.target.className === 'down-pic' && quality === 'genuis') {
    quality = "plausible";
    document.querySelector('.quality-btn').innerText = "quality: plausible";
  } else if (event.target.className === 'down-pic' && quality === 'plausible'){
    quality = "swill";
    document.querySelector('.quality-btn').innerText = "quality: swill";
  }
    }
