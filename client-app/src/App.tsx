import React, { Component } from 'react';
import { Header, Icon, List } from 'semantic-ui-react'
import './App.css';
import axios from 'axios';

class App extends Component{
  state={
    values:[]
  }

  componentDidMount(){
      axios.get('https://localhost:44394/api/values')
        .then((response)=>{
          console.log(response)
          this.setState({
            values:response.data
          })
         })
  
 }

  render(){
    return (
      <div>
        <Header as='h2'>
          <Icon name='plug' />
          <Header.Content>Pizza Restaurant</Header.Content>
        </Header>
        <List>
          {this.state.values.map((value:any)=>
          <List.Item key={value.id}>{value.name}</List.Item>)}
        </List>
     </div>
  );
}
}

export default App;