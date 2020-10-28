//trocar a mensagem de erro 
const fields = document.querySelectorAll("[required")

function ValidateField(field) {
    // lógica para verificar se existem erros 
    function verifyErrors(){

        let foundError = false;

        for( let error in field.validity){  // objeto field.validity, para cada propriedade dentro dele, vai tirar e chamar de erro
            // se não for customError 
            // então verifica se tem erro
            if(field.validity[error] && !field.validity.valid){ // valid seja == false por isso a !
                foundError = error
            }
        }

        return foundError
    }

    function customMessage(typeError) {
        const messages = {
            text:{
                valueMissing: "Por favor preeencha este campo"
            },
            email:{
                valueMissing: "Email é obrigatório",
                typeMismatch: "Por favor, preencha um email válido"
            }
        }

        return messages [field.type][typeError]//vai pegar o tipo de erro que estiver sendo exibido, sendo ele text, ou email

    }

    function setCustomMessage(message){
        const spanError = field.parentNode.querySelector("span.error") // parentNode faz com que vá até o pai e procure pelo span
        if(message) {
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""

        }
            
    }
    return function() {

        const error = verifyErrors()
        
        if (error) {
            const message = customMessage(error)
            field.style,borderColor = "red"
            setCustomMessage(message)

        } else{
            field.style.borderColor = "green"
            setCustomMessage()
        }
    }

}

function customValidation(event){


    const field = event.target // alvo que disparou o evento que no caso é o field
    const validation = ValidateField(field)

    validation()


}

for(field of fields) { // para cada field que estiver nos  adicione:
    field.addEventListener("invalid", event => {
        // eliminar o bubble
        event.preventDefault()
        customValidation(event)

    })
    field.addEventListener("blur", customValidation)
}

document.querySelector('form') // pegue o elemento for
.addEventListener("submit", event =>{ // adicione uma função para o evento submit
    console.log("enviar o formulário")

    //não vai enviar o formulário
    event.preventDefault()
})