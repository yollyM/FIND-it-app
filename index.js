 import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
//form event listener
searchForm.addEventListener('submit', e => {

//get search term
const searchTerm = searchInput.value;
//get sort
const sortBy = document.querySelector('input[name="sortby"]:checked').value;
const searchLimit= document.getElementById('limit').value;
console.log(sortBy);
// check input
if(searchTerm ==='') {
  //show message
  showMessage('Please add search term', 'alert-danger');
}
// claer Input
searchInput.value = '';
//SEARCH Reddit
reddit.search(searchTerm, searchLimit, sortBy).then(results => {
  let output = '<div class="card-columns">'
  // loop through post
  results.forEach(post => {
    // check for image
    const image = post.preview ? post.preview.images[0].source.url : 'https://assets.entrepreneur.com/content/3x2/1300/20180301190808-reddit-logo.jpeg';

    output += `
    <div class="card" >
  <img class="card-img-top" src="${image}" alt="Card image cap">
  <div class="card-body" >
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${truncateText(post.selftext, 100)}</p>
    <a href="${post.url}" target ="_blank" class="btn btn-primary">Read More</a>
  </div>
</div>

    `;
  });

  output += '</div>';
  document.getElementById('results').innerHTML = output;
});
  e.preventDefault();
});
//show message
function showMessage(message,className) {
  // create div
  const div = document.createElement('div');
  // add class
 div.className = `alert ${className}`;
 //add text
 div.appendChild(document.createTextNode(message));
 // get parent
 const searchContainer = document.getElementById('search-container');
 // get search
 const search =document.getElementById('search');
 //insert showMessage
 searchContainer.insertBefore(div, search);
 //set timeout
 setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

//truncate text
function truncateText(text, limit){
  const shortened = text.indexOf(' ', limit);
  if(shortened == -1) return text;
  return text.substring(0, shortened);
}
