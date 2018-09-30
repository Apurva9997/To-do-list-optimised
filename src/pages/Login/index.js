import React from 'react'
import './index.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signup_enabled: false,
            username: '',
            password: '',
            confirmpassword: '',
            errorenable: false,
            errormessage: '',
        }
    }

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value})
    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value})
    }
    handleconfirmPasswordChange = (e) => {
        this.setState({confirmpassword: e.target.value})
    }
    createAccount = () => {
        this.setState({signup_enabled: true})
    }
    handleLoginRequest = () => {
        let usernamein = this.state.username
        let passwordin = this.state.password
        if (usernamein !== null && usernamein !== '' && passwordin !== null && passwordin !== '') {
            let username = localStorage.getItem("username")
            let password = localStorage.getItem("password")
            if (username === usernamein && password === passwordin) {
                this.setState({errorenable: true, errormessage: 'Welcome'})
                localStorage.setItem("isAuthenticated",'true');
                window.location.replace('/')
            }
            else {
                this.setState({errorenable: true, errormessage: 'Username or Password is incorrect'})
                window.location.replace('./Login')
            }
        }
        else {
            this.setState({errorenable: true, errormessage: 'All the fields are mandatory'})
        }
    }
    handleSignupRequest = () => {
        let username = this.state.username
        let password = this.state.password
        let confirmpassword = this.state.confirmpassword
        if (username !== null && username !== '' && password !== null && password !== '' && confirmpassword !== null && confirmpassword !== '') {
            if (password === confirmpassword) {
                localStorage.setItem("username", this.state.username)
                localStorage.setItem("password", this.state.password)
                this.setState({errorenable: true})
                this.setState({errormessage: 'Sign Up Successful'})
                window.location.replace('./Login')

            }
            else {
                this.setState({errorenable: true})
                this.setState({errormessage: 'Password Mismatch!'})
                window.location.replace('./Login')
            }
        }
        else {
            this.setState({errorenable: true})
            this.setState({errormessage: 'All the fields are mandatory'})
        }
    }

    render() {
        return (
            <div>
                <div id="table-container">
                    {
                        this.state.errorenable ? <p>{this.state.errormessage}</p> : null
                    }
                    {/*
                <Box
                    p={3}
                    mx={2}
                    my={4}
                    >
                    color='white' bg='blue'                </Box>*/}
                    <table>
                        <tr>
                            <td>
                                <label htmlFor="username">Username</label></td>
                            <td><input type="text" id="username" onChange={this.handleUsernameChange}/></td>
                        </tr>
                        <tr></tr>
                        <tr></tr>
                        <tr></tr>
                        <tr>
                            <td><label htmlFor="password">Password</label></td>
                            <td><input type="password" id="password" onChange={this.handlePasswordChange}/></td>
                        </tr>
                        <tr></tr>
                        <tr></tr>
                        <tr></tr>
                        {this.state.signup_enabled ? <tr>
                            <td><label htmlFor="password" onChange={this.handleconfirmPasswordChange}>Confirm
                                Password</label></td>
                            <td><input type="password" id="password"/></td>
                        </tr> : null
                        }
                        {this.state.signup_enabled ? null : <tr>
                            <td></td>
                            <td>
                                <button onClick={() => this.handleLoginRequest()}>Login</button>
                            </td>
                        </tr>
                        }
                        {
                            this.state.signup_enabled ? <tr>
                                <td></td>
                                <td>
                                    <button onClick={() => this.handleSignupRequest()}>Signup</button>
                                </td>
                            </tr> : null
                        }
                        <tr>
                            <td></td>
                            <td>
                                <p id="signup_button" onClick={this.createAccount}>Don't have an account</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}

export default App