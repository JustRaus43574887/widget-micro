import { Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import { lazy, Suspense } from "preact/compat";
const Video = lazy(() => import("./video/video"));

const query = `query videoWidget($id: String!) {
  videoWidget(id: $id) {
     _id
    projectId
    userId
		type
		location
		staButton
		staText
		staLink
		name
		position
		mainColor
		textColor
		utmLabel
  	videos {
      id
      filename
      mimetype
      path
    }
    createdAt
    tariffType
  }
}`;

const Widget = ({ token }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://api.appinion.digital/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query,
            variables: { id: token },
          }),
        });
        const data = await response.json();
        setData(data.data.videoWidget);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [token]);

  return (
    !loading && (
      <div id="appinion-widget">
        <Suspense fallback={<Fragment />}>
          <Video data={data} />
        </Suspense>
      </div>
    )
  );
};

export default Widget;
