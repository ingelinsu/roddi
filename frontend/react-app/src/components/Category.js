import React, { Component, useEffect, useState } from 'react';

import './Category.css'

//

function Category(props) {

  const [active, setActive] = useState("")
  /* useEffect(() => {
    if (props.categories.length > 0) {
      setCategories(props.categories.map())
    }

  }) */

  function handleActive(value) {
    setActive(value)
    props.onCategorize(value)
  }

  return (

    <div className="sidenav">
      <div className="title">Kategorier</div>
      {Object.entries(props.categories).map(([key, value]) => (
        <a onClick={(e) => handleActive(value)} className={active === value ? "active" : null} key={key}>{value}</a>
      ))}
      <a className="clear" onClick={(e) => handleActive("")}>Nullstill</a>
    </div>
  );
}

export default Category