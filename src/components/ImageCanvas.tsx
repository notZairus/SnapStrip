import { useEffect, useRef } from 'react'


interface ImageCanvasProps {
  imageSrc: string,
  handleDelete: () => void
} 

function ImageCanvas({ imageSrc, handleDelete }: ImageCanvasProps) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let _canvas: HTMLCanvasElement = canvasRef.current;
    if (!_canvas) return;

    let ctx = _canvas.getContext("2d");
    if (!ctx) return;

    let img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      _canvas.width = img.width;
      _canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    }
    
  }, [canvasRef])

  return (
    <div 
      className='w-[400px] aspect-video rounded-xl relative bg-red-400 flex'
    >
      <canvas ref={canvasRef} className='flex-1 w-full h-full rounded-xl'/>
      <p 
        className='bg-black/20 absolute cursor-pointer top-2 right-3 text-white text-xl w-6 text-center rounded flex items-center justify-center aspect-square'
        onClick={handleDelete}
      >x</p>
    </div>
  )
}

export default ImageCanvas;