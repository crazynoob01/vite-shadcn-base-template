import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </div>
  </QueryClientProvider>
)

export default App
