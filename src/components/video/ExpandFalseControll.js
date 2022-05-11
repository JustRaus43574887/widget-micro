import { Fragment } from "preact";
import "../css/expandFalse.css";

import Play from "../static/PlayBtn.svg";
import Close from "../static/close.svg";

const ExpandFalseControll = ({
  expand,
  setExpand,
  setRemove,
  setOpacity,
  opacity,
  mainColor,
}) => {
  return (
    <Fragment>
      <div
        onClick={() => setExpand(true)}
        onMouseOver={() => setOpacity(0.6)}
        onMouseOut={() => setOpacity(0)}
        onBlur={() => setOpacity(0)}
        className="widget-video-overlay"
        style={{ borderRadius: expand ? 35 : 16, opacity }}
      />

      <img
        src={Close}
        alt="close"
        style={{ opacity: opacity ? 1 : 0 }}
        onMouseOver={() => setOpacity(0.6)}
        onMouseOut={() => setOpacity(0)}
        className="widget-remove"
        onClick={() => setRemove(true)}
      />

      <div
        onClick={() => setExpand(true)}
        onMouseOver={() => setOpacity(0.6)}
        onMouseOut={() => setOpacity(0)}
        onBlur={() => setOpacity(0)}
        className="widget-video-play"
        style={{
          backgroundColor: mainColor,
          boxShadow:
            opacity === 0.6
              ? `0 0 0 11px ${mainColor}26,
    0 0 0 5px ${mainColor}4D`
              : "none",
        }}
      >
        <img src={Play} alt="ply" style={{ marginLeft: 10 }} />
      </div>
    </Fragment>
  );
};

export default ExpandFalseControll;
