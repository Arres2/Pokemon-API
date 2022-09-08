import React from "react";
import Pokemon from "../../components/Pokemon/Pokemon";
import SidePanel from "../../components/SidePanel/SidePanel";
import style from "./Home.module.css"

// import style from "./Home.module.css"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPokemon, getTypes } from "../../redux/actions";


function useQuery() {

    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  
const Home = ()=>{
    
    let dispatch = useDispatch()

    let query = useQuery();
    let name = query.get("name")    

    

    useEffect(()=>{
        dispatch(getPokemon(name))
        dispatch(getTypes())
    },[dispatch,name])

    return (
        <home>
            <SidePanel/>
            <Pokemon/>
        </home>
    )
}

export default Home