import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getPokemon, getTypes } from "../../redux/actions/index.js";
import style from "./CreatePokemon.module.css";
import { Link } from "react-router-dom";

const CreatePokemon = () => {
  const dispatch = useDispatch();
  const options = useSelector((store) => store.types);
  const [dragActive, setDragActive] = React.useState(false);
  const [data, setData] = useState({
    name: "",
    vida: 0,
    fuerza: 0,
    defensa: 0,
    velocidad: 0,
    altura: 0,
    peso: 0,
    img:"",
    tipos: [],
  });

  const [errors, setErrors] = useState({});

  if(options[0]===undefined){
  dispatch(getTypes())}

  const validate = (input) => {
    let errors = {};
    if (!input.name) {
      errors.name = "El name es obligatorio";
    }

    return errors;
  };


  const handleInputChange = (e) => {
    if (e.target.name !== "name") {
      setData({
        ...data,
        [e.target.name]: Number(e.target.value) <= 0 ? 0 : e.target.value,
      });
    } else {
      setErrors(
        validate({
          ...data,
          [e.target.name]: e.target.value,
        })
      );
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const checkbox = (e) => {
    if (data.tipos.includes(e.target.value)) {
      data.tipos = data.tipos.filter((id) => id !== e.target.value);
      setData({
        ...data,
        tipos: data.tipos,
      });
    } else {
      setData({
        ...data,
        tipos: [...data.tipos, e.target.value],
      });
    }
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(createPokemon(data))
    dispatch(getPokemon());
    setData({
      name: "",
      vida: 0,
      fuerza: 0,
      defensa: 0,
      velocidad: 0,
      altura: 0,
      peso: 0,
      tipos: [],
    });
  };

  return (
    <div className={style.containerCreate}>
      <form action="POST" className={style.form} onSubmit={submit}>
        <div className={style.container}>
          <div className={style.separado}>
            <h1>Crea tu propio Pokemon</h1>
            <p className={errors.name ? style.danger : style.question}>
              <label>Pokemon name</label>
              <input
                type="text"
                placeholder="pikachu.."
                name="name"
                value={data.name}
                onChange={handleInputChange}
                required
              />
            </p>
            {errors.name ? <p className="danger">{errors.username}</p> : null}
            <p className={style.question}>
              <label>Vida</label>
              <input
                type="number"
                name="vida"
                value={data.vida}
                onChange={handleInputChange}
              />
            </p>
            <p className={style.question}>
              <label>Fuerza</label>
              <input
                type="number"
                name="fuerza"
                value={data.fuerza}
                onChange={handleInputChange}
              />
            </p>
            <p className={style.question}>
              <label>Defensa</label>
              <input
                type="number"
                name="defensa"
                value={data.defensa}
                onChange={handleInputChange}
              />
            </p>
            <p className={style.question}>
              <label>Velocidad</label>
              <input
                type="number"
                name="velocidad"
                value={data.velocidad}
                onChange={handleInputChange}
              />
            </p>
            <p className={style.question}>
              <label>Altura</label>
              <input
                type="number"
                name="altura"
                value={data.altura}
                onChange={handleInputChange}
              />
            </p>
            <p className={style.question}>
              <label>Peso</label>
              <input
                type="number"
                name="peso"
                value={data.peso}
                onChange={handleInputChange}
              />
            </p>
            <div className={style.form_file_upload} onDragEnter={handleDrag}>
              <input type="file" className={style.input_file_upload} multiple={false} />
              <label id={style.label_file_upload} htmlFor="input_file_upload" className={dragActive ? style.drag_active : "" }>
                <div>
                  <p>Drag and drop your file here or</p>
                  <button className={style.upload_button}>Upload a file</button>
                </div> 
              </label>
            </div>
            <input type="submit" value="Crear" className={style.submit} />
          </div>
          <div className={style.hiddenCB}>
            <h1>Tipos</h1>
            <div className={style.tipos}>
              {options?.map((t) => (
                <div key={t}>
                  <input
                    type="checkbox"
                    name={t}
                    value={t}
                    id={t}
                    onChange={checkbox}
                  />
                  <label htmlFor={t}>{t}</label>
                  {t.slot % 4 === 0 ? <br /> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
      <div className={style.pagination}>
        <Link to="/pokemon">
          <button className={style.pagination_button}>Back</button>
        </Link>
      </div>
    </div>
  );
};

export default CreatePokemon;