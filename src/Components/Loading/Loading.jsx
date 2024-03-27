import Loader from "react-js-loader";

function Loading() {
  return (
    <div>
      <div className={"content"}>
        <div className={"zoom-out"}>
          <div className={"row"}>
            <div className={"item"}>
              <Loader
                type="spinner-default"
                bgColor="gray"
                color="gray"
                title={""}
                size={50}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
