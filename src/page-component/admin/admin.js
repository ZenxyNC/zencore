import { useState } from "react";

export default function Admin() {
  const [ZenID, setZenID] = useState(JSON.parse(localStorage.getItem("zenapps-global-id")).id)

  return (
    <h1>Hello, {ZenID}</h1>
  )
}