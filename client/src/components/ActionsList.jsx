import React from "react";

export default function ActionsList(props) {
  return props.actions.map(el => (
    <div>
      <div>
        <h4>{el.description}</h4>
        <p>{el.notes}</p>
      </div>
    </div>
  ));
}
