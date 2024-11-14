const express = require("express");
const app = express();
const data = require("./data");
require('dotenv').config()
const port = process.env.PORT
app.get("/costumers", (req, res) => {
  res.status(200).json(data); 
});
app.get("/costumers/:id", (req, res) => {
  const { id } = req.params;
  const human = data.find((human) => human.id == id);
  if (human) {
    res.status(200).send(human);
  } else { 
    res
      .status(400)
      .send(
        "This human is not found in my database thank you for your searching."
      );
  }
});
let nextid=4;
app.post("/costumers",(req,res)=>{
  let yeniOrder=req.body
  yeniOrder.id=nextid
  nextid++
  data.push(yeniOrder)
  res.status(201).json(yeniOrder)

})
app.listen(port, () => {
  console.log(`http://localhost:${port} dinleniyor`);
});
