import React, { useContext } from 'react'
import { Item, Label, Button } from 'semantic-ui-react'
import { IPizza } from '../../app/modules/pizza'
import { pizzaCategory } from '../../app/modules/pizzaCategory'
import { observer } from 'mobx-react-lite'
import PizzaAdminStore from '../../app/stores/pizzaAdminStore'

interface IProps{
    pizzaItem:IPizza
}

const PizzaItem:React.FC<IProps> = ({pizzaItem}) => {
  const pizzaAdminStore=useContext(PizzaAdminStore)
  const{ openEditForm, submitting, deletePizza, target}=pizzaAdminStore
    return (
             <Item>
               <Item.Image src='./assets/placeholder.png' size='small' />
                <Item.Content>
                 <Item.Header as='a'>{pizzaItem.name}</Item.Header>
                  <Item.Meta>
                    <span>{pizzaItem.priceForSmall}/{pizzaItem.priceForLarge}/{pizzaItem.priceForXXL}$</span>
                  </Item.Meta>
                   <Item.Description>{pizzaItem.description}</Item.Description>
                   <Label basic content={pizzaCategory[pizzaItem.pizzaCategory]} />
                 <Item.Extra>
                 <Button.Group float='left' widths={1}>
                 <Button   loading={target === pizzaItem.id && submitting}
                  onClick={(e) => deletePizza(e, pizzaItem.id)} content='Delete' color='red'/>
                 <Button  onClick={()=>openEditForm(pizzaItem!.id)} content='View' color='green'/>
                 </Button.Group>
               </Item.Extra>
             </Item.Content>
           </Item>   
    )
}
export default observer(PizzaItem)