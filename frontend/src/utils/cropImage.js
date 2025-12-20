export const getCroppedImg = (imageSrc, pixelCrop) => {
  const image = new Image()
  image.src = imageSrc
  
  return new Promise((resolve) => {
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 450
      canvas.height = 350
      const ctx = canvas.getContext('2d')

      ctx.drawImage(
        image,
        pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height,
        0, 0, 450, 350
      )

      canvas.toBlob((blob) => {
        resolve(blob)
      }, 'image/jpeg')
    }
  })
}