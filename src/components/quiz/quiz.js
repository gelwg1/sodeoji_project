import PropTypes from 'prop-types';
import QuizInfor from './quizInfor';
import QuizRank from './quizRank';

export default function Quiz({ content }) {
    // console.log(content?.key, content?.quizID);
    return (
        <div className="grid grid-cols-2 rounded col-span-4 border bg-white border-gray-primary mb-12">
            <QuizInfor active={content?.active} title={content?.title} content={content?.content} time={content?.time} create_date={content?.create_date} end_date={content?.end_date} score={content?.score}/>
            <QuizRank doneUser={content?.done_user}/>
        </div>
    );
}

Quiz.propTypes = {
    content: PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
        create_date: PropTypes.number.isRequired,
        end_date: PropTypes.number.isRequired,
        score: PropTypes.number.isRequired,
    })
};
