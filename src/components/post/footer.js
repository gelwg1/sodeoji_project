import PropTypes from 'prop-types';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import GetAppIcon from '@material-ui/icons/GetApp';
import FirebaseContext from '../../context/firebase';
import { useState, React, useContext, useEffect } from 'react';
import useUser from '../../hooks/use-user';
import UserContext from '../../context/user';
import useCheckVotes from '../../hooks/use-check-votes';
// import { snapshotToArray } from '../../services/firebase';

export default function Footer({ votes, comments, content }) {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    const { database } = useContext(FirebaseContext);
    const { isVoted, id, setIsVoted } = useCheckVotes(user?.user_id, content?.key);
    const [vote_num, setVote_num] = useState(votes);

    var saved;
    var vote_numbers = vote_num;
    const [save, setSave] = useState(false);

    const handleSave = async () => {
        if (saved == null) await database.ref('Saves').child(`${user?.username}/${content?.key}`).set(1);
        else await database.ref('Saves').child(`${user?.username}/${content?.key}`).remove();
    }

    useEffect(() => {
        async function getVotes() {
            await database
                .ref(`Posts/${content?.key}`)
                .on('value', (snapshot) => {
                    if (snapshot.exists()) {
                        vote_numbers = snapshot.val().vote_numbers;
                        setVote_num(vote_numbers);
                    }
                });
        }
        getVotes();
    }, [vote_numbers]);

    useEffect(() => {
        async function getSaved() {
            await database
                .ref(`Saves/${user?.username}/${content?.key}`)
                .on('value', (snapshot) => {
                    if (snapshot.val()) setSave(true);
                    else setSave(false);
                    saved = snapshot.val();
                });
        }
        getSaved();
    }, saved);

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
                vote_numbers: vote_numbers + 1
            });
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
                vote_numbers: vote_numbers - 1
            });
    }

    return (
        <div className="p-4 pt-2 pb-1">
            <div className="grid grid-cols-3 text-2xl">
                <div className="font-bold flex flex-row justify-center items-center">
                    {isVoted === false &&
                        <ArrowDropUpIcon onClick={upvote} className="mr-1" />
                    }

                    {isVoted === true &&
                        <ArrowDropDownIcon onClick={downvote} className="mr-1" />
                    }

                    <div>{vote_num}</div>
                </div>
                <div className="font-bold flex flex-row justify-center items-center">
                    <ChatBubbleOutlineIcon className="mr-1" />
                    <div>{comments}</div>
                </div>
                <div className="font-bold flex justify-center items-center">
                    <GetAppIcon onClick={handleSave} className="cursor-pointer rounded-full" fontSize="large" style={save ? { backgroundColor: 'green', fill: 'white' } : {}} />
                </div>
            </div>
        </div>
    );
}

Footer.propTypes = {
    votes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    content: PropTypes.object.isRequired
};
