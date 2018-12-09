import { Component } from 'react';
import PropTypes from 'prop-types';
import { safeInvoke } from '../utils/utils';

const isAxiosError = (e) => {
  return e.error && e.error.response && e.error.response.status === 400;
};

const getAxiosErrors = (e) => {
  return e.error.response.data.errors;
};

const isGraphQLError = (e) => {
  if (typeof e.graphQLErrors === 'undefined') {
    return false;
  }

  for (let i = 0; i < e.graphQLErrors.length; i++) {
    const error = e.graphQLErrors[i];
    if (error.message === 'Validation error') {
      return true;
    }
  }

  return false;
};

const getGraphQLErrors = (e) => {
  for (let i = 0; i < e.graphQLErrors.length; i++) {
    const error = e.graphQLErrors[i];
    if (error.message === 'Validation error') {
      return error.extensions.exception.errors;
    }
  }

  return {};
};

export class Form extends Component {
  static propTypes = {
    callback: PropTypes.func,
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    form: PropTypes.object,
    onError: PropTypes.func,
    onSuccess: PropTypes.func
  };

  static defaultProps = {
    form: {},
    errors: [],
    callback: () => Promise.resolve(),
    onSuccess: () => null,
    onError: () => null
  };

  state = {
    form: {},
    errors: {}
  };

  submit = (e) => {
    e.preventDefault();

    const { onError, onSuccess, beforeSubmit, callback } = this.props;

    const form = beforeSubmit ? beforeSubmit(this.state.form) : this.state.form;

    callback(form)
      .then((response) => {
        this.setState({ errors: [] }, () => safeInvoke(onSuccess, { response, form }));
      })
      .catch((e) => {
        const errorCallback = () => safeInvoke(onError, e);

        if (isGraphQLError(e)) {
          this.setState({ errors: getGraphQLErrors(e) }, errorCallback);
        } else if (isAxiosError(e)) {
          this.setState({ errors: getAxiosErrors(e) }, errorCallback);
        } else {
          errorCallback();
        }
      });
  };

  change = (name, type = null) => (e) => {
    if (null === type) {
      const { form } = this.state;

      if (e instanceof Date) {
        this.setState({
          form: {
            ...form,
            [name]: e
          }
        });
      } else if (e instanceof Object && typeof e.target !== 'undefined') {
        const { target } = e;
        const type = target.getAttribute('type');

        let { value } = target;

        switch (type) {
          case 'checkbox':
            value = target.checked;
            break;

          case 'file':
            if (target.getAttribute('multiple')) {
              value = target.files;
            } else {
              value = target.files[0];
            }
            break;

          default:
            break;
        }

        this.setState({
          form: {
            ...form,
            [name]: value
          }
        });
      } else if (typeof e.target === 'undefined') {
        this.setState({
          form: {
            ...form,
            [name]: e.value
          }
        });
      }
    } else {
      return this.handleChange(name, type)(e);
    }
  };

  getErrors() {
    return this.state.errors;
  }

  handleChange = (name, type) => (e) => {
    const { form } = this.state;

    switch (type) {
      case 'wysiwyg':
      case 'ckeditor':
      case 'tinymce':
        this.setState({
          form: {
            ...form,
            [name]: e
          }
        });
        break;

      case 'date-range':
      case 'daterange':
        this.setState({
          form: {
            ...form,
            [name]: e
          }
        });
        break;

      case 'checkbox':
      case 'radio':
        this.setState({
          form: { ...form, [name]: e.target.checked }
        });
        break;

      case 'file':
        this.setState({
          form: {
            ...form,
            [name]: e.target.getAttribute('multiple') ? e.target.files : e.target.files[0]
          }
        });
        break;

      case 'datetime':
      case 'date':
        this.setState({
          form: { ...form, [name]: e }
        });
        break;

      case 'react-select':
      case 'reactselect':
        this.setState({
          form: { ...form, [name]: e.value }
        });
        break;

      case 'text':
      case 'textarea':
      case 'email':
      case 'search':
      default:
        this.setState({
          form: { ...form, [name]: e.target.value }
        });
        break;
    }
  };

  onKeyDown = e => {
    if (!(e.keyCode === 13 && e.metaKey)) {
      return;
    }

    const target = e.target;

    if (target.form) {
      this.submit(e);
    }
  };

  componentDidMount() {
    this.setState({
      form: this.props.form
    });
  }

  componentWillUnmount() {
    this.setState({
      errors: []
    });
  }
}
