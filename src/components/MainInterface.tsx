
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Webcam from 'react-webcam';





function MainInterface() {
  const webcamRef = useRef<Webcam>(null);
  const [images, setImages] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);


  function takeShot() {
    let base64 = webcamRef.current?.getScreenshot();
    if (!base64) return;
    setImages([...images, base64]);
  }

  function startTimer() {
    setCountdown(3);
  }

  useEffect(() => {
    if (countdown === null) {
      return;
    }

    if (countdown === 0) {
      setCountdown(null);
      takeShot();
      return;
    }

    setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

  }, [countdown]);



  return (
    <div className="w-screen h-screen min-h-screen bg-white box-border p-8 flex gap-4 flex-col lg:flex-row py-12">
      <div className='flex-1 flex flex-col items-center justify-center gap-8'>
        <div className='w-4/5 aspect-video flex items-center justify-center overflow-hidden'>
          <div className="relative rounded-xl">
            <Webcam 
              className='rounded-xl w-full h-full object-cover'
              videoConstraints={{
                facingMode: "user",
                width: {ideal: 1920},
                height: {ideal: 1080}
              }}
              ref={webcamRef}
            />
            <AnimatePresence>
              {countdown && (
                <motion.div 
                  className="absolute text-black text-5xl rounded-full bg-white flex items-center justify-center"
                  initial={{
                    top: "50%",
                    left: "50%",
                    x: "-50%",
                    y: "-50%",
                    width: 100,
                    height: 100
                  }}
                  animate={{
                    scale: [0.5, 1],
                    opacity: [0.3, 0.8]
                  }}
                  transition={{
                    times: [0, 0.3],
                    duration: 0.3
                  }}
                  exit={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "none",
                    opacity: 1,
                    color: "white"
                  }}
                >
                  {countdown ? countdown : null}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className='w-full h-20 flex items-center justify-center'>
          <motion.button
            className="text-white bg-blue-600 font-semibold px-6 py-2 text-lg rounded-lg"
            whileHover={{
              scale: 1.1
            }}
            whileTap={{
              scale: 0.9
            }}
            onClick={startTimer}
          >
            Start
          </motion.button>
        </div>
      </div>
      <div className='w-full lg:w-2/5 h-screen overflow-scroll flex justify-center'>
        <div className="aspect-videow-full gap-4 flex flex-col items-center py-8">
          {
            images.map(image => (
              <img 
                key={image}
                className="w-3/4 rounded-lg"
                src={image} 
                alt="" 
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default MainInterface
