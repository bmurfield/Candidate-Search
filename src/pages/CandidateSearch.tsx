import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';  

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<any>(null);  // Store current candidate
  const [candidatesList, setCandidatesList] = useState<any[]>([]); // Store all loaded candidates

  useEffect(() => {
    const loadCandidates = async () => {
      const candidates = await searchGithub();


      setCandidatesList(candidates);
      setCandidate(candidates[0]);  // Display the first candidate
    };
    
    loadCandidates();
  }, []);

  const saveCandidate = () => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    
    // Show next candidate
    setCandidatesList(prev => prev.slice(1));  // Remove the saved candidate from the list
    setCandidate(candidatesList[1]);
  };

  const skipCandidate = () => {
    setCandidatesList(prev => prev.slice(1));  // Skip the current candidate
    setCandidate(candidatesList[1]);
  };

  if (!candidate) {
    return <p>No candidates available</p>;  // Handle case when no candidates are available
  }

  return (
    <div>
      <h1>Candidate Search</h1>
      <div>
        <p><strong>Name:</strong> {candidate.name}</p>
        <p><strong>Username:</strong> {candidate.username}</p>
        <p><strong>Location:</strong> {candidate.location}</p>
        <p><strong>Email:</strong> {candidate.email}</p>
        <p><strong>Company:</strong> {candidate.company}</p>
        <p><strong>Profile:</strong> <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a></p>
        <img src={candidate.avatar} alt="Avatar" width="100" height="100" />
      </div>
      <button onClick={saveCandidate}>+</button>
      <button onClick={skipCandidate}>-</button>
      {candidatesList.length === 0 && <p>No more candidates available to review.</p>}
    </div>
  );
};

export default CandidateSearch;
