import _ from "lodash";

const addposition = items => {
  //console.log(items);
  return dispatch => {
    dispatch({ type: "ADD_POSITION", position: items });
  };
};

export default {
  addposition
};
