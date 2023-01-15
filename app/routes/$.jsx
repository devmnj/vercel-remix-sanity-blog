import React from "react";
import styles from "../styles/NF.css";
export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};
export default function NF() {
  return (
    <div id='oopss'>
    <div id='error-text'>
        <span>404</span>
        <p>PAGE NOT FOUND</p>
        <p class='hmpg'><a href='/' class="back">Back To Home</a></p>
    </div>

</div>
  );
}
