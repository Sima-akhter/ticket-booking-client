import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { FaMoneyBillWave, FaTicketAlt, FaPlusCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const RevenueOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://server-kappa-lemon.vercel.app/vendor/revenue/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner text-primary"></span></div>;

  const chartData = [
    { name: "Total Revenue", value: stats?.totalRevenue || 0, icon: <FaMoneyBillWave />, color: "#2563eb" },
    { name: "Tickets Sold", value: stats?.totalTicketsSold || 0, icon: <FaTicketAlt />, color: "#3b82f6" },
    { name: "Tickets Added", value: stats?.totalTicketsAdded || 0, icon: <FaPlusCircle />, color: "#60a5fa" },
  ];

  return (
    <div className="p-6 min-h-screen bg-base-200/50">
      <h2 className="text-3xl font-black text-base-content mb-10 flex items-center gap-2">
        Financial <span className="text-primary">Overview</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {chartData.map((item, index) => (
          <motion.div whileHover={{ y: -5 }} key={index} className="bg-base-100 p-8 rounded-2xl shadow-md border border-base-300 hover:border-primary/40 transition-all duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black opacity-50 uppercase tracking-widest">{item.name}</p>
                <h3 className="text-3xl font-black text-base-content mt-1">
                  {item.value} <span className="text-xs opacity-60 font-medium">{item.name === "Total Revenue" ? "TK" : ""}</span>
                </h3>
              </div>
              <div className="text-4xl text-primary opacity-20">{item.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-base-100 p-8 rounded-2xl shadow-md border border-base-300">
        <h3 className="text-lg font-bold mb-8 text-base-content">Performance Statistics</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} stroke="currentColor" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'currentColor', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'currentColor', fontSize: 12}} />
              <Tooltip cursor={{fill: 'currentColor', opacity: 0.05}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
              <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={50}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default RevenueOverview;