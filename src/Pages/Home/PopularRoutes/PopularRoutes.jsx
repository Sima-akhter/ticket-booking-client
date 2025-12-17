import { FaBus } from "react-icons/fa";

const PopularRoutes = () => {
  const routes = [
    { from: "Dhaka", to: "Chattogram", price: "৳1200", duration: "6 Hours" },
    { from: "Dhaka", to: "Sylhet", price: "৳900", duration: "5 Hours" },
    { from: "Dhaka", to: "Rajshahi", price: "৳800", duration: "6.5 Hours" },
  ];

  return (
    <section className="my-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Popular Routes 🚍</h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {routes.map((route, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 shadow hover:shadow-lg transition flex flex-col items-center"
          >
            <FaBus className="text-5xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {route.from} → {route.to}
            </h3>
            <p className="text-gray-600">Duration: {route.duration}</p>
            <p className="text-lg font-bold text-primary mt-2">
              Price: {route.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularRoutes;
