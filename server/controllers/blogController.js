// ติดต่อกับฐานข้อมูล  / ดำเนินการกับฐานข้อมูล

const slugify = require("slugify")
const Blogs = require("../models/blogs")
const { v4: uuidv4 } = require('uuid');


//บันทึกข้อมูล
exports.create = (req, res)=>{
    const {title, content, author} = req.body
    let slug = slugify(title)

    if(!slug) slug = uuidv4();
   

    // validate  ->  ตรวจสอบความถูกต้องของข้อมูล
    switch(true){
        case !title:
            return res.status(400).json({error: "กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error: "กรุณาป้อนเนื้อหาบทความ"})
            break;

    }
     
    // บันทึกข้อมูล
    Blogs.create({title, content, author, slug}).then((blog)=>{
        res.json(blog)
    })
    .catch((err)=>{
        res.status(400).json({error:`มีบทความซ้ำกัน`})
    })

   
    
}



 //ดึงข้อมูลบทความทั้งหมด
 exports.getAllblogs =(req, res)=>{
    Blogs.find({}).then((blogs)=>{
        res.json(blogs)
    })
    .catch((err)=>{
        console.log(err)
    })
 }


// ดึงบทความที่สนใจ อ้างอิงตาม slug
exports.singleBlog = (req, res)=>{
    const {slug} = req.params
    Blogs.findOne({slug}).then((blog)=>{
        res.json(blog)
    })
    .catch((err)=>{
        console.log(err)
    })
}


// ลบบทความ
exports.remove = (req, res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).then((blog)=>{
        res.json({
            message: "ลบบทความเรียบร้อย"
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}

// update บทความ
exports.update = (req, res) =>{
    const {slug} = req.params
    const {title, content, author} = req.body
    Blogs.findOneAndUpdate({slug}, {title, content, author}, {new:true}).then((blog)=>{
        res.json(blog)
    })
    .catch((err)=>{
        console.log(err)
    })
    
}