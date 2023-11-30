import React, { useState } from 'react';
import '../Styles/Formscreen.css'
import { useNavigate } from 'react-router-dom'

const SurveyForm = () => {
  const navigate = useNavigate();
    const headingStyle = {
        border: '5px solid #006633',
        boxShadow: '10px 10px 20px rgba(0.2, 0.2, 0.4, 0.2)',
        textAlign: 'center',
        padding: '15px',
        color: '#006633',
        fontFamily: 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif',
        fontSize: '30px',
        fontWeight: 'bold'
      };
  // Define the initial form state with all fields
  const [formData, setFormData] = useState({
    userName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    phoneNumber: '',
    dateOfSurvey: '',
    url: '',
    campus: false,
    atmosphere: false,
    dormRooms: false,
    students: false,
    location: false,
    sports: false,
    interest: '',
    graduationMonth: '',
    graduationYear: '',
    likelihoodToRecommend: '',
    comments: '',
  });

  const [submissionMessage, setSubmissionMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = 'http://localhost:8080/api/v1/survey/addsurvey';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setSubmissionMessage('Survey submitted successfully!');
      setTimeout(()=> navigate(`/view-surveys`),2000)
     

      // Reset form after successful submission
      setFormData({
      });
      console.log(result);
    } catch (error) {
      setSubmissionMessage('Failed to submit the survey. Please try again.');
      console.error(error);
    }
  };

  return (
  
    <div className="container mt-5">
    <div style={headingStyle}>CS Department Survey</div>
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="userName" className="form-label">User Name(*)</label>
          <input type="text" className="form-control" id="userName" name="userName" value={formData.userName} onChange={handleInputChange} required />
        </div>
        <div className="col">
          <label htmlFor="streetAddress" className="form-label">Street Address(*)</label>
          <input type="text" className="form-control" id="streetAddress" name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} required />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="city" className="form-label">City(*)</label>
          <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleInputChange} required />
        </div>
        <div className="col">
          <label htmlFor="state" className="form-label">State(*)</label>
          <input type="text" className="form-control" id="state" name="state" list="states" value={formData.state} onChange={handleInputChange} required />
        </div>
        <div className="col">
          <label htmlFor="zipCode" className="form-label">Zip-Code(*)</label>
          <input type="text" className="form-control" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="email" className="form-label">Email(*)</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="col">
          <label htmlFor="phoneNumber" className="form-label">Phone-number(*)</label>
          <input type="tel" className="form-control" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="dateOfSurvey" className="form-label">Date of Survey(*)</label>
          <input type="date" className="form-control" id="dateOfSurvey" name="dateOfSurvey" value={formData.dateOfSurvey} onChange={handleInputChange} required />
        </div>
        <div className="col">
          <label htmlFor="url" className="form-label">URL(*)</label>
          <input type="url" className="form-control" id="url" name="url" value={formData.url} onChange={handleInputChange} required />
        </div>
      </div>
      {/* Aspect of Campus */}
      <p>What aspect of the campus did you find most appealing?</p>
        <div className="form-check">
          <label>
            <input
              type="checkbox"
              name="campus"
              checked={formData.campus}
              onChange={handleInputChange} /> Campus
          </label>
        </div>
        <div className="form-check">
          <label>
            <input
              type="checkbox"
              name="atmosphere"
              checked={formData.atmosphere}
              onChange={handleInputChange} /> Atmosphere
          </label>
        </div>
        <div className="form-check">
          <label>
            <input
              type="checkbox"
              name="dormRooms"
              checked={formData.dormRooms}
              onChange={handleInputChange} /> Dorm Rooms
          </label>
        </div>
        <div className="form-check">
          <label>
            <input
              type="checkbox"
              name="location"
              checked={formData.location}
              onChange={handleInputChange} /> Location
          </label>
        </div>
        <div className="form-check">
          <label>
            <input
              type="checkbox"
              name="students"
              checked={formData.students}
              onChange={handleInputChange} /> Students
          </label>
        </div>
        <div className="form-check">
          <label>
            <input
              type="checkbox"
              name="students"
              checked={formData.students}
              onChange={handleInputChange} /> sports
          </label>
        </div>

        {/* Interest in University */}
        <p>How did you develop an interest in the university?</p>
        <div className="form-check">
          <label>
            <input
              type="radio"
              name="interest"
              value="Internet"
              checked={formData.interest === 'Internet'}
              onChange={handleInputChange} /> Internet
          </label>
        </div>
        <div className="form-check">
          <label>
            <input
              type="radio"
              name="interest"
              value="Friends"
              checked={formData.interest === 'Friends'}
              onChange={handleInputChange} /> Friends
          </label>
        </div>
        <div className="form-check">
          <label>
            <input
              type="radio"
              name="interest"
              value="Television"
              checked={formData.interest === 'Television'}
              onChange={handleInputChange} /> Television
          </label>
        </div>

        {/* Graduation Month and Year */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="graduationMonth" className="form-label">High-School Graduation Month:(*)</label>
            <select className="form-control" id="graduationMonth" name="graduationMonth" value={formData.graduationMonth} onChange={handleInputChange} required>
              <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="graduationYear" className="form-label">High-School Graduation Year:(*)</label>
            <input type="text" className="form-control" id="graduationYear" name="graduationYear" value={formData.graduationYear} onChange={handleInputChange} required />
          </div>
        </div>

        {/* Likelihood to Recommend */}
        <div className="mb-3">
          <label htmlFor="likelihoodToRecommend" className="form-label">Likelihood of Recommending the University:</label>
          <select className="form-control" id="likelihoodToRecommend" name="likelihoodToRecommend" value={formData.likelihoodToRecommend} onChange={handleInputChange} required>
            <option value="Likely">Likely</option>
            <option value="Unlikely">Unlikely</option>
            <option value="Very Likely">Very Likely</option>
            {/* ...other options if needed */}
          </select>
        </div>

        {/* Comments */}
        <div className="mb-3">
          <label htmlFor="comments" className="form-label">Add any Comments if interested(optional):</label>
          <textarea className="form-control" id="comments" name="comments" value={formData.comments} onChange={handleInputChange} rows="3"></textarea>
        </div>

    

      {/* Submission Message */}
      {submissionMessage && <div className="alert alert-success" role="alert">{submissionMessage}</div>}

      <button type="submit" className="btn btn-primary">Submit Survey</button>
    </form>
  </div>
  );
};

export default SurveyForm;
