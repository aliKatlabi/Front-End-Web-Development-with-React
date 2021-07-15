import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter, Switch} from 'react-router-dom';


import Menu         from './MenuComponent';
import DishDetail   from './DishdetailComponent';
import Home         from './HomeComponent';
import Header       from './HeaderComponent';
import Footer       from './FooterComponent';
import Contact      from './ContactComponent';
import About        from './AboutComponent';

import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedBack} from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { actions } from 'react-redux-form';


const mapStateToProps  = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) =>({
    postComment:(dishId, rating, author, comment)=>dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    fetchComments: () => { dispatch(fetchComments()) },
    fetchPromos: () => { dispatch(fetchPromos()) },
    fetchLeaders: () =>{ dispatch(fetchLeaders()) },
    resetFeedbackForm: ()=>{ dispatch(actions.reset('feedback')) },
    postFeedBack:(feedBack)=>{dispatch(postFeedBack(feedBack))}
});

class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

//{this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}
  componentDidMount(){
    
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }
    
/*  UNSAFE_componentWillMount(){
      console.log("fetchDishes() ..................");
      this.props.fetchDishes();
  }
    */
  render() {
      
        const HomePage = () => {
   
              return(
                  <Home 

                      dish = {this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                      dishesLoading = {this.props.dishes.isLoading}
                      dishesErrMsg = {this.props.dishes.errMsg}
                      
                      promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                      promosLoading = {this.props.promotions.isLoading}
                      promosErrMsg = {this.props.promotions.errMsg} 
                      
                      leader = {this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                      leadersLoading ={this.props.leaders.isLoading}
                      leadersErrMsg = {this.props.leaders.errMsg}
                  />
              );
            };


        const DishWithId= ({match})=>{
             // later it is {match, location, history}
            return(
              <DishDetail
                dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.comments.filter((comment) => comment.dishId ===                       parseInt(match.params.dishId,10))}
                postComment={this.props.postComment}
                commentErrMess={this.props.comments.errMess}  
              />
            );
        };
        
        const Aboutus = ()=>{
            return(
                <About 
                    leaders = { this.props.leaders }
                    />
            );
        };
          //<Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
          //<DishDetail dish={(this.state.dishes.filter((dish) => dish.id === this.state.selectedDish))[0]}/>

            return (
              <>
                <Header/>
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route exact path="/home" component={HomePage} />
                            <Route exact path="/menu"  component={()=><Menu dishes={this.props.dishes} /> } />
                            <Route exact path='/menu/:dishId' component={DishWithId} />
                            <Route exact path="/contactus"  component = {()=><Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedBack={this.props.postFeedBack}/>}  />
                            <Route exact path="/aboutus"  component={Aboutus}  />
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer/>
              </>
            );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));