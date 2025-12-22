import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { FaMoneyBillWave, FaTicketAlt, FaPlusCircle } from "react-icons/fa";

const RevenueOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`server-kappa-lemon.vercel.app
/vendor/revenue/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 border-opacity-80"></div>
      </div>
    );
  }

  if (!stats) return <p className="text-center text-xl text-gray-600">No data available</p>;

  const chartData = [
    { name: "Total Revenue", value: stats.totalRevenue, icon: <FaMoneyBillWave />, color: "from-purple-600 to-pink-600" },
    { name: "Tickets Sold", value: stats.totalTicketsSold, icon: <FaTicketAlt />, color: "from-pink-500 to-purple-500" },
    { name: "Tickets Added", value: stats.totalTicketsAdded, icon: <FaPlusCircle />, color: "from-purple-500 to-pink-400" },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-purple-200">
          <p className="font-bold text-gray-800">{payload[0].payload.name}</p>
          <p className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {payload[0].value} {payload[0].payload.name === "Total Revenue" ? "TK" : ""}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 lg:p-10 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">
          Revenue Overview
        </span>
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {chartData.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 border border-purple-100 overflow-hidden"
          >
            {/* Gradient Overlay on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-gray-600 mb-2">{item.name}</p>
                <p className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {item.value} {item.name === "Total Revenue" ? "TK" : ""}
                </p>
              </div>
              <div className="text-6xl text-purple-600 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Performance Summary</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
            <XAxis dataKey="name" tick={{ fill: "#666" }} />
            <YAxis tick={{ fill: "#666" }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(128, 0, 128, 0.1)" }} />
            <Bar dataKey="value" radius={[20, 20, 0, 0]} animationDuration={1500}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#gradient${index})`} />
              ))}
            </Bar>

            {/* Gradients for Bars */}
            <defs>
              <linearGradient id="gradient0" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueOverview;