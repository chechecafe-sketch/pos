import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { VirtualTicketPage, readTicketFromLocation } from './VirtualTicket.jsx'

// Si la liga trae un ticket virtual (QR del cliente) mostramos solo el ticket,
// sin cargar el POS.
const ticket = readTicketFromLocation()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {ticket ? <VirtualTicketPage ticket={ticket} /> : <App />}
  </StrictMode>,
)
