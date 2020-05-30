import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import { IPizza } from '../app/modules/pizza'

interface IProps{
  openCreateForm:()=>void;
}
export const Navbar:React.FC<IProps> = ({openCreateForm}) =>
 <Menu fixed='top' inverted>
  <Container>
    <Menu.Item name='editorials'>
      <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
    </Menu.Item>
    <Menu.Item name='Pizza' />
    <Menu.Item>
      <Button positive content='Create Pizza Item' onClick={openCreateForm} />
    </Menu.Item>
  </Container>
</Menu>
