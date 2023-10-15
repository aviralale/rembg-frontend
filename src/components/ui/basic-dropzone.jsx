import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import API_URL from "../../API_URL";
import Alert from "./alert";

export default function BasicDropZone(props) {
  // state for displaing akert
  const [alert, setAlert] = useState({
    isVisible: false,
    type: null,
    message: null,
  });
  // dropzone setup
  const onDrop = (file) => {
    props.setProgress(10);
    setAlert({
      isVisible: false,
      type: null,
      message: null,
    });
    sendImage(file);
    props.setProgress(50);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });
  // send inage
  const sendImage = async (image) => {
    try {
      let formData = new FormData();
      formData.append("img", image[0], image[0].name);

      const response = await fetch(`${API_URL}/images/`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      const { id } = data;

      getImage(id);
    } catch (error) {
      console.log(error);
      setAlert({
        isVisible: true,
        type: "error",
        message: "Error while uploading image",
      });
    }
  };
  //get image
  const getImage = async (id) => {
    props.setProgress(60);
    try {
      const response = await fetch(`${API_URL}/images/${id}/download/`, {
        method: "GET",
        responseType: "blob",
      });

      const data = await response.blob();
      const href = window.URL.createObjectURL(data);
      const downloadLink = document.createElement("a");
      downloadLink.href = href;
      downloadLink.setAttribute("download", "removed_bg_img.png");
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setAlert({
        isVisible: true,
        type: "success",
        message: "Successfully downloaded the image",
      });
    } catch (error) {
      console.log(error);
      setAlert({
        isVisible: true,
        type: "error",
        message: "Error while getting image",
      });
    }
    props.setProgress(100);
  };

  const { isVisible, type, message } = alert;

  return (
    <div className="flex flex-col  mx-5" style={{
        width: '100%'
    }}>
      {isVisible && (
        <Alert
          color={type === "success" ? "success" : "red-400"}
          message={message}
        />
      )}
      <div
        {...getRootProps()}
        className="border bordered hover:border-dashed  mx-5  py-48 backdrop:blur-md flex justify-center items-center"
        style={{
          boxShadow: "5px 5px white",
        }}
      >
        <input {...getInputProps()} className="input" />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <h2 className='italic mt-4'><span className="text-red-600">*</span> This is only built for practice purpose. Don't expect a solid result from here.</h2>
    </div>
  );
}
