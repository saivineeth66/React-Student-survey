import React from 'react'
import '../Styles/List.css'
import { useNavigate } from 'react-router-dom'





function SurveyList({surveys, onDelete}) {
    const navigate = useNavigate();

    const onEdit= (id) => {
        navigate(`/edit-survey/${id}`)
    }
  return (
    <div>
     {surveys.map((survey, index) => (
        <div className="survey-details" key={index}>
            <p><strong>Survey Id:</strong> { survey.id }</p>
      <p><strong>User Name:</strong> { survey.userName }</p>
      <p><strong>Street Address:</strong> {survey.streetAddress }</p>
      <p><strong>City:</strong> {survey.city }</p>
      <p><strong>State:</strong> {survey.state }</p>
      <p><strong>Zip Code:</strong> { survey.zipCode }</p>
      <p><strong>Email:</strong> {survey.email }</p>
      <p><strong>Phone Number:</strong> { survey.phoneNumber }</p>
      <p><strong>Date of Survey:</strong> { survey.dateOfSurvey }</p>
      <p><strong>URL:</strong> {survey.url }</p>
      {/* <div *ngFor="let aspect of aspectLabels">
        <p><strong>{{ aspect }}:</strong> {{ survey[aspect] ? 'Yes' : 'No' }}</p>
      </div> */}
      <p><strong>Interest:</strong> {survey.interest }</p>
      <p><strong>Graduation Month:</strong> { survey.graduationMonth }</p>
      <p><strong>Graduation Year:</strong> { survey.graduationYear }</p>
      <p><strong>Likelihood to Recommend:</strong> { survey.likelihoodToRecommend }</p>
      <p><strong>Comments:</strong> {survey.comments }</p>
      <div className="survey-actions">
            <button onClick={() => onEdit(survey.id)} className="btn btn-primary">
              Edit
            </button>
            <button onClick={() => onDelete(survey.id)} className="btn btn-secondary">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SurveyList
