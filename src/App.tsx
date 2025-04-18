import { Routes, Route } from 'react-router';
import Home from './components/pages/Home';
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Add from "./components/pages/Add";
import EditCard from "./components/pages/EditCard";
import User from "./components/pages/User";

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<Add />} />
        <Route path="/user" element={<User />} />
        <Route path="/edit/:id" element={<EditCard />} />
      </Routes>
    </>
  )
}

export default App;