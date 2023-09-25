import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getToken } from "../services/authorize";

const EditComponent = ()=>{
    const params = useParams();
    const navigate = useNavigate();
 
    const [state, setState] = useState({
        title:"",
        author:"",
        slug:""
    })
    const {title, author, slug} = state

    const [content, setContent] = useState('')

    const submitContent = (event)=>{
        setContent(event)
    }

    // ดึงข้อมูลบทความที่ต้องการแก้ไข 
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
        .then(response=>{
            const {title, author, content, slug} = response.data
            setState({...state, title, author, slug})
            setContent(content)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])

    const showUpdateForm = ()=>(
        <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text" className="form-control" value={title} onChange={inputValue("title")}/>
                </div>
                <div className="form-group">
                    <label>รายละเอียด</label>
                    <ReactQuill 
                        value = {content} 
                        onChange = {submitContent}
                        theme = "snow"
                        className = "pb-5 mb-3"
                        style = {{border:'1px solid #666'}}
                    />
                </div>
                <div className="form-group">
                    <label>ผู้แต่ง</label>
                    <input type="text" className="form-control" value={author} onChange={inputValue("author")}/>
                </div>
                <br/>
                <input type="submit" value="อัพเดต" className="btn btn-primary" />
        </form>
    )

    // กำหนดค่าให้กับ state
    const inputValue = name => event => {
        setState({...state, [name]:event.target.value})
    }


    const submitForm = (e)=>{
        e.preventDefault();
        axios
        .put(`${process.env.REACT_APP_API}/blog/${slug}`, {title, content, author},
            {
                headers: {
                    authorization : `Bearer ${getToken()}`
                }
            }
        )
        .then(response=>{
            Swal.fire(
                'แจ้งเตือน',
                'อัพเดตบทความเรียบร้อย',
                'success'
            )
            const {title, content, author, slug} = response.data
            setState({...state, title, author, slug})
            setContent(content)
            navigate('/')
            
        })
        .catch(err=>{
            Swal.fire(
                'แจ้งเตือน',
                err.response.data.error,
                'error'
              )
        })

    }


    return (
        <div className="container p-5"> 
            <NavbarComponent />
            <h1>แก้ไขบทความ</h1>
            {/* {JSON.stringify(state)} */}
            {showUpdateForm()}
            <br/>
            
        </div>
    );
}

export default EditComponent