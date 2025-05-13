import { useEffect } from "react";

const ZendeskChat = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.id = "ze-snippet";
        script.src = "https://static.zdassets.com/ekr/snippet.js?key=8a21d465-c5b7-4897-a7ce-03c207d5f7f9";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    
    return null;
};

export default ZendeskChat;
