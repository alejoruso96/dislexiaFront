import React, { useEffect, useState} from "react";
 


function useDatos() {
    const [palabras, setPalabras] = useState([])
   
    useEffect(() => {
      fetch("data/sourcelvl1.json")
        .then(response => response.json())
        .then(datos => {
          setPalabras(datos)
        })
    }, [])
   
    return palabras
  }

export default function Datos() {
 
    
    const palabra = useDatos()
   
    return (
   
        <div className="container mt-5" align="center">
      
        <h4>Lista de palabras</h4>
          
        <div className="row">
   
          <div className="col-md-12">
   
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  
                  <th scope="col">Palabra</th>
              
                </tr>
              </thead> 
              <tbody>
   
              {palabra.map(item => (
   
                <tr key={item.id}>
                  <td>{item.completeword}</td>
                 
                </tr>
   
              ))}
   
              </tbody>
   
            </table>
   
          </div>
   
        </div>
   
    
          
      </div>
   
    )
   
           
  }

