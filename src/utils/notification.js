import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

export default (title, message, type = "success", duration = 5000) => {
  Store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration,
      onScreen: true,
    },
  });
};

// https://www.npmjs.com/package/react-notifications-component

// top-left
// top-right
// top-center
// center
// bottom-left
// bottom-right
// bottom-center


// success
// danger
// info
// default
// warning