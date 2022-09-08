import React, {useState} from "react"
import style from "./SidePanel.module.css"
import { useDispatch } from "react-redux"
import { getPokemon,filterByType,order, isSearching } from "../../redux/actions"



const SidePanel = ()=>{
    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(false);


    const handleType = (e)=>{
        dispatch(filterByType(e.target.value))
        
    }

    const handleOrder = (e)=>{
        if(isChecked) {
            setIsChecked(!isChecked);
            dispatch(order(""))
        }
        else{ 
            setIsChecked(!isChecked);
            dispatch(order(e.target.value))
            
    }
    }

    const handleTyping =(e)=>{
        e.preventDefault();
        dispatch(isSearching(e.target.value))
        

    }
    
    const handleSearch =(e)=>{
        e.preventDefault();
        dispatch(getPokemon(e.target.value))
    }

    return (
    <aside>
        <form action="pokemon">
            <label>Search by name</label>
            <input type="text" name="name"  placeholder="all lowercases... " onChange={handleTyping}></input>
            <button onSubmit={handleSearch}>Search</button>
        </form>
        <label>Order from A-Z</label>
        <input type="checkbox" name="a-z" value="a-z" onChange={handleOrder} checked={isChecked}></input>
        <label>Order from Z-A</label>
        <input type="checkbox" name="a-z" value="z-a" onChange={handleOrder} checked={isChecked}></input>
        <select name="type" placeholder="" onChange={handleType}>
            <option value="">None</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="poison">Poison</option>
            <option value="grass">Grass</option>
            <option value="flying">Flying</option>
            <option value="ghost">Ghost</option>
            <option value="rock">Rock</option>
            <option value="fighting">Fighting</option>
            <option value="bug">Bug</option>
            <option value="steel">Steel</option>
            <option value="electric">Electric</option>
            <option value="psychic">Psychic</option>
            <option value="ice">Ice</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="fairy">Fairy</option>
            <option value="unknown">Unknown</option>
            <option value="shadow">Shadow</option>
        </select>
    </aside>
)}

export default SidePanel