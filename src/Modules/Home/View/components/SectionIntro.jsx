import React from 'react';
import SloganAnimation from '../../../../assets/scss/animations/SloganAnim';

const SectionIntro = () => {
  const text = "Good food should both comfort and nourish the soul.";

  return (
    <section className="sectionIntro">
      <div className="container">
        <div className="row">
          <div className="headline">
            <SloganAnimation text={text} />
          </div>
          <div className="description">
            We are centrally located in the neighborhood of St-Henri. Stop by for a coffee, catch up on work, or grab some of our delicious goodies to go. With cookies and cakes available for online order, there’s something for everyone, and every occasion.
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionIntro;
