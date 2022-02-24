export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) return [];
  if (!state.days.map(item => item.name).includes(day)) return [];
  const filteredDays = state.days.filter(element => element.name === day)[0]
    .appointments;
  const filteredAppointments = filteredDays.map(id => state.appointments[id]);
  return filteredAppointments;
}

//function that fetches all interviewers assigned for the selected day
export function getInterviewersForDay(state, myDay) {
  // const state = {
  //     days: [
  //     foundDay   stateDay{
  //         id: 1,
  //         name: "Monday",
  //         appointments: [1, 2, 3]
  //       },
  //       stateDay{
  //         id: 2,
  //         name: "Tuesday",
  //         appointments: [4, 5]
  //       }
  //     ],
  const foundDay = state.days.find(stateDay => myDay === stateDay.name);
  // IF i cant find a day, i have no interviewers
  if (!foundDay) {
    return [];
  }
  // If i do have a day but i dont have any appointments then i still have no interviews
  if (foundDay && foundDay.appointments.length === 0) {
    return []
  }
  // If i have a day and i have appointments 
  // then loop through appointmnets to find interview
  let foundInterviewers = foundDay.appointments.map((currentAppointmentId) => {
    // logic 
    // look at the state.appointments with the currentAppointmentId
    const currentAppointment = state.appointments[currentAppointmentId]
    // and if that appointment has no interview
    if (currentAppointment.interview == null) {
      return null;
      // / then return no interviewer
    }
    // if that appointment has an interview 
    // then use that interviewerId on the interview to get the interviewerName in the state.interviewers
    const interviewerId = currentAppointment.interview.interviewer
    const theInterviewer = state.interviewers[interviewerId]
    return theInterviewer
  })
  foundInterviewers = foundInterviewers.filter((interviewer) => {
    return interviewer != null
  })

  // we can delete the following comments or leave for refrence
  // const foundInterviewers = foundDay.interviewers.map(interviewer => {
  //   return state.interviewers[interviewer];
  // });
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