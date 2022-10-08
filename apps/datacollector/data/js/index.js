let sessionValid = {ssid: false, password: false, gateway: false, subnet: false, "static-ip": true};
const isStaticIPEnabled = document.getElementById("cb-static-ip");

function getUID() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const uid = document.getElementById("uid");
    const urlUID = urlParams.get('uid')

    uid.innerHTML = urlUID || "";
}

function changeVisibility(e) {
    document.getElementById("div-static-ip").style.visibility = "visible";
    if (e.checked) {
        document.getElementById("div-static-ip").style.visibility = "hidden";
    }

    validate(e);
}

function validate(e){
    let rgx;
    const element = document.getElementById(e.id);
    const newValue = element.value;
    const oldValue = newValue.slice(0, newValue.length - 1);
    const lastValue = newValue[newValue.length - 1];

    switch(e.id){
        case "gateway":
            rgx = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/;
            break;
        case "static-ip":
            rgx = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/;
            break;
        case "subnet":
            rgx = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/;
            break;
        case "ssid":
            rgx = /^[^!#;+\]\/"\t][^+\]\/"\t]{0,30}[^ +\]\/"\t]$|^[^ !#;+\]\/"\t]$[ \t]+$/;
            break;
        case "password":
            sessionValid.password = false;
            if (newValue.length >= 5){
                sessionValid.password = true;
            }
        case "cb-static-ip":
            sessionValid["static-ip"] = false;
            if (isStaticIPEnabled.checked) {
                sessionValid["static-ip"] = true;
            }
            break;
        default:
            break;
    }

    if(rgx) {
        sessionValid[e.id] = false;
        if(newValue.match(rgx)){
            sessionValid[e.id] = true;
        }
    }

    updateSession();
} 

function updateSession(){
    document.getElementById("save-btn").disabled = true;
    if (!Object.keys(sessionValid).some(key => sessionValid[key] === false)) {
        document.getElementById("save-btn").disabled = false;
    }
    console.log(sessionValid);
}
