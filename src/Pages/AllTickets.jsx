// import { useEffect, useState } from "react";
// import { Link } from "react-router";
// import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";

// const AllTickets = () => {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("https://server-kappa-lemon.vercel.app/tickets")
//       .then((res) => res.json())
//       .then((data) => {
//         setTickets(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   const getTransportIcon = (type) => {
//     switch (type?.toLowerCase()) {
//       case "bus": return <FaBus className="text-4xl text-purple-600" />;
//       case "train": return <FaTrain className="text-4xl text-purple-600" />;
//       case "plane": return <FaPlane className="text-4xl text-purple-600" />;
//       case "launch": return <FaShip className="text-4xl text-purple-600" />;
//       default: return <FaBus className="text-4xl text-purple-600" />;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 border-opacity-80"></div>
//       </div>
//     );
//   }

//   return (
//     <section className="py-16 px-4 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-12">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">
//             All Available Tickets
//           </span>
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//           {tickets.map((ticket) => (
//             <div
//               key={ticket._id}
//               className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
//             >
//               {/* Image with Gradient Overlay */}
//               <div className="relative h-64 overflow-hidden">
//                 <img
//                   src={ticket.imageUrl}
//                   alt={ticket.ticketTitle}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

//                 {/* Transport Icon */}
//                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
//                   {getTransportIcon(ticket.transportType)}
//                 </div>

//                 {/* Price Badge */}
//                 <div className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-2xl px-6 py-3 rounded-full shadow-xl">
//                   ৳{ticket.price}
//                 </div>
//               </div>

//               {/* Card Content */}
//               <div className="p-6">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors">
//                   {ticket.ticketTitle}
//                 </h3>

//                 <div className="space-y-2 text-gray-600 mb-6">
//                   <p className="font-semibold text-lg">
//                     {ticket.from} → {ticket.to}
//                   </p>
//                   <p>Transport: <span className="font-medium">{ticket.transportType}</span></p>
//                   <p>Available: <span className="font-medium">{ticket.ticketQuantity} seats</span></p>
//                   <p>Perks: <span className="font-medium">{ticket.perks?.join(", ") || "Standard"}</span></p>
//                   <p className="text-sm">
//                     Departure: {new Date(ticket.departureDate).toLocaleDateString()} | {ticket.departureTime}
//                   </p>
//                 </div>

//                 <Link
//                   to={`/ticketDetail/${ticket._id}`}
//                   className="block text-center btn bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-full shadow-xl hover:shadow-purple-500 transform hover:scale-105 transition-all duration-300"
//                 >
//                   See Details & Book
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>

//         {tickets.length === 0 && (
//           <p className="text-center text-gray-600 text-xl mt-16">No tickets available at the moment.</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default AllTickets;















// import { useEffect, useState } from "react";
// import { Link } from "react-router";
// import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";

// const AllTickets = () => {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("https://server-kappa-lemon.vercel.app/tickets")
//       .then((res) => res.json())
//       .then((data) => {
//         setTickets(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   const getTransportIcon = (type) => {
//     switch (type?.toLowerCase()) {
//       case "bus": return <FaBus className="text-4xl text-primary" />;
//       case "train": return <FaTrain className="text-4xl text-primary" />;
//       case "plane": return <FaPlane className="text-4xl text-primary" />;
//       case "launch": return <FaShip className="text-4xl text-primary" />;
//       default: return <FaBus className="text-4xl text-primary" />;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-opacity-80"></div>
//       </div>
//     );
//   }

//   return (
//     <section className="py-16 px-4 bg-base-200">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-12">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
//             All Available Tickets
//           </span>
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {tickets.map((ticket) => (
//             <div
//               key={ticket._id}
//               className="group relative bg-base-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-base-300 hover:border-primary/50"
//             >
//               {/* Image with Gradient Overlay */}
//               <div className="relative h-64 overflow-hidden">
//                 <img
//                   src={ticket.imageUrl}
//                   alt={ticket.ticketTitle}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

//                 {/* Transport Icon */}
//                 <div className="absolute top-4 right-4 bg-base-100/90 backdrop-blur-sm rounded-full p-3 shadow-md">
//                   {getTransportIcon(ticket.transportType)}
//                 </div>

//                 {/* Price Badge */}
//                 <div className="absolute bottom-4 left-4 bg-gradient-to-r from-primary to-secondary text-primary-content font-bold text-xl px-5 py-3 rounded-full shadow-xl">
//                   ৳{ticket.price}
//                 </div>
//               </div>

//               {/* Card Content */}
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors line-clamp-1">
//                   {ticket.ticketTitle}
//                 </h3>

//                 <div className="space-y-2 text-sm text-base-content/80 mb-6">
//                   <p className="font-medium text-base-content">
//                     {ticket.from} → {ticket.to}
//                   </p>
//                   <p>
//                     Transport: <span className="font-medium">{ticket.transportType}</span>
//                   </p>
//                   <p>
//                     Available: <span className="font-medium">{ticket.ticketQuantity} seats</span>
//                   </p>
//                   <p className="line-clamp-2">
//                     Perks: <span className="font-medium">{ticket.perks?.join(", ") || "Standard"}</span>
//                   </p>
//                   <p className="text-xs">
//                     Departure: {new Date(ticket.departureDate).toLocaleDateString()} | {ticket.departureTime}
//                   </p>
//                 </div>

//                 <Link
//                   to={`/ticketDetail/${ticket._id}`}
//                   className="block text-center btn btn-primary text-primary-content font-bold py-3 rounded-full shadow-md hover:shadow-lg hover:bg-primary-focus transform hover:scale-105 transition-all duration-300"
//                 >
//                   See Details & Book
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>

//         {tickets.length === 0 && (
//           <p className="text-center text-base-content/60 text-xl mt-16">No tickets available at the moment.</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default AllTickets;









import { useEffect, useState } from "react";
import { Link } from "react-router";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://server-kappa-lemon.vercel.app/tickets")
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-opacity-80"></div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-12">
          <span className="text-3xl font-bold text-center mb-6">
            All Available Tickets
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="group relative bg-base-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-base-300 hover:border-primary/50"
            >
              {/* Image with Gradient Overlay */}         
               <div className="relative h-64 overflow-hidden">
                 <figure className="relative overflow-hidden h-52">
        <img
          src={ticket.imageUrl}
          alt={ticket.ticketTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
        
        {/* Transport Badge */}
        <div className="absolute top-4 right-4 bg-base-100/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-primary shadow-sm">
          {ticket.transportType}
        </div>

         <div className="absolute bottom-4 left-4 text-black  font-bold text-xl px-5 py-3 ">
               {ticket.from} → {ticket.to}
          </div>

      </figure>
            </div> 

          {/* Card Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors line-clamp-1">
              {ticket.ticketTitle}

            </h3>

            <div className="space-y-2 text-sm text-base-content/80 mb-6">
              <p className="font-medium text-base-content">
                TK {ticket.price}
              </p>
              
              <p>
                Available: <span className="font-medium">{ticket.ticketQuantity} seats</span>
              </p>
              <p className="line-clamp-2">
                Perks: <span className="font-medium">{ticket.perks?.join(", ") || "Standard"}</span>
              </p>
              <p className="text-xs">
                
                Departure: {new Date(ticket.departureDate).toLocaleDateString()} | {ticket.departureTime}
              </p>
            </div>

            <Link
              to={`/ticketDetail/${ticket._id}`}
              className="block text-center btn btn-primary text-primary-content font-bold py-3 rounded-full shadow-md hover:shadow-lg hover:bg-primary-focus transform hover:scale-105 transition-all duration-300"
            >
              See Details & Book
            </Link>
          </div>
        </div>
          ))}
      </div>

      {tickets.length === 0 && (
        <p className="text-center text-base-content/60 text-xl mt-16">
          No tickets available at the moment.
        </p>
      )}
    </div>
    </section >
  );
};

export default AllTickets;


































// // AllTickets.jsx

// import { useEffect, useState } from "react";
// import TicketCard from "./Advertisement/TicketCard";


// const AllTickets = () => {
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("https://server-kappa-lemon.vercel.app/tickets")
//       .then((res) => res.json())
//       .then((data) => {
//         setTickets(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-opacity-80"></div>
//       </div>
//     );
//   }

//   return (
//     <section className="py-16 px-4 bg-base-200">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-12">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
//             All Available Tickets
//           </span>
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
//           {tickets.map((ticket) => (
//             <TicketCard key={ticket._id} ticket={ticket} />
//           ))}
//         </div>

//         {tickets.length === 0 && (
//           <p className="text-center text-base-content/60 text-xl mt-16">
//             No tickets available at the moment.
//           </p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default AllTickets;