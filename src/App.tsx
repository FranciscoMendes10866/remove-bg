import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { generate as shortid } from "shortid";

import { buildFormData } from "./utils/formData";

const API_URL = "http://localhost:5000";

export const App = () => {
  const [image, setImage] = useState<string>("");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const formData = buildFormData(file);

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          body: formData,
        });
        const blob = await res.blob();
        setImage(URL.createObjectURL(blob));
      } catch (err) {
        console.error(err);
      }
    },
    [setImage]
  );

  const downloadFile = useCallback(() => {
    const elm = document.createElement("a");
    elm.href = image;
    elm.download = shortid();
    elm.click();
  }, [image]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex flex-row items-center justify-evenly h-screen w-full">
      <div className="w-2/5">
        <div
          className="flex justify-center items-center w-full"
          {...getRootProps()}
        >
          <label
            htmlFor="dropzone-file"
            className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="mb-3 w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                {!isDragActive ? (
                  <>
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </>
                ) : (
                  <>Drop the files here ...</>
                )}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              {...getInputProps()}
            />
          </label>
        </div>
      </div>

      <div className="w-2/5">
        {image && (
          <div className="flex flex-col items-start justify-center">
            <img className="h-96" src={image} alt="image description" />
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-4"
              onClick={downloadFile}
            >
              Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
