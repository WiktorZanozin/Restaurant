import React, { useContext } from 'react'
import { Grid, Container, List, Segment } from 'semantic-ui-react'
import { IPizza } from '../../app/modules/pizza'
import  PizzaItem  from './PizzaItem'
import  PizzaForm  from './PizzaForm'
import { observer } from 'mobx-react-lite'
import PizzaAdminStore from '../../app/stores/pizzaAdminStore'



const PizzaDashboard:React.FC = () => {
  const pizzaAdminStore=useContext(PizzaAdminStore)
  const{editMode, selectedPizza, pizzaAdminRegistry}=pizzaAdminStore
  return(
  <Grid columns={3} >
    <Grid.Row>
      { Array.from(pizzaAdminRegistry.values()).map((pizzaItem: any) => <Grid.Column key={pizzaItem.id}>
        <Segment>
           <PizzaItem  pizzaItem={pizzaItem}/>
          </Segment>
      </Grid.Column>
      )}
      {editMode &&
        <PizzaForm pizzaItem={selectedPizza} />}
    </Grid.Row>
  </Grid>
  )}
export default observer(PizzaDashboard)