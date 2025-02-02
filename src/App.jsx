import { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import About from "./pages/About";
import Forum from "./components/Forum";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useBusinessAddresses } from './hooks/useBusinessAddresses';
import { useBusinessData } from './hooks/useBusinessData';
import PopularCategories from './components/PopularCategories';
import ListContainer from './pages/ListContainer';
import "./styles/global.css"
import AuthForm from './components/SignIn.module.css'

function Layout() {
  return (
    <div className="top-root">
      <div className="container">
        <NavBar />
      </div>
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
  
  const combinedData = useMemo(() => businessData && businessData.map((business) => {
    const address = businessAddreses && businessAddreses.find(
      (addr) => addr.id === business.id_address
    );

    if (address && address.latitude && address.longitude) {
      return {
        ...business,
        ...address,
      };
    } else {
      return;
    }
  }).filter((item) => item !== null), [businessAddreses, businessData]);

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
