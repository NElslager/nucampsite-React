import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Label,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, Errors, LocalForm } from "react-redux-form";

const minLength = (length) => (value) => {
  console.log(value);
  return value && value.length >= length;
};

class CommentForm extends React.Component {
  state = {
    isModalOpen: true,
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };
  handleSubmit = (values) => {
    this.toggleModal();
    this.props.addComment(
      this.props.campsiteId,
      values.rating,
      values.author,
      values.text
    );
  };
  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-lg fa-pencil" /> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <div className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                  model=".rating"
                  placeholder="Your Name"
                  id="rating"
                  className="form-control"
                  name="rating"
                  defaultValue="1"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </div>
              <div className="form-group">
                <Label htmlFor="author">Your Name</Label>
                <Control.text
                  model=".author"
                  placeholder="Your Name"
                  id="author"
                  className="form-control"
                  name="author"
                  validators={{ minLength: minLength(2) }}
                />
                <Errors
                  model=".author"
                  show="touched"
                  component="div"
                  className="text-danger"
                  messages={{
                    minLength: "Name must have at least 2 characters",
                  }}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="text">Comment</Label>
                <Control.textarea
                  model=".text"
                  placeholder="Your Comment"
                  id="text"
                  className="form-control"
                  name="text"
                  rows="7"
                />
              </div>

              <Button type="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, addComment, campsiteId }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comment) => {
          return (
            <div>
              <p>
                {comment.text} <br />
                -- {comment.author},{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comment.date)))}
              </p>
            </div>
          );
        })}
        <CommentForm campsiteId={campsiteId} addComment={addComment} />
      </div>
    );
  } else {
    return <div />;
  }
}

function CampsiteInfoComponent(props) {
  if (props.campsite) {
    //console.log(this.props.campsite.comments);
    //console.log(this.props.campsite.comments[0]);
    //console.log(this.props.campsite.comments[0].author);
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments
            comments={props.comments}
            addComment={props.addComment}
            ccampsiteId={props.campsite.id}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default CampsiteInfoComponent;
