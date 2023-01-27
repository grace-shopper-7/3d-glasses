import React from "react";
import { NavLink } from "react-router-dom";
import ReviewForm from 
import 'css'

const Activity = ({activity, isCreatingRA, setIsCreatingRA, isEditable, setIsEditable, routineActivities, routineId}) => {
  if (activity?.routineActivityId || isCreatingRA) {return (
    <div className='activity'>
      <ActivityForm activity={activity} isCreatingRA={isCreatingRA} setIsCreatingRA={setIsCreatingRA} isEditable={isEditable} setIsEditable={setIsEditable} routineActivities={routineActivities} routineId={routineId}/> 
    </div>
  )}
  
  else{return (
    <div className='activity'>
      <NavLink to={`/activities/${activity.id}/routines`}><h4>{activity.name}</h4></NavLink>
      <p>{activity.description}</p>
    </div>
  )}
} 

export default Activity