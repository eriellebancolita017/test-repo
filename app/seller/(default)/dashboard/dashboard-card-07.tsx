import React from "react";

export default function DashboardCard07() {
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Recent Orders
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Order Id</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Items</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Cross Sales</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Earning</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Date</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center">#433443</div>
                </td>
                <td className="p-2">
                  <div className="text-center">2</div>
                </td>
                <td className="p-2">
                  <div className="text-center ">$3,877</div>
                  <div className="text-center text-xs ">
                    Via PayPal Adaptive
                  </div>
                </td>{" "}
                <td className="p-2">
                  <div className="text-center text-emerald-500">$3,426</div>
                </td>
                <td className="p-2">
                  <div className="text-center">April 30, 2024</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center">#65656</div>
                </td>
                <td className="p-2">
                  <div className="text-center">32</div>
                </td>
                <td className="p-2">
                  <div className="text-center ">$3,877</div>
                  <div className="text-center text-xs ">
                    Via PayPal Adaptive
                  </div>
                </td>{" "}
                <td className="p-2">
                  <div className="text-center text-emerald-500">$3,426</div>
                </td>
                <td className="p-2">
                  <div className="text-center">April 30, 2024</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center">#433443</div>
                </td>
                <td className="p-2">
                  <div className="text-center">12</div>
                </td>
                <td className="p-2">
                  <div className="text-center ">$3,877</div>
                  <div className="text-center text-xs ">
                    Via PayPal Adaptive
                  </div>
                </td>{" "}
                <td className="p-2">
                  <div className="text-center text-emerald-500">$3,426</div>
                </td>
                <td className="p-2">
                  <div className="text-center">April 30, 2024</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center">#86856</div>
                </td>
                <td className="p-2">
                  <div className="text-center">8</div>
                </td>
                <td className="p-2">
                  <div className="text-center ">$3,877</div>
                  <div className="text-center text-xs ">
                    Via PayPal Adaptive
                  </div>
                </td>{" "}
                <td className="p-2">
                  <div className="text-center text-emerald-500">$3,426</div>
                </td>
                <td className="p-2">
                  <div className="text-center">April 30, 2024</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center">#433443</div>
                </td>
                <td className="p-2">
                  <div className="text-center">2</div>
                </td>
                <td className="p-2">
                  <div className="text-center ">$3,877</div>
                  <div className="text-center text-xs ">
                    Via PayPal Adaptive
                  </div>
                </td>{" "}
                <td className="p-2">
                  <div className="text-center text-emerald-500">$3,426</div>
                </td>
                <td className="p-2">
                  <div className="text-center">April 30, 2024</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
