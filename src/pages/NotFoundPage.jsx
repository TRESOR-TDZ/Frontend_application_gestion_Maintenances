import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage (){
    return(
        <div className="text-center m-5">
            <h1> 404 </h1>
            <h2> Page non trouvee </h2>
            <p> Desole, la page que vous cherchez n'existe pas. </p>
            <Link to="/Dashboard"> Retour a la page d'accueil</Link>
        </div>
    );
};

export default NotFoundPage;
