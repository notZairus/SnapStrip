import { createContext, useContext, useState, type ReactNode } from "react"

export interface Image {
  imageSrc: string,
  id: string
}

interface ImageContextType {
  images: Image[],
  setImages: React.Dispatch<React.SetStateAction<Image[]>>,
  name?: string
}


const ImageContext = createContext<ImageContextType|undefined>(undefined);

export function ImageContextProvider({ children }: { children: ReactNode }): ReactNode {
  const [images, setImages] = useState<Image[]>([]);

  return (
    <ImageContext.Provider value={{ images, setImages }}>
      {children}
    </ImageContext.Provider>
  )
} 

export function useImageContext(): ImageContextType {
  let context = useContext(ImageContext);
  if (!context) {
    throw new Error("ImageContext is null");
  }
  return context;
}