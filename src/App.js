import Auth from "./containers/Auth/Auth";
import Home from "./containers/Home/Home";
import Layout from "./hoc/Layout/Layout";
import './App.scss';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth/>} />
      </Routes>
    </Layout>
  );
}

export default App;
