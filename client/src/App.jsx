import React,{useContext,useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./component/content/IndexPage";
import Layout from "./component/Layout";
import LoginPage from "./component/content/LoginPage";
import RegisterPage from "./component/content/RegisterPage";
import AddPost from "./component/content/AddPost";
import DetailPost from "./component/content/DetailPost";
import EditPost from "./component/content/EditPost";
import TestCloud from "./component/content/TestCloud";
import TagPage from "./component/content/TagPage";
import SearchPage from "./component/content/SearchPage";

import UserContextProvider from './UserContext'

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/addblog" element={<AddPost />} />
          <Route path="/detailpost/:id" element={<DetailPost />} />
          <Route path="/editpost/:id" element={<EditPost />} />
          <Route path="/uploadfile" element={<TestCloud/>}/>
          <Route path="/tag/:tagParams" element={<TagPage/>}/>
          <Route path="/search/:query" element={<SearchPage/>}/>

        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
