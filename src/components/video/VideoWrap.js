import { Fragment } from "preact";

const VideoWrap = ({ expand, data, videoRef, video }) => {
  return (
    <Fragment>
      <video
        ref={videoRef}
        style={{ borderRadius: expand ? 35 : 16 }}
        src={"https://api.appinion.digital" + data.videos[video].path}
        loop
        muted
        autoPlay
        playsInline
        preload="auto"
        controls="false"
        controlsList="nodownload"
        disablePictureInPicture
      >
        <source
          src={"https://api.appinion.digital" + data.videos[video].path}
          type={data.videos[video].mimetype}
        />
      </video>

      <div
        className="widget-shadow"
        style={{ borderRadius: expand ? 35 : 16 }}
      />
    </Fragment>
  );
};

export default VideoWrap;
