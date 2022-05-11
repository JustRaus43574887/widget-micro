import { render } from "preact";

import Widget from "./components/widget";

export function init(token) {
  const widDiv = document.createElement("div");
  widDiv.id = "appinion-widget-root";
  document.body.append(widDiv);

  render(
    <Widget token={token} />,
    document.getElementById("appinion-widget-root")
  );
}

if (module.hot) init("60afeec7ecaa20bb5808d1e3");
