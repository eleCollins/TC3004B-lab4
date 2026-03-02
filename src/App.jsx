import { useState } from 'react'
import Usuarios from './Usuarios'
import UsuariosAI from './UsuariosAI'

function App() {
  const [vista, setVista] = useState('clasico')

  return (
    <div>
      {vista === 'clasico' && (
        <>
          <div style={{ padding: '0.75rem 1.5rem', background: '#f8f9fa', borderBottom: '1px solid #dee2e6', textAlign: 'right' }}>
            <button
              onClick={() => setVista('ai')}
              style={{
                background: '#0f172a',
                color: '#f1f5f9',
                border: 'none',
                borderRadius: '8px',
                padding: '0.45rem 1.25rem',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              Ver versión AI ✨
            </button>
          </div>
          <Usuarios />
        </>
      )}

      {vista === 'ai' && (
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', zIndex: 10 }}>
            <button
              onClick={() => setVista('clasico')}
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#f1f5f9',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '0.45rem 1.25rem',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
            >
              ← Volver
            </button>
          </div>
          <UsuariosAI />
        </div>
      )}
    </div>
  )
}

export default App
