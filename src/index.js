import './style.css';

const key = 'mfbeizdug';
const form = document.getElementById('form');
const display = document.querySelector('.names-scores');

const displayData = (apiData) => {
  if (apiData) {
    if (!apiData.length) display.innerHTML = '<p class=\'details\'>No scores available!</p>';

    apiData.forEach((data) => {
      const scoreDetails = document.createElement('p');
      scoreDetails.classList.add('details');
      scoreDetails.id = 'details';
      display.appendChild(scoreDetails);
      scoreDetails.innerHTML = `${data.user} : ${data.score}`;
    });
  }
};

const fetchScoresFromApi = async () => {
  const fetchUrl = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`);
  const Data = await fetchUrl.json();
  const fetchedData = Data.result;
  displayData(fetchedData);
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {};
  data.user = form.elements[0].value;
  data.score = form.elements[1].value;
  form.reset();

  await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
});

fetchScoresFromApi();