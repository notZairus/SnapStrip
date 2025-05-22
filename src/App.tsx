import { useEffect, useState } from 'react';
import { AnimatePresence } from "motion/react";
import OpenAnimation from './components/OpenAnimation';
import Webcam from 'react-webcam';


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


      
    </>
  )
}

export default App