//
const parseVoto = (voto) =>
	Number(voto.textContent.replace(/\n/g, '').replace('½', '.5').replace(',5', '.5').trim());

const elemVoti = Array.from(
	document.querySelectorAll('#tabled_geg_div_1 .s_reg_testo.cella_trattino'),
).filter((voto) => !voto.closest('.f_reg_voto_dettaglio'));

// array of numbers
const voti = elemVoti.map(parseVoto);

// media totale
const media = (voti.reduce((totale, voto) => totale + voto, 0) / voti.length).toFixed(2);

console.log(`la media totale dei voti è ${media}`);

// grouping per materia
let dataVoti = { mediaTotale: media };

elemVoti.forEach((voto) => {
	let paragrafoVoto = voto.closest('tr');

	let i = 0;
	let paraPrec = paragrafoVoto;
	let headerMateria = null;

	// risali fino alla materia (max 40 step di sicurezza)
	while (!headerMateria && i < 40) {
		i++;
		paraPrec = paraPrec?.previousElementSibling;
		if (!paraPrec) break;

		headerMateria = paraPrec.querySelector('td.registro.redtext.open_sans_condensed_bold');
	}

	if (!headerMateria) {
		console.log('Threshold reached!');
		return;
	}

	const materia = headerMateria.textContent;

	// inizializza array se non esiste e aggiungi voto
	if (!dataVoti[materia]) {
		dataVoti[materia] = { voti: [], media: 0 };
	}

	dataVoti[materia].voti.push(parseVoto(voto));

	dataVoti[materia].media = (
		dataVoti[materia].voti.reduce((somma, voto) => somma + voto, 0) / dataVoti[materia].voti.length
	).toFixed(2);
});

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

const allScores = extractScores(dataVoti);
alert(
	'Ecco tutti i tuoi voti in lista! Copia il prossimo messaggio ALERT e incolla la lista sul nostro sito GradeMate!',
);
alert(allScores);
