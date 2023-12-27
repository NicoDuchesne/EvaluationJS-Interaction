"use strict";//Returns all errors

//PARTIE 1 - MENU BURGER

//On va selection nos élemnts dans le html
let menuBurger = document.querySelector(".menuBurger"); //Menu burger entier
let burgerIcon = document.querySelector("#iconBurger"); //Icone du menu qui sera cliquable
let liste = document.querySelector("#liste");           //La liste qui apparaitra au clic

//On aimerait que le burger menu reste ouvert lorsqu'on navigue entre les pages
if (sessionStorage.getItem("openedMenu") == null) { //Premier chargement
    sessionStorage.setItem("openedMenu", "off");    
} else if (sessionStorage.getItem("openedMenu") == "on") {  //Si le menu était encort ouvert précédemment
    liste.classList.toggle('active');
    menuBurger.classList.toggle('active');                                          
}

//Quand on clique sur l'icone, le burgermenu et sa liste sont considérés activés grâce à la classe active
//Cela permettra de faire nos modifications en CSS pour faire apparaitre le menu avec ses liens
burgerIcon.addEventListener('click', () => {
    liste.classList.toggle('active');
    menuBurger.classList.toggle('active');
    //On garde une trace du statut du menu 
    if (sessionStorage.getItem("openedMenu") == "off") {
        sessionStorage.setItem("openedMenu", "on");
    } else {
        sessionStorage.setItem("openedMenu", "off");
    }
 });



//PARTIE 2 - LIGHT MODE
//Pour l'activer, il faut cliquer sur l'icone en haut à droite, c'est un light mode car le site est sombre par défaut


//Selection de tous les éléments auxquels on va applique la classe lightMode, pour les modifier en suite en CSS en pus clairs
let activation = document.querySelector("#mode");
let contenu = document.querySelector(".secondZone");
let aside = document.querySelector("aside");
let links = document.getElementsByClassName("sideLink");
let navbar = document.querySelector("nav");
let footer = document.querySelector("footer");
let image = document.querySelector("header img");
let barres = document.getElementsByClassName("bar");
let burgerLinks = document.getElementsByClassName("burgerLink");


//Avec sessionStorage, on gère la mémoire du mode actuel entre les différentes pages html
if (sessionStorage.getItem("lightMode") == null) { //Premiere page html qu'on charge
    sessionStorage.setItem("lightMode", "off");    //par défaut le mode light est off et on est en dark
} else if (sessionStorage.getItem("lightMode") == "on") { //Si on était précedemment en mode light
    putLight();                                           //alors on applique le mode light à la page
}

//fonction appelée pour appliquer le mode light à la page en arrivant
function putLight() {
    //ajout de la classe lightMode à plusieurs éléments
    contenu.classList.add('lightMode');
    aside.classList.add('lightMode');
    navbar.classList.add('lightMode');
    footer.classList.add('lightMode');
    menuBurger.classList.add('lightMode');

    //Pareil ici pour les éléments multiples
    for (let link of links) {
        link.classList.add('lightMode');
    }
    for (let barre of barres) {
        barre.classList.add('lightMode');
    }
    for (let a of burgerLinks) {
        a.classList.add('lightMode');
    }

    //Ici on va mettre en place les images header en mode light en gérant les sources
    let source = image.getAttribute('src');
    if (source == "img/welcome.png") {
        image.src = "img/welcomeLight.png";
    } else if (source == "img/games.png") {
        image.src = "img/gamesLight.png";
    } else if (source == "img/chrono.png") {
        image.src = "img/chronoLight.png";
    } else if (source == "img/form.png") {
        image.src = "img/formLight.png";
    } else{
        console.log("Erreur imprevue avec la source des images");
    }

    //On change l'icone car on est mainteant en light mode
    activation.src = "img/darkMode.png";

}


//La petite icone est dont clicable pour switch d'un mode à l'autre
activation.addEventListener('click', switchLight);

//La fonction appelée en cas de clics, très similaire à putLight() met le but est de passer d'un mode à l'autre
function switchLight() {
    //pour ça on va toujours utiliser la classe lightMode mais avec "toggle" 
    contenu.classList.toggle('lightMode');
    aside.classList.toggle('lightMode');
    navbar.classList.toggle('lightMode');
    footer.classList.toggle('lightMode');
    menuBurger.classList.toggle('lightMode');

    for (let link of links) {
        link.classList.toggle('lightMode');
    }
    for (let barre of barres) {
        barre.classList.toggle('lightMode');
    }
    for (let a of burgerLinks) {
        a.classList.toggle('lightMode');
    }

    //On echange les images header au besoin
    let source = image.getAttribute('src');
    if (source == "img/welcome.png") {
        image.src = "img/welcomeLight.png";
    } else if (source == "img/games.png") {
        image.src = "img/gamesLight.png";
    } else if (source == "img/chrono.png") {
        image.src = "img/chronoLight.png";
    } else if (source == "img/form.png") {
        image.src = "img/formLight.png";
    } else{
        image.src = source.replace("Light", "");
    }

    //on passe d'une icone à l'autre pour le mode
    source = activation.getAttribute('src');
    if (source == "img/lightMode.png") {
        activation.src = "img/darkMode.png";
    } else {
        activation.src = "img/lightMode.png";
    }

    //et on inidque si le lightMdoe est activé dans le sessionStorage
    if (sessionStorage.getItem("lightMode") == "off") {
        sessionStorage.setItem("lightMode", "on");
    } else {
        sessionStorage.setItem("lightMode", "off");
    }
    
}