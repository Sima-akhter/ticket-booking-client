import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminProfile = () => {
const axiosSecure = useAxiosSecure;
const { user } = useAuth();


const { data: admin = {} } = useQuery({
queryKey: ['admin-profile'],
queryFn: async () => {
const res = await axiosSecure.get(`/admin/profile/${user.email}`);
return res.data;
}
});


return (
<div className="p-6">
<img src={admin.photoURL} className="w-24 rounded-full" />
<h2 className="text-xl font-bold">{admin.name}</h2>
<p>{admin.email}</p>
<p className="badge">{admin.role}</p>
</div>
);
};


export default AdminProfile;