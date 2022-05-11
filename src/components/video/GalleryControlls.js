import "../css/gallery.css";

const GalleryControlls = ({ data, setVideo, vid, setPlay }) => {
  return (
    <div className="gallery-controlls">
      {data.videos.map((video, i) => {
        return (
          <div className="controll-item" key={i}>
            <video
              onClick={() => {
                setVideo(i);
                setPlay(true);
              }}
              src={"https://api.appinion.digital" + video.path}
              style={{
                border: `2px solid ${data.mainColor}`,
                backgroundColor: data.mainColor,
                opacity: i === vid ? 1 : 0.5,
              }}
            />
            <div
              style={{
                backgroundColor: `${data.mainColor}${i === vid ? "FF" : "80"}`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GalleryControlls;
