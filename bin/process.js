module.exports = {
	processQuery: processQuery,
};

const erapi = 'https://eldenring.fanapis.com/api/';

function processQuery(name, type) {
	grabInfo(erapi + `${type}?name=` + encodeURIComponent(name)).then(
		(info) => {
			console.log(info);
		}
	);
}

function grabInfo(url) {
	return fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`E01: Failed to fetch ${url}`);
			}
			return response.json();
		})
		.catch((error) => {
			console.error('E02: ', error);
		});
}
