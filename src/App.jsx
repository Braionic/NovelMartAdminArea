import { useState } from "react";
import "./style.css";
import { GoArrowDownRight, GoArrowUpLeft, GoArrowUpRight } from "react-icons/go";
import { RevenueChart } from "./components/RevenueChart";
import { DatePicker, Space } from 'antd';
const onChange = (date, dateString) => {
  console.log(date, dateString);
};

function App() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between ">
        <h3 className="fw-normal ">Dashboard</h3>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <div>
          <DatePicker onChange={onChange} />
          </div>
          <button className="btn btn-md bg-warning">Export</button>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-center gap-3 my-5 flex-wrap ">
        <div className="total-sale p-3 flex-grow-1 rounded shadow bg-light">
          <div className="d-flex align-items-center justify-content-between">
            <p className="text-secondary">Totals</p>
            <div>
              <select class="form-select" aria-label="select example">
                <option selected value="1">
                  One
                </option>
              </select>
            </div>
          </div>
          <h3 className="amount fw-semi-bold text-center ">$2745.00</h3>
          <div className="d-flex justify-content-center align-items-center flex-column gap-2 ">
            <span className="text-red"><GoArrowDownRight color="red" /> 34.5%</span>
            <p className="text-secondary">Compared to April 2023</p>
          </div>
        </div>
        <div className="total-sale p-3 flex-grow-1 rounded shadow  bg-light">
          <div className="d-flex align-items-center justify-content-between">
            <p className="text-secondary">Totals</p>
            <div>
              <select class="form-select" aria-label="select example">
                <option selected value="1">
                  One
                </option>
              </select>
            </div>
          </div>
          <h3 className="amount fw-semi-bold text-center ">$2745.00</h3>
          <div className="d-flex justify-content-center align-items-center flex-column ">
            <span className="text-success"><GoArrowUpRight color="green" /> 34.5%</span>
            <p className="text-secondary">Compared to April 2023</p>
          </div>
        </div>
        <div className="total-sale p-3 flex-grow-1 rounded shadow bg-light">
          <div className="d-flex align-items-center justify-content-between">
            <p className="text-secondary">Totals</p>
            <div>
              <select class="form-select" aria-label="select example">
                <option selected value="1">
                  One
                </option>
              </select>
            </div>
          </div>
          <h3 className="amount fw-semi-bold text-center">$2745.00</h3>
          <div className="d-flex justify-content-center align-items-center flex-column ">
            <span className="text-danger"><GoArrowDownRight color="red" /> 34.5%</span>
            <p className="text-secondary">Compared to April 2023</p>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-center gap-3 my-5 flex-wrap ">
        <div className="total-sale p-3 flex-grow-1 flex-shrink-1 align-self-start bg-light  rounded shadow ">
          <div className="d-flex align-items-center justify-content-between">
            <p className="text-secondary">Totals</p>
            <div>
              <select class="form-select" aria-label="select example">
                <option selected value="1">
                  One
                </option>
              </select>
            </div>
          </div>
          
          <div className="d-flex justify-content-center align-items-center flex-column gap-2 ">
            <div className="py-4 px-4 w-100 my-2 rounded" style={{backgroundColor: "#d9ecff", color: "#004b9a"}}>
            <h3 className="amount fw-normal text-center ">148</h3>
            </div>
            <div className="active-pages-users d-flex  align-items-center justify-content-between w-100 border-bottom">
            <p className="text-red">Active pages</p>
            <p className="text-secondary">Users</p>
            </div>
          </div>
        </div>
       
        <div className="total-sale p-3 flex-grow-1 rounded shadow w-50 bg-light">
          <div className="d-flex align-items-center justify-content-between">
            <p className="text-secondary">Income Statistics</p>
            <div>
              <select class="form-select" aria-label="select example">
                <option selected value="1">
                  One
                </option>
              </select>
            </div>
          </div>
          <div className="">
            <RevenueChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
