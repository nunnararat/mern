// ชื่อบทความ (title), บทความ (contene), ผู้เขียน (author) , slug (url)


// ใช้ slug -> install postman => install postman  |  ไม่ใช้ slug -> install postman => install%postman   (slug จัดการ url ให้น่าใช้งานมากขึ้น)


const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    content:{
        type:{},
        require:true
    },
    author:{
        type:String,
        default:"Admin"
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true
    }
},{timestamps:true})

module.exports = mongoose.model("Blogs", blogSchema)