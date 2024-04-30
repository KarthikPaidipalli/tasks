import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import AppointmentItem from '../Taskitem'
import './index.css'

class Taskitem extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
    teamtype: 'Team',
    taskError: false,
    dateError: false
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    this.setState(prevState => ({
      isFilterActive: !prevState.isFilterActive,
    }))
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeTeamType = event => {
    this.setState({teamtype: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const { titleInput, dateInput } = this.state
    if (!titleInput) {
      this.setState({ taskError: true })
    }
    if (!dateInput) {
      this.setState({ dateError: true })
    }
    if (titleInput && dateInput) {
      const formattedDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      const newAppointment = {
        id: uuidv4(),
        title: titleInput,
        date: formattedDate,
        isStarred: false,
        teamtype: this.state.teamtype,
      }
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        titleInput: '',
        dateInput: '',
        taskError: false,
        dateError: false
      }))
    }
  }

  getFilteredAppointmentsList = () => {
    const { appointmentsList, isFilterActive } = this.state
    return isFilterActive
      ? appointmentsList.filter(appointment => appointment.isStarred)
      : appointmentsList
  }

  render() {
    const { titleInput, dateInput, isFilterActive, teamtype, taskError, dateError } = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="add-appointment-heading">Add Tasks</h1>
                <label htmlFor="title" className="label">Task</label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                  className="input"
                  placeholder="Title"
                />
                {taskError && <p className='errormessage'>Task input should not be empty</p>}

                <label htmlFor="date" className="label">Due Date</label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                {dateError && <p className='errormessage'>Due date should not be empty</p>}

                <label htmlFor="teamType" className="label">Team Type</label>
                <select
                  id="teamType"
                  value={teamtype}
                  onChange={this.onChangeTeamType}
                  className="input1"
                >
                  <option value="Team" >Team</option>
                  <option value="Individual">Individual</option>
                </select>

                <button type="submit" className="add-button">Add</button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="appointments-heading">My Tasks</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Taskitem