import { Routes, Route } from 'react-router-dom';
import Auth from "./Pages/Auth";
import Landing from "./Pages/Landing";

const App = () => {
  return (
    <div className="bg-primary min-h-screen">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/*" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default App;
