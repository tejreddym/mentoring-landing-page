import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BookingPage from './pages/BookingPage';
import TaaraDashboard from './pages/TaaraDashboard';
import VideoCall from './pages/VideoCall';

// Simplified App starting from BookingPage
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="/book" element={<Navigate to="/" replace />} />
        <Route path="/dashboard" element={<TaaraDashboard />} />
        <Route path="/video-call" element={<VideoCall />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
