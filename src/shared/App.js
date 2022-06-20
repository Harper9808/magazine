import React from 'react';
import Header from '../components/Header';
import Grid from '../components/Grid';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostItem from '../components/PostItem';
import PostWrite from '../pages/PostWrite';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import PostList from '../pages/PostList';
import PostDetail from '../pages/PostDetail';

function App() {
  const [is_login, setIsLogin] = React.useState(false);
  const is_session = sessionStorage.getItem('token') ? true : false;

  // const dispatch = useDispatch();
  // React.useEffect( () => {
  //   //TODO 쿠키로 저장하기 
  //   // const token = getCookie("token");
  //   // if(token){
  //   //   dispatch(userActions.loginCheck(token))
  //   // }
  //   if(is_session){
  //     dispatch(userActions.loginCheckAPI());
  //   }
  // },[]);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Grid margin='85px'/>
        <Grid>
        <Routes>
            <Route path="/" element={<PostList/>}/>
            <Route path="/Login" element={<Login/>} />
            <Route path="/Signup" element={<Signup/>} />
            <Route path='/post/:id' element={<PostDetail/>}/>
            <Route path="/postWrite"  element={<PostWrite/>}/>
            <Route path="/postModify/:id"  element={<PostWrite/>}/>
        </Routes>
        </Grid>
      </BrowserRouter>
    </div>
  );
}

export default App;
