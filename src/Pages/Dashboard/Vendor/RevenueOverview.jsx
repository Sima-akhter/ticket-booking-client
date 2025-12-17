import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const RevenueOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/vendor/revenue/${user.email}`)
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, [user.email]);

  if (!stats) return <p>Loading...</p>;

  const chartData = [
    {
      name: "Revenue",
      value: stats.totalRevenue,
    },
    {
      name: "Tickets Sold",
      value: stats.totalTicketsSold,
    },
    {
      name: "Tickets Added",
      value: stats.totalTicketsAdded,
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6"> Revenue Overview</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card bg-base-200 p-4">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold">{stats.totalRevenue} ৳</p>
        </div>

        <div className="card bg-base-200 p-4">
          <h3 className="text-lg font-semibold">Tickets Sold</h3>
          <p className="text-2xl font-bold">{stats.totalTicketsSold}</p>
        </div>

        <div className="card bg-base-200 p-4">
          <h3 className="text-lg font-semibold">Tickets Added</h3>
          <p className="text-2xl font-bold">{stats.totalTicketsAdded}</p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueOverview;
