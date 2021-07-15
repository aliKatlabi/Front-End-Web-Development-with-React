
import  React ,{Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Modal, Button, ModalHeader, ModalBody, Label} from 'reactstrap';

import {Link} from 'react-router-dom';
import {LocalForm, Control, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
//import Comment from './CommentComponent';
import { baseUrl } from '../shared/baseUrl';
import {Stagger , Fade, FadeTransform} from 'react-animation-components';

const maxLength  = (len) => (val)=> !(val) || (val.length <= len);
function minLength(len) { return (val)=>  (val)&&(val.length >= len) };

class CommentForm extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            isModalOpen:false
        };
        
  
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

     toggleModal(){
         this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    
   handleSubmit(values){
      // this.toggleModale();
       this.setState({
          isModalOpen: !this.state.isModalOpen
        });
       alert("Current state is : "+JSON.stringify(values));
       this.props.postComment(this.props.dishId, values.rating,values.author,values.comment);
       
			
   }
    
    
    render(){
        
        
        return(
            <>
                <Button outline className="secondary" onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg "></span>  Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} fade>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        
                    <ModalBody>
                        <LocalForm onSubmit = {(value)=>this.handleSubmit(value)} >
                            <div className="form-group">
                                <Label htmlFor="rating" >Rating </Label>
                                <div >
                                <Control.select model=".rating" name="rating"  className="form-control"> 
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>

                                </Control.select>
                         
                                </div>
            
                            </div>
                            <div className="form-group">
                                <Label htmlFor="name" >Your Name</Label>
                                <Control.text
                                 model=".author" name="author" id="author"  placeholder="Your Name"  className="form-control"
                                 
                                 validators={{minLength:minLength(3),maxLength:maxLength(15)}}
                                />
            
                                       <Errors className="text-danger " model=".name" 
                                            messages={{minLength:"must be more than 2 chars",maxLength:"must be less than 15 chars"}}
                                            show={{touched: true, focus: false}}
                                        />
                            </div>
            
                             <div className="form-group">
                                <Label htmlFor="comment">Comment </Label>
                                <Control.textarea 
                                model=".comment" name="comment" id="comment" rows="6" className="form-control"
                               
                            />
                            </div>
                             <Button type="submit" color="primary" >Submit</Button>
                        </LocalForm>
                       
                    </ModalBody>
                </Modal>
            </>
        );
    }
    
    
}

function RenderDish({dish}){
        
        if(dish !== undefined){
              return(
                <div  className="col-12 col-md-5 m-1">
                      <FadeTransform in transformProps={{exitTransform:'scale(0.5) translateY(-50%)' }}>
                        <Card>
                            <CardImg top src={baseUrl+dish.image} alt={dish.name}  />
                            <CardBody>
                              <CardTitle>{dish.name}</CardTitle>
                              <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>                
                      </FadeTransform>
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
      
        
    }

function RenderComments({comments, postComment, dishId}){
        
        if(comments!== null){
            const Comments =   comments.map((com)=>{
          
             var date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)));
             
                return(
                    <Fade in>
                        <li key={com.id}>
                            <p> {com.comment} </p>
                            <p>-- {com.author}, {date}</p>
                        </li>    
                    </Fade>
              
              
              );
            });
            return (
                <div  className="col-12 col-md-5 m-1">
                    <h3>Comments</h3>
                    <ul className="list-unstyled">
                        <Stagger in>
                            {Comments}
                        </Stagger>
                        
                    </ul>
         
                    <CommentForm postComment={postComment} dishId={dishId}/>
                </div>
              
            );
            
        }
        else{
            return(
                <div></div>
                  );
         }
    }

const DishDetail = (props)=>{
        if (props.isLoading){
            return(
                <div className="container" >
                    <div className="row" >
                        <Loading/>
                    </div>
                </div>
            );
        }
        else if (props.errMsg){
            return (
                <div className="container" >
                    <div className="row" >
                        <h4>{props.errMsg} </h4>
                    </div>
                </div>
            );
        }
        else if (props.dish!=null){
            return  (
            <div className='container'>
                 <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className='row'>
                        <RenderDish dish ={props.dish} />
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id}/>
                </div>
            </div>
            
      );
        }else{
            return(<div></div>);
        }
        
    
}


export default DishDetail;