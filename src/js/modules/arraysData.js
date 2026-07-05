import { handleFormSubmit } from './utils';

export const initArraysData = () => {
    // 1. Початковий стан (Мінімум 1: Створення масиву)
    let shoppingList = [
        { name: 'Молоко', qty: 2, isBought: false, price: 60.00, sum: 120.00 },
        { name: 'Хліб', qty: 1, isBought: true, price: 24.00, sum: 24.00 },
        { name: 'Яйця', qty: 10, isBought: false, price: 5.50, sum: 55.00 },
    ];

    let currentSort = 'status';

    // --- ЧИСТІ ФУНКЦІЇ ДЛЯ ОБРОБКИ ДАНИХ ---

    // Максимум 3: Сортування
    const getSortedList = (list, sortType) => {
        const copy = [...list];
        switch (sortType) {
            case 'status':
                // Спочатку не придбані (false -> 0, true -> 1)
                return copy.sort((a, b) => Number(a.isBought) - Number(b.isBought));
            case 'asc':
                return copy.sort((a, b) => a.sum - b.sum);
            case 'desc':
                return copy.sort((a, b) => b.sum - a.sum);
            default:
                return copy;
        }
    };

    // Норма 2: Додавання продукту
    const addProduct = (list, newProduct) => {
        const existingIndex = list.findIndex(
            item => item.name.toLowerCase() === newProduct.name.toLowerCase()
        );

        if (existingIndex !== -1) {
            return list.map((item, index) => {
                if (index === existingIndex) {
                    const updatedQty = item.qty + newProduct.qty;
                    return {
                        ...item,
                        qty: updatedQty,
                        sum: updatedQty * item.price
                    };
                }
                return item;
            });
        }

        return [...list, { ...newProduct, sum: newProduct.qty * newProduct.price, isBought: false }];
    };

    // Норма 1: Видалення продукту (створення нового масиву)
    const removeProduct = (list, productName) => {
        return list.filter(item => item.name !== productName);
    };

    // Мінімум 2 + Покращення UX: Перемикач статусу придбання
    const toggleProductStatus = (list, productName) => {
        return list.map(item =>
            item.name === productName ? { ...item, isBought: !item.isBought } : item
        );
    };

    // Максимум 1: Загальна сума
    const calculateTotalSum = (list) => {
        return list.reduce((acc, item) => acc + item.sum, 0);
    };

    // Максимум 2: Сума залежно від статусу (isBoughtStatus: true/false)
    const calculateSumByStatus = (list, isBoughtStatus) => {
        return list.reduce((acc, item) => item.isBought === isBoughtStatus ? acc + item.sum : acc, 0);
    };


    // --- РОБОТА З DOM ТА UI ---

    const container = document.getElementById('shopping-list-container');
    const statTotal = document.getElementById('stat-total');
    const statUnbought = document.getElementById('stat-unbought');
    const sortSelect = document.getElementById('sort-select');

    const renderUI = () => {
        const sortedList = getSortedList(shoppingList, currentSort);

        // Рендер списку
        container.innerHTML = sortedList.map(item => `
      <li class="flex flex-col sm:flex-row justify-between items-start sm:items-center result-box ${item.isBought ? ' border-gray-200 opacity-70' : 'bg-white border-blue-100 shadow-sm'} transition-all">
        <div class="flex items-center gap-4 mb-3 sm:mb-0 w-full sm:w-auto">
          
          <!-- Чекбокс для статусу -->
          <input 
            type="checkbox" 
            data-action="toggle" 
            data-name="${item.name}"
            class="shrink-0 w-6 h-6 border-primary rounded focus:ring-primary focus:ring-2 cursor-pointer transition-colors accent-primary-800"
            aria-label="${item.isBought ? 'Придбано' : 'Відмітити як придбане'}"
            ${item.isBought ? 'checked' : ''}
          >
          
          <div class="${item.isBought ? 'line-through text-gray-500' : 'text-gray-900'}">
            <h3 class="font-bold text-lg leading-tight">${item.name}</h3>
            <span class="text-sm text-gray-500">${item.price.toFixed(2)} ₴ × ${item.qty} шт.</span>
          </div>
        </div>
        
        <div class="flex items-center justify-between w-full sm:w-auto gap-6 ml-10 sm:ml-0">
          <span class="font-mono font-bold text-lg ${item.isBought ? 'text-gray-500' : 'text-blue-700'}">
            ${item.sum.toFixed(2)} ₴
          </span>
          <button 
            data-action="remove" 
            data-name="${item.name}"
            class="text-gray-400 hover:text-red-500 p-2 -mr-2 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            aria-label="Видалити ${item.name}"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </li>
    `).join('') || '<li class="text-center text-gray-500 py-8">Список порожній</li>';

        // Рендер статистики
        statTotal.textContent = `${calculateTotalSum(shoppingList).toFixed(2)} ₴`;
        statUnbought.textContent = `${calculateSumByStatus(shoppingList, false).toFixed(2)} ₴`;
    };

    // --- ОБРОБНИКИ ПОДІЙ ---

    // Зміна сортування
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderUI();
    });

    // Додавання через форму
    handleFormSubmit('form-add-product', (data, form) => {
        const newProduct = {
            name: data.name.trim(),
            qty: parseInt(data.qty, 10),
            price: parseFloat(data.price)
        };

        shoppingList = addProduct(shoppingList, newProduct);
        renderUI();
        form.reset();
        document.getElementById('prod-name').focus();
    });

    // Делегування подій для чекбоксів (перемикання статусу)
    container.addEventListener('change', (e) => {
        if (e.target.dataset.action === 'toggle') {
            const name = e.target.dataset.name;
            shoppingList = toggleProductStatus(shoppingList, name);
            renderUI();
        }
    });

    // Делегування подій для кнопок (видалення)
    container.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action="remove"]');
        if (!btn) return;

        const name = btn.dataset.name;
        shoppingList = removeProduct(shoppingList, name);
        renderUI();
    });

    // Первинний рендер
    renderUI();
};