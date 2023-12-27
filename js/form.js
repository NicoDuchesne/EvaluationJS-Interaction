"use strict";//Returns all errors

//On va d'abord selectionner tous les éléments dont on aura besoin pour controler ce formulaire
let formulaire = document.querySelector("form");
let prenom = document.querySelector("#prenom");
let nom = document.querySelector("#nom");
let pseudo = document.querySelector("#pseudo");
let mail = document.querySelector("#mail");
let password = document.querySelector("#mdp");
let pays = document.querySelector("#pays");
let genreList = document.getElementsByName("genre");
let naissance = document.querySelector("#naissance");
let jeuList = document.getElementsByName("jeux");
let fieldGenre = document.querySelector("#fieldGenre");
let fieldJeux = document.querySelector("#fieldJeux");
let fieldPays = document.querySelector("#fieldPays");
let output = document.querySelector("#resultats");


formulaire.addEventListener('submit', checkForm); //Au submit du form, le controle se lance

//La fonction lancée au submit
function checkForm(e) {
    e.preventDefault(); //On empeche le reload de la page

    //intialisations
    let checkAll = true;
    let erreurs = "";

    //Prenom
    if (checkPrenom()) { //Chaque information sera vérifiée par une fonction de controle externe propre
        prenom.style.background = "white"; //On changera les couleurs des background en blanc quand une information est validée
    } else {
        prenom.style.background = "red";   //Ou bien en rouge quand elle sera fausse
        checkAll = false;                  //Une information fausse invalide le formulaire
        erreurs += " Le prenom doit comporter seulement des lettres et au moins deux caractères.";  //On aiguillera l'utilisateur pour qu'il remplisse entierement
    }
    
    //Nom de famille
    if (checkNom()) {
        nom.style.background = "white";
    } else {
        nom.style.background = "red";
        checkAll = false;
        erreurs += " Le nom doit comporter seulement des lettres et au moins deux caractères.";
    }
    
    //Pseudonyme
    if (checkPseudo()) {
        pseudo.style.background = "white";
    } else {
        pseudo.style.background = "red";
        checkAll = false;
        erreurs += " Le pseudonyme doit comporter au moins deux caractères.";
    }
    
    //Adresse Mail
    if (checkMail()) {
        mail.style.background = "white";
    } else {
        mail.style.background = "red";
        checkAll = false;
        erreurs += " L'adresse mail doit être valide.";
    }
    
    //Date de naissance
    if (checkPassword()) {
        password.style.background = "white";
    } else {
        password.style.background = "red";
        checkAll = false;
        erreurs += " Le mot de passe doit faire plus de 8 caractères, et comporter au moins une majuscule, une minuscule, un caractère spécial.";
    }

    //Pays de Residence
    if (!checkPays()) { //C'est un select, une option est normalement validée et un utilisateur bienveillant n'aura jamais d'erreur
        console.log(`Erreur innatendue, recharger la page`); //Mais on controle quand même pour assurer l'integrité des données
        fieldPays.style.background = "red";
        checkAll = false;
        erreurs += " Une erreur est survenue lors de la séléction du pays.";
    }

    //Genre
    if (!checkGenre()) { //Idem, les checkboxes ne sont pas censées apporter d'erreurs, on controle dans le doute
        console.log(`Erreur innatendue, recharger la page`);
        fieldGenre.style.background = "red";
        checkAll = false;
        erreurs += " Une erreur est survenue lors de la séléction du genre.";
    }
    
    //Date de naissance
    if (checkNaissance()) {
        naissance.style.background = "white";
    } else {
        naissance.style.background = "red";
        checkAll = false;
        erreurs += " Vous devez entrer une date de naissance valide et avoir plus de 13 ans.";
    }
    
    //Jeux deja joués
    if (!checkJeux()) { //Encore une fois, des checkboxes optionnels qui ne sont pas censés retourner d'erreurs, mais on controle encore
        console.log(`Erreur innatendue, recharger la page`);
        fieldJeux.style.background = "red";
        checkAll = false;
        erreurs += " Une erreur est survenue lors de la séléction des jeux.";
    }
    
    if (checkAll) { //Le formulaire est renpli enierement
        output.textContent = "Le formulaire est complet, merci beacoup !";
    } else { //Il y a au moins une lauvaise information et les indications apparaissent
        output.textContent = erreurs;
    }
}


//Les fonctions de controle

function checkPrenom() { //On veut au moins 2 caractères et que des lettres
    let content = prenom.value.replaceAll(" ","");
    let prenomRegex = /^[A-Za-zàâäéèêëîïôöùûü]+$/;
    if (content != null && content.length > 1 && prenomRegex.test(content)) {
        return true;
    }
    return false
}

function checkNom() { //Idem, au moins 2 caractères et que des lettres
    let content = nom.value.replaceAll(" ","");;
    let nomRegex = /^[A-Za-zàâäéèêëîïôöùûü]+$/;
    if (content != null && content.length > 1 && nomRegex.test(content)) {
        return true;
    }
    return false
}

function checkPseudo() { //On veut au moins deux caractères en dehors des whitespaces
    let content = pseudo.value.replaceAll(" ","");;
    if (content != null && content.length > 1) {
        return true;
    }
    return false
}

function checkMail() { //On veut un mail au format valide/realiste
    let content = mail.value;
    let mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (content != null && mailRegex.test(content)) {
        return true;
    }
    return false
}

function checkPassword() { //On veut plus de 8 caracteres, au moins : 1 minuscule, 1 majuscule, 1 caractere special
    let content = password.value;
    let passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    if (content != null && content.length > 8 && passwordRegex.test(content)) {
        return true;
    }
    return false
}

function checkPays() { //Information normalement valide, on vérifie cependant que cela corespond bien à nos données en brut
    let content = pays.options[pays.selectedIndex].textContent;
    let paysListe = ["Allemagne","Belgique","Canada","Espagne","France","Grèce","Irlande","Italie","Luxembourg","Norvège","Pays-Bas","Portugal","Royaume-Uni","Suisse","Turquie","Ukraine","Autre.."];
    if (content != null && paysListe.includes(content)) {
        return true;
    }
    return false
}

function checkGenre() { //Information normalement valide, on vérifie cependant que cela corespond bien à nos données en brut
    let content;
    let radioBoxes = ["une Femme", "un Homme", "non précisé"];
    genreList.forEach(element => { //Determine quel radiobox est choisie
        if (element.checked) {
            content = element.labels[0].textContent;
        }
    });
    if (content != null && radioBoxes.includes(content)) {
        return true;
    }
    return false
}

function checkNaissance() { //On veut une date passée et grossierement datée de 13 ans
    let today = new Date();
    let actualYear = today.getFullYear();
    let content = naissance.value.substring(0,4); //On a les années des 2 dates au meme format
    
    if (content != null && content.length > 0 && (actualYear-content) >= 13) {
        return true;
    }
    return false
}

function checkJeux() { //Information normalement valide, on vérifie cependant que cela corespond bien à nos données en brut
    let content =[];
    let checkBoxes = ["Kingdom Hearts", "Kingdom Hearts 2", "Kingdom Hearts 3"];
    let temp = true;

    jeuList.forEach(element => {  //Determine si des checkboxes sont cochées
        if (element.checked) {
            content.push(element.labels[0].textContent);
        }
    });

    content.forEach(element => { //Verification des checkboxes cochées
        if (!checkBoxes.includes(element)) {
            temp = false;
        }
    });

    if (content != null && temp) {
        return true;
    }
    return false;
}