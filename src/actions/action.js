import axios from "axios";

export const fetchData = () => async (dispatch) => {
  try {
    dispatch({ type: "dataRequest" });

    const { data } = await axios.get(
      "https://api.quicksell.co/v1/internal/frontend-assignment/"
    );

    dispatch({ type: "dataSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "dataFailure" });
  }
};

export const dataSelect = (updatedGroup, updatedTickets, updatedOrder) => async (dispatch) => {
  try {
    console.log(updatedGroup, updatedTickets, updatedOrder);
    dispatch({ type: "dataSelectRequest" });

    let user = false;
    let set = new Set();
    let array = [],
      updatedDataSelected = [];

    if (updatedOrder === "title") {
      updatedDataSelected.forEach((element, index) => {
        element[index]?.value?.sort((a, b) => a.title.localeCompare(b.title));
      });
    }

    if (updatedGroup === "status") {
      updatedTickets.forEach((element) => {
        set.add(element.status);
      });

      array = [...set];

      array.forEach((element, index) => {
        let updatedArray = updatedTickets.filter((filterElement) => {
          return element === filterElement.status;
        });
        updatedDataSelected.push({
          [index]: {
            title: element,
            value: updatedArray,
          },
        });
      });
    } else if (updatedGroup === "user") {
      user = true;
      updatedTickets?.users?.forEach((element, index) => {
        array = updatedTickets?.tickets?.filter((filterElement) => {
          return element.id === filterElement.userId;
        });

        updatedDataSelected.push({
          [index]: {
            title: element.name,
            value: array,
          },
        });
      });
      console.log(updatedDataSelected);
    } else {
      let priorityList = ["No priority", "Low", "Medium", "High", "Urgent"];

      priorityList.forEach((element, index) => {
        array = updatedTickets.filter((filterElement) => {
          return index === filterElement.priority;
        });

        updatedDataSelected.push({
          [index]: {
            title: element,
            value: array,
          },
        });
      });
    }

    if (updatedOrder === "priority") {
      updatedDataSelected.forEach((element, index) => {
        element[index]?.value?.sort((a, b) => b.priority - a.priority);
      });
    }

    console.log(updatedDataSelected);
    dispatch({ type: "dataSelectSuccess", payload: { dataSelected: updatedDataSelected, user } });
  } catch (error) {
    dispatch({ type: "dataSelectFailure", payload: error.message });
  }
};
