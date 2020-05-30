import React, { useState, ChangeEvent, FormEvent, SyntheticEvent } from 'react'
import { Modal, Button, Input, Checkbox, List, Form, Image, Dropdown } from 'semantic-ui-react'
import { IPizza } from '../../app/modules/pizza'
import { pizzaCategory } from '../../app/modules/pizzaCategory'
import {v4 as uuid} from 'uuid'

interface IProps{
    pizza:IPizza | null;
    editMode:boolean;
    setEditMode: (editMode:boolean)=>void;
    editPizza: (pizza:IPizza)=>void;
    createPizza: (pizza: IPizza) => void;
    setSelectedPizza: (activity: IPizza | null) => void;
}

const options = [
    { key: 0, text: 'Classic', value: 0 },
    { key: 1, text: 'Ours', value: 1 },
    { key: 2, text: 'Premium', value: 2 },
  ]
export const PizzaForm :React.FC<IProps>  = ({pizza:initialFormState, editPizza, editMode, setEditMode, createPizza, setSelectedPizza}) => {
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
    const[pizza, setPizza]= useState<IPizza>(initializeForm)
    const handleInputChange=(event:any)=>{
    console.log(event.target.value)
     const{name, value}=event.currentTarget
     setPizza({...pizza, [name]:value});
    }

    const handleCheckBoxChange=(event:any)=>{
       // console.log(event.target.value)
         const{name, value}=event.currentTarget
         console.log(event.currentTarget)
         setPizza({...pizza, [name]:value});
        }
     
    const handleSubmit=()=>{
        if(pizza.id.length===0){
            let newPizza={
                ...pizza,
                id:'guid'
            };
            createPizza(newPizza);
        }
            else{
                editPizza(pizza);
                setEditMode(false);
                setSelectedPizza(null);
            }
        }
    
    return (
        <Modal
          open={editMode}
          size='small'
          dimmer
          closeIcon
        >
        <Modal.Header>{`Edit information about ${pizza.name}`}</Modal.Header>
        <Modal.Content>
        <Form onSubmit={handleSubmit}>
            <Form.Field>
             <Image src='./assets/placeholder.png' size='big' centered/>
            </Form.Field>
            <Form.Input 
               name='name'
               fluid label='Pizza Name'
               onChange={handleInputChange} 
               value={pizza.name} />
            <Form.TextArea
               name='description'
               fluid label='Description'
               onChange={handleInputChange}
                value={pizza.description} />
            <Form.Input 
               name='priceForSmall'
               fluid label='Price for small pizza'
               onChange={handleInputChange}
               value={pizza.priceForSmall.valueOf()}/>
            <Form.Input
               name='priceForLarge'
               fluid label='Price for large pizza'
               onChange={handleInputChange}
                value={pizza.priceForLarge.valueOf()}/>
            <Form.Input
               name='priceForXXL'
               fluid label='Price for XXL pizza'
               onChange={handleInputChange}
               value={pizza.priceForXXL.valueOf()}/>
            <Form.Select
               name='pizzaCategory'
               fluid label='Category'
               selection
               options={options}
               onChange={handleInputChange}
               placeholder={pizzaCategory[pizza.pizzaCategory]}
               value
               />
            <Form.Checkbox 
               name='isAvailable'
               label='Available' 
               onChange={handleCheckBoxChange}
               defaultChecked={pizza.isAvailable} 
               />

        <Modal.Actions>
            <Button 
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
