// Scores list
const scoreInput = document.getElementById('voto-singolo');
const btnInput = document.getElementById('voto-singolo-btn');
const scoresList = document.getElementById('lista-voti');
// Multiple option
const addScoresBtn = document.getElementById('lista-voti-btn');
const scoresListInput = document.getElementById('lista-voti-input');

// Average scores
const mediaTot = document.querySelector('.mediaTot .voto');
const mediaIntero = mediaTot.querySelector('.intero');
const mediaDecimale = mediaTot.querySelector('.decimale');

const scores = [];

// Handle adding a new score
btnInput.addEventListener('click', (e) => {
	e.preventDefault();

	const scoreValue = Number(scoreInput.value);
	const decimalPart = String(scoreValue.toFixed(1)).split('.')[1];

	if (validyScore(scoreValue) === 0) return;

	addScore(scoreValue);
	// Allow multiple quick inputs
	scoreInput.value = '';
	scoreInput.focus();
});

addScoresBtn.addEventListener('click', (e) => {
	e.preventDefault();

	const newScores = scoresListInput.value;
	if (!newScores) return alert('Nessuna lista inserita');

	const newScoresArray = newScores.split(',');
	newScoresArray.forEach((newScore) => {
		if (validyScore(newScore) === 0) return;
		addScore(Number(newScore));
	});

	// Allow multiple quick inputs
	scoresListInput.value = '';
	scoresListInput.focus();
});

// Rappresentation of scores
function renderScores() {
	scoresList.innerHTML = '';

	scores.forEach((score, index) => {
		const listItem = document.createElement('li');
		const listText = document.createElement('span');
		const listBtn = document.createElement('button');

		listText.textContent = String(score).replace('.5', '½');
		changeBorder(score, listText);
		listItem.append(listText);
		listBtn.textContent = '🗑️';
		listItem.append(listBtn);

		scoresList.append(listItem);

		listBtn.addEventListener('click', () => removeScore(index));
	});

	// Update the average score probably modified
	renderMedia();
}

// Update total average score
function renderMedia() {
	const avgScore = calculateAvg();

	// Check if there are no scores left
	if (avgScore === 0) {
		mediaIntero.textContent = '...';
		mediaDecimale.textContent = '';
		return;
	}

	const [intero, decimale] = String(avgScore).split('.');
	mediaIntero.textContent = intero;
	mediaDecimale.textContent = ',' + decimale;
}

// Styling scores
function changeBorder(score, elem) {
	if (score < 5.5) {
		elem.classList.add('u--red-border');
	} else if (score >= 6) {
		elem.classList.add('u--green-border');
	} else {
		elem.classList.add('u--orange-border');
	}
}

// Handling data
function calculateAvg() {
	if (scores.length === 0) return 0;
	const sommaVoti = scores.reduce((prev, next) => prev + next, 0);
	return (sommaVoti / scores.length).toFixed(2);
}

function addScore(score) {
	scores.push(Number(score));
	renderScores();
}

function removeScore(scoreIndex) {
	scores.splice(scoreIndex, 1);
	renderScores();
}

function validyScore(score) {
	const scoreValue = Number(score);
	if (scoreValue > 10 || scoreValue < 1 || scoreValue % 0.5 !== 0) {
		alert('Voto invalido! Inserire un voto tra 1 e 10 corretto');
		return 0;
	}
	return 1;
}
