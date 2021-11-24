import PropTypes from 'prop-types';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import GetAppIcon from '@material-ui/icons/GetApp';

export default function Footer({ votes, comments }) {
    return (
        <div className="p-4 pt-2 pb-1">
            <div className="grid grid-cols-3 text-2xl">
                <div className="font-bold flex flex-col justify-center items-center">
                    <ArrowDropUpIcon />
                    <div>{votes}</div>
                    <ArrowDropDownIcon />
                </div>
                <div className="font-bold flex flex-row justify-center items-center">
                    <ChatBubbleOutlineIcon className="mr-1"/>
                    <div>{comments}</div>
                </div>
                <div className="font-bold flex justify-center items-center">
                    <GetAppIcon/>
                </div>
            </div>
        </div>
    );
}

Footer.propTypes = {
    votes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired
};
