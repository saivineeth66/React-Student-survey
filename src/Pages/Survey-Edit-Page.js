import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Styles/Formscreen.css'; // Ensure this file exists and contains your custom CSS

function SurveyEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const aspects = ['campus', 'atmosphere', 'dormRooms', 'students', 'location', 'sports'];
  const interests = ['Internet', 'Other', 'Friends', 'Television'];

  const [survey, setSurvey] = useState({
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8080/api/v1/survey/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then((data) => {
        setSurvey(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/api/v1/survey/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(survey),
      });
      if (!response.ok) {
        throw new Error('Survey update failed');
      }
      navigate('/view-surveys'); // Redirect user to the survey list page
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h1>Edit Survey</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        {/* User Name */}
        <div className="form-group">
          <label>User Name:</label>
          <input
            type="text"
            name="userName"
            value={survey.userName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        {/* Street Address */}
        <div className="form-group">
          <label>Street Address:</label>
          <input
            type="text"
            name="streetAddress"
            value={survey.streetAddress}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        {/* City */}
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={survey.city}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        {/* State */}
        <div className="form-group">
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={survey.state}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        {/* Zip Code */}
        <div className="form-group">
          <label>Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            value={survey.zipCode}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        {/* Email */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={survey.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        {/* Phone Number */}
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={survey.phoneNumber}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        {/* Date of Survey */}
        <div className="form-group">
          <label>Date of Survey:</label>
          <input
            type="date"
            name="dateOfSurvey"
            value={survey.dateOfSurvey}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        {/* URL */}
        <div className="form-group">
          <label>URL:</label>
          <input
            type="url"
            name="url"
            value={survey.url}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>What aspect of the campus did you find most appealing?</label>
          {aspects.map((aspect) => (
            <div key={aspect} className="form-check">
              <input
                type="checkbox"
                id={aspect}
                name={aspect}
                checked={survey[aspect]}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor={aspect} className="form-check-label">
                {aspect}
              </label>
            </div>
          ))}
        </div>
        
        {/* Interest */}
        <div className="form-group">
          <label>How did you develop an interest in the university?</label>
          {interests.map((interest) => (
            <div key={interest} className="form-check">
              <input
                type="radio"
                id={interest}
                name="interest"
                value={interest}
                checked={survey.interest === interest}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor={interest} className="form-check-label">
                {interest}
              </label>
            </div>
          ))}
        </div>
        
        {/* Graduation Month */}
        <div className="form-group">
          <label>Graduation Month:</label>
          <select 
            name="graduationMonth" 
            value={survey.graduationMonth}
            onChange={handleChange}
            className="form-control"
            required>
            {/* Options for graduation month */}
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
        
        {/* Graduation Year */}
        <div className="form-group">
          <label>Graduation Year:</label>
          <input
            type="text"
            name="graduationYear"
            value={survey.graduationYear}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        {/* Likelihood to Recommend */}
        <div className="form-group">
          <label>Likelihood to Recommend:</label>
          <select 
            name="likelihoodToRecommend"
            value={survey.likelihoodToRecommend}
            onChange={handleChange}
            className="form-control"
            required>
            <option value="Likely">Likely</option>
            <option value="Unlikely">Unlikely</option>
            <option value="Very Likely">Very Likely</option>
          </select>
        </div>
        
        {/* Comments */}
        <div className="form-group">
          <label>Comments:</label>
          <textarea
            name="comments"
            value={survey.comments}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Update Survey</button>
      </form>
    </div>
  );
}

export default SurveyEditPage;
