import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import BlogCreateView from "../pages/Blogs/BlogCreate";
import BlogListView from "../pages/Blogs/BlogList";
import BlogOverviewView from "../pages/Blogs/BlogOverview";
import Logout from "../pages/Authentication/Logout";

const protectedRoutes = [
  { path: "/blog-list", component: <BlogListView /> },
  { path: "/blog-create", component: <BlogCreateView /> },
  { path: "/blog-overview/:blogId", component: <BlogOverviewView /> },

];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
  { path: "/logout", component: <Logout /> },
];

export { protectedRoutes, publicRoutes };
