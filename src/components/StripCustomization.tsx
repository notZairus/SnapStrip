import { useImageContext } from '../contexts/ImageContext';
import html2canvas from "html2canvas";
import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import ImageCanvas from './ImageCanvas';


function StripCustomization() {
  const { images } = useImageContext();
  const [frameColor, setFrameColor] = useState<string>("white");
  const [bottomText, setBottomText] = useState<string>("Bottom Text");
  const divRef = useRef(null);

  
  async function downloadStrip() {

    let elementToDownload = divRef.current;
    if (!elementToDownload) return;
    
    let cvs = await html2canvas(elementToDownload);
    let downloadLink = cvs.toDataURL("image/jpeg");

    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = "snapstrip.jpeg";

    link.click();
  } 

  return (
    <div className="canvas-container w-full min-h-screen flex justify-center items-center bg-gray-700 gap-40 py-12">
      <div className='flex lg:items-start gap-20 lg:flex-row flex-col items-center'>
        <div className='flex items-center justify-center bg-gray-700 box-border'>
          <div className=' pt-8 pb-8 shadow-xl rounded px-4 flex flex-col w-11/12 lg:w-min' style={{backgroundColor: frameColor}} ref={divRef}>
            <div className='flex flex-col gap-4'>
              {
                images.map((img) => (
                  <ImageCanvas imageSrc={img.imageSrc} />
                ))
              }
              {
                <div className='flex justify-center'>
                  <p className='text-center w-11/12 break-words text-xl font-serif'>
                    {bottomText}
                  </p>
                </div>
              }
            </div>
          </div>
        </div>
        <div className='flex bg-gray-900 justify-center max-h-screen overflow-y-auto items-center  lg:w-[400px] w-11/12'>
          <div className='h-min bg-white shadow-xl rounded-xl px-6 pt-4 pb-8 w-full'>
            <h1 className='text-3xl font-semibold'>Strip Customization</h1>
            <div className='mt-4'>
              <p className='text-xl text-gray-500'>Frame Color: </p>
              <div className=' w-full flex justify-between gap-4 mt-2'>
                {
                  ["white", "red", "blue", "yellow", "pink", "gray"].map((color) => (
                    <div 
                      className='border-2 flex-1 aspect-square rounded-full relative' 
                      style={{ backgroundColor: color}}
                      onClick={() => setFrameColor(color)}
                    >
                      {
                        frameColor === color && (
                          <div className='px-4 absolute text-xs top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold'>
                            selected
                          </div>
                        )
                      }
                    </div>
                  ))
                }
              </div>
            </div>
            <div className='mt-4'>
              <p className='text-xl text-gray-500'>Bottom Text: </p>
              <input 
                type="text" 
                className='mt-2 w-full border-2 text-xl px-2 py-3 rounded-lg outline-none'
                value={bottomText}  
                onChange={(e) => {
                  setBottomText(e.target.value)
                }}
              />
            </div>
  
            <div className='mt-16'>
              <motion.button
                className='bg-blue-500 text-white w-full text-3xl py-3 rounded-xl shadow-lg'
                initial={{
                  scale: 0.4,
                }}
                animate={{
                  scale: 1
                }}
                whileHover={{
                  scale: 1.02,
                  transition: {
                    duration: 0.2
                  }
                }}
                whileTap={{
                  scale: 0.9
                }}
                transition={{
                  duration: 0.5,
                  type: "spring"
                }}
                onClick={downloadStrip}
              >
                Download
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StripCustomization;
