import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { TagList } from "../components/tags/Tags"
import { Authorized } from "./Authorized"
import { Users } from "../components/users/Users"

import { PostList } from "../components/posts/postList"
import { Categories } from "../components/categories/Categories"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        {/* Add Routes here */}
      <Route path="/tags" element={<TagList />}  />
      <Route path="/users" element={<Users  />} />

      <Route path="/posts" element={<PostList  />} />

        
      <Route path="/categories" element={<Categories />} />

      </Route>
    </Routes>
  </>
}
