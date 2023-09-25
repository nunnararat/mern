import { useParams } from "react-router-dom";
import axios from "axios"
import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import renderHTML from "react-render-html"


const SingleComponent = ()=>{
    // console.log(JSON.stringify(props))
    const params = useParams();
    console.log(params)

    const [blog, setBlog] = useState('')

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
        .then(response=>{
            setBlog(response.data)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])
  
    return (
        // <div>{JSON.stringify(blog)}</div>
        <div className="container p-5">
            <NavbarComponent />
            {/* เช็คว่ามี state blog มั๊ย  blog &&*/}
            {blog &&  
            <div>
                <h1>{blog.title}</h1>
                <div className="pt-3">{renderHTML(blog.content)}</div>
                <p className="text-muted">ผู้เขียน: {blog.author} , เผยแพร่: {new Date(blog.createdAt).toLocaleString()}</p>
            </div>}
        </div>
    )
}

export default SingleComponent;