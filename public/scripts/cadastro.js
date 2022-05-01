const btnSubmit = document.querySelector(".submit");
const formClass = document.querySelector(".form");
const form = document.querySelector("form");

btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();

    const fields = [...document.querySelectorAll("input")];

    fields.forEach(field => {
        if(field.value === ""){
            formClass.classList.add("validate-error");
            field.style.borderBottom = "2px solid #733FBE"
        } 

    })

    const formError = document.querySelector(".validate-error");

    if(formError){
        formError.addEventListener("animationend", (event) => {
            if(event.animationName === "vibrate"){
                formError.classList.remove("validate-error");
            }
        })
    } else {
        formClass.classList.add("form-hide");
        form.submit();
    }
})

form.addEventListener("animationend", (event) => {
    if(event.animation.name === "down"){
        form.style.display = "none"
    }    
})