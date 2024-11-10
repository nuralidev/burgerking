const { Bot } = require("grammy");

// Create a bot object
const bot = new Bot("7918774506:AAE9V_19-_QZo_9bD1XRS5zGt4R6g-NTALM"); // <-- place your bot token in this string
let orders={}
// Register listeners to handle messages
bot.on("message:text", (ctx) => {
    const chatId=ctx.message.chat.id
    let message=ctx.message.text.trim();
    if(message==="/start"){
        ctx.reply(`Salam ${ctx.message.chat.first_name}\n Sifaris Nomresini bize gonderin ve sifarisiniz hazir olduqda bu barede size bildiris gonderilecek.`)
    }
    message=parseInt(message)
    if (!isNaN(message) && typeof(message)==typeof(5)) { // Əgər nömrədirsə
        orders[message] = { chatId: chatId, status: 'Gözləyir' };
        console.log(orders)
        ctx.reply(`Sifariş nömrəniz ${message} qəbul edildi. Hazır olduqda bildiriş alacaqsınız.`);
    } else {
        ctx.reply('Xahiş edirik, yalnız sifariş nömrənizi göndərin.');
    }
});

// Start the bot (using long polling)
bot.start();