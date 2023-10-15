import React, { useState } from "react";
import BasicDropZone from "./components/ui/basic-dropzone";
import LoadingBar from "react-top-loading-bar";

export default function App() {
  const [progress, setProgress] = useState(0);
  // setProgress(progress);
  return (
    <>
      <LoadingBar
        color="white"
        progress={progress}
        height="4px"
        // onLoaderFinished={() => setProgress(0)}
      />
      <div
        className="flex  justify-center"
        style={{
          height: "100vh",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "90vw",
          }}
        >
          <h1 className="text-9xl my-10 text-center uppercase font-bold">
            Rembg
          </h1>
          <BasicDropZone setProgress={setProgress} />
        </div>
        <h1
          className=" text-9xl text-center uppercase font-bold"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            letterSpacing: "2rem",
            margin: "auto",
          }}
        >
          Rembg
        </h1>
      </div>
    </>
  );
}
