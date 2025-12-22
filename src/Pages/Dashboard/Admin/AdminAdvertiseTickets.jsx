
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminAdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], refetch, isLoading } = useQuery({
    queryKey: ["approvedTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/approved-tickets");
      return res.data;
    },
  });

  const handleToggleAdvertise = async (ticket) => {
    try {
      await axiosSecure.patch(`/admin/tickets/advertise/${ticket._id}`,
        {
          isAdvertised: ticket.isAdvertised,
        }
      );
      refetch();
    } catch (error) {
      Swal.fire(
        "Limit Reached ❌",
        
        "warning"
      );
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        Advertise Tickets (Admin)
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="card bg-base-100 shadow-xl border"
          >
            <figure>
              <img
                src={ticket.imageUrl}
                alt={ticket.ticketTitle}
                className="h-40 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{ticket.title}</h2>
              <p>{ticket.from} → {ticket.to}</p>
              <p className="font-semibold">{ticket.price} TK</p>

              <div className="flex justify-between items-center mt-4">
                <span
                  className={`badge ${
                    ticket.isAdvertised
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {ticket.isAdvertised
                    ? "Advertised"
                    : "Not Advertised"}
                </span>

                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={ticket.isAdvertised}
                  onChange={() => handleToggleAdvertise(ticket)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAdvertiseTickets;
