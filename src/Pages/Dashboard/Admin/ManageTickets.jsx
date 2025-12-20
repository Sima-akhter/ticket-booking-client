import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageTickets = () => {
    const axiosSecure = useAxiosSecure();


    const { data: tickets = [], refetch } = useQuery({
        queryKey: ['pending-tickets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/tickets');
            console.log(res.data)
            return res.data;
        }
    });


    const handleApprove = async (id) => {
        await axiosSecure.patch(`/admin/tickets/approve/${id}`);
        Swal.fire('Approved!', '', 'success');
        refetch();
    };


    const handleReject = async (id) => {
        await axiosSecure.patch(`/admin/tickets/reject/${id}`);
        Swal.fire('Rejected!', '', 'info');
        refetch();
    };
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Vendor</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tickets.map(ticket => (
                    <tr key={ticket._id}>
                        <td>{ticket.title}</td>
                        <td>{ticket.vendorEmail}</td>
                        <td>
                            <button onClick={() => handleApprove(ticket._id)}>Approve</button>
                            <button onClick={() => handleReject(ticket._id)}>Reject</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


export default ManageTickets;