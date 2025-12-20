import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import Admin from "./pages/Admin"

function App() {


  return (
    <div className="min-h-screen bg-white">
     <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Admin Management Panel */}
        <Route path="/admin" element={<Admin />} />
        
        {/* Optional: 404 Page or Redirect */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
