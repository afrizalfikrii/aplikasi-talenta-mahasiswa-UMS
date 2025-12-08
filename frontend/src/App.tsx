import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Footer from './component/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <div className="max-w-7xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center text-slate-900 mb-4">
                  Selamat Datang di MyTalenta
                </h1>
                <p className="text-center text-gray-600">
                  Platform untuk menampilkan talenta Mahasiswa UMS
                </p>
              </div>
            } />
            <Route path="/login" element={
              <div className="max-w-7xl mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900">
                </h1>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
