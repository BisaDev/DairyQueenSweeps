import loadFormValidator from "./components/formValidation";
import loadGameManager from "./components/gameManager";

document.addEventListener("DOMContentLoaded", function () {

    if (window.location.pathname.indexOf("game")!==-1){

        loadGameManager();

    } else if (window.location.pathname.includes("register.html")){

        loadFormValidator();
    }

});
