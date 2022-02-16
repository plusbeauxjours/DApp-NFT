import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./routes/Main";

interface IProps {}

const App: React.FC<IProps> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
