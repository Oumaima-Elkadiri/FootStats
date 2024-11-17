export default function Tableau({ matchs }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Equipe 1</th>
            <th>Equipe 2</th>
            <th>Buts équipe 1</th>
            <th>Buts équipe 2</th>
          </tr>
        </thead>
        <tbody id="ListeMatchs">
          {matchs.map((match, index) => (
            <tr key={index}>
              <td>{match.date}</td>
              <td>{match.equipe1}</td>
              <td>{match.equipe2}</td>
              <td>
                Goals: {match.goalsA.length}
                <br />
                {match.goalsA.map((goal, i) => (
                  <p key={i}>
                    {goal.joueur} à {goal.minute} min
                  </p>
                ))}
              </td>
              <td>
                Goals: {match.goalsB.length}
                <br />
                {match.goalsB.map((goal, i) => (
                  <p key={i}>
                    {goal.joueur} à {goal.minute} min
                  </p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
