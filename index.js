function newCard(id, title, body, quality='swill'){ 
  event.preventDefault();
  var title = $('.user-title-input').val();
  this.title = title;
  var body = $('.user-body-input').val();
  var newIdea = $('.bottom-box');
  newIdea.append(
       `<div class="card-container" data-name=${id}>
         <h2 class="title-of-card" contenteditable >${title}</h2>
         <button class="delete-button"></button>
         <p class="body-of-card" contenteditable>${body}</p>
         <button class="upvote"></button>
         <button class="downvote"></button>
         <span class="quality"><p>quality:${quality}</p></span>
         <hr>
       </div>`)
  saveIdea(id, title, body, quality);
}

$('.save-btn').on('click', newCard);

function cardObject(id, title, body, quality) {
  this.id = newCard.id;
  this.title = newCard.title;
  this.body = newCard.body;
  this.quality = newCard.quality;
  console.log(this.title);
}

//pulls stored values from local storage, adds to the new cards NEEDS TO BE ADDED 
// function appendValue() {
//   $.each(localStorage, function(key) {
//       var numCards = 0;
//       var cardData = JSON.stringify(cardObject);
//       numCards++;
//       $( ".bottom-box" ).prepend(newCard(key, cardData.id, cardData.title, cardData.body, cardData.quality));
//   });
// };

// //stores values to local storage
// function localStoreCard() {
//   // var numCards = 0;
//    var cardString = JSON.stringify(cardObject());
//    localStorage.setItem('card' + numCards  , cardString);  
// }

function saveIdea(id, title, quality, body) {
  event.preventDefault();
  var cardObjectVar = cardObject();
  var card = new cardObject(id, title, body, quality);  
  localStorage.setItem('dog', JSON.stringify(cardObjectVar));
}

$('.bottom-box').on('click', changeQualityUpVote)
function changeQualityUpVote() {
  // var quality = newCard(quality);
  if (event.target.className === 'upvote' && quality === 'swill') {
   quality = "plausible";
   document.querySelector('.quality').innerText = "quality: plausible";
 } else if (event.target.className === 'upvote' && quality === 'plausible'){
   quality = "genius";
   document.querySelector('.quality').innerText = "quality: genius";
 }
   }

$('.bottom-box').on('click', changeQualityDwnVote)
function changeQualityDwnVote() {
if (event.target.className === 'downvote' && quality === 'genius') {
   quality = "plausible";
   document.querySelector('.quality').innerText = "quality: plausible";
 } else if (event.target.className === 'downvote' && quality === 'plausible'){
   quality = "swill";
   document.querySelector('.quality').innerText = "quality: swill";
 }
   }

// $(".bottom-box").on('click', function(event){
//     var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
//     var qualityVariable;

//     var cardHTML = $(event.target).closest('.card-container');
//     var cardHTMLId = cardHTML[0].id;
//     var cardObjectInJSON = localStorage.getItem(cardHTMLId);
//     var cardObjectInJS = JSON.parse(cardObjectInJSON);

//     cardObjectInJS.quality = qualityVariable;

//     var newCardJSON = JSON.stringify(cardObjectInJS);
//     localStorage.setItem(cardHTMLId, newCardJSON);
//     }
   
//     else if (event.target.className === "delete-button") {
//         var cardHTML = $(event.target).closest('.card-container').remove();
//         var cardHTMLId = cardHTML[0].id;
//         localStorage.removeItem(cardHTMLId);
//     }
// });











var title = $('#title-input').val();
var body = $('#body-input').val();
var numCards = 0;
var qualityVariable = "swill";



var newCard = function(id , title , body , quality) {
   return '<div id="' + id + '"class="card-container"><h2 class="title-of-card">'  
           + title +  '</h2>'
           + '<button class="delete-button"></button>'
           +'<p class="body-of-card">'
           + body + '</p>'
           + '<button class="upvote"></button>'
           + '<button class="downvote"></button>'
           + '<p class="quality">' + 'quality:' + '<span class="qualityVariable">' + quality + '</span>' + '</p>'
           + '<hr>'
           + '</div>';
};

function cardObject() {
   return {
       title: $('#title-input').val(),
       body: $('#body-input').val(),
       quality: qualityVariable
   };
}

$.each(localStorage, function(key) {
   var cardData = JSON.parse(this);
   numCards++;
   $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
});

var localStoreCard = function() {
   var cardString = JSON.stringify(cardObject());
   localStorage.setItem('card' + numCards  , cardString);
}

$('.save-btn').on('click', function(event) {
   event.preventDefault();
   if ($('.title-input').val() === "" || $('.body-input').val() === "") {
      return false;
   };  

   numCards++;
   $( ".bottom-box" ).prepend(newCard('card' + numCards, $('.title-input').val(), $('.body-input').val(), qualityVariable));
   localStoreCard();
   $('form')[0].reset();
});

$(".bottom-box").on('click', function(event){
   var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
   var qualityVariable;

   if (event.target.className === "upvote" || event.target.className === "downvote"){

       if (event.target.className === "upvote" && currentQuality === "plausible"){
           qualityVariable = "genius";
           $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
             
       } else if (event.target.className === "upvote" && currentQuality === "swill") {
           qualityVariable = "plausible";
           $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
             
       } else if (event.target.className === "downvote" && currentQuality === "plausible") {
           qualityVariable = "swill"
           $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

       } else if (event.target.className === "downvote" && currentQuality === "genius") {
           qualityVariable = "plausible"
           $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

       } else if (event.target.className === "downvote" && currentQuality === "swill") {
           qualityVariable = "swill";
       
       } else if (event.target.className === "upvote" && currentQuality === "genius") {
           qualityVariable = "genius";
       }

   var cardHTML = $(event.target).closest('.card-container');
   var cardHTMLId = cardHTML[0].id;
   var cardObjectInJSON = localStorage.getItem(cardHTMLId);
   var cardObjectInJS = JSON.parse(cardObjectInJSON);

   cardObjectInJS.quality = qualityVariable;

   var newCardJSON = JSON.stringify(cardObjectInJS);
   localStorage.setItem(cardHTMLId, newCardJSON);
   }
 
   else if (event.target.className === "delete-button") {
       var cardHTML = $(event.target).closest('.card-container').remove();
       var cardHTMLId = cardHTML[0].id;
       localStorage.removeItem(cardHTMLId);
   }
});
      










