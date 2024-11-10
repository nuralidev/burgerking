const TelegramBot = require('node-telegram-bot-api');
const token = '7918774506:AAE9V_19-_QZo_9bD1XRS5zGt4R6g-NTALM';
const bot = new TelegramBot(token, { polling: true });

// Sadə məlumat bazası kimi istifadə etmək üçün sifarişləri saxlayan obyekt
let orders = {};

// Müştəridən sifariş nömrəsi qəbul edən funksiya
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const orderNumber = msg.text.trim();
    if(orderNumber==="/start"){bot.sendMessage(chatId,`Salam ${msg.chat.first_name}\n Botumuza xos Geldin Sifaris nomresini bize gondermekle sifarisini izleye bilersen`)}
    if(orderNumber==="/yenile"){updateOrderStatus("266")}
    if (!isNaN(orderNumber)) { // Əgər nömrədirsə
        orders[orderNumber] = { chatId: chatId, status: 'Gözləyir' };
        bot.sendMessage(chatId, `Sifariş nömrəniz (${orderNumber}) qəbul edildi. Hazır olduqda bildiriş alacaqsınız.`);
        console.log(orders)
    } else {
        bot.sendMessage(chatId, 'Xahiş edirik, yalnız sifariş nömrənizi göndərin.');
    }
});
function updateOrderStatus(orderNumber) {
    const order = orders[orderNumber];

    if (order && order.status === 'Gözləyir') {
        order.status = 'Hazır';

        // Müştəriyə sifarişin hazır olduğunu bildir
        bot.sendMessage(order.chatId, `Sifarişiniz (${orderNumber}) hazırdır! Zəhmət olmasa sifarişinizi götürün.`);
    } else {
        console.log("Bu sifariş ya tapılmadı, ya da artıq hazır vəziyyətdədir.");
    }
}

// Misal: 101 nömrəli sifarişin statusunu yeniləyin
