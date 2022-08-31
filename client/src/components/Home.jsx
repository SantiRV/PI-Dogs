import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../actions";

import Card from "./Card";
import Pagination from './Pagination';
import NavBar from './NavBar';


import "../styles/Home.css";


function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  //para paginado
  const dogsPerPage = 8; // revision set
  const length = allDogs?.length;
  const [currentPage, setCurrentPage] = useState(1); // setea al ejecutarse la f() paginado
  const indexLastDog = currentPage * dogsPerPage; // obtiene el ultimo perro que debe renderizar la pagina actual
  const indexFirstDog = indexLastDog - dogsPerPage; // obtiene el primer perro que debe renderizar la pagina actual 
  const currentDogs = allDogs?.slice(indexFirstDog, indexLastDog); //del arr con todos los perros, corta solo los que deberia mostrar en la pagina indicada.
  
  const [, setOrden] = useState("");
  const [, setError] = useState(false);


  //funcion que me devuelve el numero actual de la pagina en que estoy
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
    //Me traigo del estado los perros cuando el componente se monta:
    useEffect(() => { //useEfect simula los ciclos de vida de los estados locales.
        dispatch(getDogs()); // Este dispatch es lo mismo que hacer el mapDispatchToProps
        dispatch(getTemperaments())
        .catch((error) => setError(error.message));
    }, [dispatch]) //El segundo parametro del useEffect es un array donde va todo de lo que depende el useEffect para ejecutarse.

    return (
        <>
          <>
            <NavBar pagina={setCurrentPage} set={setOrden}/>
          </>
          <Pagination 
            dogsPerPage={dogsPerPage}
            allDogs={length}
            currentPage={currentPage}
            paginado={pagination}
          />
          <div className="card-home">
            {currentDogs?.map((d) => {
              return (
                <Card
                  key={d.id}
                  id={d.id}
                  name={d.name}
                  image={d.image}
                  temperament={
                    d.temperament ? (
                      d.temperament
                    ) : d.temperaments ? (
                      d.temperaments.map((t) => t.name + " ")
                    ) : (
                      <></>
                    )
                  }
                  weight={d.weight ? d.weight[0] : d.weight_min}
                />
              ); // le paso siempre el peso minimo
            })}
          </div>
          <Pagination 
            dogsPerPage={dogsPerPage}
            allDogs={length}
            currentPage={currentPage}
            paginado={pagination}
          />
        </>
      )
    }

  export default Home