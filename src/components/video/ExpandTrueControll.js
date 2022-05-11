import { Fragment } from "preact";
import "../css/expandTrue.css";

import Close from "../static/close.svg";
import Pause from "../static/pause.svg";
import Play from "../static/play.svg";
import Replay from "../static/replay.svg";
import Mute from "../static/mute.svg";
import Value from "../static/value.svg";

const ExpandTrueControll = ({
  setPlay,
  setMute,
  setExpand,
  setOpacity,
  play,
  mute,
  videoRef,
  data,
}) => {
  return (
    <Fragment>
      <div onClick={() => setPlay(!play)} className="play-overlay" />

      <img
        src={Close}
        alt="close"
        onClick={() => {
          setExpand(false);
          setOpacity(0);
          videoRef.current.muted = true;
        }}
        className="widget-close"
      />

      {play ? (
        <img
          src={Pause}
          alt="pause"
          onClick={() => setPlay(false)}
          className="widget-pause"
          style={{ bottom: data.type !== 0 && 30 }}
        />
      ) : (
        <img
          src={Play}
          alt="play"
          onClick={() => setPlay(true)}
          className="widget-pause"
          style={{ bottom: data.type !== 0 && 30 }}
        />
      )}

      <img
        onClick={() => (videoRef.current.currentTime = 0)}
        src={Replay}
        alt="replay"
        className="widget-replay"
        style={{ bottom: data.type !== 0 && 30 }}
      />

      {mute ? (
        <img
          onClick={() => setMute(false)}
          src={Value}
          alt="value"
          className="widget-mute"
          style={{ bottom: data.type !== 0 && 30 }}
        />
      ) : (
        <img
          onClick={() => setMute(true)}
          src={Mute}
          alt="mute"
          className="widget-mute"
          style={{ bottom: data.type !== 0 && 30 }}
        />
      )}
    </Fragment>
  );
};

export default ExpandTrueControll;
