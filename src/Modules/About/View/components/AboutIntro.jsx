import React from 'react'
import ScrollYMotionText from '../../../../assets/scss/animations/ScrollYMotionText'

const AboutIntro = () => {
  return (
    <section className='aboutIntro'>
      <div className="container">
        <div className="row">
<h2 className='aboutTitle'>
   <ScrollYMotionText
                text='About Us'
                from={0}
                to={200}
                startY={0}
                endY={-30}
              />
 </h2>
<p className='introText'>
    We are a cozy and charming local bakehouse in the Saint Henri neighborhood of Montreal. Best known for our cookies and birthday cake! Additionally, we feature an array of freshly baked pastries and cakes that showcase both traditional recipes, like our grandmother used to bake, and more current and innovative flavors.
<br/> <br/>
Our customers are drawn to our warm atmosphere, friendly staff, third wave coffee, and the delightful aroma of baked goods that fills the air. With our focus on quality ingredients and attention to detail, Bernice Bakery has become a beloved spot for both locals and visitors seeking a taste of homemade goodness
</p>
        </div>
      </div>

    </section>
  )
}

export default AboutIntro