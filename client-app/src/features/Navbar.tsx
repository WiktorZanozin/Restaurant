import React, { useContext } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import { IPizza } from '../app/modules/pizza'
import { observer } from 'mobx-react-lite'
import PizzaAdminStore from '../app/stores/pizzaAdminStore'


const Navbar:React.FC = () =>{
const pizzaAdminStore = useContext(PizzaAdminStore);
return(
 <Menu fixed='top' inverted>
  <Container>
    <Menu.Item name='editorials'>
      <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
    </Menu.Item>
    <Menu.Item name='Pizza' />
    <Menu.Item>
      <Button positive content='Create Pizza Item' onClick={pizzaAdminStore.openCreateForm} />
    </Menu.Item>
  </Container>
</Menu>
)}
export default observer(Navbar)