import { useEffect, useState } from 'react';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates have been saved yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate: any, index) => (
              <tr key={index}>
                <td>{candidate.name}</td>
                <td>{candidate.login}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email}</td>
                <td>{candidate.company}</td>
                <td>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;
