// grabbing elements
const tellJoke = document.querySelector('.tell-joke');
const jokeBtn = document.querySelector('.joke-btn');

// converting text to speech
const tellAJoke = (joke) => {
    VoiceRSS.speech({
        key: '65244814dea04eb099319d141cd1f04d',
        src: joke,
        hl: 'en-us',
        v: 'Mary',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// fetching joke text from remote API
const getJoke = async () => {
    // to make the 'Tell A Joke' button unclickable before and telling the joke
    jokeBtn.disabled = true;

    const jokeUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    let joke = '';
    
    try {
        const response = await fetch(jokeUrl);
        const data = await response.json();
        // to check if returned data has single or double joke
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellAJoke(joke);
    } catch (error) {
        // catch error here
        console.log('whoops', error);
    }
}

jokeBtn.addEventListener('click', getJoke);
// to make the 'Tell A Joke' button clickable again when the audio has finished playing
tellJoke.addEventListener('ended', () => jokeBtn.disabled = false);