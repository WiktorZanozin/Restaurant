import React from 'react'
import { Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const HomeAdminPage = () => {
    return (
        <Container style={{marginTop:'7em'}}>
            <h1>HomeAdminPage</h1>
            <h3>Go to <Link to='/pizzaAdmin'>Pizza</Link></h3>
        </Container>
    )
}

export default HomeAdminPage