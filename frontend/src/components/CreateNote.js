import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class CreateNote extends Component {

    state = {
        title: '',
        content: '',
        date: new Date(),
        priority:'',
        userSelected: '',
        users: [],
        editing: false,
        _id: ''
    }
    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedNote = {
                title: this.state.title,
                content: this.state.content,
                author: this.state.userSelected,
                date: this.state.date,
                priority: this.state.priority
            };
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, updatedNote);
        } else {
            const newNote = {
                title: this.state.title,
                content: this.state.content,
                author: this.state.userSelected,
                date: this.state.date,
                priority: this.state.priority
            };
            axios.post('http://localhost:4000/api/notes', newNote);
        }
        window.location.href = '/';

    }
    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/users');
        if (res.data.length > 0) {
            this.setState({
                users: res.data.map(user => user.username),
                userSelected: res.data[0].username
            })
        }
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);
            console.log(res.data)
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                userSelected: res.data.author,
                priority: res.data.priority,
                _id: res.data._id,
                editing: true
            });
        }
    }

   

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({ date });
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create a Note</h4>
                    
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.userSelected}
                                onChange={this.onInputChange}
                                name="userSelected"
                                required>
                                {
                                    this.state.users.map(user => (
                                        <option key={user} value={user}>
                                            {user}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                       
                        <div className='form-group'>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            name="title"
                            onChange={this.onInputChange}
                            
                            required
                            />

                        </div>
                        <div className='form-group'>
                            <textarea
                           name="priority"
                            className="form-control"
                            placeholder="Priority Number"
                            onChange={this.onInputChange}
                            required>
                            </textarea>

                        </div>
                        <div className='form-group'>
                            <textarea
                           name="content"
                            className="form-control"
                            placeholder="content"
                            onChange={this.onInputChange}
                            required>
                            </textarea>

                        </div>
                        <div className="form-group">
                            <DatePicker
                                className="form-control"
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div> 

                        <form onSubmit={this.onSubmit}>
                            <button type="submit" className="btn btn-primary">
                                save
                            </button>
                        </form>
                        </div>
                        </div>
                        
        )
    }
}
