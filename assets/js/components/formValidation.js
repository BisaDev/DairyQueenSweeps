import $ from "jquery";
import inputMasker from 'imask';
import modalDropDown from "./uiAnimator"
import mParticleSetAttributes from "./mParticleSetUserAttribute";
import mParticleImplementation from "./mParticleImplementation";


class formValidation {
    constructor(formSelector, formElements, formInputs, inputLabel) {
        this.validOptions = false;
        this.errorInputSelector = null;
        this.inputSelector = formInputs;
        this.zipCodeFilter = /^([0-9]{5})$/;
        this.defaultFilter = /^[A-Za-z\s]+$/;
        this.mailingFilter = /^[#.0-9a-zA-Z\s,-]+$/;
        this.stateListener = ".form-group:nth-child(6)";
        this.phoneFilter = /^(([0-9-]{12})|([0-9-]{9}))$/;
        this.userDataForm = document.getElementById(formSelector);
        this.fullNameFilter = /^(.+\s{1}.{1,}|.+\s{1}.{3,}\s{1}.{1,})$/ ;
        this.formInputs = this.userDataForm.querySelectorAll(formInputs);
        this.formElements = this.userDataForm.querySelectorAll(formElements);
        this.cityInput = document.querySelector('input[name="city"]');
        this.phoneInput = document.querySelector('input[name="phone"]');
        this.zipInput = document.querySelector('input[name="zip-code"]');
        this.nameInput = document.querySelector('input[name="fullName"]');
        this.gameUrl = document.getElementsByName('redirectUrl')[0].value;
        this.emailInput = document.querySelector('input[name="emailAddress"]');
        this.checkboxes = this.userDataForm.querySelectorAll('input[type="checkbox"]');
        this.mailingInput = document.querySelector('input[name="mailingAddress"]');
        this.emailFilter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }

    init() {

        this.listenForFirstSubmit();
        this.inputOnFocus(this.userDataForm);
        this.customerID = mParticleImplementation();
        this.createStateDropDown();
        this.listenForCorrectionSubmit();
        this.iMasker();
    }

    iMasker(){
        this.phoneMasker = inputMasker(this.phoneInput , {
            mask: '###-###-####' , definitions: {'#' : /^[0-9]*$/}
        });
        this.zipMasker =  inputMasker(this.zipInput , {
            mask: '#####' , definitions: {'#' : /^[0-9]*$/}
        });
        this.cityMasker = inputMasker(this.cityInput , {
            mask: "cccccccccccccccccccc", definitions: {'c' : /^[a-zA-Z ]*$/}
        });
        this.nameMasker = inputMasker(this.nameInput , {mask: "******************************"});
        this.mailingMasker = inputMasker(this.mailingInput , {mask: "***********************************"});
    }

    createStateDropDown(){
        this.stateDropDown = new modalDropDown(this.stateListener , ".modal" , '.input-field[name="state"]' , '.modal-item-container' );
        this.stateDropDown.createList(".modal-item-container");
    }


    listenForFirstSubmit() {

        this.turnOffButton(true);

        $("input").on("input" , () => {
            this.checkInputs();
        });

        $('.state').change(() => {
            setTimeout(() =>{
                this.checkInputs();
            },200);
        });

    }

    checkInputs(){
        this.validOptions = 0;
        this.formInputs.forEach((field) => {

            if(field.value !== ""  && field.value.length >= 2) {
                this.inputIsValid=true
            } else {
                this.inputIsValid = false;
            }

            if (this.inputIsValid){
                this.validOptions++
            } else{
                this.validOptions--
            }

        });
        this.checkboxes.forEach((field) => {

            if(field.checked) {
                this.inputIsValid=true
            } else {
                this.inputIsValid = false;
            }

            if (this.inputIsValid){
                this.validOptions++
            } else{
                this.validOptions--
            }
        });


        if (this.validOptions === 10){
            this.turnOffButton(false);
        } else {
            this.turnOffButton(true)
        }


    }

    listenForCorrectionSubmit() {
        if (this.userDataForm) {
            $(this.userDataForm).on("submit", () => {

                event.preventDefault();
                $("input").off("input");
                this.startFormValidation();

                if (this.formValidity) {
                    $('body').off();
                    mParticleSetAttributes();
                    window.location.href = `${this.gameUrl}?id=${this.customerID}`;
                } else{
                    this.turnOffButton(true);
                }
            });
        }
    }

    startFormValidation() {

        this.formValidity = this.validateForm(this.userDataForm);
        if (this.formValidity) {
            this.turnOffButton(false );
            this.listenForCorrection(this.formElements , "change keydown input");


        } else {
            this.listenForCorrection(this.formElements , "change keydown input click");
            this.checkInputs();
            this.turnOffButton(true );

        }
    }

    validateForm() {
        this.validOptions = 0;
        this.formElements.forEach((field) => {
            this.parentField = field.parentElement;
            this.grandParent = this.parentField.parentElement;

            switch (field.name) {
                case 'emailAddress':
                    this.emailValue = field.value;
                    this.inputIsValid = this.filteredValidation(this.emailFilter, field, this.grandParent, "emailAddress");
                    break;
                case 'confirmEmail':
                    this.confirmValue = field.value;
                    this.inputIsValid = this.duplicateEmailValidation(field , this.grandParent , "confirmEmail" ,this.emailInput);
                    break;
                case 'state':
                    this.inputIsValid = this.texasValidation(field, this.grandParent, "texas");
                    break;
                case 'zip-code':
                    this.inputIsValid = this.filteredValidation(this.zipCodeFilter, field, this.grandParent, "zip-code");
                    break;
                case 'mailingAddress':
                    this.inputIsValid = this.filteredValidation(this.mailingFilter, field, this.grandParent, "mailingAddress");
                    break;
                case 'fullName':
                    this.inputIsValid = this.filteredValidation(this.fullNameFilter, field, this.grandParent, "fullName");
                    break;
                case 'phone':
                    this.inputIsValid = this.filteredValidation(this.phoneFilter, field, this.grandParent, "phone");
                    break;
                case 'aboveEighteen':
                    this.inputIsValid = this.checkboxValidation(field, this.parentField, field.name);
                    break;
                case 'termsAndConditions':
                    this.inputIsValid = this.checkboxValidation(field, this.parentField, field.name);
                    break;
                default:
                    this.inputIsValid = this.filteredValidation(this.defaultFilter, field, this.grandParent, field.name);
                    break;
            }

            if (this.inputIsValid){
                this.validOptions++
            } else{
                this.validOptions--
            }
        });
        return this.validOptions === 10;
    };

    turnOffButton(bool) {
        $(".btn").attr("disabled", bool);
    }

    filterValue(filter, elem) {
        return filter.test(elem);
    };


    addErrorClass(field, elem) {
        $(elem).addClass("error");
    };

    removeErrorClass(elem) {
        if ($(elem).hasClass('error')) {
            $(elem).removeClass('error');
        }
    };

    filteredValidation(filter, field, grandParent, errorFlag) {

        if (!this.filterValue(filter, field.value)) {
            this.addErrorClass(field, grandParent);
            this.errorMsgHandler(errorFlag);
            return false;
        } else  {
            this.removeErrorClass(grandParent);
            return true;
        }
    };

    duplicateEmailValidation (field ,grandParent , errorFlag ) {
        if(this.confirmValue.length === 0 || this.emailValue !== this.confirmValue || $('input[name="emailAddress"]').parents(".form-group").hasClass("error")){
            this.addErrorClass(field, grandParent);
            this.errorMsgHandler(errorFlag);
            return false
        } else if ( this.emailValue === this.confirmValue){
            this.removeErrorClass(grandParent);
            return true
        }
    }

    texasValidation (field ,grandParent , errorFlag ) {
       if (field.value === "Texas" ){
           this.addErrorClass(field, grandParent);
           this.errorMsgHandler(errorFlag);
           return false
       } else {
           this.removeErrorClass(grandParent);
           return true
       }
    }

    checkboxValidation(field, grandParent) {

        if (!field.checked) {
            this.addErrorClass(field, grandParent);
            return false;

        } else if (field.checked) {
            this.removeErrorClass(grandParent);
            return true;
        }
    };

    inputOnFocus() {
        this.formInputs.forEach((formInput) => {

            let formInputParent = formInput.parentElement;
            this.assignActiveClassOnFocus(formInput, formInputParent);
            this.removeActiveClassOnFocusOut(formInput, formInputParent);

        });
    };

    assignActiveClassOnFocus(formInput, formInputParent) {
        formInput.addEventListener("focus", () => {
            $(formInputParent).addClass('active');
        });
    };

    removeActiveClassOnFocusOut(formInput, formInputParent) {
        formInput.addEventListener("focusout", function () {
            if (this.value === '') {
                $(formInputParent).removeClass('active');
            }
        })
    };

    removeActiveLabel() {
        this.formInput = document.querySelector(this.inputSelector).parentElement;
        this.formInput.classList.remove('active')
    };

    errorMsgHandler(errorFlag) {
        switch (errorFlag) {
            case "emailAddress":
                this.displayErrorMessage(errorFlag, "enter a valid email address");
                break;
            case "confirmEmail":
                this.displayErrorMessage(errorFlag, "email address does not match");
                break;
            case "fullName":
                this.displayErrorMessage(errorFlag, "enter your full first & last name");
                break;
            case "mailingAddress":
                this.displayErrorMessage(errorFlag, "enter a valid mailing address");
                break;
            case "city":
                this.displayErrorMessage(errorFlag, "enter a valid city");
                break;
            case "state":
                this.displayErrorMessage(errorFlag, "enter a valid state");
                break;
            case "zip-code":
                this.displayErrorMessage(errorFlag, "enter a valid zip code");
                break;
            case "phone":
                this.displayErrorMessage(errorFlag, "enter a valid phone number");
                break;
            case "texas":
                this.displayErrorMessage("state", "This sweepstakes is not offered in the state of Texas");
                break;
        }

    }


    displayErrorMessage(selector, message) {
        this.inputLabel = $(this.inputSelector + '[name*=' + selector + ']').next();
        $(this.inputLabel).html(message);
    }

    listenForCorrection(inputType , eventType){
        this.errorInputSelector = $(inputType);
        this.errorInputSelector.on( eventType ,()=> {
            this.stopListening();
            this.startFormValidation();
        })
    }
    stopListening() {
        this.errorInputSelector.off();
    }

}

let onFormLoad = function onFormLoad() {
    let formValidator = new formValidation
    (
        'dq-form', '.required', '.input-field',
        '.input-label'
    );
    formValidator.init();
};


export default onFormLoad

