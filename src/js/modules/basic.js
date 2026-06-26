import { handleFormSubmit, showResult } from './utils';

export const initBasicData = () => {
  //  1. Способи підключення JS до HTML:
  //    - Вбудований (Inline): &lt;button onclick="alert('Hi')"&gt;
  //    - Внутрішній (Internal): &lt;script&gt; /* код */ &lt;/script&gt;
  //    - Зовнішній (External): &lt;script src="main.js"&gt;&lt;/script&gt;

  // 2. Змінні для імені та прізвища:
  let userNameSurname = 'Флетчер Сілвер';
  const userFullName = 'Флетчер Сілвер';
  let clientFullName = 'Флетчер Сілвер';
  const accountNameAndSurname = 'Флетчер Сілвер';

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

  const CURRENT_YEAR = new Date().getFullYear();
  const EUR_EXCHANGE_RATE = 0.8818;

  // Норма 1: Привітання
  handleFormSubmit('form-greet', (data) => {
    showResult('result-greet', `Привіт, ${data['user_name']}!`);
  });

  // Норма 2: Вік
  handleFormSubmit('form-age', (data) => {
    const birthYear = parseInt(data['birth_year'], 10);
    showResult('result-age', `Ваш вік: ${CURRENT_YEAR - birthYear} років.`);
  });

  // Норма 3: Периметр квадрата
  handleFormSubmit('form-square', (data) => {
    const side = parseFloat(data['square_side']);
    showResult('result-square', `Периметр: ${(side * 4).toFixed(2)} см`);
  });

  // Максимум 3: Конвертер валют
  handleFormSubmit('form-currency', (data) => {
    const usd = parseFloat(data['usd_amount']);
    const eur = usd * EUR_EXCHANGE_RATE;
    showResult('result-currency', `${usd} USD = ${eur.toFixed(2)} EUR`);
  });
};
