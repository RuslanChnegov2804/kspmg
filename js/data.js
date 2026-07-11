// ДАННЫЕ ПРИЛОЖЕНИЯ

// Товары для магазина
const products = [
    {
        id: 1,
        name: "Apple iPhone 17 Pro 256Gb NanoSIM+eSIM оранжевый",
        price: 774511,
        installment: 32272,
        months: 24,
        rating: 4.8,
        reviews: 1772,
        image: "https://images.unsplash.com/photo-1696446702022-4a9e2c41a4b4?w=400",
        category: "phones",
        badge: "0·0·24",
        bonus: "3% Б",
        description: "Смартфон Apple iPhone 17 Pro с процессором A19 Pro, камерой 48 МП и дисплеем Super Retina XDR.",
        sellers: [
            {name: "I-PHONE", rating: 5, reviews: 167, price: 774408, delivery: "Postomat, Вт, 14 июля, бесплатно"},
            {name: "RADAIS-официальный imei", rating: 5, reviews: 239, price: 774508, delivery: "Postomat, Вт, 14 июля, бесплатно"}
        ],
        productReviews: [
            {name: "Инжу", rating: 5, date: "06.03.2026", text: "Жолдасым риза болып қалды. Әр еркек бақытты болуға лайықты!", helpful: 369},
            {name: "Ануар", rating: 3, date: "10.10.2025", text: "26 сентября приехал за своим заказом по адресу Сюнбая 38А...", helpful: 324}
        ]
    },
    {
        id: 2,
        name: "Apple iPhone 17 Pro Max 256Gb NanoSIM+eSIM оранжевый",
        price: 829166,
        installment: 34549,
        months: 24,
        rating: 4.7,
        reviews: 1669,
        image: "https://images.unsplash.com/photo-1696446702022-4a9e2c41a4b4?w=400",
        category: "phones",
        badge: "0·0·24",
        bonus: "3% Б"
    },
    {
        id: 3,
        name: "Apple iPhone 15 128Gb NanoSIM+eSIM черный",
        price: 404989,
        installment: 16875,
        months: 24,
        rating: 4.6,
        reviews: 5729,
        image: "https://images.unsplash.com/photo-1695048133146-5d1ce2903c2a?w=400",
        category: "phones",
        badge: "0·0·24",
        bonus: "3% Б"
    },
    {
        id: 4,
        name: "Samsung Galaxy A07 6 ГБ/128 ГБ черный",
        price: 64099,
        installment: 5342,
        months: 12,
        rating: 4.5,
        reviews: 1950,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
        category: "phones",
        badge: "0·0·24",
        bonus: "3% Б"
    },
    {
        id: 5,
        name: "Наушники Apple AirPods 4 белый",
        price: 63899,
        installment: 5325,
        months: 12,
        rating: 4.9,
        reviews: 5288,
        image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a57bb5?w=400",
        category: "audio",
        badge: "0·0·24",
        bonus: "3% Б",
        description: "Беспроводные наушники Apple AirPods 4 с активным шумоподавлением.",
        sellers: [
            {name: "FUNFAN.KZ", rating: 5, reviews: 2, price: 63899, delivery: "Postomat, Вт, 14 июля, бесплатно"},
            {name: "UMMAH STORE 2", rating: 5, reviews: 6, price: 63900, delivery: "Postomat, Вт, 14 июля, бесплатно"}
        ],
        productReviews: [
            {name: "Дамир", rating: 1, date: "21.12.2024", text: "Настоятельно не рекомендую брать! Товар очень некачественный...", helpful: 40},
            {name: "Сергей", rating: 5, date: "31.03.2025", text: "Около 8 лет покупаю в iTell. iPhone, macbook, airPods...", helpful: 39}
        ]
    },
    {
        id: 6,
        name: "Наушники Apple AirPods Pro 2nd generation with Wireless Charging",
        price: 98388,
        installment: 8199,
        months: 12,
        rating: 4.9,
        reviews: 2723,
        image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a57bb5?w=400",
        category: "audio",
        badge: "0·0·24",
        bonus: "3% Б"
    },
    {
        id: 7,
        name: "Наушники JBL Tune 510BT черный",
        price: 17702,
        installment: 2951,
        months: 6,
        rating: 4.7,
        reviews: 2496,
        image: "https://images.unsplash.com/photo-1546435770-a3e497a8b876?w=400",
        category: "audio",
        badge: "0·0·24",
        bonus: "3% Б"
    },
    {
        id: 8,
        name: "Apple MacBook Air 13 2020 13.3\" / 8 Гб / SSD 256 Гб / macOS",
        price: 484989,
        installment: 20208,
        months: 24,
        rating: 4.8,
        reviews: 623,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        category: "laptops",
        badge: "0·0·24",
        bonus: "3% Б",
        description: "Ноутбук Apple MacBook Air 13 2020 с процессором M1, 8 ГБ оперативной памяти и SSD 256 ГБ.",
        sellers: [
            {name: "ABC Retail", rating: 5, reviews: 1729, price: 484989, delivery: "Postomat, Вт, 14 июля, бесплатно"},
            {name: "Evrika", rating: 5, reviews: 13865, price: 484990, delivery: "Postomat, Вт, 14 июля, бесплатно"}
        ],
        productReviews: [
            {name: "Гульзара", rating: 5, date: "06.06.2021", text: "Долго присматривать к Маку на процессоре M1...", helpful: 100},
            {name: "Руслан", rating: 5, date: "27.07.2021", text: "1. Невероятно быстрый, примерно как Айфон...", helpful: 75}
        ]
    },
    {
        id: 9,
        name: "ThundeRobot 911S Core D 15.6\" / 16 Гб / SSD 512 Гб",
        price: 499990,
        installment: 20833,
        months: 24,
        rating: 4.6,
        reviews: 408,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
        category: "laptops",
        badge: "0·0·24",
        bonus: "3% Б"
    },
    {
        id: 10,
        name: "HYDRA NOMAD 14\" / 8 Гб / SSD 256 Гб / Win 10",
        price: 240000,
        installment: 10000,
        months: 24,
        rating: 4.5,
        reviews: 638,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
        category: "laptops",
        badge: "0·0·24",
        bonus: "3% Б"
    },
    {
        id: 11,
        name: "Кровать Kereuet mebel Newden односпальная, 90x200 см",
        price: 68900,
        installment: 5742,
        months: 12,
        rating: 4.7,
        reviews: 98,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
        category: "furniture",
        badge: "0·0·24",
        bonus: "3% Б",
        description: "Односпальная кровать с матрасом, без подъёмного механизма, белый цвет.",
        sellers: [],
        productReviews: [
            {name: "Жаннат", rating: 3, date: "15.03.2026", text: "С кроватью мы ошиблись, матрас не поднимается...", helpful: 5},
            {name: "Кристина", rating: 5, date: "25.08.2025", text: "Кровать понравилась! Собирали конечно мы ее весело...", helpful: 5}
        ]
    },
    {
        id: 12,
        name: "Кровать Квадрат односпальная, 90x200 см",
        price: 36000,
        installment: 3000,
        months: 12,
        rating: 4.6,
        reviews: 642,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
        category: "furniture",
        badge: "0·0·24",
        bonus: "3% Б"
    },
    {
        id: 13,
        name: "Кабель OMG USB TypeC (M), Lightning (M), 1.2 м, белый",
        price: 1990,
        installment: 664,
        months: 3,
        rating: 4.8,
        reviews: 41,
        image: "https://images.unsplash.com/photo-1583863787861-97b5f4e03cc6?w=400",
        category: "accessories",
        badge: "0·0·12"
    },
    {
        id: 14,
        name: "Чехол для Apple iPhone 13 прозрачный",
        price: 10,
        installment: 4,
        months: 3,
        rating: 4.9,
        reviews: 18884,
        image: "https://images.unsplash.com/photo-1603351154351-5cfb3d04ef39?w=400",
        category: "accessories",
        badge: "0·0·12"
    },
    {
        id: 15,
        name: "Внешний аккумулятор Xiaomi Mi Power Bank 3 Pro 20000 mAh",
        price: 9999,
        installment: 3333,
        months: 3,
        rating: 4.6,
        reviews: 621,
        image: "https://images.unsplash.com/photo-1609592444753-3b04a4c54964?w=400",
        category: "accessories",
        badge: "0·0·12",
        bonus: "299 Б"
    },
    {
        id: 16,
        name: "LUXVISAGE гель Brow Laminator Extreme Fix прозрачный 4 мл",
        price: 1276,
        installment: 426,
        months: 3,
        rating: 4.8,
        reviews: 4894,
        image: "https://images.unsplash.com/photo-1629198688000-bd574d5e760c?w=400",
        category: "beauty",
        badge: "0·0·12"
    },
    {
        id: 17,
        name: "Maolin туалетная бумага 2 слоя, 10 шт",
        price: 1030,
        installment: 344,
        months: 3,
        rating: 4.7,
        reviews: 997,
        image: "https://images.unsplash.com/photo-1583947581924-860bdaa5b4d7?w=400",
        category: "home",
        badge: "0·0·12"
    },
    {
        id: 18,
        name: "Брелок пластик 1 шт",
        price: 10,
        installment: 4,
        months: 3,
        rating: 4.5,
        reviews: 797,
        image: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=400",
        category: "accessories",
        badge: "0·0·12"
    }
];

// Транзакции
const transactions = [
    {
        id: 1,
        name: "Манар Ж.",
        type: "Переводы",
        amount: -1500,
        date: "11 июля",
        icon: ""
    },
    {
        id: 2,
        name: "Алижан Қ.",
        type: "Пополнения",
        amount: 367,
        date: "11 июля",
        comment: "Сикс севен",
        icon: "💰"
    },
    {
        id: 3,
        name: "Батырхан Х.",
        type: "Пополнения",
        amount: 336,
        date: "11 июля",
        icon: "💰"
    },
    {
        id: 4,
        name: "Мирас А.",
        type: "Пополнения",
        amount: 366,
        date: "11 июля",
        icon: "💰"
    },
    {
        id: 5,
        name: "Магазин Центр",
        type: "Супермаркеты",
        amount: -1100,
        date: "11 июля",
        icon: "🛒"
    },
    {
        id: 6,
        name: "Wedrink",
        type: "Кафе и рестораны",
        amount: -300,
        date: "10 июля",
        icon: "☕"
    }
];

// Сообщения
const messages = [
    {
        id: 1,
        sender: "Kaspi Gold",
        text: "Перевод: 1 500 ₸ Манар Ж.",
        time: "01:50",
        icon: "gold",
        unread: 0
    },
    {
        id: 2,
        sender: "Платежи",
        text: "Билет Avtobus. Оплата проезда",
        time: "Вчера",
        icon: "payments",
        unread: 7
    },
    {
        id: 3,
        sender: "Акции",
        text: "Осталось всего 3 часа! Всё купили на Kaspi Жұма?⏰",
        time: "21.06.2026",
        icon: "promo",
        unread: 33
    },
    {
        id: 4,
        sender: "Чат с Kaspi Гид",
        text: "Мы рады ответить на Ваши вопросы.",
        time: "",
        icon: "chat",
        unread: 0
    }
];

// Пользователь
const user = {
    name: "Руслан Ч.",
    avatar: "https://i.pravatar.cc/150?img=11",
    phone: "+7 (707) 366-08-84",
    balance: 16115.94,
    cardNumber: "6740",
    cardFullNumber: "N18452657",
    iin: "070428552045",
    birthdate: "28.04.2007",
    birthplace: "ОБЛАСТЬ АБАЙ",
    nationality: "РУССКИЙ",
    documents: {
        idCard: {
            surname: "ЧНЕГОВ",
            name: "РУСЛАН",
            patronymic: "АЛЕКСАНДРОВИЧ",
            number: "055297744",
            dates: "03.05.2023 - 02.05.2033"
        },
        passport: {
            surname: "ЧНЕГОВ / CHNEGOV",
            name: "РУСЛАН / RUSLAN",
            number: "N18452657",
            issueDate: "12.08.2025",
            expiryDate: "11.08.2035"
        },
        driversLicense: {
            surname: "ЧНЕГОВ / CHNEGOV",
            name: "РУСЛАН АЛЕКСАНДРОВИЧ / RUSLAN",
            number: "UB 960929",
            issueDate: "29.01.2026",
            expiryDate: "28.01.2036"
        }
    }
};

// Экспортируем данные
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products, transactions, messages, user };
}