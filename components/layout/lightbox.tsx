import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useState,
} from "react";

import Box from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const LightboxContext = createContext({
  slides: [],
  setSlides: (slides: any) => console.log("setSlides", slides),
  index: -1,
  setIndex: (value: any) => console.log("setIndex", value),
});

export const useLightbox = () => useContext(LightboxContext);

export const Lightbox: FC<{ children: ReactNode }> = ({ children }) => {
  const [index, setIndex] = useState(-1);
  const [slides, setSlides] = useState([]);

  return (
    <LightboxContext.Provider
      value={{
        slides,
        setSlides,
        index,
        setIndex,
      }}
    >
      {children}
      <Box
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Thumbnails, Zoom]}
        thumbnails={{
          position: "bottom",
        }}
      />
    </LightboxContext.Provider>
  );
};

export const getSlidesFromBody = (body: { children: any[] }) => {
  return Object.values(body.children)
    .filter((item) => item.name === "Image")
    .map((item, index) => {
      return { src: item.props.url, index };
    })
    .sort((a, b) => a.index - b.index);
};

export const getBodyMappedToRender = (
  body: { children: any[] },
  slides: any[],
  setIndex: (index: number) => void
) => {
  return {
    ...body,
    children: [
      ...body.children.map((item) => {
        if (item.name === "Image") {
          return {
            ...item,
            props: {
              ...item.props,
              onClick: () =>
                setIndex(
                  slides.findIndex((image) => image.src === item.props.url)
                ),
            },
          };
        }
        return item;
      }),
    ],
  };
};
