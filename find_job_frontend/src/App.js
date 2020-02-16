import React, { Component } from 'react'
import './App.css';
import {connect} from 'react-redux'
import {setAPIKeys} from './redux/actions'
import NavBar from './containers/NavBar'
import PageLeftSideBar from './containers/PageLeftSideBar'
import MainContainer from './containers/MainContainer'




class App extends Component {
  componentDidMount() {
    setAPIKeys(this.props.dispatch)
  }
  
  render() {
    return (
      <>
        <div className='nav-bar'>
          <NavBar/>
        </div>

        <div className='row main-page'>
          <div className='column'>
              {this.props.loggedIn ?
              <PageLeftSideBar />
              :
              null
              }
          </div>

          <div className='column'>
              <MainContainer />
          </div>
      </div>
      </>
    )
  }
}


const mapStateToProps = (state) =>{
  return {
    loggedIn: state.allUserInfo.loggedIn
  }
}

export default connect(mapStateToProps)(App);