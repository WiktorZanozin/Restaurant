import {observable,action, runInAction} from 'mobx'
import { IPizza } from '../modules/pizza'
import { createContext, SyntheticEvent } from 'react';
import agent from '../api/agent';

class PizzaAdminStore{
    @observable pizzaAdminRegistry = new Map();
    @observable pizza: IPizza[]=[]
    @observable loadingInitial=false;
    @observable selectedPizza:IPizza | undefined;
    @observable editMode=false;
    @observable submitting = false;
    @observable target = '';


    @action loadPizza=async()=>{
      this.loadingInitial=true;
      try{
        const pizza = await agent.PizzaAdmin.list();
        console.log(pizza)
        runInAction('loading pizza', ()=>
         pizza.forEach((pizzaItem) => {
          this.pizzaAdminRegistry.set(pizzaItem.id, pizzaItem);
          console.log(this.pizzaAdminRegistry)
        // this.pizza=[...pizza]
       }))
       this.loadingInitial=false
      }
      catch (error) {
        runInAction('load activities error', () => {
          this.loadingInitial = false;
        })
        throw error;
      }
    }

    @action selectPizza=(id:string)=>{
      this.selectedPizza=this.pizza.find(p=>p.id===id)
      this.editMode=false
    }
    
    @action openCreateForm = () => {
      this.editMode = true;
      this.selectedPizza = undefined;
    };

    @action openEditForm = (id: string) => {
      this.selectedPizza = this.pizzaAdminRegistry.get(id);
      this.editMode = true;
    }

    @action editPizza = async (pizzaItem: IPizza) => {
      this.submitting = true;
      try {
        await agent.PizzaAdmin.update(pizzaItem);
        runInAction('editing pizza', () => {
          this.pizzaAdminRegistry.set(pizzaItem.id, pizzaItem);
          this.selectedPizza = pizzaItem;
          this.editMode = false;
          this.submitting = false;
        })
  
      } catch (error) {
        runInAction('edit pizza error', () => {
          this.submitting = false;
        })
        console.log(error);
      }
    };

   @action createPizza = async (pizzaItem: IPizza) => {
      this.submitting = true;
      try {
        await agent.PizzaAdmin.create(pizzaItem);
        runInAction('create pizza', () => {
          this.pizzaAdminRegistry.set(pizzaItem.id, pizzaItem);
          this.editMode = false;
          this.submitting = false;
        })
      } catch (error) {
        runInAction('create pizza', () => {
          this.submitting = false;
        })
        console.log(error);
      }
    };

    @action deletePizza = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
      this.submitting = true;
      this.target = event.currentTarget.name;
      try {
        await agent.PizzaAdmin.delete(id);
        runInAction('deleting pizza', () => {
          this.pizzaAdminRegistry.delete(id);
          this.submitting = false;
          this.target = '';
        })
      } catch (error) {
        runInAction('delete pizza error', () => {
          this.submitting = false;
          this.target = '';
        })
        console.log(error);
      }
    }
    @action cancelFormOpen = () => {
      this.editMode = false;
    }
}

export default createContext(new PizzaAdminStore())