import PropTypes from 'prop-types';

export default function Header({ username, avatarSrc, date }) {
  var today = new Date(date);

  date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex justify-center items-center">
        <img
          className="rounded-full w-thanh flex mr-3"
          src={avatarSrc}
          alt={`Avatar`}
        />
        <p className="font-bold">{date} by {username}</p>
      </div>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
  avatarSrc: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired
};
