import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react'
import { IPizza } from '../modules/pizza';
import  Navbar  from '../../features/Navbar';
import PizzaDashboard  from '../../features/pizza/PizzaDashboard';
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent';
import PizzaAdminStore from '../stores/pizzaAdminStore'
import {observer} from 'mobx-react-lite'


const App =()=>{
 const pizzaAdminStore= useContext(PizzaAdminStore)
 useEffect(()=>{
   pizzaAdminStore.loadPizza()
 },[pizzaAdminStore])

 if (pizzaAdminStore.loadingInitial) return <LoadingComponent content='Loading...'/>
    return (
      <Fragment>
        <Navbar/>
          <Container style={{marginTop: '7em'}}>
            <PizzaDashboard />
          </Container>
     </Fragment>
  );
}

export default observer(App);
