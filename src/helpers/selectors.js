export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) return [];
  if (!state.days.map(item => item.name).includes(day)) return [];
  const filteredDays = state.days.filter(element => element.name === day)[0]
    .appointments;
  const filteredAppointments = filteredDays.map(id => state.appointments[id]);
  return filteredAppointments;
}
export function getInterviewersForDay(state, myDay) {
  
  const foundDay = state.days.find(stateDay => myDay === stateDay.name);
  if (!foundDay) {
    return [];
  }  if (foundDay && foundDay.appointments.length === 0) {
    return []
  }
  let foundInterviewers = foundDay.appointments.map((currentAppointmentId) => {
    const currentAppointment = state.appointments[currentAppointmentId]
    if (currentAppointment.interview == null) {
      return null;
    }

    const interviewerId = currentAppointment.interview.interviewer
    const theInterviewer = state.interviewers[interviewerId]
    return theInterviewer
  })
  foundInterviewers = foundInterviewers.filter((interviewer) => {
    return interviewer != null
  })

  return foundInterviewers;
}

export function getInterview(state, interview) {
  if (interview) {
    const interviewer = state.interviewers[interview.interviewer];
    return {
      ...interview,
      interviewer
    };
  } else {
    return null;
  }
}