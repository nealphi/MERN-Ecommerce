const VideoComponent = () => {
  return (

      <video className="video" autoPlay muted loop>
        <source
          src={`${process.env.PUBLIC_URL}/video.mp4`}
          type="video/mp4"
        />
      </video>

  );
};

export default VideoComponent;
