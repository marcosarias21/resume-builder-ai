import { FormData } from './components/FormData'
import './App.css'
import { Sidebar } from './components/Sidebar'

const App = () => {

  return (
    <section className='grid grid-cols-5 container mx-auto h-dvh items-center'>
      <div className=''>
        <Sidebar />
      </div>
      <div className='col-span-3'>
        <FormData />
      </div>
      <div>
        Mostrar cambios en el CV
      </div>
    </section>
  )
}

export default App
