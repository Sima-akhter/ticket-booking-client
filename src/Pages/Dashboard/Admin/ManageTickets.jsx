import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheck, FaTimes, FaTicketAlt, FaUserEdit, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const ManageTickets = () => {
    const axiosSecure = useAxiosSecure();

    const { data: tickets = [], refetch, isLoading } = useQuery({
        queryKey: ['pending-tickets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/tickets');
            return res.data;
        }
    });

    const handleApprove = async (id) => {
        try {
            await axiosSecure.patch(`/admin/tickets/approve/${id}`);
            Swal.fire({
                icon: 'success',
                title: 'Approved!',
                text: 'Ticket is now visible to users.',
                confirmButtonColor: '#10B981'
            });
            refetch();
        } catch (error) {
            Swal.fire('Error', 'Failed to approve ticket', 'error');
        }
    };

    const handleReject = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to reject this ticket!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, reject it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/admin/tickets/reject/${id}`);
                Swal.fire('Rejected!', 'The ticket has been rejected.', 'info');
                refetch();
            }
        });
    };

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="p-4 md:p-8 bg-base-200 min-h-screen transition-colors duration-300">
            <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto"
            >
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-base-content flex items-center gap-3">
                            <FaTicketAlt className="text-primary" /> Manage Pending Tickets
                        </h2>
                        <p className="text-base-content/60 mt-1">Review and approve tickets submitted by vendors.</p>
                    </div>
                    <div className="badge badge-primary badge-lg py-4 font-bold">
                        Total Pending: {tickets.length}
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-base-100 rounded-[2rem] shadow-xl border border-base-300 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* Head */}
                            <thead className="bg-base-200/50 text-base-content">
                                <tr className="border-b border-base-300">
                                    <th className="py-5 pl-8">Ticket Info</th>
                                    <th>Vendor Contact</th>
                                    <th>Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-20">
                                            <FaInfoCircle className="mx-auto text-4xl text-base-content/20 mb-3" />
                                            <p className="text-xl font-bold text-base-content/40">No pending tickets available</p>
                                        </td>
                                    </tr>
                                ) : (
                                    tickets.map((ticket) => (
                                        <tr key={ticket._id} className="hover:bg-primary/5 transition-colors border-b border-base-300 last:border-0 group">
                                            <td className="py-4 pl-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                        {ticket.transportType?.[0] || 'T'}
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-base-content group-hover:text-primary transition-colors">
                                                            {ticket.ticketTitle || ticket.title}
                                                        </div>
                                                        <div className="text-xs opacity-50 font-bold uppercase tracking-tighter">
                                                            {ticket.from} → {ticket.to}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-2 font-medium">
                                                    <div className="p-2 rounded-full bg-base-200">
                                                        <FaUserEdit className="text-xs" />
                                                    </div>
                                                    {ticket.vendorEmail}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge badge-warning badge-sm py-3 px-4 font-bold animate-pulse">
                                                    Pending Approval
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex justify-center gap-2">
                                                    <button 
                                                        onClick={() => handleApprove(ticket._id)} 
                                                        className="btn btn-sm md:btn-md bg-emerald-500 hover:bg-emerald-600 border-none text-white rounded-xl gap-2 shadow-lg shadow-emerald-500/20"
                                                    >
                                                        <FaCheck /> Approve
                                                    </button>
                                                    <button 
                                                        onClick={() => handleReject(ticket._id)} 
                                                        className="btn btn-sm md:btn-md bg-rose-500 hover:bg-rose-600 border-none text-white rounded-xl gap-2 shadow-lg shadow-rose-500/20"
                                                    >
                                                        <FaTimes /> Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ManageTickets;