import React from "react";

// Define the style type
const Loader: React.FC = () => {
  // Inline styles for the loader container
  const loaderStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  // Inline styles for the circles
  const circleStyle: React.CSSProperties = {
    width: "16px",
    height: "16px",
    margin: "4px",
    borderRadius: "50%",
    background: "#3498db",
    animation: "bounce 1.4s infinite ease-in-out",
  };

  // Keyframes animation
  const keyframes = `
    @keyframes bounce {
      0%, 80%, 100% {
        transform: scale(0);
      }
      40% {
        transform: scale(1);
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={loaderStyle}>
        <div style={{ ...circleStyle, animationDelay: "-0.32s" }}></div>
        <div style={{ ...circleStyle, animationDelay: "-0.16s" }}></div>
        <div style={{ ...circleStyle, animationDelay: "0s" }}></div>
      </div>
    </>
  );
};

export default Loader;
