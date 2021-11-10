const span = document.querySelector('.material-icons-outlined');
const list = document.querySelector('.listMenu')
const close = document.querySelector('.mainClose')

span.addEventListener("click", function(){
    list.classList.add("active")
})

close.addEventListener("click", function(){
    list.classList.remove("active")
})




/*criar um script que faça o modal-overlay aparecer assim clicarmos no card e o remova quando clicarmos no modal-close

const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');

for(let card of cards){
    card.addEventListener("click", function(){
        const videoId = card.getAttribute("id")
        modalOverlay.classList.add('active')
        modalOverlay.querySelector("iframe").src = `https://www.youtube.com/embed/${videoId}` // adiciona o video. 
    })
}


document.querySelector(".modal-close").addEventListener("click", function(){
    modalOverlay.classList.remove("active")
    modalOverlay.querySelector("iframe").src = "" // remove o vídeo.
})
*/
