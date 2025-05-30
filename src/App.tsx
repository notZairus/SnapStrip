import { useEffect, useState } from 'react';
import { AnimatePresence } from "motion/react";
import OpenAnimation from './components/OpenAnimation';
import MainInterface from './components/MainInterface';
import StripCustomization from './components/StripCustomization';


function App() {
  const [justStarted, setJustStarted] = useState<boolean>(true);
  const [isStripCustomization, setIsStripCustomization] = useState<boolean>(false);

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

      {!justStarted && !isStripCustomization && (
        <MainInterface setIsStripCustomization={setIsStripCustomization} />
      )}

      {!justStarted && isStripCustomization && (
        <StripCustomization />
      )}

      
    </>
  )
}

export default App