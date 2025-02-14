import { RouterProvider } from 'react-router'
import { router } from './router'

function App() {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true
      }}
    />
  )
}

export default App
