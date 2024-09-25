
export default function AddSimple () {

    return (
        <>
        <table><tbody>
        <tr>
        <th> </th><th>Goal name</th><th>Color</th>
        </tr>
            <tr key={`goal-${index}`}>
                <td className="remove-by-index" onClick={() => {removeItem(index)}}><img src={Delete} className="delete-icon" /></td>
                <td>
                    <input type="text" className={`name-goal name-simple ${goal.color}`} value={goal.name} onChange={(e) => handleGoalNameChange(index, e.target.value)}/>
                </td>
                <td>
                    <div className={`color-box ${goal.color}`} value={goal.color} onClick={openColorBox}></div>
                    <div className="color-choices">
                        <div className="color-option purple" onClick={() => {handleGoalColorChange(index, 'purple')}}></div>
                        <div className="color-option yellow-green" onClick={() => {handleGoalColorChange(index, 'yellow-green')}}></div>
                        <div className="color-option orange" onClick={() => {handleGoalColorChange(index, 'orange')}}></div>
                        <div className="color-option red" onClick={() => {handleGoalColorChange(index, 'red')}}></div>
                    </div>
                </td>
            </tr>
        </tbody></table>
        </>
    )
}