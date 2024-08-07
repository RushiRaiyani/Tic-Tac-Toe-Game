//varaibles,arrays,objects
let signTemp = 1;
let isWinned = false;
let pointsPlayer1 = 0;
let pointsPlayer2 = 0;
let signplayer1 = 'X';
let signplayer2 = 'O';
let winnedSign = "W";
let player1 = "";
let player2 = "";
let win = [];
let isStart = false;
let mode = "multiplayer";
let undoArr = [];
let emptyArr = [];
let signs = {
    btn1: "",
    btn2: "",
    btn3: "",
    btn4: "",
    btn5: "",
    btn6: "",
    btn7: "",
    btn8: "",
    btn9: "",
}

function selectPlayerSingle() {
    document.getElementById("player2").style.display = "none";
    mode = "singleplayer";
    document.getElementById('firstTurn').innerText = "X";
}

function selectPlayerMulti() {
    document.getElementById("player2").style.display = "block";
    mode = "multiplayer";
    document.getElementById('firstTurn').innerText = "X (First Turn)";
}

function playerDetail() {
    const selectedRadio = document.querySelector('input[name="option"]:checked');
    const result = selectedRadio ? selectedRadio.value : 'X';
    signplayer1 = result;
    signplayer2 = result === 'X' ? 'O' : 'X';
    document.getElementById("screenPointsPlayer1").innerHTML = `${signplayer1}-Points :  <span style="color: #83fff1cf;">${pointsPlayer1}</span>`;
    document.getElementById("screenPointsPlayer2").innerHTML = `${signplayer2}-Points :  <span style="color: #83fff1cf;">${pointsPlayer2}</span>`;
    // document.getElementById('selectedOption').innerText = 'Selected Option: ' + result;
    let player1 = document.getElementById("player1").value;
    if (mode == "multiplayer") {
        player2 = document.getElementById("player2").value;
    }
    else {
        player2 = "computer";
    }
    document.getElementById("screenPlayer1").innerHTML = `Player-1 : <span style="color: #83fff1cf;">${player1}</span>`;
    document.getElementById("screenPlayer2").innerHTML = `Player-2 : <span style="color: #83fff1cf;">${player2}</span>`;

    //checking that is anyone one of radio button is ticked or not
    let check1 = document.getElementById("option1").checked;
    let check2 = document.getElementById("option2").checked;
    if (check1 == true || check2 == true) {
        isStart = true;
    }
}

document.getElementById("start").removeAttribute('onclick');

function undo() {
    if (signTemp === 1) {
        signTemp = 2;
    }
    else if (signTemp === 2) {
        signTemp = 1;
    }
    let temp = undoArr.pop();
    signs[temp] = "";
    document.getElementById(temp).innerText = "";
    document.getElementById(temp).style.backgroundColor = "#e9e7fb";
}
function board(element) {
    //if isStart is true than game can be started
    if (isStart == false) {
        clearAll();
        document.getElementById('start').click();
    }
    else if (element.innerText == '') {
        document.getElementById('start').classList.remove('no-click');
        const start = document.getElementById('start');
        // Set the onclick attribute
        start.onclick = undo;
        document.getElementById('start').innerText = "Undo";
        if (mode == "multiplayer") {
            if (signTemp == 1) {
                element.innerText = "X";
                element.style.backgroundColor = "rgb(113, 113, 113)";
                signTemp = 2;
                signs[element.id] = "X";
            }
            else {
                element.innerText = "O";
                element.style.backgroundColor = "rgb(64, 64, 64)";
                signTemp = 1;
                signs[element.id] = "O";
            }
            undoArr.push(element.id);
            checkWin();
        }
        else {
            if (signTemp == 1) {
                element.innerText = signplayer1;
                element.style.backgroundColor = "rgb(113, 113, 113)";
                signs[element.id] = signplayer1;
                signTemp = 2;
                undoArr.push(element.id);
                checkWin();
            }
            setTimeout(() => {
                if (isWinned != true && signTemp == 2) {
                    findEmpty();
                    let compSign = emptyArr[Math.floor(Math.random() * emptyArr.length)];
                    let temp = powerComp();
                    if (temp !== false) {
                        compSign = temp;
                    }
                    signs[compSign] = signplayer2;
                    document.getElementById(compSign).innerText = signplayer2;
                    document.getElementById(compSign).style.backgroundColor = "rgb(64, 64, 64)";
                    emptyArr.splice(0, emptyArr.length);
                    signTemp = 1;
                    undoArr.push(compSign);
                    checkWin();
                }
            }, 1000);
        }
        //undo
        document.getElementById("start").setAttribute('onclick', 'undo()');
        // Remove data-bs-toggle and data-bs-target attributes
        const startButton = document.getElementById('start');
        startButton.removeAttribute('data-bs-toggle');
        startButton.removeAttribute('data-bs-target');
    }
}

function powerComp() {
    if ((signs.btn3 === signs.btn2 && signs.btn2 !== "" && signs.btn1 == "") || (signs.btn5 === signs.btn9 && signs.btn5 !== "" && signs.btn1 == "") || (signs.btn4 === signs.btn7 && signs.btn4 !== "" && signs.btn1 == "")) {
        return "btn1";
    } else if ((signs.btn3 === signs.btn1 && signs.btn1 !== "" && signs.btn2 == "") || (signs.btn5 === signs.btn8 && signs.btn5 !== "" && signs.btn2 == "")) {
        return "btn2";
    } else if ((signs.btn1 === signs.btn2 && signs.btn2 !== "" && signs.btn3 == "") || (signs.btn5 === signs.btn7 && signs.btn5 !== "" && signs.btn3 == "") || (signs.btn6 === signs.btn9 && signs.btn9 !== "" && signs.btn3 == "")) {
        return "btn3";
    } else if ((signs.btn1 === signs.btn7 && signs.btn1 !== "" && signs.btn4 == "") || (signs.btn5 === signs.btn6 && signs.btn5 !== "" && signs.btn4 == "")) {
        return "btn4";
    } else if ((signs.btn1 === signs.btn9 && signs.btn1 !== "" && signs.btn5 == "") || (signs.btn2 === signs.btn8 && signs.btn2 !== "" && signs.btn5 == "") || (signs.btn3 === signs.btn7 && signs.btn3 !== "" && signs.btn5 == "") || (signs.btn4 === signs.btn6 && signs.btn4 !== "" && signs.btn5 == "")) {
        return "btn5";
    } else if ((signs.btn3 === signs.btn9 && signs.btn9 !== "" && signs.btn6 == "") || (signs.btn5 === signs.btn4 && signs.btn5 !== "" && signs.btn6 == "")) {
        return "btn6";
    } else if ((signs.btn3 === signs.btn5 && signs.btn3 !== "" && signs.btn7 == "") || (signs.btn8 === signs.btn9 && signs.btn8 !== "" && signs.btn7 == "") || (signs.btn4 === signs.btn1 && signs.btn4 !== "" && signs.btn7 == "")) {
        return "btn7";
    } else if ((signs.btn7 === signs.btn9 && signs.btn7 !== "" && signs.btn8 == "") || (signs.btn5 === signs.btn2 && signs.btn5 !== "" && signs.btn8 == "")) {
        return "btn8";

    } else if ((signs.btn7 === signs.btn8 && signs.btn7 !== "" && signs.btn9 == "") || (signs.btn5 === signs.btn1 && signs.btn5 !== "" && signs.btn9 == "") || (signs.btn3 === signs.btn6 && signs.btn3 !== "" && signs.btn9 == "")) {
        return "btn9";
    } else {
        return false;
    }
}

function findEmpty() {
    if (signs.btn1 == '') {
        emptyArr.push("btn1");
    } if (signs.btn2 == '') {
        emptyArr.push("btn2");
    } if (signs.btn3 == '') {
        emptyArr.push("btn3");
    } if (signs.btn4 == '') {
        emptyArr.push("btn4");
    } if (signs.btn5 == '') {
        emptyArr.push("btn5");
    } if (signs.btn6 == '') {
        emptyArr.push("btn6");
    } if (signs.btn7 == '') {
        emptyArr.push("btn7");
    } if (signs.btn8 == '') {
        emptyArr.push("btn8");
    } if (signs.btn9 == '') {
        emptyArr.push("btn9");
    }
}

function isAllFilled() {
    for (let key in signs) {
        if (signs[key] === '') {
            return false;
        }
    }
    return true;
}
//win effect after each round
function scaleDiv(btn1, btn2, btn3) {
    const div1 = document.getElementById(btn1);
    div1.style.transition = 'transform 0.5s ease';
    div1.style.transform = 'scale(1.05)';
    div1.style.transformOrigin = 'center';
    div1.style.backgroundColor = "rgb(91, 92, 124)";

    const div2 = document.getElementById(btn2);
    div2.style.transition = 'transform 0.5s ease';
    div2.style.transform = 'scale(1.05)';
    div2.style.transformOrigin = 'center';
    div2.style.backgroundColor = "rgb(91, 92, 124)";

    const div3 = document.getElementById(btn3);
    div3.style.transition = 'transform 0.5s ease';
    div3.style.transform = 'scale(1.05)';
    div3.style.transformOrigin = 'center';
    div3.style.backgroundColor = "rgb(91, 92, 124)";
}

function checkWin() {
    if (signs.btn1 === signs.btn2 && signs.btn1 === signs.btn3 && signs.btn1 !== "") {
        isWinned = true;
        scaleDiv("btn1", "btn2", "btn3");
        winnedSign = signs.btn1;
    } else if (signs.btn4 === signs.btn5 && signs.btn4 === signs.btn6 && signs.btn4 !== "") {
        isWinned = true;
        winnedSign = signs.btn4;
        scaleDiv("btn4", "btn5", "btn6");
    } else if (signs.btn7 === signs.btn8 && signs.btn7 === signs.btn9 && signs.btn7 !== "") {
        isWinned = true;
        winnedSign = signs.btn7;
        scaleDiv("btn7", "btn8", "btn9");
    } else if (signs.btn1 === signs.btn4 && signs.btn1 === signs.btn7 && signs.btn1 !== "") {
        isWinned = true;
        winnedSign = signs.btn1;
        scaleDiv("btn1", "btn4", "btn7");
    } else if (signs.btn2 === signs.btn5 && signs.btn2 === signs.btn8 && signs.btn2 !== "") {
        isWinned = true;
        winnedSign = signs.btn2;
        scaleDiv("btn5", "btn2", "btn8");
    } else if (signs.btn3 === signs.btn6 && signs.btn3 === signs.btn9 && signs.btn3 !== "") {
        isWinned = true;
        winnedSign = signs.btn3;
        scaleDiv("btn9", "btn6", "btn3");
    } else if (signs.btn1 === signs.btn5 && signs.btn1 === signs.btn9 && signs.btn1 !== "") {
        isWinned = true;
        winnedSign = signs.btn1;
        scaleDiv("btn1", "btn9", "btn5");
    } else if (signs.btn3 === signs.btn5 && signs.btn3 === signs.btn7 && signs.btn3 !== "") {
        isWinned = true;
        winnedSign = signs.btn3;
        scaleDiv("btn3", "btn7", "btn5");
    } else {
        isWinned = false;
        isWinned = isAllFilled(); // checking for all boxes filled or not
    }
    if (isWinned) {
        //points increment
        if (winnedSign == signplayer1) {
            win.push("player 1");//adding winner to win object
            pointsPlayer1++;
            document.getElementById("screenPointsPlayer1").innerText = signplayer1 + "-Points: " + pointsPlayer1;
            document.getElementById("screenPointsPlayer3").innerText = signplayer1 + "-Points: " + pointsPlayer1;
        } else if (winnedSign == signplayer2) {
            win.push("player 2");//adding winner to win object
            pointsPlayer2++;
            document.getElementById("screenPointsPlayer2").innerText = signplayer2 + "-Points: " + pointsPlayer2;
            document.getElementById("screenPointsPlayer4").innerText = signplayer2 + "-Points: " + pointsPlayer2;
        }
        else {
            document.getElementById("screenPointsPlayer1").innerText = signplayer1 + "-Points: " + pointsPlayer1;
            document.getElementById("screenPointsPlayer2").innerText = signplayer2 + "-Points: " + pointsPlayer2;
            document.getElementById("screenPointsPlayer3").innerText = signplayer1 + "-Points: " + pointsPlayer1;
            document.getElementById("screenPointsPlayer4").innerText = signplayer2 + "-Points: " + pointsPlayer2;
            win.push("tie");//adding tie to win object
        }
        //disabled boxes
        disabledBoxes();
        rounds(); document.getElementById('start').classList.add('no-click');

        winnedSign = 'W';
    }
}

//disabled boxes
function disabledBoxes() {
    let boxes = document.getElementsByClassName('box');
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.add('no-click');//adding classes
    }
}

function rounds() {
    let rightpart = document.getElementById('rightpart');
    rightpart.innerHTML = '<h2>Rounds:</h2>'; // Clear existing content

    // Get the last 10 elements of the array or the entire array if it's less than 10 elements
    let lastRounds = win.slice(Math.max(win.length - 10, 0));
    let startRound = win.length > 10 ? win.length - 10 + 1 : 1;

    lastRounds.forEach((winner, index) => {
        let roundNumber = startRound + index;
        let roundText = `Round ${roundNumber}: ${winner}`;
        let temp = `<p class="card-text">${roundText}</p>`;
        rightpart.innerHTML += temp;
    });
}

function clearAll() {
    if (isWinned) {
        let boxes = document.getElementsByClassName('box');
        for (let key in signs) {
            boxes[key].style.transform = 'scale(1)';//scaled out
            boxes[key].classList.remove('no-click');//removing classes
            signs[key] = "";
            document.getElementById(key).innerText = "";
            document.getElementById(key).style.backgroundColor = "#e9e7fb";
        }
        signTemp = 1;
    }
    isWinned = false;
}

function resetGame() {
    clearAll();
    selectPlayerMulti();
    document.getElementById('start').classList.remove('no-click');
    document.getElementById("start").removeAttribute('onclick');
    document.getElementById('start').innerText = "Start";//start will again come
    const endCloseButton = document.getElementById('endCloseButton');
    const exampleModalLabelWin = document.getElementById('exampleModalLabelWin');
    let countdown = 3; // Countdown seconds
    if (pointsPlayer1 > pointsPlayer2) {
        document.getElementById('exampleModalLabelWin').innerText = "Player 1 Wins";
    }
    else if (pointsPlayer1 < pointsPlayer2) {
        document.getElementById('exampleModalLabelWin').innerText = "Player 2 Wins";
    }
    else {
        document.getElementById('exampleModalLabelWin').innerText = 'It\'s a Tie';
    }
    // Clear board
    let boxes = document.getElementsByClassName('box');
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerText = ""; // Clear text
        boxes[i].style.backgroundColor = "#e9e7fb"; // Reset background color
        boxes[i].classList.remove('no-click'); // Allow clicks
    }
    signplayer1 = 'X';
    signplayer2 = 'O';
    winnedSign = "W";
    player1 = "";
    player2 = "";
    win = [];

    isStart = false;
    mode = "multiplayer";
    // Reset game state
    signs = {
        btn1: "",
        btn2: "",
        btn3: "",
        btn4: "",
        btn5: "",
        btn6: "",
        btn7: "",
        btn8: "",
        btn9: "",
    };
    signTemp = 1;
    isWinned = false;
    winnerSign = "";
    undoModeOn = false;
    undoArr = [];
    // Clear points
    pointsPlayer1 = 0;
    pointsPlayer2 = 0;
    document.getElementById("screenPointsPlayer1").innerText = "Points: " + pointsPlayer1;
    document.getElementById("screenPointsPlayer2").innerText = "Points: " + pointsPlayer2;

    // Clear player names
    document.getElementById("screenPlayer1").innerText = "Player-1: ";
    document.getElementById("screenPlayer2").innerText = "Player-2: ";

    // Get all radio buttons
    const radios = document.querySelectorAll('input[name="option"]');

    // Iterate through the radio buttons
    radios.forEach(radio => {
        if (radio.checked) {
            // Uncheck the selected radio button
            radio.checked = false;
        }
    });

    // Clear rounds
    win = [];
    rounds();//clearing rounds
    // Disable the button and start the countdown
    endCloseButton.classList.add('disabled');
    let countdownInterval = setInterval(() => {
        if (countdown > 0) {
            endCloseButton.innerText = countdown; // Show countdown number
            countdown--;
        } else {
            clearInterval(countdownInterval); // Stop the countdown
            endCloseButton.innerText = 'Close'; // Set button text to 'Close'
            endCloseButton.classList.remove('disabled'); // Enable the button
        }
    }, 1000);
    // Add data-bs-toggle and data-bs-target attributes back
    const startButton = document.getElementById('start');
    startButton.setAttribute('data-bs-toggle', 'modal');
    startButton.setAttribute('data-bs-target', '#staticBackdrop');
}