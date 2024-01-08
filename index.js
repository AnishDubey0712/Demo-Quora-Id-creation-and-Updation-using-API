const express = require("express");
const app = express();
const port = 5050;
const path = require("path");
const {v4:uuidv4}=require('uuid');
const methodOverride=require("method-override")

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));



app.listen(port, ()=>{
    console.log(`listening to port : ${port}`);
});
let posts =[ {
    id : uuidv4(),
    username : "Anish Dubey",
    content :  "Hi, I'm Anish. Currently learning full-stack web developement!"
},
{
    id : uuidv4(),
    username : "Varun Dubey",
    content :  "Hi, I'm Varun. Currently I'm learning in 10th grade"

}
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render('new.ejs');
});
app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id= uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newContent= req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(newContent);
    console.log("ID WORKING!");
    res.redirect("/posts")
});

app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
    //res.redirect("/posts")
})

app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    console.log(id);
    let post=posts.find((p)=>id===p.id);
    // res.send("Working")
   //console.log(id);
    res.render("show.ejs",{post});
});
app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
     posts=posts.filter((p)=>id!==p.id);
     res.redirect("/posts");
})