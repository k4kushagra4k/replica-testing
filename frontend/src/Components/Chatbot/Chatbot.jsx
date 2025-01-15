import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Chatbot = () => {
  const location = useLocation();
  const { replicaName, replicaDescription, replicaPersona } = location.state; // Extract both replicaName and replicaDescription from state
  console.log(replicaName, replicaDescription);

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "chatbot-main-script";
    script.src = "https://chatbot-embed.viasocket.com/chatbot-prod.js";
    script.async = true;
    script.setAttribute(
      "embedToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdfaWQiOiIxMjA2OSIsImNoYXRib3RfaWQiOiI2Nzc2MjQ1MzVlMTBlMTY2MzdlMzVlY2EiLCJ1c2VyX2lkIjoiaGdqZ2poIn0.g_leEwfTrGZHAmQxkU-gpjvDY5Fwmds3tMfK0B-DpT8"
    );
    script.setAttribute("hideIcon", true);
    document.head.appendChild(script);

    script.onload = () => {
      if (window.SendDataToChatbot) {
        window.SendDataToChatbot({
          bridgeName: "Assistant",
          threadId: replicaName, // Pass replicaName as threadId
          hideIcon: false,
          variables: {
            name: replicaName,
            description: replicaDescription,
            persona: replicaPersona,
          },
        });
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [replicaName, replicaDescription, replicaPersona]);

  return <div id="chatbot-container"></div>;
};

export default Chatbot;
