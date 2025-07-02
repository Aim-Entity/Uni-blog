import BlogListView from "../pages/Blogs/BlogList";


const protectedRoutes = [
];

const publicRoutes = [
  { path: "/blog-list", component: <BlogListView /> },
];

export { protectedRoutes, publicRoutes };
