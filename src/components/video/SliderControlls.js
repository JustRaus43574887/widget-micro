import { Fragment } from "preact";
import "../css/slider.css";
import Arrow from "../static/arrow.svg";

const SliderControlls = ({ setVideo, video, data }) => {
  return (
    <Fragment>
      {video !== 0 && (
        <button
          className="slider-arrow"
          onClick={() => setVideo((vid) => vid - 1)}
          style={{
            backgroundColor: data.mainColor,
            left: 20,
          }}
        >
          <img src={Arrow} alt="arrow" style={{ transform: "scaleX(-1)" }} />
        </button>
      )}

      {video !== data.videos.length - 1 && (
        <button
          className="slider-arrow"
          onClick={() => setVideo((vid) => vid + 1)}
          style={{
            backgroundColor: data.mainColor,
            right: 20,
          }}
        >
          <img src={Arrow} alt="arrow" />
        </button>
      )}

      <div className="controll-dots" style={{}}>
        {data.videos.map((_, i) => (
          <div
            key={i}
            style={{
              backgroundColor: `${data.mainColor}${i === video ? "FF" : "80"}`,
            }}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default SliderControlls;
