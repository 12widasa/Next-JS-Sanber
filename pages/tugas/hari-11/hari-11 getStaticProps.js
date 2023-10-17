//get static props

import Header from '@/components/header';
import Footer from '@/components/footer';
import dynamic from 'next/dynamic';

const LayoutComponent = dynamic(() => import("@/components/layout"))

export default function Notes({ notes }) {

  console.log("notes data => ", notes)

  return (
    <div>
      <LayoutComponent metaTitle="Notes">
        <Header />

        {notes.data.map((item) => (
          <div style={{ border: "1px solid grey", marginBottom: "5ps" }}>
            <p>{item.title}</p>
            <p>{item.description}</p>
          </div>
        ))
        }
        <Footer />
      </LayoutComponent >

    </div >
  );
}

export async function getStaticProps() {
  const res = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes')
  const notes = await res.json()
  return { props: { notes }, revalidate: 10 }
}