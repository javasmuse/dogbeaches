const beachForm = document.getElementById('beach-form');
const beachId = document.getElementById('beach-id');
const beachName = document.getElementById('beach-name')
const beachAddress = document.getElementById('beach-address');
const rating = document.getElementById('rating');
const comments = document.getElementById('comments');

// Send POST to API to add beach
async function addBeach(e) {
    e.preventDefault();

    if (beachId.value === '' || beachAddress.value === '') {
        alert('Please fill in all fields');
    }

    const sendBody = {
        beachId: beachId.value,
        beachName: beachName.value,
        address: beachAddress.value,
        rating: rating.value,
        comments: comments.value
    }

    // usually uses axios instead of fetch - axios is a library

    try {
        const res = await fetch('/api/v1/beaches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendBody)
        });

        if (res.status === 400) {
            throw Error('Beach already exists!');
        }

        alert('Beach added!');
        window.location.href = '/index.html';

    } catch (err) {
        alert(err);
        return;
    }
}

beachForm.addEventListener('submit', addBeach);

// todo: - add my portfolio's background, takeout bootstrap, add in flex-box, add in dogbeach photos, update current beache with names, add clickable on icon - to page of that beach with pics and reviews and nearby cool restaurants - allow updating and deleting - creative api integration for sunrise / sunset and tides ;) 