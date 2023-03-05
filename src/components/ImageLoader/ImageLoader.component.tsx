import { useState } from "react";
import { motion } from "framer-motion";

export default function ImageLoader({ src }: { src: string }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);

  const imageLoaded = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 600);
  };

  return (
    <div
      className={`${pulsing ? "pulse" : ""} h-full rounded-md bg-accent-gray-darkest`}
      style={{ borderRadius: "6px" }}
    >
      <motion.img
        initial={{
          opacity: 0,
          borderRadius: "20px",
        }}
        className="mx-auto h-full w-full object-cover"
        // style={{ height: imageLoading ? "6rem" : "auto" }}
        style={{ borderRadius: "20px" }}
        animate={{
          height: imageLoading ? "100%" : "100%",
          opacity: imageLoading ? 0 : 1,
          borderRadius: "6px",
        }}
        transition={{
          height: { delay: 0, duration: 0.4 },
          opacity: { delay: 0.5, duration: 0.4 },
          borderRadius: "6px",
        }}
        onLoad={imageLoaded}
        width="100%"
        height="100%"
        src={src}
      />
    </div>
  );
}
