import { useEffect, useState } from 'react';
import { AnimatePresence } from "motion/react";
import OpenAnimation from './components/OpenAnimation';
import MainInterface from './components/MainInterface';


function App() {
  const [justStarted, setJustStarted] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setJustStarted(false)
    }, 3000)
  }, [])

  return (
    <>
      <AnimatePresence>
        {justStarted && (
          <OpenAnimation />
        )}
      </AnimatePresence>

      {!justStarted && <MainInterface />}


      
    </>
  )
}

export default App