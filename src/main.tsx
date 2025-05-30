import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ImageContextProvider } from './contexts/ImageContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ImageContextProvider>
      <App />
    </ImageContextProvider>
  </StrictMode>,
)
