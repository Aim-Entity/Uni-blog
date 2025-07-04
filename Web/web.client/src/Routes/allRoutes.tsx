import BlogCreateView from "../pages/Blogs/BlogCreate";
import BlogListView from "../pages/Blogs/BlogList";


const protectedRoutes = [
];

const publicRoutes = [
  { path: "/blog-list", component: <BlogListView /> },
  { path: "/blog-create", component: <BlogCreateView /> },
];

export { protectedRoutes, publicRoutes };
