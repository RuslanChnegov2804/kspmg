// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
let currentCode = '';
let targetScreen = '';
let isSettingCode = false;
let stream = null;

// ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderProducts();
    renderShopProducts();
    renderTransactions();
    renderMessages();
    renderChatMessages();
    updateDocumentFields();
});

// ЗАГРУЗКА ДАННЫХ
function loadData() {
    const saved = localStorage.getItem('kaspi_data');
    if (saved) {
        const data = JSON.parse(saved);
        if (data.user) Object.assign(user, data.user);
        if (data.accessCode) window.accessCode = data.accessCode;
        if (data.faceID) window.faceIDEnabled = data.faceID;
    }
}

// СОХРАНЕНИЕ
function saveData() {
    localStorage.setItem('kaspi_data', JSON.stringify({
        user: user,
        accessCode: window.accessCode,
        faceID: window.faceIDEnabled
    }));
}

// ПОКАЗ ЭКРАНА
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
        screen.scrollTop = 0;
    }
    if (screenId === 'maps-screen') setTimeout(initMap, 300);
    if (screenId === 'qr-screen') setTimeout(initQRScanner, 300);
}

// ПРОВЕРКА КОДА ДОСТУПА
function checkAccessCode(screenId) {
    targetScreen = screenId;
    if (!window.accessCode) {
        isSettingCode = true;
        currentCode = '';
        updateCodeDots();
        showScreen('access-code-screen');
    } else if (window.faceIDEnabled) {
        showScreen('face-id-screen');
        setTimeout(() => {
            showScreen(targetScreen);
        }, 2000);
    } else {
        currentCode = '';
        isSettingCode = false;
        updateCodeDots();
        showScreen('access-code-screen');
    }
}

// ВВОД КОДА
function enterCode(num) {
    if (currentCode.length < 4) {
        currentCode += num;
        updateCodeDots();
        if (currentCode.length === 4) {
            setTimeout(() => {
                if (isSettingCode) {
                    window.accessCode = currentCode;
                    saveData();
                    alert('Код доступа установлен: ' + currentCode);
                    showScreen(targetScreen || 'main-screen');
                } else {
                    if (currentCode === window.accessCode) {
                        showScreen(targetScreen);
                    } else {
                        alert('Неверный код!');
                        currentCode = '';
                        updateCodeDots();
                    }
                }
            }, 300);
        }
    }
}

function deleteCode() {
    currentCode = currentCode.slice(0, -1);
    updateCodeDots();
}

function updateCodeDots() {
    const dots = document.querySelectorAll('#code-dots .code-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('filled', i < currentCode.length);
    });
}

function forgotCode() {
    if (confirm('Сбросить код доступа? Все данные будут удалены.')) {
        localStorage.clear();
        location.reload();
    }
}

// FACE ID
function showFaceIDScreen() {
    showScreen('face-id-screen');
    setTimeout(() => {
        if (isSettingCode) {
            alert('Face ID не может установить код. Введите код вручную.');
            showScreen('access-code-screen');
        } else {
            showScreen(targetScreen);
        }
    }, 2000);
}

function toggleFaceID() {
    window.faceIDEnabled = document.getElementById('faceid-toggle').checked;
    saveData();
}

// РЕНДЕР ТОВАРОВ
function renderProducts() {
    const container = document.getElementById('main-products');
    if (!container) return;
    container.innerHTML = products.map(p => createProductCard(p)).join('');
}

function renderShopProducts() {
    const container = document.getElementById('shop-products');
    if (!container) return;
    container.innerHTML = products.map(p => createProductCard(p)).join('');
}

function createProductCard(p) {
    return `
        <div class="product-card" onclick="showProductDetail(${p.id})">
            <img src="${p.image}" alt="${p.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22160%22><rect fill=%22%23f0f0f0%22 width=%22200%22 height=%22160%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22>Нет фото</text></svg>'">
            <div class="product-info">
                <div class="product-title">${p.name}</div>
                <div class="product-rating"><span class="stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))}</span> (${p.reviews})</div>
                <div class="product-price">${p.price.toLocaleString()} ₸</div>
                <div class="product-installment">
                    ${p.badge ? `<span class="installment-badge">${p.badge}</span>` : ''}
                    <span>${p.installment.toLocaleString()} ₸ x${p.months}</span>
                </div>
            </div>
        </div>
    `;
}

// ДЕТАЛИ ТОВАРА
function showProductDetail(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    
    let html = `<div style="padding: 20px;">`;
    html += `<img src="${p.image}" style="width: 100%; max-height: 300px; object-fit: contain; border-radius: 12px; margin-bottom: 16px;" onerror="this.style.background='#f0f0f0'">`;
    html += `<h2 style="font-size: 20px; margin-bottom: 8px;">${p.name}</h2>`;
    html += `<div style="color: #ffc107; margin-bottom: 12px;">${'★'.repeat(Math.floor(p.rating))} (${p.reviews} отзывов)</div>`;
    html += `<div style="font-size: 28px; font-weight: 700; margin-bottom: 8px;">${p.price.toLocaleString()} ₸</div>`;
    html += `<div style="background: #ffc107; display: inline-block; padding: 4px 12px; border-radius: 8px; font-weight: 600; margin-bottom: 16px;">${p.installment.toLocaleString()}  x${p.months}</div>`;
    
    if (p.description) {
        html += `<h3 style="margin: 16px 0 8px;">Описание</h3><p style="color: #666; line-height: 1.5;">${p.description}</p>`;
    }
    
    if (p.productReviews && p.productReviews.length) {
        html += `<h3 style="margin: 16px 0 8px;">Отзывы (${p.productReviews.length})</h3>`;
        p.productReviews.forEach(r => {
            html += `<div style="border-bottom: 1px solid #f0f0f0; padding: 12px 0;">`;
            html += `<div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><strong>${r.name}</strong><span style="color: #999; font-size: 12px;">${r.date}</span></div>`;
            html += `<div style="color: #ffc107; margin-bottom: 4px;">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>`;
            html += `<div style="color: #333; line-height: 1.4;">${r.text}</div>`;
            html += `<div style="color: #999; font-size: 12px; margin-top: 4px;">${r.helpful} человек(а) посчитал(и) отзыв полезным</div>`;
            html += `</div>`;
        });
    }
    
    html += `<div style="display: flex; gap: 12px; margin-top: 20px;">`;
    html += `<button style="flex: 1; padding: 14px; background: #007aff; color: #fff; border: none; border-radius: 12px; font-size: 16px; font-weight: 600;" onclick="alert('Добавлено в корзину!')">В корзину</button>`;
    html += `<button style="flex: 1; padding: 14px; background: #38c172; color: #fff; border: none; border-radius: 12px; font-size: 16px; font-weight: 600;" onclick="alert('Переход к оформлению!')">Купить сейчас</button>`;
    html += `</div></div>`;
    
    showModalCustom(html);
}

// МОДАЛЬНОЕ ОКНО
function showModalCustom(html) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    modal.innerHTML = `<div class="modal-content" style="max-width: 400px; max-height: 80vh; overflow-y: auto; text-align: left;" onclick="event.stopPropagation()"><div class="modal-close" onclick="this.parentElement.parentElement.remove()">✕</div>${html}</div>`;
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// ТРАНЗАКЦИИ
function renderTransactions() {
    const container = document.getElementById('transactions-list');
    if (!container) return;
    container.innerHTML = transactions.map(t => `
        <div class="transaction-item">
            <div class="transaction-icon">${t.icon}</div>
            <div class="transaction-info">
                <div class="transaction-name">${t.name}</div>
                <div class="transaction-type">${t.type}${t.comment ? ' - ' + t.comment : ''}</div>
            </div>
            <div class="transaction-amount ${t.amount > 0 ? 'positive' : 'negative'}">${t.amount > 0 ? '+' : ''}${t.amount.toLocaleString()} ₸</div>
        </div>
    `).join('');
}

// СООБЩЕНИЯ
function renderMessages() {
    const container = document.getElementById('messages-list');
    if (!container) return;
    container.innerHTML = messages.map(m => `
        <div class="message-item" onclick="${m.sender === 'Kaspi Gold' ? "showScreen('chat-gold-screen')" : ''}">
            <div class="message-icon ${m.icon}">${m.icon === 'gold' ? '🏦' : m.icon === 'payments' ? '' : m.icon === 'promo' ? '' : '💬'}</div>
            <div class="message-content">
                <div class="message-header"><div class="message-title">${m.sender}</div><div class="message-time">${m.time}</div></div>
                <div class="message-text">${m.text}</div>
            </div>
        </div>
    `).join('');
}

// ЧАТ
function renderChatMessages() {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    container.innerHTML = chatMessages.map(m => {
        if (m.sender === 'me') {
            return `<div style="background: #f0f0f0; padding: 12px 16px; border-radius: 16px; margin-bottom: 8px; margin-left: 40px;"><div style="font-size: 14px; white-space: pre-line;">${m.text}</div><div style="font-size: 11px; color: #999; text-align: right; margin-top: 4px;">${m.time}</div></div>`;
        } else if (m.sender === 'system') {
            return `<div style="text-align: center; color: #999; font-size: 12px; margin: 12px 0;">Сегодня</div><div style="background: #f8f9fa; padding: 12px 16px; border-radius: 16px; margin-bottom: 8px;"><div style="font-size: 14px; white-space: pre-line;">${m.text}</div><div style="font-size: 11px; color: #999; text-align: right; margin-top: 4px;">${m.time}</div></div>`;
        } else {
            return `<div style="display: flex; gap: 8px; margin-bottom: 12px; align-items: flex-start;"><div style="width: 36px; height: 36px; border-radius: 50%; background: #e0e0e0; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">${m.avatar || m.sender[0]}</div><div style="flex: 1;"><div style="background: #fff; padding: 12px 16px; border-radius: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);"><div style="font-size: 14px; white-space: pre-line;">${m.text}</div>${m.comment ? `<div style="background: #f0f0f0; padding: 8px 12px; border-radius: 12px; margin-top: 8px; font-size: 13px;">${m.comment}</div>` : ''}<div style="font-size: 11px; color: #999; text-align: right; margin-top: 4px;">${m.time}</div></div><button style="margin-top: 8px; padding: 8px 16px; background: #fff; border: 1px solid #007aff; color: #007aff; border-radius: 8px; font-size: 13px;">Подтвердить перевод</button></div></div>`;
        }
    }).join('');
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    if (input.value.trim()) {
        chatMessages.push({sender: 'me', text: input.value, time: new Date().toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'})});
        input.value = '';
        renderChatMessages();
    }
}

// QR КАМЕРА
function initQRScanner() {
    const video = document.getElementById('qr-video');
    if (!video) return;
    if (stream) {
        stream.getTracks().forEach(t => t.stop());
    }
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}})
            .then(s => { stream = s; video.srcObject = s; })
            .catch(() => { video.style.background = '#111'; });
    }
}

function toggleFlashlight() {
    alert('Фонарик переключен');
}

// КАРТА
function initMap() {
    if (window.mapInitialized) return;
    const mapEl = document.getElementById('map');
    if (!mapEl) return;
    try {
        const map = L.map('map').setView([50.4229, 80.2328], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '© OSM'}).addTo(map);
        const locations = [
            {lat: 50.4229, lng: 80.2328, name: "Отделение Kaspi", icon: "🏦"},
            {lat: 50.4250, lng: 80.2350, name: "Банкомат", icon: "🏧"},
            {lat: 50.4200, lng: 80.2300, name: "Терминал", icon: "💳"},
            {lat: 50.4280, lng: 80.2280, name: "Картомат", icon: "📱"}
        ];
        locations.forEach(loc => {
            L.marker([loc.lat, loc.lng]).addTo(map).bindPopup(`<b>${loc.name}</b><br>ул. Гагарина, Семей`);
        });
        window.mapInitialized = true;
    } catch(e) { console.log('Map error:', e); }
}

// ДОКУМЕНТЫ - ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК
function switchDocTab(doc, tab) {
    const prefix = doc === 'id' ? 'id' : doc === 'pass' ? 'pass' : 'dl';
    document.getElementById(`${prefix}-doc-tab`).classList.toggle('active', tab === 'document');
    document.getElementById(`${prefix}-req-tab`).classList.toggle('active', tab === 'requisites');
    document.getElementById(`${prefix}-document-view`).style.display = tab === 'document' ? 'block' : 'none';
    document.getElementById(`${prefix}-requisites-view`).style.display = tab === 'requisites' ? 'block' : 'none';
}

// ДОБАВИТЬ ФОТО ДОКУМЕНТА
function addDocumentPhoto(type) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const imgId = type === 'id' ? 'id-card-photo' : type === 'passport' ? 'passport-photo' : 'dl-photo';
                document.getElementById(imgId).src = ev.target.result;
                localStorage.setItem('doc_photo_' + type, ev.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// ПРЕДЪЯВИТЬ ДОКУМЕНТ
function presentDocument(docType) {
    const code = Math.floor(100000 + Math.random() * 900000);
    const names = {'id-card': 'Удостоверение личности', 'passport': 'Паспорт гражданина РК', 'drivers-license': 'Водительские права'};
    document.getElementById('modal-doc-title').textContent = names[docType] || 'Документ';
    document.getElementById('modal-code').textContent = code;
    drawQRCode(code);
    document.getElementById('qr-modal').style.display = 'flex';
}

function sendDocument(docType) {
    alert('Документ отправлен!');
}

// РИСОВАНИЕ QR
function drawQRCode(code) {
    const canvas = document.getElementById('qr-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 180, 180);
    ctx.fillStyle = '#000';
    const seed = code.toString().split('').reduce((a, b) => a + parseInt(b), 0);
    for (let y = 0; y < 18; y++) {
        for (let x = 0; x < 18; x++) {
            if ((seed * (y * 18 + x) * 7 + x * 13 + y * 17) % 3 !== 0) {
                ctx.fillRect(x * 10, y * 10, 10, 10);
            }
        }
    }
    [[0,0],[140,0],[0,140]].forEach(([x,y]) => {
        ctx.fillStyle = '#000';
        ctx.fillRect(x, y, 30, 30);
        ctx.fillStyle = '#fff';
        ctx.fillRect(x+5, y+5, 20, 20);
        ctx.fillStyle = '#000';
        ctx.fillRect(x+10, y+10, 10, 10);
    });
}

// РЕКВИЗИТЫ
function editDocumentRequisites(docType) {
    const doc = user.documents[docType];
    if (!doc) return;
    const fields = Object.keys(doc);
    fields.forEach(field => {
        const val = prompt(`${field}:`, doc[field]);
        if (val !== null) doc[field] = val;
    });
    saveData();
    updateDocumentFields();
    alert('Реквизиты обновлены!');
}

function updateDocumentFields() {
    const d = user.documents;
    if (d.idCard) {
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        set('id-surname', d.idCard.surname);
        set('id-name', d.idCard.name);
        set('id-patronymic', d.idCard.patronymic);
        set('id-birthdate', d.idCard.birthdate);
        set('id-iin-value', d.idCard.iin);
        set('id-number-value', d.idCard.number);
        set('id-birthplace', d.idCard.birthplace);
        set('id-nationality', d.idCard.nationality);
        set('id-dates', d.idCard.dates);
        set('req-id-fio', `${d.idCard.surname} ${d.idCard.name} ${d.idCard.patronymic}`);
        set('req-id-iin', d.idCard.iin);
        set('req-id-birth', d.idCard.birthdate);
        set('req-id-number', d.idCard.number);
    }
    if (d.passport) {
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        set('pass-surname', d.passport.surname);
        set('pass-name', d.passport.name);
        set('pass-number', d.passport.number);
        set('pass-iin', d.passport.iin);
        set('pass-birthdate', d.passport.birthdate);
        set('pass-issue-date', d.passport.issueDate);
        set('pass-expiry-date', d.passport.expiryDate);
        set('req-pass-fio', d.passport.surname);
        set('req-pass-iin', d.passport.iin);
        set('req-pass-number', d.passport.number);
        set('req-pass-issue', d.passport.issueDate);
        set('req-pass-expiry', d.passport.expiryDate);
    }
    if (d.driversLicense) {
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        set('dl-surname', d.driversLicense.surname);
        set('dl-name', d.driversLicense.name);
        set('dl-number', d.driversLicense.number);
        set('dl-iin', 'ЖСН/ИИН ' + d.driversLicense.iin);
        set('dl-birthdate', d.driversLicense.birthdate + ', область Абай');
        set('dl-issue-date', d.driversLicense.issueDate);
        set('dl-expiry-date', d.driversLicense.expiryDate);
        set('req-dl-fio', d.driversLicense.surname);
        set('req-dl-iin', d.driversLicense.iin);
        set('req-dl-number', d.driversLicense.number);
        set('req-dl-issue', d.driversLicense.issueDate);
        set('req-dl-expiry', d.driversLicense.expiryDate);
    }
    ['id', 'passport', 'dl'].forEach(type => {
        const saved = localStorage.getItem('doc_photo_' + type);
        if (saved) {
            const imgId = type === 'id' ? 'id-card-photo' : type === 'passport' ? 'passport-photo' : 'dl-photo';
            const el = document.getElementById(imgId);
            if (el) el.src = saved;
        }
    });
}

function copyText(id) {
    const el = document.getElementById(id);
    if (el) {
        navigator.clipboard.writeText(el.textContent).then(() => alert('Скопировано!'));
    }
}

// НАСТРОЙКИ
function changeAvatar() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                user.avatar = ev.target.result;
                document.getElementById('profile-avatar').src = ev.target.result;
                document.getElementById('settings-avatar').src = ev.target.result;
                document.getElementById('code-avatar').src = ev.target.result;
                saveData();
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

function changeAccessCode() {
    const oldCode = prompt('Введите старый код:');
    if (oldCode !== window.accessCode) { alert('Неверный код!'); return; }
    const newCode = prompt('Введите новый 4-значный код:');
    if (newCode && newCode.length === 4 && /^\d+$/.test(newCode)) {
        window.accessCode = newCode;
        saveData();
        alert('Код изменён!');
    }
}

function changePhone() {
    const newPhone = prompt('Новый номер:', user.phone);
    if (newPhone) { user.phone = newPhone; saveData(); alert('Номер изменён!'); }
}

function editCardNumber() {
    const num = prompt('Последние 4 цифры карты:', user.cardNumber);
    if (num && num.length === 4) {
        user.cardNumber = num;
        saveData();
        document.getElementById('bank-card-num').textContent = num;
    }
}

function editBalance() {
    const bal = prompt('Новый баланс:', user.balance);
    if (bal && !isNaN(bal)) {
        user.balance = parseFloat(bal);
        saveData();
        document.getElementById('card-balance').textContent = user.balance.toLocaleString() + ' ₸';
        document.getElementById('bank-balance-display').textContent = user.balance.toLocaleString() + ' ';
        const tb = document.getElementById('transfer-balance');
        if (tb) tb.textContent = user.balance.toLocaleString() + ' ₸';
    }
}

function logout() {
    if (confirm('Выйти?')) { localStorage.clear(); location.reload(); }
}

// ВКЛАДКИ
function switchMainTab(tab, el) {
    document.querySelectorAll('.tabs-section .tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    const container = document.getElementById('main-products');
    let filtered = products;
    if (tab === 'discounts') filtered = products.filter(p => p.price > 10000);
    if (tab === 'bonuses') filtered = products.filter(p => p.bonus);
    container.innerHTML = filtered.map(p => createProductCard(p)).join('');
}

function showBankTab(tab, el) {
    document.querySelectorAll('#bank-screen .bank-tabs .tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('bank-actions-content').style.display = tab === 'actions' ? 'block' : 'none';
    document.getElementById('bank-info-content').style.display = tab === 'info' ? 'block' : 'none';
    document.getElementById('bank-statement-content').style.display = tab === 'statement' ? 'block' : 'none';
}

function showPaymentTab(tab, el) {
    document.querySelectorAll('#payments-screen .payments-tabs .tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('payments-all-content').style.display = tab === 'all' ? 'block' : 'none';
    document.getElementById('payments-my-content').style.display = tab === 'my' ? 'block' : 'none';
}

function showTransferTab(tab, el) {
    document.querySelectorAll('#transfers-screen .transfers-tabs .tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('transfers-my-content').style.display = tab === 'my' ? 'block' : 'none';
    document.getElementById('transfers-history-content').style.display = tab === 'history' ? 'block' : 'none';
}

function switchTransferMethod(method, el) {
    document.querySelectorAll('#transfer-to-client-screen > div > div:nth-child(2) > div').forEach(d => {
        d.style.background = '#f8f9fa';
        d.style.color = '#333';
    });
    el.style.background = '#e3342f';
    el.style.color = '#fff';
    document.getElementById('transfer-phone-method').style.display = method === 'phone' ? 'block' : 'none';
    document.getElementById('transfer-card-method').style.display = method === 'card' ? 'block' : 'none';
    document.getElementById('transfer-qr-method').style.display = method === 'qr' ? 'block' : 'none';
}

function selectGosuslugiCategory(cat, el) {
    document.querySelectorAll('.gosuslugi-categories .category-icon').forEach(i => i.style.opacity = '0.5');
    el.style.opacity = '1';
}

// ЭКСПОРТ ФУНКЦИЙ
window.showScreen = showScreen;
window.checkAccessCode = checkAccessCode;
window.enterCode = enterCode;
window.deleteCode = deleteCode;
window.forgotCode = forgotCode;
window.showFaceIDScreen = showFaceIDScreen;
window.toggleFaceID = toggleFaceID;
window.showProductDetail = showProductDetail;
window.closeModal = closeModal;
window.presentDocument = presentDocument;
window.sendDocument = sendDocument;
window.switchDocTab = switchDocTab;
window.addDocumentPhoto = addDocumentPhoto;
window.editDocumentRequisites = editDocumentRequisites;
window.copyText = copyText;
window.changeAvatar = changeAvatar;
window.changeAccessCode = changeAccessCode;
window.changePhone = changePhone;
window.editCardNumber = editCardNumber;
window.editBalance = editBalance;
window.logout = logout;
window.switchMainTab = switchMainTab;
window.showBankTab = showBankTab;
window.showPaymentTab = showPaymentTab;
window.showTransferTab = showTransferTab;
window.switchTransferMethod = switchTransferMethod;
window.selectGosuslugiCategory = selectGosuslugiCategory;
window.toggleFlashlight = toggleFlashlight;
window.sendChatMessage = sendChatMessage;
