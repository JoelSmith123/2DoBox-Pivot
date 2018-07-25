document.addEventListener("DOMContentLoaded", refreshPage);
document.querySelector('.save-btn').addEventListener('click', appendList);
document.querySelector('.user-search-input').addEventListener('keyup', filterNames);
document.querySelector('.bottom-box').addEventListener('click', deleteItem);
document.querySelector('.bottom-box').addEventListener('click', changeQualityUpVote);
document.querySelector('.bottom-box').addEventListener('click', changeQualityDwnVote);
document.querySelector('.user-title-input').addEventListener('keyup', enterDisable);
document.querySelector('.user-body-input').addEventListener('keyup', enterDisable);
document.querySelector('.bottom-box').addEventListener('keyup', function(e) {
  var key = e.which || e.keyCode;
  if (key === 13){
    editIdea(e);
  }
});

function Idea(id, title, idea, quality) {
  this.id = id;
  this.title = title;
  this.idea = idea;
  this.quality = 'none';
}

function appendList(e)  {
    e.preventDefault();
    var ideaId = Date.now();
    var ideaTitle = document.querySelector('.user-title-input').value;
    var ideaBody = document.querySelector('.user-body-input').value;
    var newIdea = document.querySelector('.bottom-box');
        addNewCard(ideaId, ideaTitle, ideaBody)
    }

function addNewCard(ideaId, ideaTitle, ideaBody, quality='none'){
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
         <hr>
        </div>`
        saveIdea(ideaId, ideaTitle, ideaBody, quality='none');
        newIdea.appendChild(newDiv);
        clearOut();
        enterDisable();
}

function saveIdea(ideaId, ideaTitle, ideaBody, quality='none') {
  var idea = new Idea(ideaId, ideaTitle, ideaBody, quality='none'); 
    localStorage.setItem(`${idea.id}`, JSON.stringify(idea));
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
  document.querySelector('form').reset();
}

function filterNames() {
  var filterInput = document.querySelector('.user-search-input');
  var filterValue = filterInput.value;
  var section = document.querySelector('.bottom-box');
  if (filterValue === "") {
    $(".card-container").show();
  } else {
    $("h2.title-of-card:not(\":contains(" + filterValue + ")\")").parent().hide();
    $("p.body-of-card:not(\":contains(" + filterValue + ")\")").parent().hide();
    $("h2.title-of-card:contains(" + filterValue + ")").parent().show();
    $("p.body-of-card:contains(" + filterValue + ")").parent().show();
  };
};

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
   if (cardObj.quality === 'none') {
     cardObj.quality = 'low';
     localStorage.setItem(key, JSON.stringify(cardObj));
     event.target.parentNode.children[5].childNodes[0].innerText = 'quality: low';
   } else if (cardObj.quality === 'low'){
     cardObj.quality = "normal";
     localStorage.setItem(key, JSON.stringify(cardObj));
     event.target.parentNode.children[5].childNodes[0].innerText = 'quality: normal';
   } else if  (cardObj.quality === 'normal'){
     cardObj.quality = "high";
     localStorage.setItem(key, JSON.stringify(cardObj));
     event.target.parentNode.children[5].childNodes[0].innerText = 'quality: high';
   } else if  (cardObj.quality === 'high'){
     cardObj.quality = "critical";
     localStorage.setItem(key, JSON.stringify(cardObj));
     event.target.parentNode.children[5].childNodes[0].innerText = 'quality: critical';
   }
 }
}

function changeQualityDwnVote(event) {
 if (event.target.className === 'downvote') {
   var key = event.path[1].dataset.name;
   var cardObj = JSON.parse(localStorage.getItem(key));
   if (cardObj.quality === 'critical') {
     cardObj.quality = 'high';
     localStorage.setItem(key, JSON.stringify(cardObj));
     event.target.parentNode.children[5].childNodes[0].innerText = 'quality: high';
   }  else if (cardObj.quality === 'high') {
     cardObj.quality = 'normal';
     localStorage.setItem(key, JSON.stringify(cardObj));
     event.target.parentNode.children[5].childNodes[0].innerText = 'quality: normal';
   } else if (cardObj.quality === 'normal') {
     cardObj.quality = 'low';
     localStorage.setItem(key, JSON.stringify(cardObj));
     event.target.parentNode.children[5].childNodes[0].innerText = 'quality: low';
   } else if (cardObj.quality === 'low') {
     cardObj.quality = 'none';
     localStorage.setItem(key, JSON.stringify(cardObj));
     event.target.parentNode.children[5].childNodes[0].innerText = 'quality: none';
   }
 }
}

function enterDisable() {
 var saveBtn = document.querySelector('.save-btn');
 if (document.querySelector('.user-title-input').value
     && document.querySelector('.user-body-input').value) {
      saveBtn.disabled = false;
  } else {
   saveBtn.disabled = true;
 }  

}

$('.bottom-link').click(function () {
  $("html, body").animate({scrollTop: 0}, 1000);
})  

