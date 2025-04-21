const app=require('./src/app.js')
require('dotenv').config()

app.listen(3000,(req,res)=>{
console.log("listening")
})