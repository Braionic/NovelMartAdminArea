import React from "react";
import KebabIcon from "./KebabIcon";

export default function UserLists() {
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="p-3 bg-light ">
            <div className="recent-orders d-flex align-items-center justify-content-between">
              <h5>Recent orders</h5>
              <KebabIcon />
            </div>
            <div className="users-table overflow-auto w-100">
              <table className="table ">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Status</th>
                    <th>Co</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#00745</td>
                    <td>
                      <span className="badge bg-primary ">Primary</span>
                    </td>
                    <td>
                      <img src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/vendor/flag-icons/24/IT.png" />
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge rounded-circle p-2 bg-secondary">
                          ML
                        </span>
                        <span>Mathew Lisbon Johnson</span>
                      </div>
                    </td>
                    <td>25/04/2021</td>
                    <td>$23,450</td>
                  </tr>
                  <tr>
                    <td>#00746</td>
                    <td>
                      <span className="badge bg-info">Info</span>
                    </td>
                    <td>
                      <img src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/vendor/flag-icons/24/US.png" />
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge rounded-circle p-2 bg-secondary">
                          ML
                        </span>
                        <span>Mathew Lisbon Johnson</span>
                      </div>
                    </td>
                    <td>25/04/2021</td>
                    <td>$23,450</td>
                  </tr>
                  <tr>
                    <td>#00742</td>
                    <td>
                      <span className="badge bg-warning">Hold</span>
                    </td>
                    <td>
                      <img src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/vendor/flag-icons/24/CO.png" />
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge rounded-circle p-2 bg-secondary">
                          ML
                        </span>
                        <span>Mathew Lisbon Johnson</span>
                      </div>
                    </td>
                    <td>25/04/2021</td>
                    <td>$23,450</td>
                  </tr>
                  <tr>
                    <td>#00744</td>
                    <td>
                      <span className="badge bg-warning">Hold</span>
                    </td>
                    <td>
                      <img src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/vendor/flag-icons/24/US.png" />
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge rounded-circle p-2 bg-secondary">
                          ML
                        </span>
                        <span>Mathew Lisbon Johnson</span>
                      </div>
                    </td>
                    <td>25/04/2021</td>
                    <td>$23,450</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
