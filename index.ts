const inputGuessedMinNumber = document.getElementById("input-guessed-min-number") as HTMLInputElement;
const inputGuessedMaxNumber = document.getElementById("input-guessed-max-number") as HTMLInputElement;
const formGuessedNumber = document.getElementById("form-guessed-number") as HTMLFormElement;
const inputGuessNumber = document.getElementById("input-guess-number") as HTMLInputElement;
const formGuessNumber = document.getElementById("form-guess-number") as HTMLFormElement;
const guessRange = document.getElementById("guess-range") as HTMLElement;
const endingText = document.getElementById("ending-text") as HTMLElement;
const count = document.getElementById("count") as HTMLElement;
const hint = document.getElementById("hint") as HTMLElement;
const result = document.getElementById("result") as HTMLElement;
const endingResult = document.getElementById("ending-result") as HTMLElement;
const badResult = document.getElementById("bad-result") as HTMLElement;
const resetButton = document.getElementById("reset-button") as HTMLButtonElement;
const yesButton = document.getElementById("yes-button") as HTMLButtonElement;
const noButton = document.getElementById("no-button") as HTMLButtonElement;
const error = document.getElementById("error") as HTMLElement;
const errorText = document.getElementById("error-text") as HTMLElement;

const maxAttempts = 10;
const checkButton = formGuessNumber.querySelector("button")!;
let guessedNumber: number;
let inputMin: number;
let inputMax: number;
let lastGuess: number;
let countLeft = maxAttempts;
let errorTimer: number | undefined;

function parseInteger(value: string): number | null {
    const text = value.trim();
    if (!/^[+-]?\d+$/.test(text)) return null;

    const number = Number(text);
    return Number.isSafeInteger(number) ? number : null;
}

function showError(message: string) {
    clearTimeout(errorTimer);
    errorText.textContent = message;
    error.classList.remove("hidden");
    errorTimer = window.setTimeout(() => error.classList.add("hidden"), 5000);
}

function hideError() {
    clearTimeout(errorTimer);
    error.classList.add("hidden");
}

function updateCount() {
    count.textContent = `Попыток осталось: ${countLeft}.`;
}

function finishRound(message: string) {
    checkButton.disabled = true;
    result.classList.remove("hidden");
    badResult.classList.add("hidden");
    endingResult.classList.remove("hidden");
    endingText.textContent = message;
    resetButton.focus();
}

formGuessedNumber.addEventListener("submit", (event) => {
    event.preventDefault();

    const min = parseInteger(inputGuessedMinNumber.value);
    const max = parseInteger(inputGuessedMaxNumber.value);
    if (min === null || max === null) {
        showError("Введите два целых числа.");
        return;
    }

    const rangeSize = max - min + 1;
    if (min >= max || !Number.isSafeInteger(rangeSize)) {
        showError("Укажите меньшую границу первой и выберите допустимый диапазон.");
        return;
    }

    hideError();
    inputMin = min;
    inputMax = max;
    guessedNumber = Math.floor(Math.random() * rangeSize) + min;
    countLeft = maxAttempts;
    updateCount();
    guessRange.textContent = `Вам загадали число от ${inputMin} до ${inputMax}.`;
    formGuessedNumber.reset();
    formGuessedNumber.classList.add("hidden");
    formGuessNumber.classList.remove("hidden");
    inputGuessNumber.focus();
});

formGuessNumber.addEventListener("submit", (event) => {
    event.preventDefault();
    if (checkButton.disabled || formGuessNumber.classList.contains("hidden")) return;

    const guess = parseInteger(inputGuessNumber.value);
    if (guess === null) {
        showError("Введите целое число.");
        return;
    }

    if (guess < inputMin || guess > inputMax) {
        showError(`Введите число от ${inputMin} до ${inputMax}.`);
        return;
    }

    hideError();
    lastGuess = guess;

    if (guess === guessedNumber) {
        finishRound(`Поздравляем! Вы угадали число ${guessedNumber}!`);
        return;
    }

    countLeft--;
    updateCount();
    if (countLeft === 0) {
        finishRound(`Попытки закончились. Было загадано число ${guessedNumber}.`);
        return;
    }

    hint.textContent = "";
    result.classList.remove("hidden");
    badResult.classList.remove("hidden");
});

resetButton.addEventListener("click", () => {
    hideError();
    formGuessNumber.reset();
    checkButton.disabled = false;
    result.classList.add("hidden");
    endingResult.classList.add("hidden");
    badResult.classList.add("hidden");
    formGuessNumber.classList.add("hidden");
    formGuessedNumber.classList.remove("hidden");
    inputGuessedMinNumber.focus();
});

yesButton.addEventListener("click", () => {
    hint.textContent = lastGuess > guessedNumber
        ? "Загаданное число меньше вашего."
        : "Загаданное число больше вашего.";
});

noButton.addEventListener("click", () => {
    badResult.classList.add("hidden");
    result.classList.add("hidden");
});
