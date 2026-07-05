import { handleFormSubmit, showResult } from './utils';

const compareNumbers = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const getFactorial = (n) => {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

const combineToNumber = (d1, d2, d3) => Number(`${d1}${d2}${d3}`);

const calculateArea = (length, width) => {
  // Якщо width не передано (undefined або порожній рядок), використовуємо length (площа квадрата)
  const w = width !== undefined && width !== '' ? width : length;
  return length * w;
};

const isPerfectNumber = (num) => {
  if (num <= 1) return false;
  let sum = 0;
  for (let i = 1; i <= Math.floor(num / 2); i++) {
    if (num % i === 0) sum += i;
  }
  return sum === num;
};

const getPerfectNumbersInRange = (min, max) => {
  const perfectNumbers = [];
  const start = Math.min(min, max);
  const end = Math.max(min, max);

  for (let i = start; i <= end; i++) {
    if (isPerfectNumber(i)) {
      perfectNumbers.push(i);
    }
  }
  return perfectNumbers;
};


export const initFunctionsData = () => {
  // Мінімум 3: Порівняння
  handleFormSubmit('form-compare', (data) => {
    const num1 = Number(data['num1']);
    const num2 = Number(data['num2']);
    const result = compareNumbers(num1, num2);
    showResult('result-compare', `Результат: <strong class="ml-2">${result}</strong>`);
  });

  // Мінімум 4: Факторіал
  handleFormSubmit('form-factorial', (data) => {
    const n = parseInt(data['fact_num'], 10);
    const result = getFactorial(n);
    showResult('result-factorial', `${n}! =<strong class="ml-2">${result}</strong>`);
  });

  // Мінімум 5: З'єднання цифр
  handleFormSubmit('form-digits', (data) => {
    const result = combineToNumber(data['digit1'], data['digit2'], data['digit3']);
    showResult('result-digits', `Утворене число: <strong class="ml-2">${result}</strong>`);
  });

  // Мінімум 6: Площа
  handleFormSubmit('form-area', (data) => {
    const len = parseFloat(data['length']);
    const wid = data['width']; // Може бути пустим
    
    const parsedWid = wid !== '' ? parseFloat(wid) : undefined;
    const area = calculateArea(len, parsedWid);
    
    const shape = parsedWid === undefined ? 'квадрата' : 'прямокутника';
    showResult('result-area', `Площа ${shape}: <strong class="ml-2">${area.toFixed(2)}</strong>`);
  });

  // Норма 1: Досконале число
  handleFormSubmit('form-perfect', (data) => {
    const num = parseInt(data['perfect_num'], 10);
    const isPerfect = isPerfectNumber(num);
    const textContext = isPerfect 
      ? `<span class="text-green-600">Так, ${num} — досконале число.</span>` 
      : `<span class="text-red-600">Ні, ${num} не є досконалим.</span>`;
    showResult('result-perfect', textContext);
  });

  // Норма 2: Досконалі числа в діапазоні
  handleFormSubmit('form-perfect-range', (data) => {
    const min = parseInt(data['min'], 10);
    const max = parseInt(data['max'], 10);
    
    const results = getPerfectNumbersInRange(min, max);
    const textContext = results.length > 0 
      ? `Знайдено: <strong class="ml-2">${results.join(', ')}</strong>` 
      : 'У цьому діапазоні досконалих чисел не знайдено.';
      
    showResult('result-perfect-range', textContext);
  });
};