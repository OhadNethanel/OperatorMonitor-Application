import React from "react";

// Define a functional component for the right-click context menu
function RightCubeContext(props) {
    const { onDelete, job, show } = props;


    // RightCubeContext
    // State variables
    const [context, setContext] = React.useState(false);
    const [xyPosition, setxyPosition] = React.useState({ x: 0, y: 0 });

    // Event handler for showing the context menu
    const showNav = (event) => {
        event.preventDefault();
        setContext(false);
        const positionChange = {
            x: event.pageX,
            y: event.pageY,
        };
        setxyPosition(positionChange);
        setContext(true);
    };

    // Event handler for hiding the context menu
    const hideContext = (event) => {
        setContext(false);
    };

    // JavaScript XML (JSX) returned by the component
    return (
        <>
            <style>
                {`
          .contextContainer {
            z-index: 1;
            width: 100%;
            background: #5f5151;
          }
          .rightClick {
            z-index: 12;
            position: fixed;
            background: rgb(250, 250, 250);
          }
          .menuElement {
            color: #222222;
            cursor: pointer;
            padding: 17px 36px;
          }
          .menuElement:hover {
            color: #fff;
            background: #3f4847;
          }
        `}
            </style>
            <div onContextMenu={showNav} onClick={hideContext}>
                {props.children}
                {context && (
                    <div
                        style={{ top: xyPosition.y, left: xyPosition.x }}
                        className="rightClick"
                    >
                        <div className="menuElement" onClick={onDelete}>
                            ❌ Delete
                        </div>
                        <div className="menuElement" onClick={onDelete}>
                            🥤 Refresh Monitor
                        </div>
                        <div className="menuElement" >
                            _____________________
                        </div>
                        <div className="menuElement" >
                            {job}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

// END RightCubeContext

export default RightCubeContext;