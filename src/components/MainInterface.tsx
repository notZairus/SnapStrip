
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Webcam from 'react-webcam';
import ImageCanvas from "./ImageCanvas";
import { nanoid } from "nanoid";
import { useImageContext } from "../contexts/ImageContext";
import type { Image } from "../contexts/ImageContext";



function MainInterface({ setIsStripCustomization }: {setIsStripCustomization : React.Dispatch<React.SetStateAction<boolean>>}) {
  const webcamRef = useRef<Webcam>(null);
  const {images, setImages} = useImageContext(); 
  const [countdown, setCountdown] = useState<number | null>(null);
  const [taking, setTaking] = useState<boolean>(false);
  const [isAutoCapturing, setIsAutoCapturing] = useState<boolean>(false);

  function takePhoto() {
    setTaking(true);
    setTimeout(() => {
      setTaking(false);
      let base64 = webcamRef.current?.getScreenshot();
      if (!base64) return;
      
      let newImage: Image = {
        id: nanoid(),
        imageSrc: base64
      }

      setImages([...images, newImage]);
    }, 500)
  }

  function startCountdown() {
    if (images.length >= 4) return;
    setIsAutoCapturing(true);
    setCountdown(3);
  }

  function stopAutoCapturing() {
    setCountdown(null);
    setIsAutoCapturing(false);
  }

  function deleteImage(img_id: string) {
    stopAutoCapturing();
    setImages(prev => (
      prev.filter((img) => img.id !== img_id)
    ))
  } 
  
  useEffect(() => {
    if (countdown === null) {
      return;
    }

    if (countdown === 0) {
      takePhoto();
      setCountdown(null);
      return;
    }

    setTimeout(() => {
      if (!isAutoCapturing) return;
      setCountdown(countdown - 1);
    }, 1000);

  }, [countdown]);

  useEffect(() => {
    if (!isAutoCapturing) return;

    if (images.length >= 4) {
      setIsAutoCapturing(false);
      return;
    }

    setTimeout(() => {
      startCountdown();
      return;
    }, 1000)
    
  }, [images]);


  return (
    <div className="w-screen box-border p-8 gap-12 flex-col lg:flex-row py-12 flex items-center lg:items-start justify-center">
      <div className='w-full lg:w-1/2 flex flex-col items-center justify-start gap-8'>
        <div className='w-full aspect-video flex items-center justify-center overflow-hidden'>
          <div className="relative rounded-xl w-full h-full flex items-center justify-center">
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
              {
                isAutoCapturing && countdown && countdown > 0 && (
                  <motion.div
                    key={1}
                    className="absolute w-24 aspect-square flex items-center justify-center text-5xl font-semibold text-black rounded-full shadow-lg bg-white/80"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    exit={{ scale: 0.2, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    {countdown}
                  </motion.div>
                )
              }


              {taking && <motion.div 
                className="absolute inset-0 bg-opacity-80 pointer-events-none bg-white rounded-lg flex items-center justify-center text-5xl"
                initial={{
                  opacity: 1
                }}
                animate={{
                  opacity: 1
                }}
                exit={{
                  opacity: 0
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                  
                }}
              > 
              </motion.div>}
            </AnimatePresence>
          </div>
        </div>
        <div className='w-full flex items-center justify-center gap-4'>
          {
            !isAutoCapturing && images.length < 4 && (
              <motion.button
                className="text-white bg-blue-600 px-6 py-2 rounded-lg flex-1 text-2xl"
                initial={{
                  scale: 0.8
                }}
                animate={{
                  scale: 1
                }}
                whileHover={{
                  scale: 1.03
                }}
                whileTap={{
                  scale: 0.9
                }}
                transition={{
                  duration: 0.5
                }}
                onClick={startCountdown}
              >
                Start Auto Capture
              </motion.button>
            ) 
          }

          {
            isAutoCapturing && (
              <motion.button
                className="text-white bg-red-600 px-6 py-2 rounded-lg flex-1 text-2xl"
                initial={{
                  scale: 0.8
                }}
                animate={{
                  scale: 1
                }}
                whileHover={{
                  scale: 1.03
                }}
                whileTap={{
                  scale: 0.9
                }}
                transition={{
                  duration: 0.5
                }}
                onClick={stopAutoCapturing}
              >
                Stop Auto Capture
              </motion.button>
            ) 
          }
         
          {
            !isAutoCapturing && images.length < 4 && (
              <motion.button
                className="text-white bg-green-600 px-6 py-2 rounded-lg flex-1 text-2xl"
                initial={{
                  scale: 0.8
                }}
                animate={{
                  scale: 1
                }}
                whileHover={{
                  scale: 1.03
                }}
                whileTap={{
                  scale: 0.9
                }}
                transition={{
                  duration: 0.5
                }}
                onClick={takePhoto}
              >
                Capture
              </motion.button>
            )
          }
          
          {
            !isAutoCapturing && images.length >= 4 && (
              <motion.button
                className="text-white bg-green-600 px-6 py-2 rounded-lg flex-1 text-2xl"
                initial={{
                  scale: 0.8
                }}
                animate={{
                  scale: 1
                }}
                whileHover={{
                  scale: 1.03
                }}
                whileTap={{
                  scale: 0.9
                }}
                transition={{
                  duration: 0.5
                }}
                onClick={() => setIsStripCustomization(true)}
              >
                Next
              </motion.button>
            )
          }
        </div>
      </div>
      <div className='w-full lg:w-2/6 overflow-y-auto flex justify-center'>
        <div className="w-full gap-4 flex flex-col items-center">
          {
            images.map((img) => 
              <ImageCanvas 
                key={img.id} 
                imageSrc={img.imageSrc}
                handleDelete={() => deleteImage(img.id)}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default MainInterface
