import React from "react";
import { Link } from 'react-router-dom';
import style from "./PokemonCard.module.css"




const PokemonCard = (props) => {

  return (
      // <div key={props.id}>
      //   <Link to={`/pokemon/${props.id}`}>
      //       <h1>{props.name}</h1>
      //       <img src={props.img} alt={props.name}/>
      //   </Link>
      //   <Link to={`/pokemon/types`}>
      //       <ul>
      //           {props.types.map(el=>{
      //               return( 
      //               <li >{el}</li>
      //               )
      //           })}
      //       </ul>
      //     </Link>
      // </div>
  
    <div className={style.container}  key={props.id}>
      <div className={style.card}>
        <div className={style.imgBx}>
          <img src={props.img} alt={props.name}/>
        </div>
         <div className={style.contentBx}>
          <h2>{ props.name.toUpperCase()}</h2>

          <div className={style.size}>
          
            {props.types.map(el=>{
              
              return( 
                // <div className={el}>
            
              
                    <span className={[`${el}`] }>{el.toUpperCase()}</span>
                        )
                    })}
          
          </div>
          <div className={style.detail}>
            <Link to={`/pokemon/${props.id}`}>
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
