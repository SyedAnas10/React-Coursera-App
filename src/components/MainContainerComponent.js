import React, { Component } from "react";
import Menu from "./MenuComponent";
import Navigation from "./NavComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import DishDetail from "./dishDetailComponent";
import About from "./AboutComponent";
import { connect } from "react-redux";
import { addComment, fetchDishes, fetchPromos } from "../redux/actionCreator";
import { actions } from "react-redux-form";

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    addComment: (dishId, rating, author, comment) => {dispatch(addComment(dishId, rating, author, comment))},
    fetchDishes: () => {dispatch(fetchDishes())},
    fetchPromos: () => {dispatch(fetchPromos())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});



class Main extends Component{

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchPromos();
    }

    render(){

        const HomePage = () => {
            return(
                <Home 
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMess={this.props.promotions.errMess}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithId = ({match}) => {
            return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId))[0]}
                            isLoading={this.props.dishes.isLoading}
                            errMess={this.props.dishes.errMess}
                            addComment={this.props.addComment} />
            )
        }

        return(
            <div>
                <Navigation />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Route path="/about" component={() => <About leaders={this.props.leaders} />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)) ;