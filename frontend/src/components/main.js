import React, { Component } from 'react'
import SideMenu from './sidemenu'
import Navbar from './navbar'
import Add from './add'
import Edit from './edit'
import ListAll from './listall'
import axios from 'axios'
import 'bulma'

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeMenu: 'add',
      hiddenCards: []
    }
    this.setActiveMenu = this.setActiveMenu.bind(this)
    this.removeCard = this.removeCard.bind(this)
    this.clearRemoved = this.clearRemoved.bind(this)
  }

  setActiveMenu(activeMenu) {
    this.setState({ activeMenu })
  }

  removeCard(id) {
    const newHiddenCards = [...this.state.hiddenCards]
    newHiddenCards.push(id)
    this.setState({ hiddenCards: newHiddenCards })
  }

  clearRemoved(e) {
    e.preventDefault();
    this.setState({ hiddenCards: [] })
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="columns">
          <SideMenu setActiveMenu={this.setActiveMenu} activeMenu={this.state.activeMenu} />
          <div className="column is-10">
            {/* <RenderMenuItems activeMenu={this.state.activeMenu} data={this.state.data} /> */}
            <Add activeMenu={this.state.activeMenu} />
            <Edit activeMenu={this.state.activeMenu} />
            <ListAll activeMenu={this.state.activeMenu} hiddenCards={this.state.hiddenCards} clearRemoved={this.clearRemoved} removeCard={this.removeCard} />
          </div>
        </div>
      </>
    )
  }
}

export default App


