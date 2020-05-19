import React, { Component } from "react";
import Menu from "./MenuComponent";
import Navigation from "./NavComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import { Dishes } from "../shared/dishes";
import { Promotions } from "../shared/promotions";
import { Leaders } from "../shared/leaders";
import DishDetail from "./dishDetailComponent";

class Main extends Component{

    constructor(props){
        super(props);

        this.state = {
            dishes: Dishes,
            promotions: Promotions,
            leaders: Leaders
        };
    }


    render(){

        const HomePage = () => {
            return(
                <Home 
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithId = ({match}) => {
            return(
                <DishDetail dish={this.state.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId))[0]} />
            )
        }

        return(
            <div>
                <Navigation />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route path="/contactus" component={Contact} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;