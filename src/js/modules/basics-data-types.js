import { handleFormSubmit, showResult } from './utils';


const calcUsbCapacity = (gb) => Math.floor(gb * 1024 / 820);

const calcChocoPurchase = (money, price) => {
    const moneyCents = Math.round(money * 100);
    const priceCents = Math.round(price * 100);
    const count = Math.floor(moneyCents / priceCents);
    const changeCents = moneyCents - (count * priceCents);
    return { count, change: changeCents / 100 };
}


export const reverseThreeDigit = (lastDigit, middleDigit, firstDigit) => {
    return lastDigit * 100 + middleDigit * 10 + firstDigit;
};


export const calcDepositProfit = (amount, rate, months) => {
    return (((amount * 100) * rate) / 12 * months) / 100;
};


export const initBasicDataTypes = () => {
 handleFormSubmit('form-usb', (data) => {
    const gb = parseFloat(data['usb_size']);
    if (gb <= 0) return;

    showResult('res-usb', `Поміститься файлів: ${calcUsbCapacity(gb)} шт.`);
  });


  handleFormSubmit('form-choco', (data) => {
   const money = parseFloat(data['wallet_money']);
   const price = parseFloat(data['choco_price']);

    if (isNaN(money) || isNaN(price) || money < 0 || price <= 0) {
      showResult('res-choco', 'Введіть коректні позитивні значення.');
      return;
    }

    const { count, change } = calcChocoPurchase(money, price);
    showResult('res-choco', `Кількість: ${count} шт. Здача: ${change.toFixed(2)} грн.`);
  });



  handleFormSubmit('form-reverse', (data) => {
    const num = parseInt(data['three_digit'], 10);

    if (num < 100 || num > 999) {
      showResult('res-reverse', 'Введіть ціле число від 100 до 999.');
      return;
    }

    const lastDigit = num % 10;
    const middleDigit = Math.floor((num / 10) % 10);
    const firstDigit = Math.floor(num / 100);

    showResult('res-reverse', `Розвернуте число: ${reverseThreeDigit(lastDigit, middleDigit, firstDigit)}`);
  });

  handleFormSubmit('form-deposit', (data) => {
    const amount = parseFloat(data['deposit_amount']);
    if (amount <= 0) return;

    const profit = calcDepositProfit(amount, 0.05, 2);

    showResult('res-deposit', `Нараховані відсотки: ${profit.toFixed(2)}`);
  });
};
