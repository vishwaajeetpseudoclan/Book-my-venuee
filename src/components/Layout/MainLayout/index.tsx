import { Outlet } from 'react-router-dom';
import Header from '../../Header';
import Footer from '../../Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;