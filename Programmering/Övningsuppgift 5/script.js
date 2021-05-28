
/*
verifyID
0=nameOK 
1=emailOK
2=addressOK
3=zipOK
4=cityOK
5=userOK
6=passwordOK
*/ 
const nameID = 0
const mailID = 1
const addressID = 2
const zipID = 3
const cityID = 4
const userID = 5
const passID = 6
const confirmID = 7

let verified = [false,false,false,false,false,false,false,false]

let submitButton = document.getElementById("registerButton")
if(submitButton != null)
    submitButton.disabled = true

//save variables for loginscreen
let FDBName = ""
let FDBEmail = ""
let FDBAddress = ""
let FDBZip = ""
let FDBCity = ""
let FDBUser = ""
let FDBPassword = ""

const changeErrorText = (elem, newText, id) =>{
    elem.innerText = newText
    if(newText === "")
        verified[id] = true
    else
        verified[id] = false

        formVerified()
}

const formVerified = () =>{
    allClear = true
    for(i=0; i<verified.length; i++)
        if(verified[i]==false)
            allClear = false
    
    if(allClear === true)
        submitButton.disabled = false
    else
        submitButton.disabled = true
}

//Letters, - and spaces
const validateName = (event) =>{    
    const regex = /^[a-öA-Ö- ]{2,}$/;        
    let element = document.getElementById("nameInputError")
    if(!regex.test(event.target.value.trim()))
        changeErrorText(element, "Invalid name", nameID)      
    else
        changeErrorText(element, "", nameID)
}

//lets trust lecture expression for this one -_-
const validateEmail = (event) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let element = document.getElementById("emailInputError")
    if(!regex.test(event.target.value.trim()))
        changeErrorText(element, "Not a valid email address", mailID)      
    else
        changeErrorText(element, "", mailID)
}

//letters numbers and spaces
const validateAddress = (event) =>{    
    const regex = /^[a-öA-Ö0-9 ]{2,}$/;
    let element = document.getElementById("addressInputError")
    if(!regex.test(event.target.value.trim()))
        changeErrorText(element, "Address must be at least 2 characters", addressID)      
    else
        changeErrorText(element, "", addressID)
}

//only numbers and spaces
const validateZip = (event) =>{
    const regex = /^[0-9 ]*$/;
    let element = document.getElementById("zipInputError")
    if(!regex.test(event.target.value.trim()))
        changeErrorText(element, "Not a valid zipcode", zipID)      
    else
        changeErrorText(element, "", zipID)
}

//Just letters and spaces
const validateCity = (event) =>{
    const regex = /^[a-öA-Ö ]{2,}$/;
    let element = document.getElementById("cityInputError")
    if(!regex.test(event.target.value.trim()))
        changeErrorText(element, "City name must be at least 2 characters", cityID)      
    else
        changeErrorText(element, "", cityID)   
}

//most characters allowed
const validateUserName = (event) =>{
    const regex = /^[a-öA-Ö0-9\-\_\!\?\# ]{2,}$/;
    let element = document.getElementById("usernameInputError")
    if(!regex.test(event.target.value.trim()))
        changeErrorText(element, "Invalid user name", userID)      
    else
        changeErrorText(element, "", userID)  
}

//another trust the lecture expression. most things allowed
const validatePassword = (event) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    let element = document.getElementById("passwordInputError")
    if(!regex.test(event.target.value.trim()))
        changeErrorText(element, "Invalid password", passID)      
    else
        changeErrorText(element, "", passID)  
    confirmPassword()
}

//check agains password field
const confirmPassword = () =>{
    const originalPW = document.getElementById("registerPasswordInput").value
    const confirmPW = document.getElementById("registerPasswordConfirm").value
    
    let element = document.getElementById("confirmInputError")
    if(originalPW !== confirmPW)
        changeErrorText(element, "Does not match", confirmID)      
    else
        changeErrorText(element, "", confirmID)  
}

//called when submit button is pressed. All fields should already be validated at this point
const submitRegistration = (event) =>{
    event.preventDefault()
    
    /*
    FDBName = event.target['fname'].value.trim()
    FDBEmail = event.target['email'].value.trim()
    FDBAddress = event.target['address'].value.trim()
    FDBZip = event.target['zipcode'].value.trim()
    FDBCity = event.target['city'].value.trim()
    */
    FDBUser = event.target['uname'].value.trim()
    FDBPassword = event.target['password'].value.trim()
    

    //store data that will be compared to on the loginscreen
    sessionStorage.setItem("FDBUser",FDBUser);
    sessionStorage.setItem("FDBPassword",FDBPassword);
    

    window.location.replace("login.html")
}


const loginClick = () =>{
    let usernameAttempt = document.getElementById("loginUserInput").value
    let passwordAttempt = document.getElementById("loginPassInput").value
    
    if(usernameAttempt === sessionStorage.getItem("FDBUser") && passwordAttempt === sessionStorage.getItem("FDBPassword"))
        window.location.replace("loginsuccess.html")
    else{
        document.getElementById("loginUserInput").value = ""
        document.getElementById("loginPassInput").value = ""
    }
}