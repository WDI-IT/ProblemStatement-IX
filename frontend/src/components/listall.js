import React, { Component } from 'react'
import axios from 'axios'
import './app.css'

function RenderCard(props) {
    const { data } = props;
    return (
        <div className="card">
            <div className="card-image">

                <figure className="image is-4by3">
                    <img src={data.imgsrc} alt="Placeholder image" />
                </figure>

            </div>
            <div className="card-content">
                <p className="title is-4">{data.name}</p>
                <div className="content">
                    <p>{data.desc}</p>
                    <p>ID: {data._id}</p>

                </div>
            </div>
            <footer className="card-footer">
                <a href="#" className="card-footer-item" onClick={() => props.removeCard(data._id)}>Delete</a>
            </footer>
        </div >
    )
}

export class ListAll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        axios({
            method: 'get',
            url: '/api/products'
        })
            .then(data => {
                this.setState({ data: data.data });
                console.log(data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        const Cards = this.state.data.map((item, index) => {
            if (this.props.hiddenCards.indexOf(item._id) === -1) {
                return (
                    <RenderCard removeCard={this.props.removeCard} data={item} key={index.toString()} />
                )
            }
        })

        return (
            <div className={this.props.activeMenu === "listall" ? '' : "is-hidden"}>
                <section className="hero is-white">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                All Products
                            </h1>
                            <div class="buttons is-right">
                                <button class="button" onClick={(e) => { this.props.clearRemoved(e) }}>Clear Removed</button>
                                <button class="button" onClick={(e) => { e.preventDefault(); this.fetchData() }}>Refresh</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="hero">
                    <div className="products">
                        {Cards.length > 0 ? Cards : <div class="notification">No Data to show</div>}
                    </div>
                </section>
            </div>
        )
    }
}

export default ListAll
