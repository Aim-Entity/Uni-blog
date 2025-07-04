import BlogCreateView from "../pages/Blogs/BlogCreate";
import BlogListView from "../pages/Blogs/BlogList";
import BlogOverviewView from "../pages/Blogs/BlogOverview";


const protectedRoutes = [
];

const publicRoutes = [
  { path: "/blog-list", component: <BlogListView /> },
  { path: "/blog-create", component: <BlogCreateView /> },
  { path: "/blog-overview", component: <BlogOverviewView /> },
];

export { protectedRoutes, publicRoutes };
