import { Fragment } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import classnames from "classnames";
import "../css/video.css";

import VideoWrap from "./VideoWrap";
import ExpandFalseControll from "./ExpandFalseControll";
import ExpandTrueControll from "./ExpandTrueControll";
import GalleryControlls from "./GalleryControlls";
import SliderControlls from "./SliderControlls";
import LogoWrap from "./LogoWrap";

const Video = ({ data = null }) => {
  const videoRef = useRef();

  const [expand, setExpand] = useState(false);
  const [remove, setRemove] = useState(false);
  const [video, setVideo] = useState(0);
  const [play, setPlay] = useState(true);
  const [mute, setMute] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [settingsView, setSettingsView] = useState({
    staBtn: true,
    mainColor: data.mainColor,
    textColor: data.textColor,
    type: data.type,
  });
  console.log(settingsView.type);

  const resize = () => setWidth(window.innerWidth);

  useEffect(() => {
    if (data.tariffType === 0) {
      setSettingsView({
        ...settingsView,
        staBtn: false,
        mainColor: "#4E7FCE",
        textColor: "#fff",
        type: 0,
      });
    }
    if (data.tariffType === 1) {
      setSettingsView({
        ...settingsView,
        mainColor: "#4E7FCE",
        textColor: "#fff",
      });
    }
  }, [data.tariffType, data.type]);

  useEffect(() => {
    const fetchVideos = () => {
      let sizes = [];
      let requests = [];
      for (let i = 0; i <= data.videos.length; i++) {
        if (data.videos[i]) {
          let url = "https://api.appinion.digital" + data.videos[i].path;
          let blob = fetch(url).then((res) => res.blob());
          requests.push(blob);
        }
      }
      return new Promise((resolve) => {
        Promise.all(requests)
          .then((response) => {
            response.forEach((result) => sizes.push(result.size));
          })
          .then(() => resolve(sizes));
      });
    };
    fetchVideos().then((size) => {
      let sumOfSizeVideos = 0;
      for (let i = 0; i < size.length; i++) {
        sumOfSizeVideos += size[i];
      }
      if (data.tariffType === 0 && sumOfSizeVideos > 1e8) {
        return;
      }
      if (data.tariffType === 1 && sumOfSizeVideos > 1e9) {
        return;
      }
      if (data.tariffType === 2 && sumOfSizeVideos > 1e10) {
        return;
      }
    });
  }, [data.tariffType, data.videos]);

  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (expand) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setPlay(true);
        setMute(false);
      }
    }
  }, [expand]);

  useEffect(() => {
    if (videoRef.current) {
      if (play) videoRef.current.play();
      else videoRef.current.pause();
    }
  }, [play]);

  useEffect(() => {
    if (videoRef.current && expand) {
      videoRef.current.muted = mute;
    }
  }, [mute, expand]);

  return (
    <div
      className="widget-wrap"
      style={{
        display: remove && "none",
        borderRadius: expand ? 40 : 20,
        [data.location[1]]: width <= 426 ? 0 : 60,
        [data.location[0]]: width <= 426 ? 0 : 40,
      }}
    >
      <div
        className="video-wrap"
        style={{
          borderColor: settingsView.mainColor,
          backgroundColor: settingsView.mainColor,
          width: expand ? 354 : 157,
          height: expand ? 495 : 243,
          borderWidth: expand ? 7 : 4,
          borderRadius: expand ? 40 : 20,
        }}
      >
        <VideoWrap
          expand={expand}
          data={data}
          videoRef={videoRef}
          video={video}
        />

        {!expand && (
          <ExpandFalseControll
            expand={expand}
            setExpand={setExpand}
            setRemove={setRemove}
            opacity={opacity}
            setOpacity={setOpacity}
            mainColor={settingsView.mainColor}
          />
        )}

        {expand && (
          <Fragment>
            <ExpandTrueControll
              setExpand={setExpand}
              setMute={setMute}
              setOpacity={setOpacity}
              setPlay={setPlay}
              play={play}
              mute={mute}
              videoRef={videoRef}
              data={data}
            />

            {data.type === 1 && (
              <GalleryControlls
                data={data}
                setVideo={setVideo}
                vid={video}
                setPlay={setPlay}
              />
            )}

            {settingsView.type === 2 && (
              <SliderControlls setVideo={setVideo} video={video} data={data} />
            )}
          </Fragment>
        )}

        {expand && settingsView.staBtn && data.staButton && (
          //eslint-disable-next-line
          <a href={data.staLink} target="_blank" referrerPolicy="no-referrer">
            <div
              className="sta-button"
              style={{
                backgroundColor: settingsView.mainColor,
              }}
            >
              <p
                style={{
                  color: settingsView.textColor,
                }}
              >
                {data.staText}
              </p>
            </div>
          </a>
        )}

        {data.type === 0 && <LogoWrap expand={expand} setExpand={setExpand} />}
      </div>

      {/* {expand && ( */}
      <div className={classnames("widget-g", {
        "widget-footer": expand
      })}>
        <p className="act-name">{data.name}</p>
        <div
          className="divider"
          style={{ backgroundColor: settingsView.mainColor }}
        />
        <p className="act-pos">{data.position}</p>
      </div>
      {/* )} */}
    </div>
  );
};

export default Video;
