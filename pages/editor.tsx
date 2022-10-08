import { useState, useCallback } from "react";
import { Layout } from "../components/layout";
import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import Cropper from "react-easy-crop";
import { useAllSeriesQuery, useMounted } from "../lib/hooks";
import { Image } from "../components/util/image";

const Crop = ({
  image = "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000",
}) => {
  const isMounted = useMounted();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);
  return (
    <div className="h-96">
      <Section className="h-full">
        <Container>
          {isMounted && (
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={9 / 16}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          )}
        </Container>
      </Section>
      <Section>
        <Container>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => {
              setZoom(e.target.value as any);
            }}
            className="zoom-range"
          />
        </Container>
      </Section>
    </div>
  );
};

const Editor = () => {
  const { loading, series } = useAllSeriesQuery();
  const covers = series?.map((serie) => serie.cover);
  const [image, setImage] = useState(undefined);

  return (
    <Layout>
      <Crop image={image} />
      <Section>
        <Container>
          <div className="grid grid-cols-6 gap-5">
            {covers &&
              covers.map((cover) => (
                <Image url={cover} onClick={() => setImage(cover)} />
              ))}
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default Editor;
