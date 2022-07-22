import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { Users } from "../components/users/Users"
import { UserDetails } from "../components/users/UserDetails"
import { TagContainer } from "../components/tags/TagContainer"

import { Categories } from "../components/categories/Categories"
import { MyPost } from "../components/posts/MyPost"
import { PostContainer } from "../components/posts/PostContainer"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>
        {/* Add Routes here */}
        <Route path="/tags" element={<TagContainer />} />
        <Route path="/users" element={<Users />} />
        <Route path="users/:userId/" element={<UserDetails />} />

        <Route path="/posts" element={<PostContainer />} />
        <Route path="/my-posts" element={<MyPost />} />

        <Route path="/categories" element={<Categories />} />

      </Route>
    </Routes>
  </>
}
