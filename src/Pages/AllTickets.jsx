

// import { useEffect, useState } from "react";
// import { Link } from "react-router";

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
//           <span className="text-3xl font-bold text-center mb-6">
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
//                <div className="relative h-64 overflow-hidden">
//                  <figure className="relative overflow-hidden h-52">
//         <img
//           src={ticket.imageUrl}
//           alt={ticket.ticketTitle}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
        
//         {/* Transport Badge */}
//         <div className="absolute top-4 right-4 bg-base-100/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-primary shadow-sm">
//           {ticket.transportType}
//         </div>

//          <div className="absolute bottom-4 left-4 text-black  font-bold text-xl px-5 py-3 ">
//                {ticket.from} → {ticket.to}
//           </div>

//       </figure>
//             </div> 

//           {/* Card Content */}
//           <div className="p-6">
//             <h3 className="text-xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors line-clamp-1">
//               {ticket.ticketTitle}

//             </h3>

//             <div className="space-y-2 text-sm text-base-content/80 mb-6">
//               <p className="font-medium text-base-content">
//                 TK {ticket.price}
//               </p>
              
//               <p>
//                 Available: <span className="font-medium">{ticket.ticketQuantity} seats</span>
//               </p>
//               <p className="line-clamp-2">
//                 Perks: <span className="font-medium">{ticket.perks?.join(", ") || "Standard"}</span>
//               </p>
//               <p className="text-xs">
                
//                 Departure: {new Date(ticket.departureDate).toLocaleDateString()} | {ticket.departureTime}
//               </p>
//             </div>

//             <Link
//               to={`/ticketDetail/${ticket._id}`}
//               className="block text-center btn btn-primary text-primary-content font-bold py-3 rounded-full shadow-md hover:shadow-lg hover:bg-primary-focus transform hover:scale-105 transition-all duration-300"
//             >
//               See Details & Book
//             </Link>
//           </div>
//         </div>
//           ))}
//       </div>

//       {tickets.length === 0 && (
//         <p className="text-center text-base-content/60 text-xl mt-16">
//           No tickets available at the moment.
//         </p>
//       )}
//     </div>
//     </section >
//   );
// };

// export default AllTickets;


































// // // AllTickets.jsx

// // import { useEffect, useState } from "react";
// // import TicketCard from "./Advertisement/TicketCard";


// // const AllTickets = () => {
// //   const [tickets, setTickets] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetch("https://server-kappa-lemon.vercel.app/tickets")
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setTickets(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error(err);
// //         setLoading(false);
// //       });
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-96">
// //         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-opacity-80"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <section className="py-16 px-4 bg-base-200">
// //       <div className="max-w-7xl mx-auto">
// //         <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-12">
// //           <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
// //             All Available Tickets
// //           </span>
// //         </h2>

// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
// //           {tickets.map((ticket) => (
// //             <TicketCard key={ticket._id} ticket={ticket} />
// //           ))}
// //         </div>

// //         {tickets.length === 0 && (
// //           <p className="text-center text-base-content/60 text-xl mt-16">
// //             No tickets available at the moment.
// //           </p>
// //         )}
// //       </div>
// //     </section>
// //   );
// // };

// // export default AllTickets;
























import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Search, Filter, SortAsc, LayoutGrid, SlidersHorizontal } from "lucide-react";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for Search, Filter, Sort, Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [priceRange, setPriceRange] = useState(5000);
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetch("https://server-kappa-lemon.vercel.app/tickets")
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setFilteredTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Handle Filtering, Searching and Sorting
  useEffect(() => {
    let result = [...tickets];

    // 1. Search Logic (Title or Route)
    if (searchQuery) {
      result = result.filter(ticket =>
        ticket.ticketTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.to.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 2. Transport Type Filter
    if (filterType !== "All") {
      result = result.filter(ticket => ticket.transportType === filterType);
    }

    // 3. Price Filter (Requirement 2 fields check)
    result = result.filter(ticket => ticket.price <= priceRange);

    // 4. Sorting Logic
    if (sortOrder === "lowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredTickets(result);
    setCurrentPage(1); // Reset to page 1 on new filter
  }, [searchQuery, filterType, priceRange, sortOrder, tickets]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-opacity-80"></div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-base-content mb-4">
            Explore <span className="text-primary">Available</span> Tickets
          </h2>
          <p className="text-base-content/60 font-medium">Find the best routes at the best prices</p>
        </div>

        {/* --- Search & Filter Bar --- */}
        <div className="bg-base-100 p-6 rounded-[2.5rem] shadow-sm border border-base-300 mb-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
              <input
                type="text"
                placeholder="Search by destination..."
                className="input input-bordered w-full pl-12 rounded-2xl bg-base-200 border-none focus:ring-2 ring-primary/20"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Transport Type Filter */}
            <select 
              className="select select-bordered w-full rounded-2xl bg-base-200 border-none"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Transport</option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Flight">Flight</option>
              <option value="Launch">Launch</option>
            </select>

            {/* Sort Order */}
            <select 
              className="select select-bordered w-full rounded-2xl bg-base-200 border-none"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Sort by Price</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>

            {/* Price Range Filter */}
            <div className="px-2">
              <label className="text-xs font-bold opacity-50 uppercase mb-1 block text-base-content">
                Max Price: TK {priceRange}
              </label>
              <input 
                type="range" min="0" max="10000" step="500" 
                value={priceRange} 
                className="range range-primary range-xs" 
                onChange={(e) => setPriceRange(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* --- Ticket Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentItems.map((ticket) => (
            <div
              key={ticket._id}
              className="group bg-base-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-base-300 relative flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={ticket.imageUrl}
                  alt={ticket.ticketTitle}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-primary uppercase shadow-lg">
                  {ticket.transportType}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                   <p className="text-white font-bold text-sm uppercase tracking-widest">{ticket.from} ➔ {ticket.to}</p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-black text-base-content mb-2 italic line-clamp-1 uppercase tracking-tighter">
                  {ticket.ticketTitle}
                </h3>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-primary italic">TK {ticket.price}</span>
                    <span className="badge badge-ghost font-bold text-[10px]">{ticket.ticketQuantity} Seats</span>
                  </div>
                  <p className="text-xs text-base-content/60 font-medium line-clamp-2">
                     Perks: {ticket.perks?.join(" • ") || "Standard"}
                  </p>
                  <div className="pt-2 border-t border-base-300">
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Departure</p>
                    <p className="text-xs font-black">{new Date(ticket.departureDate).toDateString()} | {ticket.departureTime}</p>
                  </div>
                </div>

                <Link
                  to={`/ticketDetail/${ticket._id}`}
                  className="btn btn-primary w-full rounded-xl font-black text-white shadow-lg shadow-primary/20 tracking-widest uppercase hover:scale-[1.02]"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* --- Empty State --- */}
        {filteredTickets.length === 0 && (
          <div className="text-center py-20">
             <LayoutGrid size={60} className="mx-auto opacity-10 mb-4" />
             <p className="text-base-content/40 text-xl font-black uppercase italic">No tickets match your search</p>
          </div>
        )}

        {/* --- Pagination --- */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16">
            <div className="join bg-base-100 shadow-sm border border-base-300 rounded-2xl overflow-hidden">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`join-item btn btn-md border-none px-6 ${
                    currentPage === index + 1 ? "btn-primary text-white" : "btn-ghost"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllTickets;