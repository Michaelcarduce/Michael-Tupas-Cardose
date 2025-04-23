// import React, { useState } from "react";

// const DownloadButton = () => {
//   const [isDownloading, setIsDownloading] = useState(false);
//   const [isComplete, setIsComplete] = useState(false);

//   const handleDownload = () => {
//     if (typeof document === "undefined") return;
//     setIsDownloading(true);

//     // Create a link element
//     const link = document.createElement("a");

//     // Path to your resume file in the public folder
//     link.href = "/Michael Tupas Cardose Resume.pdf"; // Change this to your actual file name
//     link.download = "Michael Tupas Cardose Resume.pdf"; // The filename users will see

//     // Append to the document
//     document.body.appendChild(link);

//     // Trigger the download
//     link.click();

//     // Clean up
//     document.body.removeChild(link);

//     // Set completion state
//     setTimeout(() => {
//       setIsDownloading(false);
//       setIsComplete(true);

//       // Reset after 2 seconds
//       setTimeout(() => {
//         setIsComplete(false);
//       }, 2000);
//     }, 500); // Shorter delay since actual download is handled by browser
//   };

//   return (
//     <button
//       onClick={handleDownload}
//       disabled={isDownloading}
//       className={`relative overflow-hidden px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300 mt-5 md:mt-8
//         ${isDownloading ? "cursor-not-allowed" : "cursor-pointer"}
//         ${
//           isComplete
//             ? "bg-green-500 hover:bg-green-600 from-green-500 to-green-600"
//             : ""
//         }
//       `}>
//       <span className="relative z-10 flex items-center justify-center">
//         {isComplete ? (
//           <>
//             <svg
//               className="w-5 h-5 mr-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//             Downloaded!
//           </>
//         ) : isDownloading ? (
//           <>
//             <svg
//               className="animate-spin h-5 w-5 text-white"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24">
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"></circle>
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Downloading...
//           </>
//         ) : (
//           <>
//             <svg
//               className="w-5 h-5 mr-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//               />
//             </svg>
//             Download My Resume
//           </>
//         )}
//       </span>

//       {isDownloading && (
//         <span
//           className="absolute bottom-0 left-0 h-1 bg-blue-400 transition-all duration-1500"
//           style={{ width: "100%" }}
//         />
//       )}
//     </button>
//   );
// };

// export default DownloadButton;

"use client";
import React, { useState, useEffect } from "react";

const DownloadButton = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = () => {
    // Early return if not in browser environment
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    setIsDownloading(true);
    setProgress(0);

    // Simulate download progress (optional - remove if not needed)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);

    // Create a link element
    const link = document.createElement("a");
    link.href = "/Michael Tupas Cardose Resume.pdf";
    link.download = "Michael Tupas Cardose Resume.pdf";
    link.style.display = "none";

    // Append to the document
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      clearInterval(progressInterval);
      setProgress(100);

      setIsDownloading(false);
      setIsComplete(true);

      // Reset after 2 seconds
      const resetTimeout = setTimeout(() => {
        setIsComplete(false);
        setProgress(0);
      }, 2000);

      return () => clearTimeout(resetTimeout);
    }, 500);
  };

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      document.querySelectorAll("a[download]").forEach((el) => el.remove());
    };
  }, []);

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading || isComplete}
      className={`relative overflow-hidden px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300 mt-5 md:mt-8
        ${isDownloading ? "cursor-not-allowed opacity-90" : "cursor-pointer"}
        ${
          isComplete
            ? "!bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            : ""
        }
      `}
      aria-label={isComplete ? "Download complete" : "Download resume"}>
      <span className="relative z-10 flex items-center justify-center">
        {isComplete ? (
          <span className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Downloaded!
          </span>
        ) : isDownloading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Downloading...
          </span>
        ) : (
          <span className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download My Resume
          </span>
        )}
      </span>

      {/* Progress bar */}
      {(isDownloading || isComplete) && (
        <span
          className="absolute bottom-0 left-0 h-1 bg-blue-400 transition-all duration-300"
          style={{
            width: `${isComplete ? 100 : progress}%`,
            backgroundColor: isComplete ? "#22c55e" : undefined, // Green when complete
          }}
        />
      )}
    </button>
  );
};

export default DownloadButton;
