import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const Generator = lazy(() => import("./pages/Generator"));
const History = lazy(() => import("./pages/History"));
const Docs = lazy(() => import("./pages/Docs"));

const Loader = () => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
);

const App = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/history" element={<History />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
