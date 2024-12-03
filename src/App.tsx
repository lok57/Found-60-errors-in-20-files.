import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes';
import { useTheme } from './contexts/ThemeContext';

export default function App() {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col ${theme}`}>
        <Navbar />
        <main className="flex-grow pt-16">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}