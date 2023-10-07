import './pages/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginSignup } from './pages/LoginSignup/LoginSignup';
import Navbar from './pages/Home/Navbar';
import Header from './pages/Home/Header';
import Feature from './pages/Home/Feature';
import About from './pages/Home/About';
import Presentation from './pages/Home/Presentation';
import aboutimage from './Assets/images/home/Frame 19.png';
import aboutimage1 from './Assets/images/home/download.png';

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<LoginSignup />} />
                    <Route path="/homepage" element={
                        <>
                            <Header />
                            <Feature />
                            <About image={aboutimage} title='Comes with' button='Get the App' />
                            <Presentation />
                            <About image={aboutimage1} title='Download the app' button='Download' />
                        </>
                    } />
                    {/* Default route */}
                    <Route path="/" element={
                        <>
                            <Header />
                            <Feature />
                            {/* <About image={aboutimage} title='Comes with' button='Get the App' />
                            <Presentation /> */}
                            {/* <About image={aboutimage1} title='Meet the team' button='About' /> */}
                        </>
                    } />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
