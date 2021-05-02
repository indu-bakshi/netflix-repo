import React from 'react'
import Header from './components/Header/Header'
import SimpleBottomNavigation from './components/Navigation/Navigation'
import './app.css'
import { Container } from '@material-ui/core'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Movies from './components/Pages/Movies/Movies'
import Search from './components/Pages/Search/Search'
import Trending from './components/Pages/Trending/Trending'
import Series from './components/Pages/Series/Series'

const App = () => {
    return (
        <>
        <BrowserRouter>
          <Header/>
          <div className="app">
              <Container>
                <Switch>
                    <Route path='/' component ={Trending} exact/>
                    <Route path='/movies' component ={Movies}/>
                    <Route path='/series' component ={Series}/>
                    <Route path='/search' component ={Search}/>
                </Switch>
                </Container>
            </div> 
            <SimpleBottomNavigation/>
            </BrowserRouter>
        </>
    )
}

export default App