import React, { useState, useEffect, Fragment } from 'react';
import { Header, Icon, List, Container } from 'semantic-ui-react'
import axios from 'axios';
import { IPizza } from '../modules/pizza';
import { Navbar } from '../../features/Navbar';
import { PizzaDashboard } from '../../features/pizza/PizzaDashboard';

interface IState{
  pizzas:IPizza[]
}

const App =()=>{
 const [pizzas, setPizzas]=useState<IPizza[]>([]);
 const[selectedPizza, setSelectedPizza]=useState<IPizza | null>(null);
 const[editMode, setEditMode]=useState(false);
 
 const handleOpenCreateForm = () => {
  setEditMode(true);
}
const handleSelectedPizza=(id:string)=>{
  setSelectedPizza(pizzas.filter(p=>p.id===id)[0]);
}
const handleEditPizza=(pizza:IPizza)=>{
  setPizzas([...pizzas.filter(p=>p.id!==pizza.id), pizza])
  setEditMode(false)
}
const handleCreatePizza=(pizza:IPizza)=>{
  setPizzas([...pizzas, pizza])
  setEditMode(false)
}
const handleDeletePizza=(id:string)=>{
  setPizzas([...pizzas.filter(p => p.id !== id)])
}

 useEffect(()=>{
  axios
   .get<IPizza[]>('https://localhost:44394/api/pizza')
   .then((response)=>{
    console.log(response)
    setPizzas(response.data)
    })
 },[])

    return (
      <Fragment>
        <Navbar openCreateForm={handleOpenCreateForm}/>
          <Container style={{marginTop: '7em'}}>
            <PizzaDashboard 
            pizzas={pizzas}
            selectPizza={handleSelectedPizza}
            selectedPizza={selectedPizza}
            editMode={editMode}
            setEditMode={setEditMode}
            editPizza={handleEditPizza}
            createPizza={handleCreatePizza}
            deletePizza={handleDeletePizza}
            setSelectedPizza={setSelectedPizza}
            />
          </Container>
     </Fragment>
  );
}


export default App;
