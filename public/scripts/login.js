const btnSubmit = document.querySelector(".submit");
const form = document.querySelector(".form");

btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();

    const fields = [...document.querySelectorAll("input")];

    fields.forEach(field => {
        if(field.value === "") form.classList.add("validate-error");
    })

    const formError = document.querySelector(".validate-error");

    if(formError){
        formError.addEventListener("animationend", (event) => {
            if(event.animationName === "vibrate"){
                formError.classList.remove("validate-error");
            }
        })
    } else {
        form.classList.add("form-hide");
        event.target.submit();
    }
})

form.addEventListener("animationend", (event) => {
    if(event.animation.name === "down"){
        form.style.display = "none"
    }    
})