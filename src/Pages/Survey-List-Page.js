import React, { useEffect, useState } from 'react';
import SurveyList from '../Components/SurveyList';
import SurveyService from '../Service/SurveyService';

function SurveyListPage() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
  async function fetchSurveys(){
    try{
        const response = await fetch('http://localhost:8080/api/v1/survey/getallsurveys');
        // If the response is ok, parse the JSON data
        if (response.ok) {
          const data = await response.json();
          // Set the surveys state with the fetched data
          setSurveys(data);
        } else {
          // If the response is not ok, throw an error with the response status
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    }
    catch(error){
     console.log(error)
    }
  }

  fetchSurveys();

  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/survey/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Filter out the survey that was deleted
        setSurveys(prevSurveys => prevSurveys.filter(survey => survey.id !== id));
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Deleting survey failed:', error);
    }
  };

  return (
    <div>
      <SurveyList surveys={surveys}  onDelete={handleDelete} />
    </div>
  );
}

export default SurveyListPage;
