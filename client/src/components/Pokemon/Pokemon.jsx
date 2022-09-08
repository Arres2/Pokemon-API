import React, {useEffect, useState} from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import { useSelector } from "react-redux";
import { ordered, tipos } from "../../redux/actions/filters";
import style from "../PokemonCard/PokemonCard.module.css"
import pag_style from "./Pagination.module.css"




const Pokemon = () => {

  let order = useSelector(state=>state.order)
  let type = useSelector(state=>state.type)
  let pokemon = useSelector(state=>state.pokemon)
  let searching = useSelector(state=>state.searching)
  
  let [page, setPage] = useState(0)

    

  if(searching){
    pokemon = pokemon.filter((el)=>{
      return el.name.includes(searching)
    })
  }

  if (type){ 
    pokemon = tipos(type, pokemon)}
    
  if (order){ 
    pokemon = ordered(order, pokemon);}

  
  const pagination = () => {
      if (pokemon.length) return pokemon.slice(page, page + 11);
      return [];
    };

  const array = pagination();

  const nextPage = () => {
    if (pokemon.length > page + 11) {
      setPage(page + 11);
    }
  };
  
  const previusPage = () => {
    if (page > 0) {
      setPage(page - 11);
    }
  };
  
  while(pokemon[0]===undefined){
    if(type||searching){
      return <h2>No pokemon found on this lot... Use the search by name feature to look for other pokemon.</h2>
    }

    return(
      <img src="https://i.gifer.com/4OKl.gif" className="loadingAnimation" />
    )
  }

    return (
        <div>
          <div className={style.cards}>
            {array && array.map(({name, types, id, img})=>{
                return(
                    <PokemonCard 
                    name={name}
                    id={id}
                    key={id}
                    img={img} 
                    types={types} 
                    />
                )
            })}
          </div>
            <div className={pag_style.pagination}>
              <button onClick={previusPage} className={pag_style.pagination_button}>
                &laquo; Previus
                </button>
                <button onClick={nextPage} className={pag_style.pagination_button}>
                Next &raquo;
              </button>
            </div>
          </div>
  

    )
  }

  export default Pokemon;

