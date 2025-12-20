import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure;


    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/users');
            return res.data;
        }
    });


    const changeRole = async (id, role) => {
        await axiosSecure.patch(`/admin/users/role/${id}`, { role });
        Swal.fire('Updated!', '', 'success');
        refetch();
    };


    const markFraud = async (id) => {
        await axiosSecure.patch(`/admin/users/fraud/${id}`);
        Swal.fire('Vendor Marked Fraud', '', 'warning');
        refetch();
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                            <button onClick={() => changeRole(user._id, 'admin')}>Make Admin</button>
                            <button onClick={() => changeRole(user._id, 'vendor')}>Make Vendor</button>
                            {user.role === 'vendor' && (
                                <button onClick={() => markFraud(user._id)}>Mark Fraud</button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


export default ManageUsers;