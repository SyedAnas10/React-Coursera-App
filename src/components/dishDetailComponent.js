import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardText, CardImg, Modal, Row, Label, Button, ModalHeader, Col} from "reactstrap";
import { Redirect } from "react-router-dom";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class SubmitComment extends Component{

    constructor(props){
        super(props)

        this.state = {
            commentBoxOpen : false,
        }

        this.toggler = this.toggler.bind(this);
    }

    toggler(values) {
        this.setState({commentBoxOpen: !this.state.commentBoxOpen});
        alert(JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        return <Redirect to="http://localhost:3000/home"/>
    }

    render(){
        return(
            <React.Fragment>
                <Button outline onClick={() => this.setState({commentBoxOpen: !this.state.commentBoxOpen})}>
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.commentBoxOpen} toggle={() => this.toggler()}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <LocalForm onSubmit={(values) => {this.toggler(values)} }>
                        <Row className="form-group ml-1">
                            <Col md={11}>
                                <Label htmlFor="rating">Rating :</Label>
                                <Control.select model=".rating" name="rating" id="rating"
                                className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group ml-2">
                            <Col md={11}>
                            <Label htmlFor="author">Username :</Label>
                            <Control.text model=".author" name="author" id="author"
                            className="form-control" 
                            validators={
                                {required, minLength: minLength(3), maxLength: maxLength(15)}
                            }/>
                            <Errors className="text-danger" model=".author" show="touched"
                            messages={
                                {required: 'Required! ',
                                minLength: 'Must be greater than 2 charachters.',
                                maxLength: 'Must be less than 15 charachters.'}
                            }/>
                        </Col>
                        </Row>
                        <Row className="form-group ml-2">
                        <Col md={11}>
                            <Label htmlFor="comment">Comment :</Label>
                            <Control.textarea model=".comment" id="comment" name="comment"
                            className="form-control" rows="6" />
                        </Col>
                        </Row>
                        <Button type="submit" value="submit" color="primary" className="ml-3 mb-2">
                            Submit
                        </Button>
                    </LocalForm>
                </Modal>
            </React.Fragment>
        );
    }
}

function RenderDish({dish}) {
    if (dish != null) {
        return(
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle className="h4">{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    } 
    else {
        return(
            <div></div>
        );
    }
}

function RenderComments({comments, addComment, dishId}) {
    if(comments != null){
        const com = comments.map((com) => {
        return(
            <div className="list-unstyled" key={com.id}>
                <li>{com.comment}</li><br/>
                    <li>-- {com.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(com.date)))}</li><br/>
            </div>
        )})
        return(
            <div>
                <div className="h4">
                    Comment
                </div>
                <div className="m-1">
                    {com}
                </div> 
                <SubmitComment dishId={dishId} addComment={addComment}/>
            </div>
        )
        }
    else{
        return(
            <div></div>
        )
    }
}

class DishDetail extends Component {

    constructor(props){
        super(props)

        this.state = {
        }
    }
    
    render(){
        if (this.props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
        if (this.props.dish != null) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-md-5 m-1">
                            <RenderDish dish={this.props.dish} />
                        </div>
                        <div className="col-6 m-1">
                            <Card>
                                <CardBody>
                                    <RenderComments comments={this.props.dish.comments} addComment={this.props.addComment} dishId={this.props.dish.id} />
                                </CardBody>
                            </Card> 
                        </div>
                    </div>
                </div>
            )
        } 
        else {
            return(
                <div></div>
            )
        }
    }
}


export default DishDetail;