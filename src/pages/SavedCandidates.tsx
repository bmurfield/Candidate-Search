import { useEffect, useState } from "react";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    const candidates = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    setSavedCandidates(candidates);
    setFilteredCandidates(candidates);
  }, []);

  useEffect(() => {
    const filtered = savedCandidates.filter((candidate) =>
      ["name", "username", "location"].some((key) =>
        candidate[key]?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredCandidates(filtered);
  }, [searchQuery, savedCandidates]);

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (!sortConfig) return 0;
    const aValue = a[sortConfig.key]?.toLowerCase() || "";
    const bValue = b[sortConfig.key]?.toLowerCase() || "";
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Update sort configuration
  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        // Toggle direction
        return {
          key,
          direction: prevConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };
  return (
    <div>
      <h1>Potential Candidates</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name, username, or location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      {sortedCandidates.length === 0 ? (
        <p>No candidates match your criteria.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>Name</th>
              <th onClick={() => handleSort("username")}>Username</th>
              <th onClick={() => handleSort("location")}>Location</th>
              <th>Email</th>
              <th onClick={() => handleSort("company")}>Company</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {sortedCandidates.map((candidate: any, index) => (
              <tr key={index}>
                <td>{candidate.name}</td>
                <td>{candidate.username}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email}</td>
                <td>{candidate.company}</td>
                <td>
                  <a
                    href={candidate.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Profile
                  </a>
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

//   return (
//     <div>
//       <h1>Potential Candidates</h1>
//       {savedCandidates.length === 0 ? (
//         <p>No candidates have been saved yet.</p>
//       ) : (
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Username</th>
//               <th>Location</th>
//               <th>Email</th>
//               <th>Company</th>
//               <th>Profile</th>
//             </tr>
//           </thead>
//           <tbody>
//             {savedCandidates.map((candidate: any, index) => (
//               <tr key={index}>
//                 <td>{candidate.name}</td>
//                 <td>{candidate.username}</td>
//                 <td>{candidate.location}</td>
//                 <td>{candidate.email}</td>
//                 <td>{candidate.company}</td>
//                 <td>
//                   <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default SavedCandidates;
