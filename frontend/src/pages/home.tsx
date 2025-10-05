import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Home() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get("/hello").then((res) => setMsg(res.data.message));
  }, []);

  return <h1>{msg}</h1>;
}
