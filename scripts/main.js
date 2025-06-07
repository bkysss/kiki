// const myHeading = document.getElementById("kiki likes");
// myHeading.textContent = "Kiki最喜欢";

const myImage = document.querySelector("img");

myImage.onclick = () => {
    const mySrc = myImage.getAttribute("src");
    if (mySrc === "images/cdl1.jpg") {
        myImage.setAttribute("src", "images/cdl3.jpg");
    } else {
        myImage.setAttribute("src", "images/cdl1.jpg");
    }
};

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
    const myName = prompt("输入新昵称");
    if (!myName) {
        setUserName();
    } else {
        localStorage.setItem("name", myName);
        myHeading.textContent = `My Cute ${myName}`;
    }
}

if (!localStorage.getItem("name")) {
    setUserName();
} else {
    const storedName = localStorage.getItem("name");
    myHeading.textContent = `My Cute ${storedName}`;
}

myButton.onclick = function () {
    setUserName();
};

