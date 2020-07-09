mapboxgl.accessToken =
	'pk.eyJ1IjoiY2FuZGFjZWxld2lzIiwiYSI6ImNrY2RrNHFnczAwZTIycW9pa2YwMTFhNW0ifQ.yQeAWqVgYFo07IkqtEg26g';
const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	zoom: 7,
	center: [-82.4542633, 27.0997775]
});

// Fetch beaches from API
async function getBeaches() {
	const res = await fetch('/api/v1/beaches');
	const data = await res.json();

	const beaches = data.data.map(beach => {
		return {
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [beach.location.coordinates[0], beach.location.coordinates[1]]
			},
			properties: {
				beachId: beach.beachId,
				icon: 'dog-park'

			},
		};
	});
	console.log(beaches);

	loadMap(beaches);
}

// Load map with beaches
function loadMap(beaches) {
	map.on('load', function () {

		map.addSource('point', {
			'type': 'geojson',
			'data': {
				'type': 'FeatureCollection',
				'features': beaches
			}
		});
		map.addLayer({
			'id': 'points',
			'type': 'symbol',
			'source': 'point',
			layout: {
				'icon-image': '{icon}-15',
				'icon-size': 1.5,
				'text-field': '{beachId}',
				'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
				'text-offset': [0, 0.9],
				'text-anchor': 'top'
			}
		});
	});
}

getBeaches();