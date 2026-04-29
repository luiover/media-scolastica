const voti = {
	mediaTotale: '7.67',
	'\nSCIENZE E TECNOLOGIE APPLICATE\n': {
		voti: [8, 8.5, 9.5, 8.5],
		media: '8.63',
	},
	'\nSCIENZE INTEGRATE (CHIMICA)\n': {
		voti: [8.5, 9, 8.5, 6.5, 7.5, 7.5, 8],
		media: '7.93',
	},
	'\nLINGUA INGLESE\n': {
		voti: [9, 8, 9, 8, 9, 9, 8.5],
		media: '8.64',
	},
	'\nSCIENZE MOTORIE E SPORTIVE\n': {
		voti: [9, 8.5, 7, 6.5, 9.5],
		media: '8.10',
	},
	'\nLINGUA E LETTERATURA ITALIANA\n': {
		voti: [8, 6.5, 8, 5, 5.5, 7, 5, 7, 8, 6],
		media: '6.60',
	},
	'\nTECNOLOGIE E TECNICHE DI RAPPRESENTAZIONE GRAFICA\n': {
		voti: [9, 8, 9, 10, 8, 10],
		media: '9.00',
	},
	'\nSCIENZE INTEGRATE (SCIENZE DELLA TERRA E BIOLOGIA)\n': {
		voti: [7, 9, 5.5, 8],
		media: '7.38',
	},
	'\nDIRITTO ED ECONOMIA\n': {
		voti: [7, 7.5, 7.5],
		media: '7.33',
	},
	'\nSCIENZE INTEGRATE (FISICA)\n': {
		voti: [10, 8, 6, 7.5, 7, 9, 7.5, 5.5],
		media: '7.56',
	},
	'\nSTORIA\n': {
		voti: [6, 6, 7, 6.5, 4.5, 5.5],
		media: '5.92',
	},
	'\nMATEMATICA\n': {
		voti: [8, 8, 6, 8.5, 8, 8.5, 6.5],
		media: '7.64',
	},
	'\nEDUCAZIONE CIVICA\n': {
		voti: [7, 8.5, 9.5],
		media: '8.33',
	},
};

function extractScores(object) {
	let allScores = [];

	for (let subject in object) {
		const scores = object[subject]?.voti;
		// verifica se la proprietà è una materia
		if (!Array.isArray(scores)) {
			continue;
		}

		allScores.push(...scores);
		console.log(scores);
	}

	return allScores;
}

const allScores = extractScores(voti);
alert(allScores);
