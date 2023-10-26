import React, { useState } from "react";

const CustomControl = (props) => {
  const [flag, setFlag] = useState(true);
  const addToMap = (root) => {
    if (flag) {
      const { mapHolderRef, controlPosition } = props;
      mapHolderRef?.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.controls[
        controlPosition
      ].push(root);
      setFlag(false);
    }
  };

  return <div ref={addToMap.bind(this)}>{props.children}</div>;
};

export default CustomControl;
