import React,{Component} from 'react';

import {colorPrimary, colorfont, colorSecondary} from './../colors'

export default class EditProduct extends Component{
        
    constructor(props){
        super(props)
        this.state = {title:'',imgsrc:'',id:'',desc:''}
    }

    componentDidMount=()=>{
        this.setState({...this.props.data});
    }

    editProduct = (e) =>{
        e.preventDefault();
        this.props.editProduct(this.state);        
    }
    
    render(){
        let title = this.props.data.title;
        let desc = this.props.data.desc;
        let imgsrc = this.props.data.imgsrc;

        return(
        <div style={styles.container}> 
            <h2 style={{textAlign:'center'}}>Edit Deatails</h2>
            
            <label style={styles.label}>Title</label>
            <input type="text"  value={this.state.title}  placeholder='Enter Title' onChange={(e)=>{this.setState({title:e.target.value})}}></input>
            
            <label style={styles.label}>Image source</label>
            <input type="text"  value={this.state.imgsrc} placeholder='Enter Image Source'  onChange={(e)=>{this.setState({imgsrc:e.target.value})}}></input>
            <img src={this.state.imgsrc} style={{maxWidth:'100px',maxHeight:'100px'}}></img>

            <label style={styles.label}>Description</label>
            <input type="text"  value={this.state.desc}   placeholder='Enter Description'onChange={(e)=>{this.setState({desc:e.target.value})}}></input>
            
            <button onClick={this.editProduct} style={styles.btn}>Edit</button>
        </div>)
    }

}

const styles = {
    container:{
        width:'350px',
        display:'flex',
        flexDirection:'column'
    },
    label:{
        marginTop:'5px'
    },
    btn:{
        backgroundColor:colorPrimary,
        marginTop:'10px'
    }
}