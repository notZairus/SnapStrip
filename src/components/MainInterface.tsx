
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
    console.log(taking);
    setTaking(true);
    setTimeout(() => {
      setTaking(false);
      let base64 = webcamRef.current?.getScreenshot();

      console.log(base64)
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

  console.log(images);


  return (
    <div className="w-full min-h-screen bg-[#F7FFF6] overflow-x-hidden py-8 px-8">

      <header className="text-center font-mono">
        <h1 className="text-4xl font-bold">SnapStrip</h1>
        <p className="text-neutral-500 mt-2">Developed by: Bermillo, Zairus V.</p>
      </header>

      <main className="w-full mt-6 flex flex-col lg:flex-row gap-10 lg:max-w-7xl lg:mx-auto">
        <div className="flex-1 font-mono">
          <Webcam 
            ref={webcamRef}
            className="w-full aspect-video object-cover rounded-lg"
          />
          <div className="flex w-full justify-center gap-4 mt-4">
            <AnimatePresence>
              {
                !isAutoCapturing && images.length < 4 &&
                <motion.button 
                  className="w-full rounded-lg bg-blue-500 text-white text-2xl py-4"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  onClick={startCountdown}
                >
                  Start Auto Capture
                </motion.button>
              }
              {
                isAutoCapturing &&
                <motion.button 
                  className="w-full rounded-lg bg-red-500 text-white text-2xl py-4"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  onClick={stopAutoCapturing}
                >
                  Start Auto Capture
                </motion.button>
              }
              {
                !isAutoCapturing && images.length < 4 &&
                <motion.button 
                  className="w-full rounded-lg bg-green-500 text-white text-2xl py-4"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  onClick={takePhoto}
                >
                  Capture
                </motion.button>
              }
              {
                !isAutoCapturing && images.length >= 4 &&
                <motion.button 
                  className="w-full rounded-lg bg-blue-500 text-white text-2xl py-4"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setIsStripCustomization(true)}
                >
                  Customize Strip
                </motion.button>
              }
            </AnimatePresence>
          </div>
        </div>
        <div className="lg:w-1/3 w-full aspect-video">
          <div className="w-full lg:h-[500px] overflow-y-auto flex flex-col gap-4 overflow-x-hidden  items-center">
            {
              images.map((image) => (
                <ImageCanvas imageSrc={image.imageSrc} handleDelete={() => deleteImage(image.id)}/>
              ))
            }
          </div>
        </div>
      </main>

    </div>
  )
}

export default MainInterface
