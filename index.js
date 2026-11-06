"use strict";
const inputGuessedMinNumber = document.getElementById("input-guessed-min-number");
const inputGuessedMaxNumber = document.getElementById("input-guessed-max-number");
const formGuessedNumber = document.getElementById("form-guessed-number");
const inputGuessNumber = document.getElementById("input-guess-number");
const formGuessNumber = document.getElementById("form-guess-number");
const guessRange = document.getElementById("guess-range");
const endingText = document.getElementById("ending-text");
const count = document.getElementById("count");
const hint = document.getElementById("hint");
const result = document.getElementById("result");
const endingResult = document.getElementById("ending-result");
const badResult = document.getElementById("bad-result");
const resetButton = document.getElementById("reset-button");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");
const error = document.getElementById("error");
const errorText = document.getElementById("error-text");
const maxAttempts = 10;
const checkButton = formGuessNumber.querySelector("button");
let guessedNumber;
let inputMin;
let inputMax;
let lastGuess;
let countLeft = maxAttempts;
let errorTimer;
function parseInteger(value) {
    const text = value.trim();
    if (!/^[+-]?\d+$/.test(text))
        return null;
    const number = Number(text);
    return Number.isSafeInteger(number) ? number : null;
}
function showError(message) {
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
function finishRound(message) {
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
    if (checkButton.disabled || formGuessNumber.classList.contains("hidden"))
        return;
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
