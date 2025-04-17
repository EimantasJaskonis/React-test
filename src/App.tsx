import { Routes, Route } from 'react-router';
import Home from './components/pages/Home';
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App;