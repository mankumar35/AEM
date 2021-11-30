let success = (pos) => {
    // console.log(coords)
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(
        {
            lat: pos.coords.latitude,
            long: pos.coords.longitude,
            accuracy: pos.coords.accuracy
        }
    ),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

let sendCoords = () => {
    navigator.geolocation.getCurrentPosition(success)
}

export default sendCoords