import React from "react";
import { Link } from "react-router-dom";
import style from "./DetailCard.module.css"



const DetailCard = (props) => {

  return (
    <div className={style.detailCard }>
      <div key={props.id} className={style.container}>
        <div className={style.other}>
          <h1> {props.name.toUpperCase()}</h1>
          <img src={props.img} alt={props.name} />
        
          {props.types.map(el=>{
            return <span>{el.type.name}</span>
          })}
        </div>
        <ul className={style.stats}>
          <li>height: {props.height}</li>
          <li>weight: {props.weight}</li>
          {props.stats.map(el=>{
            return(
              <li>{el.name}: {el.stat}</li>
            )
          })}
        </ul>
      </div>

    </div>
  );
};

export default DetailCard;
