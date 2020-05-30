import React from 'react'
import { Grid, Container, List } from 'semantic-ui-react'
import { IPizza } from '../../app/modules/pizza'
import { PizzaItem } from './PizzaItem'
import { PizzaForm } from './PizzaForm'



interface IProps{
    pizzas:IPizza[];
    selectPizza:(id:string)=>void;
    selectedPizza:IPizza | null;
    editMode:boolean;
    deletePizza:(id:string)=>void;
    setEditMode: (editMode:boolean)=>void;
    editPizza: (pizza:IPizza)=>void;
    createPizza:(pizza:IPizza)=>void;
    setSelectedPizza: (activity: IPizza | null) => void;
}

export const PizzaDashboard:React.FC<IProps> = ({
  pizzas,
  selectPizza,
  selectedPizza,
  editMode,
  setEditMode,
  editPizza,
  createPizza,
  setSelectedPizza,
  deletePizza
}) => {
    return (
    <Grid columns={3} divided>
     <Grid.Row>
      {pizzas.map((pizza:any)=>
        <Grid.Column key={pizza.id}>
          <PizzaItem pizza={pizza} 
             editMode={editMode}
             setEditMode={setEditMode}
             editPizza={editPizza}
             createPizza={createPizza}
             selectPizza={selectPizza}
             deletePizza={deletePizza} />
        </Grid.Column>
      )}
       {editMode&&
      <PizzaForm 
         pizza={selectedPizza} 
         editPizza={editPizza} 
         editMode={editMode} 
         setEditMode={setEditMode}
         createPizza={createPizza}
         setSelectedPizza={setSelectedPizza}/>}
      </Grid.Row>
    </Grid>
    )
}
