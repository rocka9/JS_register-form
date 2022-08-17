// je récupère les elements
const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#passwordConfirm');

// events
form.addEventListener('submit', e=>{
    e.preventDefault();  // j'empêche la soumission du formulaire directement au click

    form_verify(); // fonction quyi va verifier tous les champs
})

// fonctions
function form_verify() {
    // je receuille toutes valeurs des inputs
    const userValue = username.value.trim(); //trim() enlève les espaces en debut et fin de l'input
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordConfirmValue = passwordConfirm.value.trim();

    // verifier username
    if(userValue === ""){
        let errorMessage = "username doit être rempli";
        setError(username, errorMessage);
    } else if(!userValue.match(/^[a-zA-Z]/)){
        // [a-zA-Z] regex: au debut de la saisie, on souhaite voir des lettres de a à z minuscules(a-z ou majuscules A-Z)
        let errorMessage = "Username doit commencer par une lettre,minuscule ou majuscule"
        setError(username,errorMessage)
    } else {
        let letterNumber = userValue.length;
        if (letterNumber < 3){
            let errorMessage = "Username doit avoir au moins 3 caractères";
            setError(username, errorMessage);
        } else { setSuccess(username)};
    }

    // verifier l'email
    if (emailValue === ""){
        let errorMessage = "l'email doit rempli";
        setError(email, errorMessage);
    } else if (!email_verify(emailValue)){
        let errorMessage = "Le format de l'email est incorrect";
        setError(email, errorMessage);
    } else {
        setSuccess(email);
    }

    // verifier mot de passe
    if( passwordValue ==="") {
        let errorMessage ="le mot de passe est éxigé";
        setError(password, errorMessage);
    } else if(!password_verify(passwordValue)){
        let errorMessage = " Le format du mot de passe est faible(8 à 12 caractères et caractères spéciaux)";
        setError(password, errorMessage);
    } else {
        setSuccess(password);
    }

    // confirmation mot de passe
    if (passwordConfirmValue ===""){
        let errorMessage = "la confrimation du mot de passe est obligatoire";
        setError(passwordConfirmValue, errorMessage);
    } else if ( passwordConfirmValue !== passwordValue){
        let errorMessage = "les mots de passe doivent être identiques";
        setError(passwordConfirm, errorMessage);
    } else {
        setSuccess(passwordConfirm);
    }

}

function setError(element, errorMessage){
    const formControl = element.parentElement;
    const small = formControl.querySelector('small')

    // ajout du message d'erreur
    small.innerText = errorMessage;

    // ajout de la classe error
    formControl.className = "form-control error";
    
}

function setSuccess(element) {
    const formControl = element.parentElement;
    formControl.className = "form-control success";
}

function email_verify(email){
    /*
    regex pour vérifier email:
    /^[a-z0-9._-]+@[a-z0-9._-]{2,]\.[a-z]{2,4}$/
    
    */
    return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email);
    // test() renvoie un booléen true ou false si les regex sont verifiés ou non
}

function password_verify(password){
    return /^(?=.*[0-9])(?=.*[!@#*$%&^])[a-zA-Z0-9!@#*$%&^].{8,12}$/.test(password)
}