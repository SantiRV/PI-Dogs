import React from "react";
import Order from "./Order";
import ByTemperament from "./ByTemperament";
import Created from "./Created";

function Filters({ pagina, set }) {
  return (
      <div className="container_filters">
        <div className="filters">
          <Order pagina={pagina} set={set} />
        </div>
        <div className="filters">
          <ByTemperament pagina={pagina}/>
        </div>
        <div className="filters">
          <Created />
        </div>
      </div>
  );
}

export default Filters;