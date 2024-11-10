const { Bot } = require("grammy");

// Create a bot object
const bot = new Bot(""); // <-- place your bot token in this string

// Register listeners to handle messages
bot.on("message:text", (ctx) => {
    const chatId=ctx.message.chat.id
    const message=ctx.message.text.trim();
    if(message==="/start"){
        ctx.reply(`Salam ${ctx.message.chat.first_name}\n Sifaris Nomresini bize gonderin ve sifarisiniz hazir olduqda bu barede size bildiris gonderilecek.`)
    }
    if (!isNaN(message)) { // Əgər nömrədirsə
        orders[message] = { chatId: chatId, status: 'Gözləyir' };
        ctx.reply(chatId, `Sifariş nömrəniz (${message}) qəbul edildi. Hazır olduqda bildiriş alacaqsınız.`);
    } else {
        ctx.reply(chatId, 'Xahiş edirik, yalnız sifariş nömrənizi göndərin.');
    }
});

// Start the bot (using long polling)
bot.start();