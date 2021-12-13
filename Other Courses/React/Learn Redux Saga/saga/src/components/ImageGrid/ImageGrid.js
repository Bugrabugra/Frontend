import React, {Component} from 'react';
import './styles.css';
import {connect} from "react-redux";
import {loadImages} from "../../actions";
import Button from '../Button';
import Stats from '../Stats';


const key = '5f96323678d05ff0c4eb264ef184556868e303b32a2db88ecbf15746e6f25e02';

class ImageGrid extends Component {
  componentDidMount() {
    this.props.loadImages();
  }

  render() {
    const { images, error, isLoading, loadImages, imageStats } = this.props;
    return (
      <div className="content">
        <section className="grid">
          {images.map(image => (<div
            key={image.id}
            className={`item item-${Math.ceil(image.height / image.width,)}`}
          >
            <Stats stats={imageStats[image.id]}/>

            <img
              src={image.urls.small}
              alt={image.user.username}
            />
          </div>))}
        </section>

        {error && <div className='error'>{JSON.stringify(error)}</div>}

        <Button
          onClick={() => !isLoading && loadImages()}
          loading={isLoading}
        >
          Load More
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({isLoading, images, error, imageStats}) => ({
  isLoading,
  images,
  error,
  imageStats
});

const mapDispatchToProps = dispatch => ({
  loadImages: () => dispatch(loadImages())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageGrid);
