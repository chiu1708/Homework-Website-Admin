import "../Loading/Loading.css"

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center loading-container">
      <div
        className="spinner"
        role="status"
        aria-label="Loading..."
      >
      </div>
    </div>
  );
};

export default Loading;
