import { useEffect, useState } from "react";

function UserMessage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Data loaded!");
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <div>{message && <p>{message}</p>}</div>;
}

export default UserMessage;
