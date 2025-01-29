import { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import About from "./pages/About";
import Forum from "./components/Forum";
import About from "./pages/About"
import Forum from "./components/Forum"
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useBusinessAddresses } from './hooks/useBusinessAddresses';
import { useBusinessData } from './hooks/useBusinessData';
import PopularCategories from './components/PopularCategories';

// Import SignIn and SignUp components
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ListContainer from './pages/ListContainer';

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
    return <p>Something went wrong. Please try again.</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home businessData={combinedData} />} />
          <Route path="about" element={<About />} />
          <Route path="forum" element={<Forum combinedData={combinedData} />} />
          <Route path="popularcategories" element={<PopularCategories combinedData={combinedData} />} />
          
          {/* Add routes for SignIn and SignUp */}
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="popularcategories" element={<PopularCategories combinedData={combinedData}/>} />
          <Route path="listcontainer" element={<ListContainer combinedData={combinedData} />} />        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
