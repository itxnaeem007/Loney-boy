import './App.css';
import MainSection from './layout/MainSection';
import Footer from './components/Footer/Footer'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from './utils/web3React'
import { ToastContainer } from "react-toastify";
import Header from './images/header1.png'
import RenderHeader from './components/Header/RenderHeader';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css'

const NetworkContextName = 'NETWORK'
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
        />
        <div className="App">
          {/* <RenderHeader Header={Header} /> */}

          <MainSection />
          {/* <Footer /> */}
        </div>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
}

export default App;