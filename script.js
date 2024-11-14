const TelegramBot = require("node-telegram-bot-api");
// const token = "7514571859:AAE2KcPziMYSvlscSD7eRehcLuADbAfOSTY";
require('dotenv').config()
const token = process.env.Token
const bot = new TelegramBot(token, { polling: true });
const moment = require("moment");

const { default: axios } = require("axios");
let nextid=null
async function test() {
  await axios.get("http://localhost:3000/nextId/1").then((response)=>{
    nextid=response.data.testId
    });
}
test()
async function nextidfetch(){

  nextid++
 await axios.patch("http://localhost:3000/nextId/1",`{
    "testId": ${nextid}
}`).catch(()=>{
  console.log("Error")
 })
}


// Sadə məlumat bazası kimi istifadə etmək üçün sifarişləri saxlayan obyekt
let orders= {};
// Burada musteriden gelen cavab data.js faylinda saxlanilir..
async function fetchOrder(orders,customers) {
  await axios.post("http://localhost:3000/orders",orders);
  await axios.get(`http://localhost:3000/customers/${customers.id}`).catch(()=>{
    axios.post("http://localhost:3000/customers",customers);
  })
  
}
// Müştəridən sifariş nömrəsi qəbul edən funksiya
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const orderNumber = msg.text.trim();
  if (orderNumber === "/start") {
    bot.sendMessage(
      chatId,
      `Salam ${msg.chat.first_name}\n Botumuza xos Geldin Sifaris nomresini bize gondermekle sifarisini izleye bilersen`
    );
  }
  nextidfetch()
  if (orderNumber === "/yenile") {
    updateOrderStatus("266");
  }
  if (!isNaN(orderNumber)) {

    // Əgər nömrədirsə
    orders= 
      {
        id:`${ nextid}`,
        customerId: `${chatId}`,
        orderNumber: orderNumber,
        status:"Gozleyir",
        date: moment
        .unix(msg.date)
        .format("YYYY-MM-DD"),
      }
      customers={
        id:`${ chatId}`,
        name: msg.chat.first_name,
      }
    bot.sendMessage(
      chatId,
      `Sifariş nömrəniz ${orderNumber} qəbul edildi. Hazır olduqda bildiriş alacaqsınız.`
    );
    bot.sendMessage(-1002397682110,`\`Sifariş İD-->${orders.id}\nMüştəri Nömrəsi-->${orders.customerId}\nSifariş Nönrəsi-->${orders.orderNumber}\nStatus-->${orders.status}\nTarix-->${orders.date}\``,{parse_mode:"Markdown"});
    fetchOrder(orders,customers)
  } else {
    bot.sendMessage(chatId, "Xahiş edirik, yalnız sifariş nömrənizi göndərin.");
  }
});
function updateOrderStatus(orderNumber) {
  const order = costumers[orderNumber];

  if (order && order.status === "Gözləyir") {
    order.status = "Hazır";

    // Müştəriyə sifarişin hazır olduğunu bildir
    bot.sendMessage(
      order.chatId,
      `Sifarişiniz ${orderNumber} hazırdır! Zəhmət olmasa sifarişinizi götürün.`
    );
  } else {
    console.log("Bu sifariş ya tapılmadı, ya da artıq hazır vəziyyətdədir.");
  }
}

// Misal: 101 nömrəli sifarişin statusunu yeniləyin
