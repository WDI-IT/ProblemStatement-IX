import React, { Component } from 'react'
import axios from 'axios'

class Add extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            desc: '',
            imgsrc: '',
            notification: ''
        }
    }

    componentDidMount() {
        console.log(this.state.name)
    }

    async submitForm(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/api/products',
            data: {
                name: this.state.name,
                desc: this.state.desc,
                imgsrc: this.state.imgsrc
            }
        })
            .then(data => {
                if (data.status === 200) {
                    this.setNotification("Data added successfully")
                    console.log("Data added successfully")
                }
            })
            .catch(err => {
                this.setNotification("Error occured")
                console.log(err);
            });
    }

    resetForm(e) {
        e.preventDefault(e);
        this.setState({
            name: '',
            desc: '',
            imgsrc: ''
        });
    }

    setNotification(msg) {
        this.setState({ notification: msg });
        setTimeout(() => {
            this.setState({ notification: '' })
        }, 3000);
    }

    render() {
        return (
            <div className={this.props.activeMenu === "add" ? '' : "is-hidden"}>
                <section className="hero is-white">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Add Product
                            </h1>
                        </div>
                    </div>
                </section>
                <section className="hero is-white">

                    <div className="hero-body">

                        <form className="form columns">
                            <div className="column is-4">

                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control">
                                        <input className="input" type="text" placeholder="Text input"
                                            value={this.state.name}
                                            onChange={(e) => { this.setState({ name: e.target.value }) }}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Description</label>
                                    <div className="control">
                                        <input className="input" type="text" placeholder="Text input"
                                            value={this.state.desc}
                                            onChange={(e) => { this.setState({ desc: e.target.value }) }}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Image</label>
                                    <div className="control">
                                        <input className="input" type="text" placeholder="Text input"
                                            value={this.state.imgsrc}
                                            onChange={(e) => { this.setState({ imgsrc: e.target.value }) }}
                                        />
                                    </div>
                                </div>
                                <br />
                                <div class="field is-grouped">
                                    <div className="control">
                                        <button className="button is-link" onClick={(e) => this.submitForm(e)}>Submit</button>
                                    </div>
                                    <div className="control">
                                        <button className="button is-link" onClick={(e) => this.resetForm(e)}>Reset</button>
                                    </div>
                                </div>


                                <p className="help">{this.state.notification}</p>
                            </div>

                        </form>
                    </div>

                </section>
            </div >
        )
    }
}

export default Add
