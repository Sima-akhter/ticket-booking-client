import useAuth from "../../../hooks/useAuth";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-md mx-auto bg-base-200 p-6 rounded-xl shadow">
      <img
        src={user.photoURL}
        className="w-24 h-24 rounded-full mx-auto"
      />
      <h2 className="text-xl font-bold text-center mt-3">
        {user.displayName}
      </h2>
      <p className="text-center">{user.email}</p>
      <p className="text-center mt-1 badge badge-primary">User</p>
    </div>
  );
};

export default UserProfile;
