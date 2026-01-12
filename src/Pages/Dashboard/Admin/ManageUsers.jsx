import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield, FaUserTie, FaUserSlash, FaEnvelope, FaUsersCog, FaUserTag } from "react-icons/fa";
import { motion } from "framer-motion";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['manageUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/users');
            return res.data;
        }
    });

    const changeRole = async (id, role) => {
        Swal.fire({
            title: `Make ${role}?`,
            text: `Are you sure you want to change this user's role to ${role}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#4F46E5',
            confirmButtonText: 'Yes, Update'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/admin/users/role/${id}`, { role });
                Swal.fire('Updated!', `User is now a ${role}.`, 'success');
                refetch();
            }
        });
    };

    const markFraud = async (id) => {
        Swal.fire({
            title: 'Mark as Fraud?',
            text: "This vendor will be flagged as fraudulent!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            confirmButtonText: 'Yes, Mark Fraud'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/admin/users/fraud/${id}`);
                Swal.fire('Warning!', 'Vendor has been marked as fraud.', 'warning');
                refetch();
            }
        });
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="p-4 md:p-8 bg-base-200 min-h-screen transition-colors duration-300">
            <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto"
            >
                {/* Header Card */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 p-6 bg-base-100 rounded-3xl shadow-sm border border-base-300">
                    <div>
                        <h2 className="text-3xl font-black text-base-content flex items-center gap-3">
                            <FaUsersCog className="text-primary" /> User Management
                        </h2>
                        <p className="text-base-content/60 font-medium">Control user permissions and verify vendors.</p>
                    </div>
                    <div className="mt-4 md:mt-0 px-6 py-2 bg-primary/10 text-primary rounded-2xl border border-primary/20 font-bold">
                        Total Users: {users.length}
                    </div>
                </div>

                {/* Table Layout */}
                <div className="bg-base-100 rounded-[2.5rem] shadow-2xl border border-base-300 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-base-200/50 text-base-content">
                                <tr className="border-b border-base-300">
                                    <th className="py-6 pl-8">User Information</th>
                                    <th>Email</th>
                                    <th>Designated Role</th>
                                    <th className="text-center">Administrative Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-primary/5 transition-all border-b border-base-300 last:border-0 group">
                                        <td className="py-5 pl-8">
                                            <div className="flex items-center gap-4">
                                                <div className="avatar">
                                                    <div className="w-12 h-12 rounded-2xl ring-2 ring-primary/20 ring-offset-base-100 ring-offset-2">
                                                        <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-black text-base-content group-hover:text-primary transition-colors">{user.name}</div>
                                                    <div className="text-[10px] opacity-50 font-bold flex items-center gap-1 uppercase tracking-tighter">
                                                        <FaUserTag /> ID: {user._id.slice(-6)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2 opacity-70 font-medium">
                                                <FaEnvelope className="text-primary" /> {user.email}
                                            </div>
                                        </td>
                                        <td>
                                            <div className={`badge badge-lg font-bold py-4 px-5 border-none shadow-sm capitalize ${
                                                user.role === 'admin' ? 'bg-indigo-600 text-white' : 
                                                user.role === 'vendor' ? 'bg-amber-500 text-white' : 'bg-slate-500 text-white'
                                            }`}>
                                                {user.role === 'admin' ? <FaUserShield className="mr-2"/> : <FaUserTie className="mr-2"/>}
                                                {user.role || 'User'}
                                            </div>
                                            {user.status === 'fraud' && (
                                                <div className="mt-1 badge badge-error text-[10px] text-white font-black animate-bounce">FRAUD ALERT</div>
                                            )}
                                        </td>
                                        <td>
                                            <div className="flex justify-center items-center gap-2">
                                                {/* Action Buttons */}
                                                <button 
                                                    onClick={() => changeRole(user._id, 'admin')} 
                                                    disabled={user.role === 'admin'}
                                                    className={`btn btn-sm rounded-xl gap-2 ${user.role === 'admin' ? 'btn-disabled' : 'btn-outline border-indigo-600 text-indigo-600 hover:bg-indigo-600'}`}
                                                >
                                                    <FaUserShield /> Admin
                                                </button>
                                                
                                                <button 
                                                    onClick={() => changeRole(user._id, 'vendor')} 
                                                    disabled={user.role === 'vendor'}
                                                    className={`btn btn-sm rounded-xl gap-2 ${user.role === 'vendor' ? 'btn-disabled' : 'btn-outline border-amber-500 text-amber-500 hover:bg-amber-500'}`}
                                                >
                                                    <FaUserTie /> Vendor
                                                </button>

                                                {user.role === 'vendor' && user.status !== 'fraud' && (
                                                    <button 
                                                        onClick={() => markFraud(user._id)} 
                                                        className="btn btn-sm btn-error bg-rose-600 text-white rounded-xl gap-2 shadow-lg shadow-rose-500/30 border-none"
                                                    >
                                                        <FaUserSlash /> Mark Fraud
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ManageUsers;