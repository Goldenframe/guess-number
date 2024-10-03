const inputGuessedMinNumber = document.getElementById("input-guessed-min-number") as HTMLInputElement;
const inputGuessedMaxNumber = document.getElementById("input-guessed-max-number") as HTMLInputElement;
const buttonGuessedNumber = document.getElementById("button-guessed-number") as HTMLButtonElement;
const formGuessedNumber = document.getElementById("form-guessed-number") as HTMLFormElement;
const inputGuessNumber = document.getElementById("input-guess-number") as HTMLInputElement;
const formGuessNumber = document.getElementById("form-guess-number") as HTMLFormElement;
const guessRange = document.getElementById("guess-range") as HTMLElement;
const endingText = document.getElementById("ending-text") as HTMLElement;
const count = document.getElementById("count") as HTMLElement;
const hint = document.getElementById("hint") as HTMLElement;
const result = document.getElementById("result") as HTMLElement
const endingResult = document.getElementById("ending-result") as HTMLElement;
const badResult = document.getElementById("bad-result") as HTMLElement;
const resetButton = document.getElementById("reset-button") as HTMLButtonElement;
const yesButton = document.getElementById("yes-button") as HTMLButtonElement;
const noButton = document.getElementById("no-button") as HTMLButtonElement;
const error = document.getElementById("error") as HTMLElement;
const errorText = document.getElementById("error-text") as HTMLElement;


let guessedNumber: number;
let inputMax: number;
let inputMin: number;

const errorHandler = (errorTextMessage: string) => {
    error.classList.remove("hidden");
    errorText.textContent = errorTextMessage;
    setTimeout(() => { error.classList.add("hidden"); }, 5000);
}

formGuessedNumber.addEventListener("submit", (e) => {
    e.preventDefault();
    inputGuessNumber.value = '';
    if (inputGuessedMinNumber.value !== '' && inputGuessedMaxNumber.value !== '') {
        const minGuess = parseInt(inputGuessedMinNumber.value);
        const maxGuess = parseInt(inputGuessedMaxNumber.value);

        inputMin = Math.min(minGuess, maxGuess);
        inputMax = Math.max(minGuess, maxGuess);
        if (!isNaN(minGuess) && !isNaN(maxGuess)) {
            if (minGuess === maxGuess || minGuess > maxGuess) {
                errorHandler("Пожалуйста, введите данные корректно!")
            }
            else {
                guessedNumber = Math.floor(Math.random() * (inputMax - inputMin + 1) + inputMin);
                console.log(guessedNumber);
                formGuessedNumber.classList.toggle("hidden");
                formGuessNumber.classList.toggle("hidden");
                guessRange.textContent = `Вам загадали число от ${inputMin} до ${inputMax}.`;
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

})

let guessNumber: number;
let countLeft = 10;
count.textContent = `Попыток осталось: ${countLeft}.`;

formGuessNumber.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!isNaN(parseInt(inputGuessNumber.value))) {
        guessNumber = parseInt(inputGuessNumber.value);
        if (guessNumber == guessedNumber) {
            formGuessNumber.querySelector("button")!.disabled = true;
            result.classList.remove("hidden");
            badResult.classList.add("hidden");
            endingResult.classList.toggle("hidden");
            endingText.textContent = `Поздравляем! Вы угадали! Было загадано число ${guessedNumber}!`;
        }
        else {
            countLeft--;
            count.textContent = `Попыток осталось: ${countLeft}.`;
            if (countLeft > 0) {
                hint.textContent = "";
                result.classList.remove("hidden");
                badResult.classList.remove("hidden");
            }
            else {
                formGuessNumber.querySelector("button")!.disabled = true;
                result.classList.remove("hidden");
                badResult.classList.add("hidden");
                endingResult.classList.toggle("hidden");
                endingText.textContent = `К сожалению, вы проиграли! Было загадано число ${guessedNumber}!`;
            }
        }

    }
    else {
        if (inputGuessNumber.value == "") {
            errorHandler("Пожалуйста, введите число.")
        } else {
            errorHandler("Можно вводить только число.");
        }
    }
})

resetButton.addEventListener("click", () => {
    countLeft = 10;
    inputGuessNumber.value = '';
    formGuessNumber.querySelector("button")!.disabled = false;
    result.classList.add("hidden");
    endingResult.classList.toggle("hidden");
    badResult.classList.add("hidden");
    formGuessedNumber.classList.toggle("hidden");
    formGuessNumber.classList.toggle("hidden");
});

yesButton.addEventListener("click", () => {
    if (guessNumber > guessedNumber && guessNumber <= inputMax) {
        hint.textContent = "Загаданное число меньше вашего.";
    }
    else if (guessNumber < guessedNumber && guessNumber >= inputMin) {
        hint.textContent = "Загаданное число больше вашего.";
    }
    else if (guessNumber < inputMin || guessNumber > inputMax) {
        hint.textContent = "Ваше число вообще не входит в диапазон возможных значений... Возможно, дело в этом..."
    }

})

noButton.addEventListener("click", () => {
    badResult.classList.add("hidden");
    result.classList.add("hidden");

});