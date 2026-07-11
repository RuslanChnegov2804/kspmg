// ОСНОВНАЯ ЛОГИКА ПРИЛОЖЕНИЯ

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Загружаем данные из localStorage
    loadData();
    
    // Показываем главный экран
    showScreen('main-screen');
    
    // Загружаем товары
    renderProducts();
    
    // Загружаем транзакции
    renderTransactions();
    
    // Загружаем сообщения
    renderMessages();
    
    // Проверяем код доступа
    checkAccessCodeSetup();
    
    // Инициализируем камеру для QR
    initQRScanner();
}

// Загрузка данных из localStorage
function loadData() {
    const savedUser = localStorage.getItem('kaspi_user');
    const savedProducts = localStorage.getItem('kaspi_products');
    const savedTransactions = localStorage.getItem('kaspi_transactions');
    const savedMessages = localStorage.getItem('kaspi_messages');
    const savedAccessCode = localStorage.getItem('kaspi_access_code');
    const savedFaceID = localStorage.getItem('kaspi_faceid');
    
    if (savedUser) {
        Object.assign(user, JSON.parse(savedUser));
    }
    
    if (savedProducts) {
        window.products = JSON.parse(savedProducts);
    } else {
        window.products = products;
    }
    
    if (savedTransactions) {
        window.transactions = JSON.parse(savedTransactions);
    } else {
        window.transactions = transactions;
    }
    
    if (savedMessages) {
        window.messages = JSON.parse(savedMessages);
    } else {
        window.messages = messages;
    }
    
    if (savedAccessCode) {
        window.accessCode = savedAccessCode;
    }
    
    if (savedFaceID) {
        window.faceIDEnabled = savedFaceID === 'true';
    }
}

// Сохранение данных
function saveData() {
    localStorage.setItem('kaspi_user', JSON.stringify(user));
    localStorage.setItem('kaspi_products', JSON.stringify(window.products));
    localStorage.setItem('kaspi_transactions', JSON.stringify(window.transactions));
    localStorage.setItem('kaspi_messages', JSON.stringify(window.messages));
    if (window.accessCode) {
        localStorage.setItem('kaspi_access_code', window.accessCode);
    }
    localStorage.setItem('kaspi_faceid', window.faceIDEnabled || false);
}

// Показ экрана
function showScreen(screenId) {
    // Скрываем все экраны
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Показываем нужный экран
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // Обновляем активную вкладку в навигации
        updateNavActiveState(screenId);
    }
    
    // Специфичная логика для определенных экранов
    if (screenId === 'maps-screen') {
        initMap();
    }
}

// Обновление активной навигации
function updateNavActiveState(screenId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const navMap = {
        'main-screen': 0,
        'qr-screen': 1,
        'messages-screen': 2,
        'services-screen': 3
    };
    
    if (navMap[screenId] !== undefined) {
        const navItems = document.querySelectorAll('.nav-item');
        if (navItems[navMap[screenId]]) {
            navItems[navMap[screenId]].classList.add('active');
        }
    }
}

// Проверка кода доступа
function checkAccessCode(screenId) {
    if (!window.accessCode) {
        // Код еще не установлен
        setupAccessCode();
    } else if (window.faceIDEnabled) {
        // Показываем Face ID
        showFaceID(() => {
            showScreen(screenId);
        });
    } else {
        // Показываем ввод кода
        showAccessCodeInput(() => {
            showScreen(screenId);
        });
    }
}

// Установка кода доступа
function setupAccessCode() {
    const code = prompt('Придумайте 4-значный код доступа:');
    if (code && code.length === 4 && /^\d+$/.test(code)) {
        window.accessCode = code;
        saveData();
        alert('Код доступа установлен!');
    } else {
        alert('Код должен содержать 4 цифры!');
        setupAccessCode();
    }
}

// Ввод кода доступа
function showAccessCodeInput(callback) {
    const code = prompt('Введите код доступа:');
    if (code === window.accessCode) {
        callback();
    } else {
        alert('Неверный код!');
        showAccessCodeInput(callback);
    }
}

// Face ID
function showFaceID(callback) {
    // Создаем экран Face ID
    const faceIDScreen = document.createElement('div');
    faceIDScreen.className = 'screen face-id-screen active';
    faceIDScreen.innerHTML = `
        <div class="face-id-icon">👤</div>
        <div class="face-id-text">Face ID</div>
        <div class="face-id-subtext">Распознавание лица...</div>
    `;
    
    document.body.appendChild(faceIDScreen);
    
    // Имитация сканирования (2 секунды)
    setTimeout(() => {
        faceIDScreen.remove();
        callback();
    }, 2000);
}

// Включение/выключение Face ID
function toggleFaceID() {
    const toggle = document.getElementById('faceid-toggle');
    window.faceIDEnabled = toggle.checked;
    saveData();
    
    if (window.faceIDEnabled) {
        alert('Face ID включен! Теперь для входа будет использоваться распознавание лица.');
    }
}

// Изменение кода доступа
function changeAccessCode() {
    const oldCode = prompt('Введите старый код доступа:');
    if (oldCode !== window.accessCode) {
        alert('Неверный код!');
        return;
    }
    
    const newCode = prompt('Введите новый 4-значный код:');
    if (newCode && newCode.length === 4 && /^\d+$/.test(newCode)) {
        window.accessCode = newCode;
        saveData();
        alert('Код доступа изменен!');
    } else {
        alert('Код должен содержать 4 цифры!');
    }
}

// Рендер товаров
function renderProducts() {
    const container = document.getElementById('main-products');
    if (!container) return;
    
    container.innerHTML = window.products.slice(0, 10).map(product => `
        <div class="product-card" onclick="showProductDetail(${product.id})">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}</span>
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">${product.price.toLocaleString()} ₸</div>
                <div class="product-installment">
                    ${product.badge ? `<span class="installment-badge">${product.badge}</span>` : ''}
                    <span>${product.installment.toLocaleString()} ₸ x${product.months}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Показ деталей товара
function showProductDetail(productId) {
    const product = window.products.find(p => p.id === productId);
    if (!product) return;
    
    alert(`Товар: ${product.name}\nЦена: ${product.price.toLocaleString()} ₸\nРейтинг: ${product.rating} (${product.reviews} отзывов)`);
}

// Рендер транзакций
function renderTransactions() {
    const container = document.getElementById('transactions-list');
    if (!container) return;
    
    container.innerHTML = window.transactions.map(transaction => `
        <div class="transaction-item">
            <div class="transaction-icon">${transaction.icon}</div>
            <div class="transaction-info">
                <div class="transaction-name">${transaction.name}</div>
                <div class="transaction-type">${transaction.type}${transaction.comment ? ' - ' + transaction.comment : ''}</div>
            </div>
            <div class="transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}">
                ${transaction.amount > 0 ? '+' : ''}${transaction.amount.toLocaleString()} ₸
            </div>
        </div>
    `).join('');
}

// Рендер сообщений
function renderMessages() {
    const container = document.getElementById('messages-list');
    if (!container) return;
    
    container.innerHTML = window.messages.map(message => `
        <div class="message-item">
            <div class="message-icon ${message.icon}">${getMessageIcon(message.icon)}</div>
            <div class="message-content">
                <div class="message-header">
                    <div class="message-title">${message.sender}</div>
                    <div class="message-time">${message.time}</div>
                </div>
                <div class="message-text">${message.text}</div>
            </div>
            ${message.unread > 0 ? `<span class="message-badge">${message.unread}</span>` : ''}
        </div>
    `).join('');
}

function getMessageIcon(iconClass) {
    const icons = {
        'gold': '',
        'payments': '',
        'promo': '🎁',
        'chat': ''
    };
    return icons[iconClass] || '';
}

// Инициализация QR сканера
function initQRScanner() {
    const video = document.getElementById('qr-video');
    if (!video) return;
    
    // Запрашиваем доступ к камере
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(stream => {
                video.srcObject = stream;
            })
            .catch(err => {
                console.log('Камера недоступна:', err);
                // Показываем заглушку
                video.style.background = '#000';
            });
    }
}

// Включение/выключение фонарика
function toggleFlashlight() {
    alert('Фонарик включен/выключен');
}

// Инициализация карты
function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer || window.mapInitialized) return;
    
    // Создаем карту (Семей, Казахстан)
    window.map = L.map('map').setView([50.4229, 80.2328], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(window.map);
    
    // Добавляем маркеры банкоматов
    const atmLocations = [
        {lat: 50.4229, lng: 80.2328, name: "Банкомат Kaspi"},
        {lat: 50.4250, lng: 80.2350, name: "Отделение Kaspi"},
        {lat: 50.4200, lng: 80.2300, name: "Терминал"}
    ];
    
    atmLocations.forEach(location => {
        L.marker([location.lat, location.lng])
            .addTo(window.map)
            .bindPopup(location.name);
    });
    
    window.mapInitialized = true;
}

// Предъявление документа
function presentDocument(docType) {
    // Генерируем случайный 6-значный код
    const code = Math.floor(100000 + Math.random() * 900000);
    
    const docNames = {
        'id-card': 'Удостоверение личности',
        'passport': 'Паспорт гражданина РК',
        'drivers-license': 'Водительские права'
    };
    
    alert(`${docNames[docType]}\n\nПокажите QR-код сотруднику\nили скажите код: ${code}`);
}

// Отправка документа
function sendDocument(docType) {
    alert('Документ отправлен!');
}

// Показ реквизитов документа
function showDocumentRequisites(docType) {
    const requisites = {
        'id-card': `ФИО: ${user.documents.idCard.surname} ${user.documents.idCard.name} ${user.documents.idCard.patronymic}\nИИН: ${user.iin}\nНомер: ${user.documents.idCard.number}`,
        'passport': `ФИО: ${user.documents.passport.surname}\nИИН: ${user.iin}\nНомер: ${user.documents.passport.number}`,
        'drivers-license': `ФИО: ${user.documents.driversLicense.surname}\nИИН: ${user.iin}\nНомер: ${user.documents.driversLicense.number}`
    };
    
    alert(requisites[docType]);
}

// Редактирование реквизитов документов
function editDocumentRequisites(docType) {
    const docNames = {
        'id-card': 'удостоверения',
        'passport': 'паспорта',
        'drivers-license': 'водительского удостоверения'
    };
    
    alert(`Редактирование реквизитов ${docNames[docType]}\n\nЗдесь можно изменить ФИО, ИИН, номер документа и т.д.`);
}

// Изменение аватара
function changeAvatar() {
    const newAvatarUrl = prompt('Введите URL нового фото:', user.avatar);
    if (newAvatarUrl) {
        user.avatar = newAvatarUrl;
        document.getElementById('profile-avatar').src = newAvatarUrl;
        document.getElementById('settings-avatar').src = newAvatarUrl;
        saveData();
    }
}

// Изменение номера телефона
function changePhone() {
    const newPhone = prompt('Введите новый номер телефона:', user.phone);
    if (newPhone) {
        user.phone = newPhone;
        saveData();
        alert('Номер телефона изменен!');
    }
}

// Изменение номера карты
function editCardNumber() {
    const newNumber = prompt('Введите последние 4 цифры карты:', user.cardNumber);
    if (newNumber && newNumber.length === 4) {
        user.cardNumber = newNumber;
        saveData();
        document.querySelector('.card-number').innerHTML = `*${newNumber} <span class="edit-hint">✎</span>`;
    }
}

// Изменение баланса
function editBalance() {
    const newBalance = prompt('Введите новый баланс:', user.balance);
    if (newBalance && !isNaN(newBalance)) {
        user.balance = parseFloat(newBalance);
        saveData();
        document.getElementById('card-balance').textContent = `${user.balance.toLocaleString()} ₸`;
    }
}

// Выход
function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        localStorage.clear();
        location.reload();
    }
}

// История переводов
function showTransferHistory() {
    alert('История переводов:\n\n11 июля: Манар Ж. - 1 500 ₸\n10 июля: Богдан М. - 1 500 ₸\n9 июля: Богдан М. - 208,3 ₸\n8 июля: Бахтияр А. - 2 100 ₸');
}

// Выбор категории госуслуг
function selectGosuslugiCategory(category) {
    document.querySelectorAll('.gosuslugi-categories .category-icon').forEach(icon => {
        icon.style.opacity = '0.5';
    });
    event.currentTarget.style.opacity = '1';
    
    const categories = {
        'popular': 'Популярные',
        'certificates': 'Справки',
        'auto': 'Авто',
        'housing': 'Жилье',
        'family': 'Семья',
        'benefits': 'Пособия',
        'business': 'Бизнес',
        'payments': 'Платежи',
        'other': 'Другие'
    };
    
    console.log('Выбрана категория:', categories[category]);
}

// Показ вкладки банка
function showBankTab(tab) {
    document.querySelectorAll('.bank-tabs .tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    if (tab === 'statement') {
        document.getElementById('bank-statement').style.display = 'block';
    }
}

// Добавление товара в корзину
function addToCart(productId) {
    const product = window.products.find(p => p.id === productId);
    if (product) {
        alert(`Товар "${product.name}" добавлен в корзину!`);
    }
}

// Экспорт функций
window.showScreen = showScreen;
window.checkAccessCode = checkAccessCode;
window.changeAccessCode = changeAccessCode;
window.toggleFaceID = toggleFaceID;
window.presentDocument = presentDocument;
window.sendDocument = sendDocument;
window.showDocumentRequisites = showDocumentRequisites;
window.editDocumentRequisites = editDocumentRequisites;
window.changeAvatar = changeAvatar;
window.changePhone = changePhone;
window.editCardNumber = editCardNumber;
window.logout = logout;
window.showTransferHistory = showTransferHistory;
window.selectGosuslugiCategory = selectGosuslugiCategory;
window.showBankTab = showBankTab;
window.toggleFlashlight = toggleFlashlight;
window.addToCart = addToCart;