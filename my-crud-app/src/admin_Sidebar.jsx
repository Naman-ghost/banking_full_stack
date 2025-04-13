// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="w-64 bg-blue-900 text-white h-full p-5">
//       <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
//       <ul className="space-y-4">
//         <li>
//           <Link to="/dashboard" className="block py-2 px-4 hover:bg-blue-700 rounded">
//             Dashboard
//           </Link>
//         </li>
//         <li>
//           <Link to="/customers" className="block py-2 px-4 hover:bg-blue-700 rounded">
//             Customers
//           </Link>
//         </li>
//         <li>
//           <Link to="/customer-management" className="block py-2 px-4 hover:bg-blue-700 rounded">
//             Customer Management
//           </Link>
//         </li>
//         <li>
//           <Link to="/transactions" className="block py-2 px-4 hover:bg-blue-700 rounded">
//             Transactions
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import { Link } from "react-router-dom";

const admin_Sidebar = () => {
  return (
    <div className="w-64 bg-blue-900 text-white h-screen fixed top-0 left-0 overflow-y-auto shadow-lg">
      <div className="p-5 sticky top-0 bg-blue-900 z-10 border-b border-blue-800">
        <h2 className="text-2xl font-extrabold tracking-wide">Admin Panel</h2>
      </div>

      <ul className="p-5 space-y-3">
        <li>
          <Link
            to="/admin_dashboard"
            className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin_customers"
            className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Customers
          </Link>
        </li>
        <li>
          <Link
            to="/admin_customer-management"
            className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Customer Management
          </Link>
        </li>
        <li>
          <Link
            to="/admin_transactions"
            className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Transactions
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default admin_Sidebar;
