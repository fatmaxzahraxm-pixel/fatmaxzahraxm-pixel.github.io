let sIndex = 0;
function showImageByIndex(index) {
    sIndex = index;
    displaySlide();
}
function rev(){
    let n = -1;
    sIndex = sIndex + n;
    displaySlide();
}
function next(){
    let n = 1;
    sIndex = sIndex + n;
    displaySlide();
}
function displaySlide() {
    let i;
    let slides = document.getElementsByClassName("slides");

    if (sIndex >= slides.length) {
        sIndex = 0;
    }

    if (sIndex < 0) {
        sIndex = slides.length - 1;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[sIndex].style.display = "block";
     
}


function calculerprix(){
    let age = prompt("Quel âge avez-vous ?", 20);
    let number = prompt("combien etes vous pret a cotiser",50);
    let prixage = age * 1.5;
    if(age<number){
        prix = number;
    }else{
        prix = prixage;
    }
    alert("d'aprés nos calcul vous pouvez aider avec " + prix +" Euro");
    document.getElementById("resultat").value = prix;
}

function valformulaire(){
    let nom = document.getElementById("nom").value.trim();
    let prenom = document.getElementById("prenom").value.trim();
    let email = document.getElementById("email").value.trim();
    let tel = document.getElementById("telephone").value.trim();
    let erreur = "";
    if (nom === "" || prenom ==="" || email ==="" || tel=== ""){
        erreur += "Tous les champs sont obligatoires.\n";
    }
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        erreur += "L'email n'est pas valide.\n";
    }
    let telPattern = /^[0-9]{8,15}$/;
    if (!telPattern.test(tel)) {
        erreur += "Le numéro de téléphone doit contenir entre 8 et 15 chiffres.\n";
    }
    if (erreur !== "") {
        alert(erreur);
        return false;
    }
    return true;
}

function alerte(){
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let email = document.getElementById("email").value;
    let tel = document.getElementById("telephone").value;
    alert("vous etes inscrit a la prochaine journée de nettoyage, voici toute les informations qui vous concerne: votre nom est: "+nom+" ,votre prenom est: "+prenom+" ,votre email est: "+email+" et votre numero de telephone: "+tel);
}

function dechets() {
    let dechetss = document.getElementById("dechet");
    let marginLeft = parseInt(window.getComputedStyle(dechetss).marginLeft);
    let screenWidth = window.innerWidth; 
    let dechetWidth = dechetss.offsetWidth; 
    if (marginLeft + dechetWidth + 100 <= screenWidth) {
        dechetss.style.marginLeft = (marginLeft + 100) + "px";    
    }
}




function dSlide() {
    let i;
    let slides = document.getElementsByClassName("slidee");

    if (fIndex >= slides.length) {
        fIndex = 0;
    }

    if (fIndex < 0) {
        fIndex = slides.length - 1;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[fIndex].style.display = "block";
     
}
let fIndex = 0;

function showIndex(index) {
    fIndex = index;
    dSlide();
}
function prev(){
    let n = -1;
    sIndex = sIndex + n;
    dSlide();

}
function nextt(){
    let n = 1;
    fIndex = fIndex + n;
    dSlide();

}
function calcule(){
    let a = Number(document.getElementById("blasa").value);
    let b = Number(document.getElementById("blasa").value);
    c = a + b 
    document.getElementById("afiichage").value = c 
}