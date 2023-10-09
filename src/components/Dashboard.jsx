import React from "react";
import { useSelector } from "react-redux";
import { BsReception4, BsPlusLg } from "react-icons/bs"; //BsReception4
import "../styles/dashboard.css";
import Card from "../components/Card";

const Dashboard = () => {
  const { dataSelected, user } = useSelector((state) => state.dataSelectSlice);

  return (
    dataSelected && (
      <div className="container row" style={{ justifyContent: "space-evenly" }}>
        {dataSelected.map((element, index) => {
          return (
            <>
              <div
                key={index}
                className="dashboard-card column"
                style={{ backgroundColor: "whitesmoke" }}
              >
                <div className="card-heading">
                  <div
                    className="side-View-1"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {!user ? (
                      <BsReception4 />
                    ) : (
                      <>
                        <div className="image">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREl1TQtDYX5h2D_zEWAcR7uZge3w8w-BVjd-4QqFc4ZncS05EcIP7oVgvJWHY7ETxPp8Y&usqp=CAU"
                            alt="QuickSell"
                          />
                        </div>
                      </>
                    )}
                    <span>
                      {element[index]?.title}  {element[index]?.value?.length}
                    </span>
                  </div>
                  <div className="side-View-2">
                    <BsPlusLg />
                    <span style={{ letterSpacing: "2px" }}>...</span>
                  </div>
                </div>
                <div className="select-list">
                  {element[index]?.value?.map((element, ind) => {
                    return (
                      <Card
                        id={element.id}
                        title={element.title}
                        tags={element.tag}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}
      </div>
    )
  );
};

export default Dashboard;
