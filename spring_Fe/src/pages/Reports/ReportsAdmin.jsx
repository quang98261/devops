// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { getReports } from "../../services/api";

// export default function ReportsAdmin() {
//   const [report, setReport] = useState({ customers: 0, revenue: 0 });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchReport();
//   }, []);

//   const fetchReport = async () => {
//     try {
//       setLoading(true);
//       const res = await getReports();
//       setReport(res.data || {});
//     } catch (e) {
//       console.error(e);
//       toast.error("Không thể tải báo cáo");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h3>📊 Báo cáo hàng ngày</h3>
//       {loading ? (
//         <div>Đang tải dữ liệu...</div>
//       ) : (
//         <div className="mt-3 p-3 border rounded bg-light">
//           <h5>Khách hàng: {report.customers}</h5>
//           <h5>Doanh thu: {report.revenue?.toLocaleString()} VND</h5>
//         </div>
//       )}
//     </div>
//   );
// }
