import Logo from "../static/logoWidget.svg";

const LogoWrap = ({ expand, setExpand }) => {
  return (
    <div
      className="logo-wrap"
      style={{ bottom: expand ? 25 : 10, right: expand ? 0 : -30 }}
      onClick={() =>
        !expand
          ? setExpand(true)
          : window.open("https://appinion.digital", "_blank").focus()
      }
    >
      <img src={Logo} alt="logo" />
      <div className="logo-text" style={{ display: expand ? "block" : "none" }}>
        <span className="rev">ОТЗЫВЫ,</span> КОТОРЫМ
        <p className="rev">ДОВЕРЯЮТ</p>
      </div>
    </div>
  );
};

export default LogoWrap;
