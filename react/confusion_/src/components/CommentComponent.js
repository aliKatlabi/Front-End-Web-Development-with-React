import react, {Component} from 'react';

import {Row, Modal, Button, ModalHeader, ModalBody, Label, Col} from 'reactstrap';

import {LocalForm, Control, Errors} from 'react-redux-form';

const maxLength  = (len) => (val)=> !(val) || (val.length <= len);
function minLength(len) { return (val)=>  (val)&&(val.length >= len) };

export default class Comment extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            modal:false
        };
        
        this.toggleModal = ()=>{ this.setState({modal:!this.state.modal  });}
        
        //this.toggleModal = this.toggleModal.bind(this);
    }

        
 /*    toggleModal(){
           this.setState({
            modal:!this.state.modal
        });
    }*/
    
    
    render(){
        
        
        return(
            <>
                <Button outline className="secondary" onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg "></span>  Submit Comment
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        
                    <ModalBody>
                        <LocalForm>
                            <div className="form-group">
                                <Label htmlFor=".rating" >Rating </Label>
                                <div >
                                <Control.select model=".rating" name="rating" id="rating" className="form-control"> 
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>

                                </Control.select>
                         
                                </div>
            
                            </div>
                            <div className="form-group">
                                <Label>Your Name</Label>
                                <Control.text
                                 model=".name" name="name" id="name"  placeholder="Your Name"  className="form-control"
                                 validators={{minLength:minLength(3),maxLength:maxLength(15)}}
                                />
            
                                       <Errors className="text-danger " model=".name" 
                                            messages={{minLength:"must be more than 2 chars",maxLength:"must be less than 15 chars"}}
                                            show={{touched: true, focus: false}}
                                        />
                            </div>
            
                             <div className="form-group">
                                <Label>Comment </Label>
                                <Control.textarea 
                                model=".comment" name="comment" id="comment" rows="6" className="form-control"
                               
                            />
                            </div>
                   
                        </LocalForm>
                        <Button type="submit" color="primary" >Submit</Button>
                    </ModalBody>
                </Modal>
            </>
        );
    }
    
    
}