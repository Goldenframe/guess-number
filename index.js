var inputGuessedMinNumber = document.getElementById("input-guessed-min-number");
var inputGuessedMaxNumber = document.getElementById("input-guessed-max-number");
var buttonGuessedNumber = document.getElementById("button-guessed-number");
var formGuessedNumber = document.getElementById("form-guessed-number");
var inputGuessNumber = document.getElementById("input-guess-number");
var formGuessNumber = document.getElementById("form-guess-number");
var guessRange = document.getElementById("guess-range");
var endingText = document.getElementById("ending-text");
var count = document.getElementById("count");
var hint = document.getElementById("hint");
var result = document.getElementById("result");
var endingResult = document.getElementById("ending-result");
var badResult = document.getElementById("bad-result");
var resetButton = document.getElementById("reset-button");
var yesButton = document.getElementById("yes-button");
var noButton = document.getElementById("no-button");
var error = document.getElementById("error");
var errorText = document.getElementById("error-text");
var guessedNumber;
var inputMax;
var inputMin;
var errorHandler = function (errorTextMessage) {
    error.classList.remove("hidden");
    errorText.textContent = errorTextMessage;
    setTimeout(function () { error.classList.add("hidden"); }, 5000);
};
formGuessedNumber.addEventListener("submit", function (e) {
    e.preventDefault();
    inputGuessNumber.value = '';
    if (inputGuessedMinNumber.value !== '' && inputGuessedMaxNumber.value !== '') {
        var minGuess = parseInt(inputGuessedMinNumber.value);
        var maxGuess = parseInt(inputGuessedMaxNumber.value);
        inputMin = Math.min(minGuess, maxGuess);
        inputMax = Math.max(minGuess, maxGuess);
        if (!isNaN(minGuess) && !isNaN(maxGuess)) {
            if (minGuess === maxGuess || minGuess > maxGuess) {
                errorHandler("Пожалуйста, введите данные корректно!");
            }
            else {
                guessedNumber = Math.floor(Math.random() * (inputMax - inputMin + 1) + inputMin);
                console.log(guessedNumber);
                formGuessedNumber.classList.toggle("hidden");
                formGuessNumber.classList.toggle("hidden");
                guessRange.textContent = "\u0412\u0430\u043C \u0437\u0430\u0433\u0430\u0434\u0430\u043B\u0438 \u0447\u0438\u0441\u043B\u043E \u043E\u0442 ".concat(inputMin, " \u0434\u043E ").concat(inputMax, ".");
                inputGuessedMinNumber.value = '';
                inputGuessedMaxNumber.value = '';
            }
        }
        else {
            errorHandler("Можно вводить только числа.");
        }
    }
    else {
        errorHandler("Пожалуйста, заполните оба поля!");
    }
});
var guessNumber;
var countLeft = 10;
count.textContent = "\u041F\u043E\u043F\u044B\u0442\u043E\u043A \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C: ".concat(countLeft, ".");
formGuessNumber.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!isNaN(parseInt(inputGuessNumber.value))) {
        guessNumber = parseInt(inputGuessNumber.value);
        if (guessNumber == guessedNumber) {
            formGuessNumber.querySelector("button").disabled = true;
            result.classList.remove("hidden");
            badResult.classList.add("hidden");
            endingResult.classList.toggle("hidden");
            endingText.textContent = "\u041F\u043E\u0437\u0434\u0440\u0430\u0432\u043B\u044F\u0435\u043C! \u0412\u044B \u0443\u0433\u0430\u0434\u0430\u043B\u0438! \u0411\u044B\u043B\u043E \u0437\u0430\u0433\u0430\u0434\u0430\u043D\u043E \u0447\u0438\u0441\u043B\u043E ".concat(guessedNumber, "!");
        }
        else {
            countLeft--;
            count.textContent = "\u041F\u043E\u043F\u044B\u0442\u043E\u043A \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C: ".concat(countLeft, ".");
            if (countLeft > 0) {
                hint.textContent = "";
                result.classList.remove("hidden");
                badResult.classList.remove("hidden");
            }
            else {
                formGuessNumber.querySelector("button").disabled = true;
                result.classList.remove("hidden");
                badResult.classList.add("hidden");
                endingResult.classList.toggle("hidden");
                endingText.textContent = "\u041A \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E, \u0432\u044B \u043F\u0440\u043E\u0438\u0433\u0440\u0430\u043B\u0438! \u0411\u044B\u043B\u043E \u0437\u0430\u0433\u0430\u0434\u0430\u043D\u043E \u0447\u0438\u0441\u043B\u043E ".concat(guessedNumber, "!");
            }
        }
    }
    else {
        if (inputGuessNumber.value == "") {
            errorHandler("Пожалуйста, введите число.");
        }
        else {
            errorHandler("Можно вводить только число.");
        }
    }
});
resetButton.addEventListener("click", function () {
    countLeft = 10;
    inputGuessNumber.value = '';
    formGuessNumber.querySelector("button").disabled = false;
    result.classList.add("hidden");
    endingResult.classList.toggle("hidden");
    badResult.classList.add("hidden");
    formGuessedNumber.classList.toggle("hidden");
    formGuessNumber.classList.toggle("hidden");
});
yesButton.addEventListener("click", function () {
    if (guessNumber > guessedNumber && guessNumber <= inputMax) {
        hint.textContent = "Загаданное число меньше вашего.";
    }
    else if (guessNumber < guessedNumber && guessNumber >= inputMin) {
        hint.textContent = "Загаданное число больше вашего.";
    }
    else if (guessNumber < inputMin || guessNumber > inputMax) {
        hint.textContent = "Ваше число вообще не входит в диапазон возможных значений... Возможно, дело в этом...";
    }
});
noButton.addEventListener("click", function () {
    badResult.classList.add("hidden");
    result.classList.add("hidden");
});
