import React from "react";
interface YouTubeVideoProps {
  videoId: string;
}
const VideoComponent: React.FC<YouTubeVideoProps> = ({ videoId }) => {
  return (
    <>
      <iframe
        className="w-full"
        // width="500"
        height="300"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </>
  );
};
export default VideoComponent;
