// in config.js
import { Widgets } from "@mui/icons-material";
import DogPicture from "./DogPicture";

import { createChatBotMessage } from "react-chatbot-kit";

const botName = "ExcitementBot";

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  Widgets: [
    {
      widgetName: "dogPicture",
      widgetFunc: (props) => <DogPicture {...props} />,
    },
  ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
};

export default config;
