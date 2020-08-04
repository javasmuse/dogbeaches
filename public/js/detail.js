mapboxgl.accessToken =
    'pk.eyJ1IjoiY2FuZGFjZWxld2lzIiwiYSI6ImNrY2RrNHFnczAwZTIycW9pa2YwMTFhNW0ifQ.yQeAWqVgYFo07IkqtEg26g';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 5.7,
    center: [-83.5, 27.9]
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
                beachName: beach.beachName,
                beachId: beach.beachId,
                rating: beach.rating,
                comments: beach.comments,
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

                'text-field': '{beachName}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.9],
                'text-anchor': 'top'
            }
        });
    });
}

getBeaches();



// First iteration no little map
// display: photos
// of course name & address
// comments
// rating
// fresh water hose off station?
// nearby dog friendly cafes  w/ website links
// api for tides 
// api for sunrise / set

// final iteration include mini map w/ cafes & beach shown

// wireframe the end result

// hover on main map === name and rating
// click goes to details  -- add a home button to details

// more complex - update, add info, login 
// as a safety - adding a beach will require admin approval 