import React from 'react'
import ScrollYMotionText from '../assets/scss/animations/ScrollYMotionText';
import OffersCard from './OffersCard';

const SectionOffers = ({text3}) => {
    // const text = "Room for more?";
  return (
    <section className='sectionOffers'>
    <div className="container">
        <div className="row">
        <h2 className='offerTitle'>
        <ScrollYMotionText
                text={text3}
                from={4200}  // Начальный диапазон прокрутки
                to={4500}  // Конечный диапазон прокрутки
                startY={10}  // Начальная позиция текста
                endY={-70}  // Конечная позиция текста
              />
        </h2>
        <div className='offersBox'>
            <OffersCard/>
            <OffersCard/>

        </div>
    </div>
    </div>
</section>
  )
}

export default SectionOffers