import React, { Component } from 'react'
import axios from 'axios'

export class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pid: '',
            name: '',
            desc: '',
            imgsrc: '',
            notification: ''
        }
    }

    async findProduct(e) {
        e.preventDefault();
        axios({
            method: 'get',
            url: '/api/products/' + this.state.pid,
        })
            .then(data => {
                console.log(data);
                if (data.status === 200) {
                    this.setState({
                        name: data.data.name,
                        desc: data.data.desc,
                        imgsrc: data.data.imgsrc,
                    })
                } else {
                    this.setNotification("Could not find the product");
                    console.log("Could not find the product")
                }
            })
            .catch(err => {
                this.setNotification("Error occured/Could not find product");
                console.log(err);
            });
    }

    setNotification(msg) {
        this.setState({ notification: msg });
        setTimeout(() => {
            this.setState({ notification: '' })
        }, 3000);
    }

    async submitForm(e) {
        e.preventDefault();
        axios({
            method: 'put',
            url: '/api/products/' + this.state.pid,
            data: {
                name: this.state.name,
                desc: this.state.desc,
                imgsrc: this.state.imgsrc
            }
        })
            .then(data => {
                console.log(data);
                if (data.status === 200) {
                    this.setNotification("Data edited successfully");
                    console.log("Data edited successfully")
                }
            })
            .catch(err => {
                this.setNotification("Error occured");
                console.log(err);
            });
    }

    render() {
        return (
            <div className={this.props.activeMenu === "edit" ? '' : "is-hidden"}>
                <section className="hero is-white">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Edit Product
                            </h1>
                        </div>
                    </div>
                </section>
                <section className="hero is-white">

                    <div className="hero-body">

                        <form className="form columns">
                            <div className="column is-4">
                                <div className="field">
                                    <label className="label">Product ID</label>
                                    <div className="control">
                                        <input className="input" type="text" placeholder="Text input"
                                            value={this.state.pid}
                                            onChange={(e) => { this.setState({ pid: e.target.value }) }}
                                        />
                                    </div>
                                </div>

                                <div className="control is-grouped-rights">
                                    <button className="button is-link" onClick={(e) => { this.findProduct(e) }}>Find Product</button>
                                </div>

                                <br />
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
                                <div className="control is-grouped-rights">
                                    <button className="button is-link" onClick={(e) => { this.submitForm(e) }}>Submit</button>
                                </div>
                                <p className="help">{this.state.notification}</p>
                            </div>

                        </form>
                    </div>

                </section>
            </div>
        )
    }
}

export default Edit


