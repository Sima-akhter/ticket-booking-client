import React from 'react'
import Banner from '../Banner/Banner'
import Advertisment from '../../Advertisement/Advertisment'
import TicketCard from '../../Advertisement/TicketCard'

const Home = () => {
  return (
    <div>
        <div >
            <Banner></Banner>
            <Advertisment></Advertisment>
            <TicketCard></TicketCard>

        </div>
    </div>
  )
}

export default Home