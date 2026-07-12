export const initEventsData = () => {
    initTextEditor();
    initTableSort();
    initResizableBox();
};

/**
 * ЗАВДАННЯ 1: Текстовий редактор.
 * Відстежує комбінації Ctrl+E (редагувати) та Ctrl+S (зберегти).
 */
const initTextEditor = () => {
    const viewEl = document.getElementById('text-view');
    const inputEl = document.getElementById('text-input');
    const statusEl = document.getElementById('editor-status');

    if (!viewEl || !inputEl) return;

    let isEditing = false;

    const enableEditing = () => {
        isEditing = true;
        inputEl.value = viewEl.textContent;
        viewEl.classList.add('hidden');
        inputEl.classList.remove('hidden');
        inputEl.focus();
        statusEl.textContent = 'Режим редагування увімкнено';
    };

    const saveChanges = () => {
        isEditing = false;
        viewEl.textContent = inputEl.value;
        inputEl.classList.add('hidden');
        viewEl.classList.remove('hidden');
        statusEl.textContent = 'Зміни збережено. Режим перегляду.';
    };

    document.addEventListener('keydown', (event) => {
        // Перевірка на Ctrl (Windows/Linux) або Cmd (macOS)
        const isModifierPressed = event.ctrlKey || event.metaKey;

        if (isModifierPressed && event.code === 'KeyE') {
            event.preventDefault(); 
            if (!isEditing) enableEditing();
        }

        if (isModifierPressed && event.code === 'KeyS') {
            event.preventDefault(); // Зупиняє діалог "Зберегти як..."
            if (isEditing) saveChanges();
        }
    });
};

/**
 * ЗАВДАННЯ 2: Сортування таблиці.
 * Враховує тип даних (числа чи рядки) та змінює напрямок (asc/desc).
 */
const initTableSort = () => {
    const table = document.getElementById('sortable-table');
    if (!table) return;

    const headers = table.querySelectorAll('thead th button');
    const tbody = table.querySelector('tbody');

    headers.forEach(headerBtn => {
        headerBtn.addEventListener('click', () => {
            const index = parseInt(headerBtn.dataset.index, 10);
            const type = headerBtn.dataset.type;
            const th = headerBtn.parentElement;
            
            // Визначаємо поточний напрямок
            const currentSort = th.getAttribute('aria-sort');
            const isAsc = currentSort === 'ascending';
            const newSortDirection = isAsc ? 'descending' : 'ascending';

            // Скидаємо всі атрибути
            table.querySelectorAll('th').forEach(el => el.setAttribute('aria-sort', 'none'));
            th.setAttribute('aria-sort', newSortDirection);

            const rows = Array.from(tbody.querySelectorAll('tr'));

            rows.sort((a, b) => {
                const cellA = a.children[index].textContent.trim();
                const cellB = b.children[index].textContent.trim();

                if (type === 'number') {
                    const numA = parseFloat(cellA.replace(/[^\d.-]/g, '')) || 0;
                    const numB = parseFloat(cellB.replace(/[^\d.-]/g, '')) || 0;
                    return newSortDirection === 'ascending' ? numA - numB : numB - numA;
                }

                // Рядкове сортування (localeCompare)
                return newSortDirection === 'ascending' 
                    ? cellA.localeCompare(cellB, 'uk') 
                    : cellB.localeCompare(cellA, 'uk');
            });

            const fragment = document.createDocumentFragment();
            rows.forEach(row => fragment.appendChild(row));
            tbody.appendChild(fragment);
        });
    });
};

/**
 * ЗАВДАННЯ 3: Кастомна зміна розмірів блоку.
 * Використовує події mousedown, mousemove, mouseup та оптимізовано через requestAnimationFrame.
 */
const initResizableBox = () => {
    const box = document.getElementById('resizable-box');
    const resizer = document.getElementById('resizer-handle');

    if (!box || !resizer) return;

    let isResizing = false;
    let startX, startY, startWidth, startHeight;
    let rafId = null; // Ідентифікатор кадру анімації

    const onMouseMove = (event) => {
        if (!isResizing) return;
        
        // Зберігаємо координати для використання всередині rAF
        const clientX = event.clientX;
        const clientY = event.clientY;

        // Якщо кадр вже очікує виконання, ігноруємо нові події (тротлінг)
        if (rafId) return;

        rafId = requestAnimationFrame(() => {
            const newWidth = startWidth + (clientX - startX);
            const newHeight = startHeight + (clientY - startY);

            box.style.width = `${newWidth}px`;
            box.style.height = `${newHeight}px`;

            // Скидаємо ідентифікатор після завершення рендеру
            rafId = null;
        });
    };

    const onMouseUp = () => {
        if (!isResizing) return;
        isResizing = false;
        
        // Скасовуємо запланований кадр, якщо він ще не виконався
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        
        // Відновлюємо поведінку сторінки
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseDown = (event) => {
        event.preventDefault();
        
        isResizing = true;
        startX = event.clientX;
        startY = event.clientY;
        
        // getBoundingClientRect дає точні значення з врахуванням box-sizing
        const rect = box.getBoundingClientRect();
        startWidth = rect.width;
        startHeight = rect.height;

        // Забороняємо виділення тексту на всій сторінці під час drag'у
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'se-resize';

        // Слухачі вішаються на document, щоб не губився фокус при швидкому русі миші
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    resizer.addEventListener('mousedown', onMouseDown);
    
    // Accessibility: можливість зміни розмірів через клавіатуру 
    resizer.addEventListener('keydown', (event) => {
        const step = event.shiftKey ? 20 : 5;
        const currentWidth = box.getBoundingClientRect().width;
        const currentHeight = box.getBoundingClientRect().height;

        let handled = false;

        // Клавіатурні події не потребують rAF, оскільки вони не викликаються з такою ж частотою, як mousemove
        switch(event.key) {
            case 'ArrowRight':
                box.style.width = `${currentWidth + step}px`;
                handled = true;
                break;
            case 'ArrowLeft':
                box.style.width = `${currentWidth - step}px`;
                handled = true;
                break;
            case 'ArrowDown':
                box.style.height = `${currentHeight + step}px`;
                handled = true;
                break;
            case 'ArrowUp':
                box.style.height = `${currentHeight - step}px`;
                handled = true;
                break;
        }

        if (handled) event.preventDefault();
    });
};