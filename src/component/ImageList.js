import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ImageList extends Component {
  static propTypes = {
    onRemove: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired
  };

  onRemove = id => e => {
    e.preventDefault();

    this.props.onRemove(id);
  };

  render() {
    const {
      images
    } = this.props;

    const nodes = images.map((image, i) => (
      <div
        key={i}
        className="image-list__item">
        <button
          onClick={this.onRemove(image.id)}
          className="image-list__remove">
          &times;
        </button>
        <a
          href={image.url}
          target="_blank"
          rel="noopener noreferrer"
          className="image-list__image"
          style={{ backgroundImage: `url(${image.url})` }}>
          {image.id}
        </a>
      </div>
    ));

    return (
      <div className="image-list">
        {nodes}
      </div>
    );
  }
}
