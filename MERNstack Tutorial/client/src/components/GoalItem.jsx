import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
    const dispatch = useDispatch()

    const onDelete = () => {
        dispatch(deleteGoal(goal._id))
    }

    return (
        <div className="goal">
            <div>
                {new Date(goal.createdAt).toLocaleString('en-US')}
                <h2>{goal.text}</h2>
                <button className="close" onClick={onDelete}>
                    X
                </button>
            </div>
        </div>
    )
}

export default GoalItem