const express = require("express")
const fs = require("fs")

const app = express(); //invoke

let productData = {
    "name": "Computer",
    "title": "HP",
    "price": 50000,
    "description": "Intel",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
    "rating": {
      "rate": 4.7,
      "count": 500
    }
}

// route
app.get("/",(req,res)=>{
    fs.readFile("db.json","utf-8",(err,data)=>{
        if(err)
        {
            res.end("Something went wrong..")
        }
        else
        {
            res.end(data)
        }
    })
})


app.post("/add",(req,res)=>{
    fs.readFile("db.json","utf-8",(err,data)=>{
        if(err)
        {
            res.end("Something went wrong (add)")
        }
        else
        {
             const dataFromdb = JSON.parse(data)
             let productID = dataFromdb.Products[dataFromdb.Products.length - 1].id;
             const newSingleProductData = {...productData, id:++productID}
             dataFromdb.Products.push(newSingleProductData)
             fs.writeFile("db.json",JSON.stringify(dataFromdb),(err)=>{
                if(err)
                {
                    res.end("Something Went wrong while Write the file")
                }
                else
                {
                    res.end("Updated Data",data)
                }
             })
        }
    })
})

app.delete('/delete/:id',(req,res)=>{
    // console.log(req.params)
    const {id} = req.params
    fs.readFile('./db.json',"utf-8",(err,data)=>{
        if(err)
        {
            res.send(err)
        }
        else
        {
            const dataFromdb = JSON.parse(data)
            const filterProduct = dataFromdb.Products.filter((el)=>el.id!=id)
            fs.writeFile('./db.json',JSON.stringify({Products:filterProduct}),(err)=>{
                if(err)
                {
                    res.send(err)
                }
                else
                {
                    res.send("Data is deleted")
                }
            })
        }
    })
    res.send("Data Deleted")
})

app.listen(1313,()=>{
    console.log("Server is running on port 1313")
})