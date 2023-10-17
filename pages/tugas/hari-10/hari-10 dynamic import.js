import Header from '@/components/header';
import Footer from '@/components/footer';
import dynamic from 'next/dynamic';

const LayoutComponent = dynamic(() => import("@/components/layout"))

export default function Main() {
  return (
    <div>
      <LayoutComponent metaTitle="Home">
        <Header />
        <p>Home</p>
        <Footer />
      </LayoutComponent>

    </div>
  );
}
