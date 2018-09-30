import React from 'react'
import './index2.css'
import Clock from 'react-live-clock'
import uuid from 'uuid/v4'


class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isAuthenticated:localStorage.getItem("isAuthenticated"),
            list_of_tasks: [],
            newStatus: '',
            newTask: '',
            time: ''
        }
        if(Notification.permission!=='granted'){
            Notification.requestPermission()
        }
    }
    componentWillMount() {
        if (localStorage.getItem('tododata') != null) {
            let data = JSON.parse(localStorage.getItem('tododata'))
            this.setState({
                list_of_tasks: data
            })
        }
    }


    getTime() {
        var time = (String(new Date())).substring(16, 25)
        return time
    }

    handleLogout = () => {
        localStorage.setItem("isAuthenticated",'false')
        window.location.replace('/')
    }
    handleMark = (id) => {
        var currentArray = this.state.list_of_tasks
        var length = currentArray.length
        for(var i=0;i<length;i++){
            //console.log(currentArray[i].id,id)
            if(currentArray[i].id === id){
                currentArray[i].status = 'COMPLETE'
                break
            }
        }
        this.setState({list_of_tasks:currentArray})
        let data = JSON.stringify(this.state.list_of_tasks)
        localStorage.setItem('tododata', data)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(this.state.newTask!='' && this.state.newTask!=null) {
            let newObj = {
                id:uuid(),
                task: this.state.newTask,
                status: this.state.newStatus,
                time: this.state.newTime
            }
            this.setState({
                list_of_tasks: [...this.state.list_of_tasks, newObj],
                newTask: ''
            })
            let data = JSON.stringify(this.state.list_of_tasks)
            if (Storage) {
                localStorage.setItem("tododata", data)
            }
        }
    }
    handleToDo = (event) => {
        this.setState({
            newTask: event.target.value,
            newStatus: 'Incomplete',
            newTime: this.getTime()
        })
    }
    handleDelete = (id) => {
        var currentArray = this.state.list_of_tasks
        var length = currentArray.length
        for(var i=0;i<length;i++){
            //console.log(currentArray[i].id,id)
            if(currentArray[i].id === id){
                currentArray.splice(i,1)
                break
            }
        }
        this.setState({list_of_tasks:currentArray})
        let data = JSON.stringify(this.state.list_of_tasks)
        localStorage.setItem('tododata', data)
    }
    render(){
        return(
            <div>
                {
                    this.state.isAuthenticated==='false'?window.location.replace('/Login'):null
                }
                <div id="timeBar">
                    <h2><Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Calcutta'}/></h2>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
                <div className="to_do_list">
                    <div className="main-input-container">
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="to_do" className="label-main-todo-table">Add task</label>
                        <input id="to_do" className="to-do-main-input" value={this.state.newTask} onChange={this.handleToDo}/>
                        <br/>
                        <input className="to-do-submit" type="submit" value='Submit'/>
                    </form>
                    </div>
                    <table className="to-do-table">
                        <tr>
                            <td>S.no</td>
                            <td>Task</td>
                            <td>Status</td>
                            <td>Time added</td>
                            <td>Set timer</td>
                            <td>Mark completed</td>
                            <td>Delete Task</td>
                        </tr>
                        {
                            this.state.list_of_tasks.map((sublist, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index}
                                        </td>
                                        <td>{sublist.task}
                                        </td>
                                        <td className="status">{sublist.status}
                                        </td>
                                        <td>{sublist.time}
                                        </td>
                                        <td>
                                            <button id="setTimer" onClick={() => this.handleMark(sublist.id)}>Set Timer
                                            </button>
                                        </td>
                                        <td>
                                            <button id="markButton" onClick={() => this.handleMark(sublist.id)}>Mark as
                                                completed
                                            </button>
                                        </td>
                                        <td>
                                            <button id="deleteButton" onClick={() => this.handleDelete(sublist.id)}>Delete this
                                                task
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        )
    }
}

export default App