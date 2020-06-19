import React from 'react';
import {colorPrimary, colorfont, colorSecondary} from './../colors'

import AddIcon from 'react-ionicons/lib/IosAdd'
import EditIcon from 'react-ionicons/lib/IosCreate'
import DeleteIcon from 'react-ionicons/lib/MdTrash'

export default class Product extends React.Component{
    state = this.props;

    render(){
        return(
        <div style={style.block}>
            <img style={style.img} src={this.state.data.imgsrc}></img>

            <div style={style.productData}>
                <div style={{fontSize:'9px',color:'#635d5c'}}>{"Product ID : "+this.state.data.id}</div>
                <div style={{fontSize:'25px',fontWeight:'700'}}>{this.state.data.title}</div>
                <div style={{marginTop:'10px'}}>{this.state.data.desc}</div>
            </div>
            
            <div style={style.buttonContainer}>
                <button title="Edit Product" style={style.btn} onClick={(e)=>{
                    e.preventDefault();
                    this.props.openEditDelete(this.state,'edit');
                }}><EditIcon color="#000"/></button>
                <button title="Delete Product" style={style.btn} onClick={(e)=>{
                    e.preventDefault();
                    this.props.openEditDelete(this.state.data.id,'delete');
                }}><DeleteIcon color="#000"/></button>
            </div>
        </div>
        )
    }
}

const style = {
    block:{
        width:'80%',
        padding:'20px',
        margin:'10px',
        boxShadow:'2px 2px 2px 1px #8080df',
        display:'flex',
        borderRadius:'5px'
    },
    img:{
        minWidth:'100px',
        maxWidth:'100px',
        height:'100px',
        backgroundColor:'#000',
    },
    productData:{
        display:'flex',
        flexDirection:'column',
        paddingLeft:'10px'
    },
    buttonContainer:{
        marginLeft:'auto',
        display:'flex',
        height:'30px'
    },
    btn:{
        backgroundColor:'transparent',
        padding:'3px',
        borderRadius:'100px'
    }
}