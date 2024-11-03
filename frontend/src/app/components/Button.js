/* 
List of Todo:
Need to Add Drop Down Menu when Screen is small
*/

import "../styles/Button.css";

export default function Button({ name, className, onClick }) {
  return (
    <button className="button-template" onClick={onClick}>
      {name}
    </button>
  );
}
