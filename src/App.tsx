import Dashboard from './Dashboard'

const App = () => {
  return (
     <>
         <h1>{import.meta.env.VITE_BACKEND_URL}</h1>
        <Dashboard />
     </>
  )
}

export default App