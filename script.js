let url = window.location.href;
let header = document.getElementById('header');
let search = document.getElementById('header__request');
let button = document.getElementById('header__button');
let main = document.getElementById('main');
let date = document.getElementById('date');
let img = document.getElementById('main__photo');
let login = document.getElementById('main__name');
let bio = document.getElementById('bio');
let footer = document.getElementById('footer');
let link = document.getElementById('footer__link');

function clickButton() {
  let getName = new Promise((resolve, reject) => {
    setTimeout(() => search ? resolve(search) : reject('Error, please enter correct address'), 3000)
  });
  
  let newDate = new Date().toLocaleDateString();
  let getData = new Promise((resolve, reject) => {
    setTimeout(() => newDate ? resolve(newDate) : reject('Error, please enter correct address'), 3000);
  });
  

  Promise.all([getName, getData])
    .then (([search, newDate]) => github(search, newDate))
    .catch(err => console.log(err));
}




function github(newDate, search) {
fetch(`https://api.github.com/users/${search.value}`)
.then(res => res.json())
.then(json => {
  if (json.login != null) {

    login.value = json.name;
  
    link.href = json.html_url;
  
    bio.value = json.bio;

    img.src = json.avatar_url;

    date.value = newDate;
  

  } else {
    login.value = 'No data! Please enter correct address';
    link.href = 'Данные отсутствуют';
    bio.value = 'Данные отсутствуют';

    setTimeout(function() {
      document.location.reload();
    }, 5000);
  }  
})
}

if (url != '') {
  search.value = url.split('=');
  clickButton();
} 

button.addEventListener('click',clickButton);