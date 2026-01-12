import React from 'react'
import Banner from '../Banner/Banner'
import Advertisment from '../../Advertisement/Advertisment'
import TicketCard from '../../Advertisement/TicketCard'
import PopularRoutes from '../PopularRoutes/PopularRoutes'
import WhyChooseUs from './WhyChooseUs/WhyChooseUs'
import LatestTickets from '../LatestTickets'
import Coverage from '../Banner/Coverage'
import Newsletter from './Newsletter'
import FAQ from './FaqSection'


const Home = () => {
  return (
    <div>
        <div >
                <Banner></Banner>
            <Advertisment></Advertisment>
            <LatestTickets></LatestTickets>
            <TicketCard></TicketCard>
            <PopularRoutes></PopularRoutes>
            <WhyChooseUs></WhyChooseUs>
            <Coverage></Coverage>
            <FAQ></FAQ>
            <Newsletter></Newsletter>

        </div>
    </div>
  )
}

export default Home