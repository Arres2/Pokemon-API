import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link  } from "react-router-dom";
import { getPokemonDetail, getTypes} from "../../redux/actions";
import DetailCard from "../DetailCard/DetailCard";
import style from "../DetailCard/DetailCard.module.css"


const PokemonDetail =  () => {
   const {pokemonId} =  useParams()
   const dispatch = useDispatch()
   const detail = useSelector(state => state.detail)
  
   
   useEffect(()=>{
    dispatch( getPokemonDetail(pokemonId))
},[dispatch,pokemonId])

  while(detail.name === undefined){
    return(
      <div className="loadingAnimation">
        <img src="https://i.gifer.com/4OKl.gif"/>
      </div>
    )
  }
   return (
       <div>
          <DetailCard
            name = {detail.name}
              key={detail.id}
              id={detail.id}
              height={detail.height}
              weight={detail.weight}
              stats= {detail.stats.map((el) => {
                return {
                  name: el.stat.name,
                  stat: el.base_stat,
                };
              })}
              types = {detail.types}
              img={detail.sprites.other.home.front_default?detail.sprites.other.home.front_default:detail.sprites.front_default}
          />
          <div className={style.pagination}>
            <Link to="/pokemon">
              <button className={style.pagination_button}>Back</button>
            </Link>
          </div>
         
       </div>
   )
};
export default PokemonDetail;
