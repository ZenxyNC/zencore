import { useState } from "react";

export default function Admin() {
  const getInfo = () => {
    try {
      const userData = JSON.parse(localStorage.getItem("zenapps-global-id")).id
      return userData
    } catch(error) {
      const userData = null
      return userData
    }
  }

  const [ZenID, setZenID] = useState()

  return (
    <h1>Hello, {ZenID}</h1>
  )
}