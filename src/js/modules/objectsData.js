import { handleFormSubmit, showResult } from './utils';

export const initObjectsData = () => {
    // ==========================================
    // РІВЕНЬ: МІНІМУМ (Об'єкт Автомобіль)
    // ==========================================
    const car = {
        manufacturer: 'Toyota',
        model: 'Camry',
        year: 2023,
        avgSpeed: 90, // км/год
        fuelCapacity: 60, // літри
        fuelConsumption: 7.5, // л/100км
        drivers: ['Флетчер'],

        getInfo() {
            const drivers = this.drivers.join('\n - ');
            const driversList = this.drivers.length > 0 
      ? '\n  - ' + drivers 
      : 'Немає';

      return `Виробник: ${this.manufacturer}
Модель: ${this.model}
Рік: ${this.year}
Сер. швидкість: ${this.avgSpeed} км/год
Витрата палива: ${this.fuelConsumption} л/100км
Водії: ${driversList}`;
        },

       addDriver(name) {
    const cleanName = name.trim();
    if (cleanName === '') return;

    const formattedName = cleanName
      .split(/\s+/) 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    const isExist = this.drivers.some(
      driver => driver.toLowerCase() === formattedName.toLowerCase()
    );
    
    if (!isExist) {
      this.drivers.push(formattedName);
    }
  },

        hasDriver(name) {
            const searchName = name.trim().toLowerCase();

            return this.drivers.some(
                driver => driver.toLowerCase() === searchName
            );
        },

        calculateTrip(distance) {
            const pureTime = distance / this.avgSpeed;
            // Кожні 4 години - 1 година відпочинку. 
            // Якщо час кратен 4 (напр., рівно 4 години до мети), останній відпочинок не потрібен.
            const breaks =
                pureTime > 4
                    ? Math.ceil(pureTime / 4) - 1
                    : 0;

            const totalTime = pureTime + breaks;
            const fuelNeeded = (distance / 100) * this.fuelConsumption;

            return {
                time: totalTime,
                fuel: fuelNeeded
            };
        }
    };

    const updateCarDisplay = () => {
        showResult('car-info-display', car.getInfo());
    };

    updateCarDisplay(); // Initial render

    handleFormSubmit('form-add-driver', (data, form) => {
        const name = data['driver_name'].trim();
        if (name) {
            car.addDriver(name);
            updateCarDisplay();
            form.reset();
        }
    });

    handleFormSubmit('form-check-driver', (data) => {
    const rawName = data['check_name'].trim();
    if (rawName === '') return;

    const formattedName = rawName
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    const isPresent = car.hasDriver(formattedName);
    const text = isPresent 
      ? `<span class="text-green-600 font-bold">Водій ${formattedName} є у списку.</span>`
      : `<span class="text-red-600 font-bold">Водія ${formattedName} не знайдено.</span>`;
      
    showResult('result-check-driver', text);
  });

    handleFormSubmit('form-trip', (data) => {
        const distance = parseFloat(data['distance']);
        const { time, fuel } = car.calculateTrip(distance);
        showResult('result-trip', `Час у дорозі (з перервами): ${time.toFixed(2)} год. | Паливо: ${fuel.toFixed(2)} л.`);
    });


    // ==========================================
    // РІВЕНЬ: НОРМА (Об'єкт Час)
    // ==========================================
    // const clock = {
    //     hours: 20,
    //     minutes: 59,
    //     seconds: 45,

    //     format(val) {
    //         return val.toString().padStart(2, '0');
    //     },

    //     getTime() {
    //         return `${this.format(this.hours)}:${this.format(this.minutes)}:${this.format(this.seconds)}`;
    //     },

    //     updateFromTotalSeconds(totalSec) {
    //         const DAY_SECONDS = 24 * 60 * 60;
    //         let normalized =
    //             ((totalSec % DAY_SECONDS) + DAY_SECONDS) % DAY_SECONDS;
    //         this.hours = Math.floor(normalized / 3600);
    //         this.minutes = Math.floor((normalized % 3600) / 60);
    //         this.seconds = normalized % 60;
    //     },

    //     getTotalSeconds() {
    //         return this.hours * 3600 + this.minutes * 60 + this.seconds;
    //     },

    //     addSeconds(sec) {
    //         this.updateFromTotalSeconds(this.getTotalSeconds() + sec);
    //     },

    //     addMinutes(min) {
    //         this.addSeconds(min * 60);
    //     },

    //     addHours(hr) {
    //         this.addSeconds(hr * 3600);
    //     }
    // };

    const now = new Date();

const clock = {
    // Ініціалізуємо властивості реальним часом
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),

    format(val) {
        return val.toString().padStart(2, '0');
    },

    getTime() {
        return `${this.format(this.hours)}:${this.format(this.minutes)}:${this.format(this.seconds)}`;
    },

    updateFromTotalSeconds(totalSec) {
        const DAY_SECONDS = 24 * 60 * 60;
        // Робота з від'ємними значеннями та переповненням
        let normalized = ((totalSec % DAY_SECONDS) + DAY_SECONDS) % DAY_SECONDS;
        
        this.hours = Math.floor(normalized / 3600);
        this.minutes = Math.floor((normalized % 3600) / 60);
        this.seconds = normalized % 60;
    },

    getTotalSeconds() {
        return this.hours * 3600 + this.minutes * 60 + this.seconds;
    },

    addSeconds(sec) {
        this.updateFromTotalSeconds(this.getTotalSeconds() + sec);
    },

    addMinutes(min) {
        this.addSeconds(min * 60);
    },

    addHours(hr) {
        this.addSeconds(hr * 3600);
    }
};

    const updateClockDisplay = () => {
        showResult('time-display', clock.getTime());
    };

    updateClockDisplay(); // Initial render

    handleFormSubmit('form-time-edit', (data) => {
        const amount = parseInt(data['amount'], 10);
        const unit = data['unit'];

        if (unit === 'seconds') clock.addSeconds(amount);
        if (unit === 'minutes') clock.addMinutes(amount);
        if (unit === 'hours') clock.addHours(amount);

        updateClockDisplay();
    });


    // ==========================================
    // РІВЕНЬ: МАКСИМУМ (Об'єкт Дріб)
    // ==========================================

    // Фабрика для створення об'єкта-дробу
    const createFraction = (n, d) => {
        if (d === 0) throw new Error('Знаменник не може дорівнювати нулю');
        if (!Number.isInteger(n) || !Number.isInteger(d)) {
            throw new Error('Чисельник і знаменник мають бути цілими числами');
        }
        return { n, d };
    };

    // Об'єкт для роботи з дробами
    const fractionMath = {
        // Пошук НСД (Найбільший спільний дільник) для скорочення
        getGCD(a, b) {
            a = Math.abs(a);
            b = Math.abs(b);
            return b === 0 ? a : this.getGCD(b, a % b);
        },

        simplify(fraction) {
            const gcd = this.getGCD(fraction.n, fraction.d);
            let newN = fraction.n / gcd;
            let newD = fraction.d / gcd;

            // Нормалізація знаків (мінус завжди в чисельнику)
            if (newD < 0) {
                newN *= -1;
                newD *= -1;
            }
            return { n: newN, d: newD };
        },

        add(f1, f2) {
            return this.simplify({ n: f1.n * f2.d + f2.n * f1.d, d: f1.d * f2.d });
        },

        subtract(f1, f2) {
            return this.simplify({ n: f1.n * f2.d - f2.n * f1.d, d: f1.d * f2.d });
        },

        multiply(f1, f2) {
            return this.simplify({ n: f1.n * f2.n, d: f1.d * f2.d });
        },

        divide(f1, f2) {
            if (f2.n === 0) throw new Error('Ділення на нуль');
            return this.simplify({ n: f1.n * f2.d, d: f1.d * f2.n });
        },

        toString(f) {
            // Якщо знаменник 1, повертаємо як ціле число
            return f.d === 1 ? `${f.n}` : `${f.n}/${f.d}`;
        }
    };

    handleFormSubmit('form-fractions', (data) => {
        try {
            const f1 = createFraction(parseInt(data['f1_n'], 10), parseInt(data['f1_d'], 10));
            const f2 = createFraction(parseInt(data['f2_n'], 10), parseInt(data['f2_d'], 10));
            const op = data['operation'];

            let resultObj;

            switch (op) {
                case 'add': resultObj = fractionMath.add(f1, f2); break;
                case 'sub': resultObj = fractionMath.subtract(f1, f2); break;
                case 'mul': resultObj = fractionMath.multiply(f1, f2); break;
                case 'div': resultObj = fractionMath.divide(f1, f2); break;
            }

            showResult('result-fraction', fractionMath.toString(resultObj));
        } catch (error) {
            showResult('result-fraction', `<span class="text-red-500 text-lg">${error.message}</span>`);
        }
    });
};