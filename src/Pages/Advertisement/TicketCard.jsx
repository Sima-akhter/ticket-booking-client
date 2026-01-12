
import { Link } from "react-router";

const TicketCard = ({ ticket }) => {
  if (!ticket) return null;

  const {
    _id,
    imageUrl,
    ticketTitle,
    price,
    ticketQuantity,
    transportType,
    perks = [],
    departureDateTime,
  } = ticket;

  // Format departure date & time in English
  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "Date not available";
    const date = new Date(dateTimeStr);
    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    // Example output: "Thu, 15 January 2026, 10:30 AM"
  };

  return (
    <div className="group relative bg-base-100 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-base-300 hover:border-primary/40">
      {/* Image Section */}
      <figure className="relative overflow-hidden h-52">
        <img
          src={imageUrl}
          alt={ticketTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
        
        {/* Transport Badge */}
        <div className="absolute top-4 right-4 bg-base-100/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-primary shadow-sm">
          {transportType}
        </div>

         <div className="absolute bottom-4 left-4 text-black  font-bold text-xl px-5 py-3 ">
                  {ticket.from} → {ticket.to}
          </div>

      </figure>

      <div className="p-5 sm:p-6 space-y-4">
        {/* Title */}
        <h2 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors line-clamp-2">
          {ticketTitle}
        </h2>

        {/* Departure Date & Time */}
        <div className="flex items-center gap-2 text-sm text-base-content/80">
          <span className="text-primary">🗓️</span>
          <span> {formatDateTime(departureDateTime)}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
         
          <span className="text-lg font-medium text-base-content/70">$</span>
          <span className="text-3xl sm:text-3.5xl font-extrabold text-primary">
            {price}
          </span>
        </div>
            
        {/* Quantity */}
        <div className="text-sm text-base-content/70">
          Available: <span className="font-semibold text-base-content">{ticketQuantity}</span>
        </div>

        {/* View Details Button */}
        <div className="pt-4">
          <Link to={`/ticketDetail/${_id}`} className="block">
            <button className="w-full bg-primary text-primary-content font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:bg-primary-focus transform hover:-translate-y-0.5 transition-all duration-300">
              View Details →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;