//get static props

import Header from '@/components/header';
import Footer from '@/components/footer';
import dynamic from 'next/dynamic';

const LayoutComponent = dynamic(() => import("@/components/layout"))

export default function Posts({ posts }) {
  console.log('data posts => ', posts);
  return (
    <div>
      <LayoutComponent metaTitle="Posts">
        <Header />
        {posts.map((item) => (
          <div>
            <p>{item.id}</p>
            <p><b>{item.title} </b></p>
            <p>{item.body}</p>
          </div>
        ))}
        <Footer />
      </LayoutComponent >
    </div >
  );
}

export async function getServerSideProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const posts = await res.json()
  return { props: { posts } }
}