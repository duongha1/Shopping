import React, { Component } from 'react';

export default class  Modal extends Component{
    state={
        name: "",
        price: 0,
        image: ""
    }
    handleClose = ()=>{
        this.props.toggleModal();
    }
    handleChange = event=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        const {name, price, image} = this.state;
        if(this.props.editingProduct){
            this.props.updateProduct(name, price, image);
        }else{
            this.props.addProduct(name,price,image);
        }
        this.props.toggleModal();
    }
    componentDidMount(){
        if(this.props.editingProduct){
            console.log("update")
            const {name, price, image} = this.props.editingProduct;
            this.setState({
                name,
                price,
                image
            })
        }else{
            console.log("create")
        }
    }
    componentWillUnmount(){
        this.props.clearIsEditting();
    }
    render(){
        const {name, price, image} = this.state;
        return(
            <div className="modal">
                <div className="content">
                    <button onClick={this.handleClose} type="button" className="close btn btn-outline-primary">
                            Close
                    </button>
                    <h5>{this.props.editingProduct?'Update Product':'Create Product'}</h5>
                    <form className="p-3" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Product Name</label>
                            <input type="text" name="name" className="form-control" placeholder="Product Name" value={name} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Price</label>
                            <input type="text" name="price" className="form-control" placeholder="Price" value={price} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Image</label>
                            <input type="text" name="image" className="form-control" placeholder="Image" value={image} onChange={this.handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">{this.props.editingProduct?'Update':'Add'}</button>
                    </form>
                </div>
            </div>
        );
    }

}