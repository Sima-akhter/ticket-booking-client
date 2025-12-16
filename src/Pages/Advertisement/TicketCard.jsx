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
  } = ticket;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={imageUrl} alt={ticketTitle} className="h-48 w-full object-cover" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{ticketTitle}</h2>
        <p>💰 Price: {price} ৳</p>
        <p>🎫 Quantity: {ticketQuantity}</p>
        <p>🚍 Transport: {transportType}</p>

        <ul className="list-disc ml-5">
          {perks.map((perk, index) => (
            <li key={index}>{perk}</li>
          ))}
        </ul>

        <div className="card-actions justify-end">
          <Link to={`/ticketDetail/${_id}`}>
            <button className="btn btn-primary">See Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
