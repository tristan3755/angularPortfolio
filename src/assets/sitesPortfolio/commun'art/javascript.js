document.documentElement.addEventListener("mousemove", (e) => {
    document.documentElement.style.setProperty("--x", e.clientX + "px");
    document.documentElement.style.setProperty("--y", e.clientY + "px");
  });
  let monInscription = document.getElementById("sect1");
  let monBlocInscription = document.createElement("section");
  monBlocInscription.style.position="fixed"
  monBlocInscription.style.zIndex="10"
  monBlocInscription.classList = "blocInscription";
  let bontonFermeture = document.createElement("div");
  bontonFermeture.classList = "bontonFermeture";
 
  
  let inputInscription = document.createElement("input");
  inputInscription.type = "text";
  inputInscription.placeholder = "username";
  
  inputInscription.addEventListener("click", () => {
    inputInscription.style.width = "500px";
  });
  
  let inputPassword = document.createElement("input");
  inputPassword.type = "password";
  inputPassword.placeholder = "mot de passe";
  
  inputPassword.addEventListener("click", () => {
    inputPassword.style.width = "500px";
  });
  
  let validation = document.createElement("p");
  validation.className = "boutonInscriptionFormulaire";
  validation.innerHTML = "s'inscrire";
  
  monBlocInscription.appendChild(inputInscription);
  monBlocInscription.appendChild(inputPassword);
  monBlocInscription.appendChild(validation);
  
  monBlocInscription.appendChild(bontonFermeture);
  monInscription.appendChild(monBlocInscription);
  
  let boutonInscription = document.querySelector(".boutonInscription");
  boutonInscription.addEventListener("click", () => {
    monBlocInscription.style.display = "flex";
  });
  
  bontonFermeture.addEventListener("click", () => {
    monBlocInscription.style.display = "none";
  });
  /*connexion*/
  let maCo = document.getElementById("sect1");
  let monBlocCo = document.createElement("section");
  monBlocCo.style.position="fixed"
  monBlocCo.style.zIndex="10"
  monBlocCo.classList = "blocInscription";
  let bontonFermetureCo = document.createElement("div");
  bontonFermetureCo.classList = "bontonFermeture";
  
  let inputCo = document.createElement("input");
  inputCo.type = "text";
  inputCo.placeholder = "username";
  
  inputCo.addEventListener("click", () => {
    inputCo.style.width = "500px";
  });
  
  let inputPasswordCo = document.createElement("input");
  inputPasswordCo.type = "password";
  inputPasswordCo.placeholder = "mot de passe";
  
  inputPasswordCo.addEventListener("click", () => {
    inputPasswordCo.style.width = "500px";
  });
  
  let validationCo = document.createElement("p");
  validationCo.className = "boutonInscriptionFormulaire";
  validationCo.innerHTML = "connexion";
  
  monBlocCo.appendChild(inputCo);
  monBlocCo.appendChild(inputPasswordCo);
  monBlocCo.appendChild(validationCo);
  
  monBlocCo.appendChild(bontonFermetureCo);
  maCo.appendChild(monBlocCo);
  
  let boutonCo= document.querySelector(".boutonConnexion");
  boutonCo.addEventListener("click", () => {
    monBlocCo.style.display = "flex";
  });
  
  bontonFermetureCo.addEventListener("click", () => {
    monBlocCo.style.display = "none";
  });
  
  /*slider*/
  
  const slider = document.querySelector(".carteArticle");
  const taille = window.innerWidth;
  console.log(taille);
  let compteur = 1;
  
  let sectionControle = document.getElementById("sliderControl");
  
  let boutonLeft = document.createElement("a");
  boutonLeft.classList = "boutonScroll";
  boutonLeft.style.backgroundImage = "url(./images/droit.png)";
  boutonLeft.style.backgroundSize = "contain";
  boutonLeft.style.backgroundRepeat = "no-repeat";
  boutonLeft.style.height = "40px";
  boutonLeft.style.width = "40px";
  
  let boutonRight = document.createElement("a");
  boutonRight.classList = "boutonScroll";
  boutonRight.style.backgroundImage = "url(./images/gauche.png)";
  boutonRight.style.backgroundSize = "contain";
  boutonRight.style.backgroundRepeat = "no-repeat";
  boutonRight.style.height = "40px";
  boutonRight.style.width = "40px";
  
  let point1 = document.createElement("div");
  point1.className = "point1";
  point1.style.backgroundColor = "white";
  if (compteur == 1) {
    point1.style.backgroundColor = "#ff3f34";
  } else {
    point1.style.backgroundColor = "white";
  }
  let point2 = document.createElement("div");
  point2.className = "point2";
  point2.style.backgroundColor = "white";
  let point3 = document.createElement("div");
  point3.className = "point3";
  point3.style.backgroundColor = "white";
  boutonLeft.addEventListener("click", () => {
    let article = document.getElementById("slider");
    if (compteur < 3) {
      compteur++
    }
    if (compteur == 1) {
      point1.style.backgroundColor = "#ff3f34";
    } else {
      point1.style.backgroundColor = "white";
    }
    if (compteur == 2) {
      point2.style.backgroundColor = "#ff3f34";
    } else {
      point2.style.backgroundColor = "white";
    }
    if (compteur == 3) {
      point3.style.backgroundColor = "#ff3f34";
    } else {
      point3.style.backgroundColor = "white";
    }
    article.scroll(taille * compteur - innerWidth, 0);
    console.log(compteur);
  });
  boutonRight.addEventListener("click", () => {
    let article = document.getElementById("slider");
    if (compteur > 1) {
      compteur--
    }
    if (compteur == 1) {
      point1.style.backgroundColor = "#ff3f34";
    } else {
      point1.style.backgroundColor = "white";
    }
    if (compteur == 2) {
      point2.style.backgroundColor = "#ff3f34";
    } else {
      point2.style.backgroundColor = "white";
    }
    if (compteur == 3) {
      point3.style.backgroundColor = "#ff3f34";
    } else {
      point3.style.backgroundColor = "white";
    }
    article.scroll(taille * compteur - innerWidth, 0);
    console.log(compteur);
  });
  sectionControle.appendChild(boutonRight);
  sectionControle.appendChild(point1);
  sectionControle.appendChild(point2);
  sectionControle.appendChild(point3);
  sectionControle.appendChild(boutonLeft);
  