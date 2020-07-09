const beachForm = document.getElementById('beach-form');
const beachId = document.getElementById('beach-id');
const beachAddress = document.getElementById('beach-address');

// Send POST to API to add beach
async function addBeach(e) {
    e.preventDefault();

    if (beachId.value === '' || beachAddress.value === '') {
        alert('Please fill in all fields');
    }

    const sendBody = {
        beachId: beachId.value,
        address: beachAddress.value
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
            throw Error('Beach already exits!');
        }

        alert('Beach added!');
        window.location.href = '/index.html';

    } catch (err) {
        alert(err);
        return;
    }
}

beachForm.addEventListener('submit', addBeach);