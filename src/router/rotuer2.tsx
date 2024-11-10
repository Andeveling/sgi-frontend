import { createBrowserRouter } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


function Home() {
  return <h1>Home Page</h1>;
}


function BlogLayout() {
  return (
    <div>
      <h1>Blog</h1>
      <Outlet />
    </div>
  );
}
function NewPost() {
  return <h2>Create a New Post</h2>;
}



export default function BlogPost() {
  const { slug } = useParams(); 

  return <h2>Blog Post: {slug}</h2>;
}


export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    id: 'blog',
    path: '/blog',
    Component: BlogLayout,
    children: [
      { path: 'new', Component: NewPost },
      { path: ':slug', Component: BlogPost },
    ],
  },
]);
