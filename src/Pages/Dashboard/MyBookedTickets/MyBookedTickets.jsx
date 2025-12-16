import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyBookedTickets = () => {

    const {user} = useAuth();
    // console.log(user)
    const axiosSecure = useAxiosSecure();


    const {data: tickets = []} = useQuery({
        queryKey: ['myBookedTickets', user?.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/tickets?email=${user.email}`);
            return res.data;

        }
    })

  return (
    <div>My Booked Tickets : {tickets.length}</div>
  )
}

export default MyBookedTickets 