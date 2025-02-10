import { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import About from "./pages/About";
import Forum from "./components/Forum";
import Footer from './components/Footer';
import { useBusinessAddresses } from './hooks/useBusinessAddresses';
import { useBusinessData } from './hooks/useBusinessData';
import PopularCategories from './components/PopularCategories';
import ListContainer from './pages/ListContainer';
import "./styles/global.css"
import AuthForm from './styles/old/SignIn.module.css'
import Header from './components/Header/Header';
import AddBusiness from './components/Business/AddBusiness';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  return (
    <div className="top-root">
      <Header />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  const { businessAddreses, isLoading: isBusinessAddressLoading, hasError: hasBusinessAdrressError } = useBusinessAddresses();
  const { businessData, isLoading: isBusinessLoading, hasError: hasBusinessError } = useBusinessData();

  const combinedData = useMemo(() => {
    if (!businessData || !businessAddreses) return [];
    
    return businessData.map((business) => {
      const address = businessAddreses.find(
        (addr) => addr.id === business.id_address
      );

      // Combinăm datele business-ului cu adresa
      return {
        ...business,
        ...address,
      };
    }).filter(item => 
      item && 
      typeof item.latitude === 'number' && 
      typeof item.longitude === 'number'
    );
  }, [businessAddreses, businessData]);

  if (isBusinessAddressLoading || isBusinessLoading) {
    return <p>Loading...</p>;
  }

  if (hasBusinessAdrressError || hasBusinessError) {
    return <p>Something went wrong. please try again</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home businessData={combinedData} />} />
          <Route path="about" element={<About />} />
          <Route path="forum" element={<Forum combinedData={combinedData} />} />
          <Route path="popularcategories" element={<PopularCategories combinedData={combinedData} />} />
          <Route path="listcontainer" element={<ListContainer combinedData={combinedData} />} />
          <Route path="signin" element={<AuthForm />} /> {/* Updated to use AuthForm */}
          <Route path="business" element={<AddBusiness />} /> 
        </Route>
      </Routes>
      
      {/* Global Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ 
          bottom: '20px',
          right: '20px'
        }}
      />
    </BrowserRouter>
  );
}

export default App;
