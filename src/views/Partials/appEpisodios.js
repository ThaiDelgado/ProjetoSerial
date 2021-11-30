

let getClicks = element => {
    return element.getAttribute('data-clicks');
}

let sumClicks = (clicks) => {
    return clicks.reduce((acc, curr) => {
        return acc + curr;
    }, 0);
}

let getEpisodios = () => {
    let episodios = document.querySelectorAll('.episodio');
    return episodios;
}

let getEpisodiosClicks = () => {
    let episodios = getEpisodios();
    let clicks = [];
    for (let i = 0; i < episodios.length; i++) {
        clicks.push(getClicks(episodios[i]));
    }
    return clicks;
}

let getEpisodiosClicksSum = () => {
    let clicks = getEpisodiosClicks();
    return sumClicks(clicks);
}