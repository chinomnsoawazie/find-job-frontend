import React, { Component } from 'react'
import './App.css';
import PageLeftSideBar from './containers/PageLeftSideBar'
import PageNavBar from './containers/PageNavBar'
import PageRightSideBar from './containers/PageRightSideBar'
import PageMainContainer from './containers/PageMainContainer'
import {setAPIKeys} from './redux/actions'
import {connect} from 'react-redux'

class App extends Component {

  componentDidMount() {
    setAPIKeys(this.props)
  }

  render() {
    return (
      <>
      <div className='nav-bar'>
        <PageNavBar/>
      </div>

        <div className='main-page row'>
          <div className='column'>
              {this.props.loggedIn ?
                <>
                <PageLeftSideBar/>
                <PageRightSideBar /> 
                </>
                : 
                null
            }
          </div>
          <div className='column'>
            <PageMainContainer/>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    loggedIn: state.allInfoOnUser.loggedIn
  }
}

export default connect(mapStateToProps)(App)