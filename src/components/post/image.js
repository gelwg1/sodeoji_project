import PropTypes from 'prop-types';

export default function Image({ src }) {
  return <img src={src} alt=""/>;
}

Image.propTypes = {
  src: PropTypes.string.isRequired
};
