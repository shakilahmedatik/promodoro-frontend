import axios from 'axios'

interface ImageUploadResponse {
  data: {
    display_url: string
  }
}

export const imageUpload = async (imageData: File): Promise<string> => {
  const formData = new FormData()
  formData.append('image', imageData)
  const { data } = await axios.post<ImageUploadResponse>(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    formData
  )
  return data.data.display_url
}
