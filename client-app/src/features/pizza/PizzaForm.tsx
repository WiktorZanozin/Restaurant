import React, { useState, ChangeEvent, FormEvent, SyntheticEvent, useContext } from 'react'
import { Modal, Button, Input, Checkbox, List, Form, Image, Dropdown, Select } from 'semantic-ui-react'
import { IPizza } from '../../app/modules/pizza'
import { pizzaCategory } from '../../app/modules/pizzaCategory'
import PizzaAdminStore from '../../app/stores/pizzaAdminStore'
import {v4 as uuid} from 'uuid'
import { observer } from 'mobx-react-lite'

interface IProps{
    pizzaItem:IPizza | undefined;
}

const options = [
    { key: 0, text: 'Classic', value: 0 },
    { key: 1, text: 'Ours', value: 1 },
    { key: 2, text: 'Premium', value: 2 },
  ]
const PizzaForm :React.FC<IProps>  = ({pizzaItem:initialFormState}) => {
    const initializeForm=()=>{
        if(initialFormState){
            return initialFormState
        } else{
            return {
             id:'',
             name:'',
             description:'',
             priceForLarge: 0,
             priceForSmall: 0,
             priceForXXL: 0,
             pizzaCategory: 1,
             isAvailable: true
            }
        }
    }  
    //FormEvent <HTMLInputElement | HTMLTextAreaElement | HTMLS> | SyntheticEvent
    const[pizzaItem, setPizza]= useState<IPizza>(initializeForm)
    const pizzaAdminStore=useContext(PizzaAdminStore)
    const{cancelFormOpen, editPizza, createPizza, selectedPizza, editMode}=pizzaAdminStore
    const handleInputChange=(event:any)=>{
    console.log(event.target.value)
     const{name, value}=event.currentTarget
     console.log(event.currentTarget)
     setPizza({...pizzaItem, [name]:value});
    }

    const handleCheckBoxChange=(event:React.FormEvent<HTMLInputElement>)=>{
        // const{name, value}=event.currentTarget
         //console.log(event.currentTarget.firstChild!.getAttribute("value"))
         setPizza({...pizzaItem, isAvailable:event.currentTarget.checked});
    }
    const handleNumberInput=(event:React.FormEvent<HTMLInputElement>)=>{
        const{name, value}=event.currentTarget
        console.log(event.currentTarget)
        setPizza({...pizzaItem, [name]:parseFloat(value)});
    }


        const handleDropdownListChange=(event: React.SyntheticEvent<HTMLElement>)=>{
           const item=event.currentTarget.lastChild?.firstChild?.textContent?.toString()
            setPizza({...pizzaItem, pizzaCategory:options.find((o)=>o.text===item)!.value})
            console.log(pizzaItem.pizzaCategory)
           }
        
    const handleSubmit=()=>{
        if(pizzaItem.id.length===0){
            let newPizza={
                ...pizzaItem,
                id: uuid()
            };
            createPizza(newPizza);
        }
            else{
                editPizza(pizzaItem);
            }
        }
     
       
    return (
        <Modal
          open={editMode}
          size='small'
          dimmer='blurring'
          closeIcon
        >
        {selectedPizza?
        (<Modal.Header>{`Edit information about ${pizzaItem.name}`}</Modal.Header>):
        (<Modal.Header>Create New Pizza</Modal.Header>)}
        <Modal.Content>
        <Form onSubmit={handleSubmit}>
            <Form.Field>
             <Image src='./assets/placeholder.png' size='big' centered/>
            </Form.Field>
            <Form.Input 
               name='name'
               fluid label='Pizza Name'
               onChange={handleInputChange} 
               value={pizzaItem.name} />
            <Form.TextArea
               name='description'
               fluid label='Description'
               onChange={handleInputChange}
                value={pizzaItem.description} />
            <Form.Input 
               name='priceForSmall'
               fluid label='Price for small pizza'
               onChange={handleNumberInput}
               value={pizzaItem.priceForSmall}/>
            <Form.Input
               name='priceForLarge'
               fluid label='Price for large pizza'
               onChange={handleNumberInput}
                value={pizzaItem.priceForLarge}/>
            <Form.Input
               name='priceForXXL'
               fluid label='Price for XXL pizza'
               onChange={handleNumberInput}
               value={pizzaItem.priceForXXL}/>
            <Form.Select
               name='pizzaCategory'
               fluid label='Category'
               options={options}
               onChange={handleDropdownListChange}
               placeholder={pizzaCategory[pizzaItem.pizzaCategory]}
               value={pizzaItem.pizzaCategory}
               />
            <Form.Checkbox 
               name='isAvailable'
               label='Available' 
               onChange={handleCheckBoxChange}
               defaultChecked={pizzaItem.isAvailable} 
               checked={pizzaItem.isAvailable}
               />

        <Modal.Actions>
            <Button 
                onClick={cancelFormOpen}
                negative
                content='Cancell'/>
             <Button 
                 positive type='submit'
                 content='Submit'/>
         </Modal.Actions>
         </Form>
        </Modal.Content>
        </Modal>
        
    )
}

export default observer(PizzaForm)