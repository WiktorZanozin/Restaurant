import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react'
import { IPizza } from '../modules/pizza';
import  Navbar  from '../../features/Navbar';
import PizzaDashboard  from '../../features/pizza/PizzaDashboard';
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent';
import PizzaAdminStore from '../stores/pizzaAdminStore'
import {observer} from 'mobx-react-lite'
import { Route, Switch } from 'react-router-dom';
import HomeAdminPage from '../../features/HomeAdminPage/HomeAdminPage';
import PizzaForm from '../../features/pizza/PizzaForm';
import NotFound from './NotFound';


const App =()=>{
 const pizzaAdminStore= useContext(PizzaAdminStore)
 useEffect(()=>{
   pizzaAdminStore.loadPizza()
 },[pizzaAdminStore])

 if (pizzaAdminStore.loadingInitial) return <LoadingComponent content='Loading...'/>
    return (
      <Fragment>
        <Route exact path='/' component={HomeAdminPage}/>
        <Route path={'/(.+)'} render={()=>(
          <Fragment>
           <Navbar/>
           <Container style={{marginTop: '7em'}}>
             <Switch>
               <Route path='/pizzaAdmin' component={PizzaDashboard}/>
               <Route path={['/createPizza', '/manage/:id']} component={PizzaForm}/>
                <Route component={NotFound}/>
             </Switch>
           </Container>
         </Fragment>
        )}/>
     </Fragment>
  );
}

export default observer(App);
