import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Route, Routes} from "react-router-dom";
import Posts from "./components/Pages/Posts";
import {useSelector} from "react-redux";
import Users from "./components/Pages/Users";
import Loader from "./Loader";
import Favorite from "./components/Pages/Users/Favorite";
import Albums from "./components/Pages/Albums";
import Photos from "./components/Pages/Albums/Photos";
import Todo from "./components/Pages/Todo";


function App() {
    const {loader} = useSelector(s => s.main)

    return (
        <div className='bg-[#114953]'>
            <h1 className='z-50 text-purple-800 fixed left-[50%] translate-y-[-50%] translate-x-[-50%] top-[50%]'>{loader && <Loader/>}</h1>
          <Header/>
            <Routes>
                <Route path='/' element={<Posts/>}/>
                <Route path='/users' element={<Users/>}/>
                <Route path='/favorite' element={<Favorite/>}/>
                <Route path='/albums' element={<Albums/>}/>
                <Route path='/photos' element={<Photos/>}/>
                <Route path='/todo' element={<Todo/>}/>
            </Routes>
          <Footer/>
        </div>
    );
}

export default App;
