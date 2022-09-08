// Tus rutas acá
import React from "react";
import TypesView from "./views/Types/Types";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import Landing from "./views/Landing/Landing";
import Create from "./views/Create/Create";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route exact path="/pokemon" element={<Home />} />
        <Route path="/pokemon/:pokemonId" element={<Detail />} />
        <Route path="/types" element={<TypesView />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
