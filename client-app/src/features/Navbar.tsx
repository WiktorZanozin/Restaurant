import React, { useContext } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import PizzaAdminStore from '../app/stores/pizzaAdminStore'
import { Link, NavLink } from 'react-router-dom'

const Navbar:React.FC = () =>{
const pizzaAdminStore = useContext(PizzaAdminStore);
return(
 <Menu fixed='top' inverted>
  <Container>
    <Menu.Item header as={NavLink} exact to='/'>
      <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
    </Menu.Item>
    <Menu.Item name='Pizza' as={NavLink} to='/pizzaAdmin' />
    <Menu.Item>
      <Button positive content='Create Pizza Item' onClick={pizzaAdminStore.openCreateForm} />
    </Menu.Item>
  </Container>
</Menu>
)}
export default observer(Navbar)