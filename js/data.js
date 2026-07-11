// ДАННЫЕ ПРИЛОЖЕНИЯ

const products = [
    {
        id: 1,
        name: "Apple iPhone 17 Pro 256Gb NanoSIM+eSIM оранжевый",
        price: 774511,
        installment: 32272,
        months: 24,
        rating: 4.8,
        reviews: 1772,
        image: "images/iphone-17-pro-max.png.jpeg",
        category: "phones",
        badge: "0·0·24",
        bonus: "3% Б",
        description: "Смартфон Apple iPhone 17 Pro с процессором A19 Pro, камерой 48 МП и дисплеем Super Retina XDR 6.3 дюйма.",
        sellers: [
            {name: "I-PHONE", rating: 5, reviews: 167, price: 774408, delivery: "Postomat, Вт, 14 июля, бесплатно"},
            {name: "RADAIS-официальный imei", rating: 5, reviews: 239, price: 774508, delivery: "Postomat, Вт, 14 июля, бесплатно"}
        ],
        productReviews: [
            {name: "Инжу", rating: 5, date: "06.03.2026", text: "Жолдасым риза болып қалды. Әр еркек бақытты болуға лайықты!", helpful: 369},
            {name: "Ануар", rating: 3, date: "10.10.2025", text: "26 сентября приехал за своим заказом. На Kaspi показано что заказ оплачен, но в магазине сказали что оплаты нет.", helpful: 324},
            {name: "Николай", rating: 5, date: "25.09.2025", text: "Всем кто хочет купить разницы между 16 нет.", helpful: 191},
            {name: "Константин", rating: 5, date: "24.09.2025", text: "Нормальный телефон, не знаю почему его так хейтят.", helpful: 117}
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
        image: "images/iphone-17-pro-max.png.jpeg",
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
        image: "images/86303745998878.jpg",
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
        image: "images/61291251.jpg",
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
        image: "images/87309386809374.png.jpeg",
        category: "audio",
        badge: "0·0·24",
        bonus: "3% Б",
        description: "Беспроводные наушники Apple AirPods 4 с активным шумоподавлением и пространственным аудио.",
        sellers: [
            {name: "FUNFAN.KZ", rating: 5, reviews: 2, price: 63899, delivery: "Postomat, Вт, 14 июля, бесплатно"},
            {name: "UMMAH STORE 2", rating: 5, reviews: 6, price: 63900, delivery: "Postomat, Вт, 14 июля, бесплатно"}
        ],
        productReviews: [
            {name: "Дамир", rating: 1, date: "21.12.2024", text: "Настоятельно не рекомендую брать! Товар очень некачественный.", helpful: 40},
            {name: "Сергей", rating: 5, date: "31.03.2025", text: "Около 8 лет покупаю в iTell. iPhone, macbook, airPods. Всегда все хорошо!", helpful: 39}
        ]
    },
    {
        id: 6,
        name: "Наушники Apple AirPods Pro 2nd generation",
        price: 98388,
        installment: 8199,
        months: 12,
        rating: 4.9,
        reviews: 2723,
        image: "images/84353546846238.jpg",
        category: "audio",
        badge: "0·0·24",
        bonus: "3% Б"
    },
    {
        id: 7,
        name: "Наушники CityMax KC-T01 белый",
        price: 4500,
        installment: 1500,
        months: 3,
        rating: 4.5,
        reviews: 268,
        image: "images/112898684.jpeg",
        category: "audio",
        badge: "0·0·24"
    },
    {
        id: 8,
        name: "Наушники с сенсорным экраном",
        price: 3500,
        installment: 1167,
        months: 3,
        rating: 4.3,
        reviews: 156,
        image: "images/85730021769246.jpg",
        category: "audio",
        badge: "0·0·24"
    },
    {
        id: 9,
        name: "Игровой набор RGB клавиатура + мышь + наушники",
        price: 12990,
        installment: 4330,
        months: 3,
        rating: 4.6,
        reviews: 89,
        image: "images/79746578.jpg",
        category: "computers",
        badge: "0·0·12"
    },
    {
        id: 10,
        name: "Клавиатура механическая USB Type-C",
        price: 8990,
        installment: 2997,
        months: 3,
        rating: 4.7,
        reviews: 234,
        image: "images/82341927.jpeg",
        category: "computers",
        badge: "0·0·12"
    },
    {
        id: 11,
        name: "Мышь беспроводная белая",
        price: 3990,
        installment: 1330,
        months: 3,
        rating: 4.4,
        reviews: 178,
        image: "images/36337547.JPG",
        category: "computers",
        badge: "0·0·12"
    },
    {
        id: 12,
        name: "Держатель для телефона в авто",
        price: 2490,
        installment: 830,
        months: 3,
        rating: 4.5,
        reviews: 312,
        image: "images/81272594268190.png.jpeg",
        category: "accessories",
        badge: "0·0·12"
    },
    {
        id: 13,
        name: "Кабель USB Type-C Lightning 1.2м",
        price: 1990,
        installment: 664,
        months: 3,
        rating: 4.8,
        reviews: 41,
        image: "images/6376402924342.jpg",
        category: "accessories",
        badge: "0·0·12"
    },
    {
        id: 14,
        name: "Наушники проводные белые",
        price: 1290,
        installment: 430,
        months: 3,
        rating: 4.6,
        reviews: 567,
        image: "images/64168003.png.jpeg",
        category: "audio",
        badge: "0·0·12"
    },
    {
        id: 15,
        name: "Наушники белые в коробке",
        price: 2490,
        installment: 830,
        months: 3,
        rating: 4.5,
        reviews: 234,
        image: "images/64169948.png.jpeg",
        category: "audio",
        badge: "0·0·12"
    },
    {
        id: 16,
        name: "Наушники TWS с дисплеем на кейсе",
        price: 5990,
        installment: 1997,
        months: 3,
        rating: 4.4,
        reviews: 189,
        image: "images/24868059.jpg",
        category: "audio",
        badge: "0·0·12"
    }
];

const transactions = [
    {id: 1, name: "Манар Ж.", type: "Переводы", amount: -1500, date: "11 июля", icon: "👤"},
    {id: 2, name: "Алижан Қ.", type: "Пополнения", amount: 367, date: "11 июля", comment: "Сикс севен", icon: "💰"},
    {id: 3, name: "Батырхан Х.", type: "Пополнения", amount: 336, date: "11 июля", icon: "💰"},
    {id: 4, name: "Мирас А.", type: "Пополнения", amount: 366, date: "11 июля", icon: "💰"},
    {id: 5, name: "Магазин Центр", type: "Супермаркеты", amount: -1100, date: "11 июля", icon: "🛒"},
    {id: 6, name: "Wedrink", type: "Кафе и рестораны", amount: -300, date: "10 июля", icon: "☕"}
];

const messages = [
    {id: 1, sender: "Kaspi Gold", text: "Перевод: 1 500 ₸ Манар Ж.", time: "01:50", icon: "gold", unread: 0},
    {id: 2, sender: "Платежи", text: "Билет Avtobus. Оплата проезда", time: "Вчера", icon: "payments", unread: 7},
    {id: 3, sender: "Акции", text: "Осталось всего 3 часа! Всё купили на Kaspi Жұма?⏰", time: "21.06.2026", icon: "promo", unread: 33},
    {id: 4, sender: "Чат с Kaspi Гид", text: "Мы рады ответить на Ваши вопросы.", time: "", icon: "chat", unread: 0}
];

const chatMessages = [
    {sender: "system", text: "Покупка: 1 100 ₸\nМагазин Центр\nДоступно: 16 546,94 ₸", time: "00:48"},
    {sender: "Мирас А.", text: "Пополнение: 366 \nДоступно: 16 912,94 ₸", time: "00:51", avatar: "M"},
    {sender: "Батырхан Х.", text: "Пополнение: 336 ₸\nДоступно: 17 248,94 ₸", time: "00:51", avatar: "Б"},
    {sender: "Алижан Қ.", text: "Пополнение: 367 ₸\nДоступно: 17 615,94 ₸", time: "00:51", avatar: "А", comment: "Сикс севен"},
    {sender: "me", text: "Перевод: 1 500 ₸\nМанар Ж.\nДоступно: 16 115,94 ₸", time: "01:50"}
];

const user = {
    name: "Руслан Ч.",
    avatar: "https://i.pravatar.cc/150?img=11",
    phone: "+7 (707) 366-08-84",
    balance: 16115.94,
    cardNumber: "6740",
    documents: {
        idCard: {surname: "ЧНЕГОВ", name: "РУСЛАН", patronymic: "АЛЕКСАНДРОВИЧ", number: "055297744", dates: "03.05.2023 - 02.05.2033", birthdate: "28.04.2007", birthplace: "ОБЛАСТЬ АБАЙ", nationality: "РУССКИЙ", iin: "070428552045"},
        passport: {surname: "ЧНЕГОВ / CHNEGOV", name: "РУСЛАН / RUSLAN", number: "N18452657", issueDate: "12.08.2025", expiryDate: "11.08.2035", iin: "070428552045", birthdate: "28.04.2007"},
        driversLicense: {surname: "ЧНЕГОВ / CHNEGOV", name: "РУСЛАН АЛЕКСАНДРОВИЧ / RUSLAN", number: "UB 960929", issueDate: "29.01.2026", expiryDate: "28.01.2036", iin: "070428552045", birthdate: "28.04.2007"}
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {products, transactions, messages, chatMessages, user};
}
