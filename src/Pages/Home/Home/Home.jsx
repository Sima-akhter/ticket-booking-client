import React from 'react'
import Banner from '../Banner/Banner'
import Advertisment from '../../Advertisement/Advertisment'
import TicketCard from '../../Advertisement/TicketCard'
import PopularRoutes from '../PopularRoutes/PopularRoutes'

const Home = () => {
  return (
    <div>
        <div >
            <Banner></Banner>
            <Advertisment></Advertisment>
            <TicketCard></TicketCard>
            <PopularRoutes></PopularRoutes>

        </div>
    </div>
  )
}

export default Home