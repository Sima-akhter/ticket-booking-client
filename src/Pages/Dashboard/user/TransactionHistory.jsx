import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const TransactionHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/payments/${user.email}`)
      .then(res => res.json())
      .then(data => setPayments(data));
  }, [user.email]);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Ticket</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p._id}>
              <td>{p.transactionId}</td>
              <td>৳{p.amount}</td>
              <td>{p.ticketTitle}</td>
              <td>{new Date(p.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
