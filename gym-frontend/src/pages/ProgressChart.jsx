import { useEffect, useState } from 'react';
import { fetchProgressData } from '../utils/api';
import React from 'react';



const Progress = () => {
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const getProgressData = async () => {
      try {
        const data = await fetchProgressData(token);
        setProgressData(data);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };

    getProgressData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Progreso</h1>
      {progressData ? (
        <ProgressChart data={progressData} />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default Progress;