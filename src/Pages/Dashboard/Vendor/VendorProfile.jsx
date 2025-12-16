import useAuth from "../../../hooks/useAuth";


const VendorProfile = () => {
  const { user } = useAuth();

  return (
    <div className="card p-6 shadow">
      <img src={user.photoURL} className="w-24 rounded-full" />
      <h2 className="text-xl font-bold">{user.displayName}</h2>
      <p>Email: {user.email}</p>
      <p>Role: Vendor</p>
    </div>
  );
};

export default VendorProfile;
