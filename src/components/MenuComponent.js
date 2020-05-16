import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import DishDetail from "./dishDetailComponent";

class Menu extends Component {
    constructor(props) {
        super(props);

        // state containts the properties and variables for a particular class 
        this.state = {
            selectedDish: null
        };
    }
    // this defines the properties of this particular component
    onSelect(dish){
      this.setState({selectedDish: dish});
    }
    renderDish(dish) {
      if (dish != null)
          return(
              <Card>
                  <CardImg top src={dish.image} alt={dish.name} />
                  <CardBody>
                    <CardTitle className="h4">{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
              </Card>
          );
      else
          return(
              <div></div>
          );
  }

    // defines what template to render on browser with this component
    render(){
        /* defining a variable menu which defines how to render each item in the 
        property into this variable */
        const menu = this.props.dishes.map((dish) => {
            return(
              <div  className="col-12 col-md-5 m-1">
              <Card key={dish.id} onClick={() => this.onSelect(dish)}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
              </Card>
            </div>
            );
        });

        // define the components template
        return(
            <div className="container">
            <div className="row">
                  {menu} 
            </div>
            <div className="row">
                <div  className="col-12 col-md-5 m-1">
                  {this.renderDish(this.state.selectedDish)}
                </div>
                <DishDetail dish={this.state.selectedDish}/>
            </div> 
          </div>
        );


    };
}

export default Menu;