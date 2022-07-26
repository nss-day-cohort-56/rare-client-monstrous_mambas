import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { Users } from "../components/users/Users"
import { UserDetails } from "../components/users/UserDetails"
import { TagContainer } from "../components/tags/TagContainer"
import { Categories } from "../components/categories/Categories"
import { MyPost } from "../components/posts/MyPost"
import {PostDetails} from "../components/posts/PostDetails"
import { PostForm } from "../components/posts/PostForm"
import { PostList } from "../components/posts/postList"
import { EditPost } from "../components/posts/EditPost"
import {CommentForm} from "../components/comments/CommentForm"
import { CommentsList } from "../components/comments/CommentList"



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

        <Route path="/posts" element={<PostList />} />
        <Route path="/my-posts" element={<MyPost />} />
        <Route path="/newpost" element={<PostForm />} />
        <Route path="/editpost/:postId" element={<EditPost />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/comments/:postId" element={<CommentsList />} />
        <Route path="posts/:post_id/" element={<PostDetails />} />
        <Route path="/addcomment/:postId" element={<CommentForm />} />
      </Route>
    </Routes>
  </>
}
