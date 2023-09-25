import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from "./App"
import FormComponent from "./components/FormComponent"
import SingleComponent from './components/SingleComponent';
import EditComponent from './components/EditComponent';
import LoginComponent from './components/LoginComponent';
import AdminRoute from './AdminRoute';


const MyRoute = ()=>{
    return( 
        <Router>
            <Routes>
                <Route path="/"  element={<App />} />
                <Route path="/blog/:slug" element={<SingleComponent />} />

                {/** AdminRoute Routes */}
	            {/** Wrap all Route under AdminRoute element */}
                <Route path="/"  element={<AdminRoute />}>
                    <Route path="/create" element={<FormComponent />} />
                    <Route path="/blog/edit/:slug" element={<EditComponent />} />
                </Route>
                
                <Route path="/login" element={<LoginComponent />} />
            </Routes>
        </Router>
    )
}

export default MyRoute;