import { useEffect, useState, useRef } from "react"
import { NavLink } from "react-router-dom"
import { useImmer } from "use-immer"
import { deleteRoutineActivity, getActivities, modifyRoutineActivities, postActivityToRoutine } from "../api/fetch"
import { useActivities, useRoutines, useUser } from "../state/context"

const blankInitData = {
  name: '',
  description: '',
  count: '',
  duration: ''
}

const ActivityForm = ({activity, isCreatingRA, setIsCreatingRA, isEditable, routineActivities, routineId}) => {
  // activity cases: routine-display, activities page-display, edit on routine, edit alone, add on routine (pull from available activities), add to activities
  const [areFieldsDisabled, setAreFieldsDisabled] = useState(true)
  const [activityData, setActivityData] = useImmer(blankInitData)
  const { token } = useUser()
  const { addActivityToRoutine, removeActivityFromRoutine } = useRoutines()
  const { activities, populateActivities } = useActivities()
  const countRef = useRef()
  const durationRef = useRef()

  useEffect(() => {
      if (isCreatingRA) {
      setAreFieldsDisabled(false)
    } else if (isEditable){
      setAreFieldsDisabled(false)
    } else {
      setAreFieldsDisabled(true)
    }
  }, [isCreatingRA, isEditable])

  //set the routine activity display case
  useEffect(() => {
    if(activity) {
      setActivityData(activity)
    }
  }, [])
  
  //filter activities by routine
  useEffect(() => {
    const fetchActivities = async () => {
      const freshActivities = await getActivities()
      if (!routineActivities) {
        populateActivities(freshActivities)
      } else {
        const raIds = routineActivities.map(ra => {
          return ra.id
        })
        const filteredActivities = freshActivities.filter(activity => {
          return !raIds.includes(activity.id)
        })
        populateActivities(filteredActivities)
      }
    }
    fetchActivities()
  }, [])

  function handleSelectChange(e) {
    //This is very confusing i'm sorry i'm in pain
    if (!e.target.value) {
      setActivityData(blankInitData)
      return
    }
    const activity = JSON.parse(JSON.stringify(activities.find(activity => (activity.id === +e.target.value))));
    activity.count = ''
    activity.duration = ''
    setActivityData(activity)
  }

  async function handleFormSubmit(e) {
    //conditional for adding activity or modifying one
    e.preventDefault()

    //add activity to routine
    //ONLY WRITE INTEGERS FOR COUNT AND DURATION
    const addBody = {
      activityId: activityData.id,
      count: countRef.current.value,
      duration: durationRef.current.value
    }
    console.log(addBody)
    try {
      if (!addBody.activityId){
        alert('You must select a activity to add!')
        throw new Error('You must select a activity to add!')
      }
      const addedActivity = await postActivityToRoutine(addBody, routineId, token)

      //I know this is evil please ignore. I'm over react.
      const raID = addedActivity.id
      addedActivity.id = addedActivity.activityId
      delete addedActivity.activityId
      addedActivity.routineActivityId = raID
      addedActivity.name = activityData.name
      addedActivity.description = activityData.description

      addActivityToRoutine(routineId, addedActivity)
      setIsCreatingRA(false)
    } catch (err) {
      throw err
    }

  }

  async function handleUpdateActivity() {
    const modBody = {
      count: countRef.current.value,
      duration: durationRef.current.value
    }
    try {
      await modifyRoutineActivities(modBody, activity.routineActivityId, token)
      alert(`Changes saved to activity`)
    } catch (err) {
      throw err
    }
  }

  async function handleDeleteActivity() {
    try {
      removeActivityFromRoutine(routineId, activity.id)
      const deletedAct = await deleteRoutineActivity(activity.routineActivityId, token)
      console.log(deletedAct)
    } catch (err) {
      throw err
    }
  }

  return (
    /* Display form and edit */
    <form onSubmit={(e) => {handleFormSubmit(e)}}>
        
      <div>
        <label htmlFor="activity-name"></label>
        {isCreatingRA 
        ? <select name="activity-names" id="activity-names" onChange={(e) => {handleSelectChange(e)}} required={true}>
          <option defaultValue={null}></option>
          {
          activities?.map(activity => {
            return (
              <option key={activity.id} value={activity.id}>{activity.name}</option>
            )
          })
          }</select> 
        : <NavLink to={`/activities/${activity?.id}/routines`} className="RA-link"><input type="text" defaultValue={activityData.name} disabled={true}/></NavLink>}
      </div>
        
      <div>
        <label htmlFor="activity-description"></label>
        <input type="text" defaultValue={activityData.description} disabled={true}/>
      </div>
      <div>
        <label htmlFor="activity-count">Reps: </label>
        <input type="number" ref={countRef} defaultValue={activityData.count} disabled={areFieldsDisabled} required/>
      </div>
      <div>
        <label htmlFor="activity-duration">Sets/duration: </label>
        <input type="number" ref={durationRef} defaultValue={activityData.duration} disabled={areFieldsDisabled} required/>
      </div>
      { isCreatingRA
        ? <button>Add activity</button>
        : null
      }
      { isEditable
      ? <div>
          <button type="button" onClick={handleUpdateActivity}>Save</button>
          <button type="button" onClick={handleDeleteActivity}>Delete</button>
        </div>
      : null}
    </form> 
  )
}

export default ActivityForm