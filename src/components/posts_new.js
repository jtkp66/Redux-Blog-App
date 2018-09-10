import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

// FORM
class PostsNew extends Component {
    renderField(field) {
        //destructure nested props touched and error in meta to dry up code. 
        //controlling the view before destructuring
        //const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;
        //${field.meta.touched && field.meta.error
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }
    //helper function action creator to post the post to API on backend
    onSubmit(values) {
        // programatic navigation back to root route
        //this.props.history.push('/');
        //this === component. that is why we bind it on line 27
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
        //console.log(values);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    //validate the inputs from 'values'
    if (!values.title) {
        errors.title = "Enter a title!";
    }
    if (!values.categories) {
        errors.categories = "Enter some categories";
    }
    if (!values.content) {
        errors.content = "Enter some content please";
    }
    //if errors is empty the form is fine to submit
    //if errors has any properties, redux form assumes fo 
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostNewForm'
})(
    connect(null, { createPost })(PostsNew)
    );
//before adding createPost action
// export default reduxForm({
//     validate,
//     form: 'PostsNewForm'
// })(PostsNew);