import React from 'react';
import hus from '../images/hus.png';



function MainContent() {
    
    return (
      <main>
      <div>
        <p id="description"> 
          Røddi hjelper deg med oppgjøret etter at du har mistet et familiemedlem. Alt du trenger å gjøre er å registrere ønskelisten din, så fikser Røddi resten!
        </p>
      </div>
      <div>
        <img id="hus" src={hus} />
      </div>
    </main>
    );  
  }

  export default MainContent;