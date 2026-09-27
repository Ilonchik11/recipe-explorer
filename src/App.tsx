import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"
import Layout from "./pages/Layout"
import Home from "./pages/Home"

function App() {
  
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
