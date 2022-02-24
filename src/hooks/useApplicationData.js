import { useState, useEffect } from "react";
import axios from "axios";
export default function useApplicationData() {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    });

    const setDay = day => setState({ ...state, day });

    useEffect(() => {
        axios.get(`/api/days`).then(response => {
            Promise.all([
                Promise.resolve(axios.get(`/api/days`)),
                Promise.resolve(axios.get(`/api/appointments`)),
                Promise.resolve(axios.get(`/api/interviewers`))
            ]).then(all => {
                setState(prev => ({
                    ...prev,
                    days: all[0].data,
                    appointments: all[1].data,
                    interviewers: all[2].data
                }));
            });
        });
    }, []);

    const bookInterview = (id, interview) => {
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };

        const appointments = {
            ...state.appointments,
            [id]: appointment
        };
        const newSpots = state.days.map(day => {
            if (day.name === state.day) {
                console.log('here', day, state.day)
                let bookSpots = 0;
                for(let appointment in appointments){
                    if(day.appointments.includes(appointments[appointment].id) && appointments[appointment].interview !== null) {
                        console.log('hello', bookSpots)
                        console.log('hello', appointments)
                        bookSpots++;
                    }
                }

                day.spots = 5-bookSpots
            }
            return day;
        });

        return axios.put(`api/appointments/${id}`, appointment).then(() => {
            setState({
                ...state,
                appointments,
                days: newSpots
            });
        });
    };

    const editInterviewSlot = (id, interview) => {
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };

        const appointments = {
            ...state.appointments,
            [id]: appointment
        };
        console.log(appointments)
        return axios.put(`api/appointments/${id}`, appointment).then(() => {
            setState({
                ...state,
                appointments
            });
        });
    };
    

    const cancelInterview = id => {
        const appointment = {
            ...state.appointments[id],
            interview: null
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };
        const newSpots = state.days.map(day => {
            if (day.name === state.day) {
                day.spots++;
            }
            return day;
        });

        return axios.delete(`api/appointments/${id}`, appointment).then(() => {
            setState({
                ...state,
                appointments,
                days: newSpots
            });
        });
    };

    return { cancelInterview, bookInterview, state, setDay, editInterviewSlot };
}