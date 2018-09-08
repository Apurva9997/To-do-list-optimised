import React from 'react'
import {Clock} from 'react-live-clock'

class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isAuthenticated:'false',
            tododata:[]
        }
    }
    render(){
        return(
            <div>
                {
                    this.state.isAuthenticated==='false'?window.location.replace('/login'):null
                }
            </div>
        )
    }
}

export default App