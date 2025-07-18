import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import BlogCreateView from "../pages/Blogs/BlogCreate";
import BlogListView from "../pages/Blogs/BlogList";
import BlogOverviewView from "../pages/Blogs/BlogOverview";


const protectedRoutes = [
  { path: "/blog-list", component: <BlogListView /> },
  { path: "/blog-create", component: <BlogCreateView /> },
  { path: "/blog-overview/:blogId", component: <BlogOverviewView /> },

];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/register", component: <Register /> },
];

export { protectedRoutes, publicRoutes };
