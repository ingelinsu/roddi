import React from 'react';
import hus from '../images/hus.png';



function MainContent() {
    
    return (
      <main>
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus,
          nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem
          felis nec erat
        </p>
      </div>
      <div>
        <img id="hus" src={hus}/>
      </div>
    </main>
    );  
  }

  export default MainContent;