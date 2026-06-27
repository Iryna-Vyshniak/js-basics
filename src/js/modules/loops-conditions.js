import { showResult, handleFormSubmit } from './utils';

// ==========================================
// БЛОК 1: МІНІМУМ
// ==========================================

// 1. Визначення віку
export const getAgeCategory = (age) => {
    if (isNaN(age) || age < 0 || age > 120) return 'Некоректний вік';
    if (age <= 11) return 'Дитина';
    if (age <= 17) return 'Підліток';
    if (age <= 59) return 'Дорослий';
    return 'Пенсіонер';
};

// 2. Спецсимволи
export const getSpecialSymbol = (digit) => {
    const symbols = [')', '!', '@', '#', '$', '%', '^', '&', '*', '('];
    return symbols[digit] ?? 'Очікується цифра від 0 до 9';
};

// 3. Сума діапазону
export const calculateRangeSum = (start, end) => {
    const min = Math.min(start, end);
    const max = Math.max(start, end);
    let sum = 0;
    for (let i = min; i <= max; i++) sum += i;
    return sum;
};

//  Оптимізовано: O(1) замість O(N)
// export const calculateRangeSum = (start, end) => {
//   const min = Math.min(start, end);
//   const max = Math.max(start, end);
//   return ((max - min + 1) * (min + max)) / 2;
// };

// 4. НСД
export const getGCD = (a, b) => {
    let absA = Math.abs(a);
    let absB = Math.abs(b);
    while (absB) {
        const temp = absB;
        absB = absA % absB;
        absA = temp;
    }
    return absA;
};

// export const getGCD = (a, b) => {
//   let [absA, absB] = [Math.abs(a), Math.abs(b)];
//   while (absB) {
//     [absA, absB] = [absB, absA % absB];
//   }
//   return absA;
// };

// 5. Усі дільники
export const getAllDivisors = (num) => {
    const absNum = Math.abs(num);
    if (absNum === 0) return [];
    const divisors = [];
    for (let i = 1; i <= Math.sqrt(absNum); i++) {
        if (absNum % i === 0) {
            divisors.push(i);
            if (i !== absNum / i) divisors.push(absNum / i);
        }
    }
    return divisors.sort((a, b) => a - b).join(', ');
};
// export const getAllDivisors = (num) => {
//   const absNum = Math.abs(num);
//   if (absNum === 0) return [];
//   const divisors = [];
//   for (let i = 1; i <= absNum; i++) {
//     if (absNum % i === 0) divisors.push(i);
//   }
//   return divisors.join(', ');
// };

// ==========================================
// БЛОК 2: НОРМА
// ==========================================

// 1. Паліндром
export const isPalindrome = (value) => {
    const str = String(value).trim();
    if (!/^\d{5}$/.test(str)) return 'Має бути 5-значне число';
    return str[0] === str[4] && str[1] === str[3] ? 'Є паліндромом' : 'Не є паліндромом';
};
// export const isPalindrome = (value) => {
//   const str = String(value).trim();
//   if (str.length !== 5 || isNaN(Number(str))) return 'Має бути 5-значне число'; ( !! isNaN(Number(str)) пропустить такі значення як "1e3  ". Краще використовувати регулярний вираз /^\d{5}$/  )
//   return str === str.split('').reverse().join('') ? 'Є паліндромом' : 'Не є паліндромом';
// };

// 2. Знижка
export const calculateDiscount = (amount) => {
    let rate = 0;
    if (amount >= 200 && amount < 300) rate = 0.03;
    else if (amount >= 300 && amount <= 500) rate = 0.05;
    else if (amount > 500) rate = 0.07;
    // Уникаємо проблем з точністю множенням на 100
    return ((amount * 100 * (1 - rate)) / 100).toFixed(2) + ' грн';
};

// export const calculateDiscount = (amount) => {
//   let rate = 0;
//   if (amount >= 200 && amount < 300) rate = 0.03;
//   else if (amount >= 300 && amount <= 500) rate = 0.05;
//   else if (amount > 500) rate = 0.07;
//   return (amount * (1 - rate)).toFixed(2) + ' грн';
// };

// 3. Статистика 10 чисел
export const getNumbersStatistics = (numbersString) => {
    const numbers = numbersString
        .split(',')
        .map(Number)
        .filter((n) => !isNaN(n));
    if (numbers.length !== 10) return 'Потрібно ввести рівно 10 чисел через кому';

    const stats = { positive: 0, negative: 0, zero: 0, even: 0, odd: 0 };

    for (const num of numbers) {
        if (num > 0) stats.positive++;
        else if (num < 0) stats.negative++;
        else stats.zero++;

        if (num % 2 === 0) stats.even++;
        else stats.odd++;
    }

    return `Додатні: ${stats.positive}, Від'ємні: ${stats.negative}, Нулі: ${stats.zero}, Парні: ${stats.even}, Непарні: ${stats.odd}`;
};

// 4. Карусель днів тижня (кнопка)
export const createDayCarousel = () => {
    const days = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота', 'Неділя'];
    let currentDayIndex = 0;

    return () => {
         const currentDay = days[currentDayIndex];
          const result = `
                ${currentDay}
            <span class="text-sm font-normal text-gray-500">
                (${currentDayIndex + 1}/7)
            </span>
        `;
        currentDayIndex = (currentDayIndex + 1) % days.length;
        return result;
    };
};

// 4. Карусель днів тижня (prompt/confirm)
export const runDaysLoop = () => {
    const days = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота', 'Неділя'];
    let i = 0;
    while (confirm(`${days[i]}. Хочеш побачити наступний день?`)) {
        i = (i + 1) % days.length;
    }
};
// ==========================================
// БЛОК 3: МАКСИМУМ
// ==========================================

// 1. Гра «Вгадай число»
export const createNumberGame = () => {
    let low;
    let high;
    let guess;

    const getGuess = () => Math.floor((low + high) / 2);

    return {
        init() {
            low = 0;
            high = 100;
            guess = getGuess();

            return `
              <p>Діапазон: <strong>${low}</strong> — <strong>${high}</strong></p>
              <p class="text-2xl font-bold mt-2">${guess}</p>
              <p class="mt-2">Ваше число більше, менше чи дорівнює цьому числу?</p>`;
        },

        move(action) {
            switch (action) {
                case '>':
                    low = guess + 1;
                    break;

                case '<':
                    high = guess - 1;
                    break;

                case '==':
                    return `🎉 Ура! Я вгадав число ${guess}!`;
            }

            if (low > high) {
                return `❌ Неможливо знайти число.
                Схоже, у відповідях була помилка.`;
            }

            guess = getGuess();

            return `<p>Діапазон: <strong>${low}</strong> — <strong>${high}</strong></p>
                    <p class="text-2xl font-bold mt-2">${guess}</p>
                    <p class="mt-2">Ваше число більше, менше чи дорівнює цьому числу?</p>`;
        },
    };
};

// 2. Таблиця множення
export const getMultiplicationTable = () => {
    let table = '';
    for (let i = 2; i <= 9; i++) {
        table += `\n--- Таблиця на ${i} ---\n`;
        for (let j = 1; j <= 10; j++) {
            table += `${i} x ${j} = ${i * j}\n`;
        }
    }
    return table;
};

// 3. Наступна дата
const isLeapYear = (year) => year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);

const getDaysInMonth = (month, year) => {
    const days = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return days[month - 1];
};

export const calculateNextDate = (day, month, year) => {
    if (month < 1 || month > 12) {
        return 'Неіснуюча дата';
    }

    const daysInMonth = getDaysInMonth(month, year);

    if (day < 1 || day > daysInMonth) {
        return 'Неіснуюча дата';
    }

    if (day < daysInMonth) {
        day++;
    } else {
        day = 1;

        if (month < 12) {
            month++;
        } else {
            month = 1;
            year++;
        }
    }

    return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;
};

// ВАРІАНТИ
// export const calculateNextDate = (day, month, year) => {
//     const date = new Date(year, month - 1, day);

//     if (
//         date.getDate() !== day ||
//         date.getMonth() !== month - 1 ||
//         date.getFullYear() !== year
//     ) {
//         return 'Неіснуюча дата';
//     }

//     date.setDate(date.getDate() + 1);

//     return `${String(date.getDate()).padStart(2,'0')}.${String(date.getMonth()+1).padStart(2,'0')}.${date.getFullYear()}`;
// };

// export const calculateNextDate = (day, month, year) => {
//   let daysInMonth;

//   switch (month) {
//     case 2:
//       daysInMonth = isLeapYear(year) ? 29 : 28;
//       break;

//     case 4:
//     case 6:
//     case 9:
//     case 11:
//       daysInMonth = 30;
//       break;

//     case 1:
//     case 3:
//     case 5:
//     case 7:
//     case 8:
//     case 10:
//     case 12:
//       daysInMonth = 31;
//       break;

//     default:
//       return 'Неіснуюча дата';
//   }

//   if (day < 1 || day > daysInMonth) {
//     return 'Неіснуюча дата';
//   }

//   day++;

//   if (day > daysInMonth) {
//     day = 1;
//     month++;

//     if (month > 12) {
//       month = 1;
//       year++;
//     }
//   }

//   return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;
// };

// ==========================================
// ІНІЦІАЛІЗАЦІЯ ОБРОБНИКІВ (ІНТЕГРАЦІЯ)
// ==========================================
export const initLoopsConditions = () => {
  // Мінімум
  handleFormSubmit('form-age', (data) => showResult('res-age', getAgeCategory(Number(data.age))));
  handleFormSubmit('form-symbol', (data) =>
    showResult('res-symbol', getSpecialSymbol(Number(data.digit))),
  );
  handleFormSubmit('form-range', (data) =>
    showResult('res-range', calculateRangeSum(Number(data.start), Number(data.end))),
  );
  handleFormSubmit('form-gcd', (data) =>
    showResult('res-gcd', getGCD(Number(data.numA), Number(data.numB))),
  );
  handleFormSubmit('form-divisors', (data) =>
    showResult('res-divisors', getAllDivisors(Number(data.num))),
  );

  // Норма
  handleFormSubmit('form-palindrome', (data) =>
    showResult('res-palindrome', isPalindrome(data.value)),
  );
  handleFormSubmit('form-discount', (data) =>
    showResult('res-discount', calculateDiscount(Number(data.amount))),
  );

  // Статистика 10 чисел
  handleFormSubmit('form-stats', (data) =>
    showResult('res-stats', getNumbersStatistics(data.numbers)),
  );

  //Карусель днів тижня
  const runDaysBtn = document.getElementById('btn-run-days');
  if (runDaysBtn) {
    runDaysBtn.addEventListener('click', runDaysLoop);
  }
  //Карусель днів тижня
  const dayCarousel = createDayCarousel();
  const dayCarouselBtn = document.getElementById('btn-day-carousel');
  if (dayCarouselBtn) {
    dayCarouselBtn.addEventListener('click', () => {
      showResult('res-day-carousel', dayCarousel());
    });
  }

  // Максимум
  //Гра «Вгадай число»
  const game = createNumberGame();

  document.getElementById('start-game').addEventListener('click', () => {
    showResult('res-game', game.init());
  });

  document.querySelectorAll('.btn-game').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const action = e.currentTarget.dataset.action;
      showResult('res-game', game.move(action));
    });
  });

  // Таблиця множення
  const multTableBtn = document.getElementById('btn-mult-table');
  if (multTableBtn) {
    multTableBtn.addEventListener('click', () => {
      showResult('res-table', getMultiplicationTable());
    });
  }

  // Наступна дата
  handleFormSubmit('form-date', (data) => {
    showResult(
      'res-date',
      calculateNextDate(Number(data.day), Number(data.month), Number(data.year)),
    );
  });
};;
