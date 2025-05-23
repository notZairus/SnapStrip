
import Webcam from 'react-webcam';

function MainInterface() {
  return (
    <div className="w-screen h-screen min-h-screen bg-white box-border p-8 flex gap-4">
      <div className='flex-1 flex flex-col'>
        <div className='w-full aspect-video flex items-center justify-center'>
          <Webcam 
            className='rounded-xl'
            videoConstraints={{
              facingMode: "user"
            }}
            width={640}
            height={480}
          />
        </div>
        <div className='flex-1'>

        </div>
      </div>
      <div className='w-2/5'>

      </div>
    </div>
  )
}

export default MainInterface
