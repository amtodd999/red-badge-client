//needed for heroku
let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
    case 'izutu-amt.herokuapp.com':
        APIURL = 'https://amt-first-izutu-server.herokuapp.com'
}

export default APIURL;