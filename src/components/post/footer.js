import PropTypes from 'prop-types';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import GetAppIcon from '@material-ui/icons/GetApp';
import FirebaseContext from '../../context/firebase';
import { useState, React, useContext } from 'react';
import useUser from '../../hooks/use-user';
import UserContext from '../../context/user';
import {snapshotToArray} from '../../services/firebase';
import useCheckVotes from '../../hooks/use-check-votes';

export default function Footer({ votes, comments, content }) {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    const { database } = useContext(FirebaseContext);
    const { isVoted, id } = useCheckVotes(user?.user_id, content?.key);

    const upvote = async (event) => {
        event.preventDefault();
        await database
        .ref('Votes')
        .push({
          post_id: content?.key,
          user_id: user?.user_id
    });
        await database
        .ref('Posts')
        .child(content.key)
        .update({
        vote_numbers: content?.vote_numbers+1
        });
        
         window.location.reload();
    };

    const downvote = async (event) => {
        event.preventDefault();
        await database
        .ref('Votes')
        .child(id)
        .remove();

        await database
        .ref('Posts')
        .child(content.key)
        .update({
        vote_numbers: content?.vote_numbers-1
        });

        window.location.reload();
    }

    return (
        <div className="p-4 pt-2 pb-1">
            <div className="grid grid-cols-3 text-2xl">
                <div className="font-bold flex flex-row justify-center items-center">
                    {isVoted == false && 
                    <ArrowDropUpIcon onClick={upvote} className="mr-1"/>
                    }
                    
                    {isVoted == true &&
                    <ArrowDropDownIcon onClick={downvote} className="mr-1"/>
                    }

                    <div>{votes}</div>
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
    comments: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired
};
