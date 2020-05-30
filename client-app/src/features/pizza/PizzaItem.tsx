import React from 'react'
import { Segment, Item, Label, Button } from 'semantic-ui-react'
import { IPizza } from '../../app/modules/pizza'
import { pizzaCategory } from '../../app/modules/pizzaCategory'
import {  PizzaForm } from './PizzaForm'

interface IProps{
    pizza:IPizza
    selectPizza:(id:string)=>void;
    setEditMode: (editMode:boolean)=>void;
    editPizza: (pizza:IPizza)=>void;
    editMode:boolean;
    createPizza:(pizza:IPizza)=>void;
    deletePizza:(id:string)=>void;
}


export const PizzaItem:React.FC<IProps> = ({pizza, editMode, editPizza, setEditMode, createPizza, selectPizza, deletePizza}) => {
    return (
             <Item>
               <Item.Image src='./assets/placeholder.png' size='small' />
                <Item.Content>
                 <Item.Header as='a'>{pizza.name}</Item.Header>
                  <Item.Meta>
                    <span>{pizza.priceForSmall}/{pizza.priceForLarge}/{pizza.priceForXXL}$</span>
                  </Item.Meta>
                   <Item.Description>{pizza.description}</Item.Description>
                 <Item.Extra>
                 <Label basic content={pizzaCategory[pizza.pizzaCategory]} />
                 <Button.Group float='right' widths={2}>
                 <Button  onClick={()=>{deletePizza(pizza.id)}} content='Delete' color='red'/>
                 <Button  onClick={()=>{setEditMode(true); selectPizza(pizza.id)}} content='View' color='green'/>
                 </Button.Group>
               </Item.Extra>
             </Item.Content>
           </Item>   
    )
}
