import { useState } from 'react'
import UpcomingSessions from './components/UpcomingSessions'

function App() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
            <UpcomingSessions />
        </div>
    )
}

export default App
