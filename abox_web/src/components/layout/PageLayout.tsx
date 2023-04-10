import Footer from './Footer';
import Header from './Header';

interface PageLayoutProp {
  children: React.ReactNode;
}

const PageLayout = (props: PageLayoutProp) => {
    return (
        <div className='flex flex-col min-h-screen'>
          <Header/>
            <div className='grow mt-0'>
              {props.children}
            </div>
          <Footer/>
        </div>
    );
}

export default PageLayout;