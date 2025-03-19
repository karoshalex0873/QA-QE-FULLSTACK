import { Routes, Route } from 'react-router-dom';
import Auth from "./Pages/Auth";
import Landing from "./Pages/Landing";
import Book from './Pages/Dashbord';

const App = () => {
  return (
    <div className="bg-primary min-h-screen">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/dashboard/*" element={<Book />} />
      </Routes>
    </div>
  );
};

export default App;
