import React, { useState} from 'react'
import Cropper from 'react-easy-crop'

const ImageCropper = ({ image, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropChange = (crop) => setCrop(crop)
  const onZoomChange = (zoom) => setZoom(zoom)

  const onCropDone = () => {
    onCropComplete(croppedAreaPixels)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-2xl h-[400px] bg-gray-900 rounded-lg overflow-hidden">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={450 / 350}
          onCropChange={onCropChange}
          onCropComplete={(area, pixels) => setCroppedAreaPixels(pixels)}
          onZoomChange={onZoomChange}
        />
      </div>
      <div className="mt-4 flex gap-4">
        <button onClick={onCancel} className="bg-red-500 text-white px-6 py-2 rounded">Cancel</button>
        <button onClick={onCropDone} className="bg-green-500 text-white px-6 py-2 rounded">Crop & Save</button>
      </div>
    </div>
  )
}

export default ImageCropper