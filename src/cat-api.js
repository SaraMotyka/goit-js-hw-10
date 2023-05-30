const catsBreeds =
  'https://api.thecatapi.com/v1/breeds?api_key=live_2g7KlxK4eCPKY9QUekPGASu03BFi9rW41iCZiwxapWtc9d0oF60bSn2K4lGn882o';

const catsDescription = 'https://api.thecatapi.com/v1/images/search';
const breedSelect = document.querySelector('.breed-select');
const loaderMessage = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const catsInfoDiv = document.querySelector('.cat-info');

function showLoader() {
  loaderMessage.classList.add('visible');
  errorMessage.classList.remove('visible');
}

function pingUrl(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          reject(errorMessage);
        } else {
          return response.json();
        }
      })
      .then(data => {
        resolve(data);
        const element = document.querySelector('.visible');
        element.style.display = 'none';
      })
      .catch(err => {
        error(err.toString());
      });
  });
}
function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => response.json())
    .then(data => {
      data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
fetchBreeds();

function fetchCatByBreed(breedId) {
  const urlCat = `${catsDescription}?breed_ids=${breedId}`;
  pingUrl(urlCat)
    .then(data => {
      const catsPicture = `<div><img src="${data[0].url}" class= "cat-pic"></div>`;
      catsInfoDiv.insertAdjacentHTML('afterbegin', catsPicture);
      showLoader();
    })
    .catch(err => {
      showError();
    });
  const catsInfo = `https://api.thecatapi.com/v1/breeds/${breedId}`;
  pingUrl(catsInfo)
    .then(data => {
      const aboutCats = `<div class= "cat-desc"><h1>${data.name}</h1><p>${data.description}</p><h2>Temperament</h2><p>${data.temperament}</p></div>`;
      catsInfoDiv.insertAdjacentHTML('beforeend', aboutCats);
      loaderMessage.classList.add('hidden');
    })
    .catch(err => {
      showError();
    });
}
function showError() {
  errorMessage.classList.add('visible');
  loaderMessage.classList.remove('visible');
}
function handlebreedSelect(e) {
  e.preventDefault();
  showError();
  catsInfoDiv.innerHTML = '';
  fetchCatByBreed(e.target.value);
}

breedSelect.addEventListener('change', handlebreedSelect);
