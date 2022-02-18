import React, { FC, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./routes/Main";

interface IProps {}

const App: React.FC<IProps> = () => {
  const [account, setAccount] = useState<string>("");

  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
      } else {
        alert("Install Metamask");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAccount();
  }, [account]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main account={account} />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
