let btnGetQuote = document.querySelector('#btn-getquote');
let outputQuote = document.querySelector('#quote-text');
let authorText = document.querySelector('#author-text');
let loader = document.querySelector('#loader');
let tweet = document.querySelector('#tweet');
let quoteCard = document.querySelector('#quote-card');


function loading() {
    loader.hidden = false;
    quoteCard.hidden = true;
}

function complete() {
    if (!loader.hidden) {
        quoteCard.hidden = false;
        loader.hidden = true;
    }
}

const url = 'https://api.quotable.io/random';
// btnGetQuote.addEventListener('click', function() {

//     // loading();
//     fetch(url).then(response => response.json()).then(function(json) {
//         // console.log(json);
//         outputQuote.innerText = json.content;
//         authorText.innerText = json.author;
//     }).catch(error => alert(error));
//     // complete();
// });

btnGetQuote.addEventListener('click', getQuote);

// https://api.quotable.io/random
// tagsalert.className.replace("show", "");.


tweet.addEventListener('click', function() {
    let quote = outputQuote.innerText;
    let author = authorText.innerText;
    // console.log(author);

    let twitterUrl = `https://twitter.com/intent/tweet?text=${quote}   - ${author}`;
    window.open(twitterUrl, '_blank')
});

async function getQuote() {
    loading();
    try {
        let response = await fetch(url);
        let data = await response.json();
        outputQuote.innerText = data.content;
        authorText.innerText = data.author;
    } catch (error) {
        alert(console.error);
    }
    complete();
}

function downloadtable() {

    // var node = document.getElementById('output');
    // domtoimage.toPng(node)
    //     .then(function(dataUrl) {
    //         var img = new Image();
    //         img.src = dataUrl;
    //         downloadURI(dataUrl, "records.png")
    //     })
    //     .catch(function(error) {
    //         console.error('oops, something went wrong!', error);
    //     });

    window.scrollTo(0, 0);
    html2canvas(document.getElementById('output')).then(function(canvas) {
        console.log(canvas);
        downloadURI(canvas.toDataURL('image/jpeg', 0.9), "quotes.png");
    });
}



function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

// loading();

getQuote();