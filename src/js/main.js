import '../styles/main.css';

// 1. Способи підключення JS до HTML:
//    - Вбудований (Inline): &lt;button onclick="alert('Hi')"&gt;
//    - Внутрішній (Internal): &lt;script&gt; /* код */ &lt;/script&gt;
//    - Зовнішній (External): &lt;script src="main.js"&gt;&lt;/script&gt;

// 2. Змінні для імені та прізвища:
let userNameSurname = "Флетчер Сілвер";
const userFullName = "Флетчер Сілвер";
let clientFullName = "Флетчер Сілвер";
const accountNameAndSurname = "Флетчер Сілвер";

// Неправильні імена (закоментовані):
// let 1userName = "Fletcher"; // Починається з цифри
// let user-name = "Fletcher"; // Містить дефіс
// let let = "Fletcher";       // Використання зарезервованого слова
// let user name = "Fletcher"; // Містить пробіл
// let @username = "Fletcher"; // Недопустимий символ @

// 3. Способи коментування:
// Однорядковий коментар починається з двох слешів
/* Багаторядковий коментар
   знаходиться між цими символами
*/

// 4. Стилі написання імен змінних:
// - camelCase (найбільш пріоритетний у JS: myVariableName)
// - PascalCase (для класів та конструкторів: MyClassName)
// - snake_case (іноді використовується для даних з БД: my_variable_name)
// - UPPER_SNAKE_CASE (для констант: MAX_VALUE)

const CURRENT_YEAR = 2026;
const EUR_EXCHANGE_RATE = 0.8818; 

const handleFormSubmit = (formId, callback) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Basic validation check
        const inputs = form.querySelectorAll('input');
        const isValid = Array.from(inputs).every(input => input.value.trim() !== '');
        
        if (!isValid) {
            alert('Будь ласка, заповніть всі поля коректно.');
            return;
        }

        callback(event);
    });
};

// Норма 1: Привітання
handleFormSubmit('form-greet', () => {
    const nameInput = document.getElementById('user-name').value;
    const resultBox = document.getElementById('result-greet');
    resultBox.textContent = `Привіт, ${nameInput}!`;
});

// Норма 2: Вік
handleFormSubmit('form-age', () => {
    const birthYear = parseInt(document.getElementById('birth-year').value, 10);
    const resultBox = document.getElementById('result-age');
    
    if (birthYear > CURRENT_YEAR || birthYear < 1900) {
        resultBox.textContent = 'Помилка: Введено нереалістичний рік.';
        return;
    }
    
    const age = CURRENT_YEAR - birthYear;
    resultBox.textContent = `Ваш вік: ${age} років.`;
});

// Норма 3: Периметр квадрата
handleFormSubmit('form-square', () => {
    const side = parseFloat(document.getElementById('square-side').value);
    const resultBox = document.getElementById('result-square');
    const perimeter = side * 4;
    resultBox.textContent = `Периметр квадрата: ${perimeter.toFixed(2)} см`;
});


// Максимум 3: Конвертер валют
handleFormSubmit('form-currency', () => {
    const usd = parseFloat(document.getElementById('usd-amount').value);
    const resultBox = document.getElementById('result-currency');
    const eur = usd * EUR_EXCHANGE_RATE;
    resultBox.textContent = `${usd} USD = ${eur.toFixed(2)} EUR (Курс: ${EUR_EXCHANGE_RATE})`;
});