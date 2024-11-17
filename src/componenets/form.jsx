import { useState, useEffect } from "react";
import axios from "axios";
import Tableau from "./table";

export default function Formulaire() {
  const [equipes, setEquipes] = useState([]);
  const [joueurs, setJoueurs] = useState([]);
  const [equipeA, setEquipeA] = useState("");
  const [equipeB, setEquipeB] = useState("");
  const [date, setDate] = useState("");
  const [matchs, setMatchs] = useState([]);
  const [selectedEquipe, setSelectedEquipe] = useState("");
  const [selectedJoueur, setSelectedJoueur] = useState("");
  const [goalMinute, setGoalMinute] = useState("");

  function ListeJoueurs(equipe) {
    let listeJ = [];
    for (let i = 1; i <= 11; i++) {
      listeJ.push(`${equipe.substring(0, 2)} ${i}`);
    }
    setJoueurs(listeJ);
  }

  function AjouterMatch() {
    if (!equipeA || !equipeB || !date) {
      alert("Please fill all fields for the match");
      return;
    }
    if (equipeA === equipeB) {
      alert("Les deux équipes doivent être différentes");
      return;
    }
    setMatchs([
      ...matchs,
      { equipe1: equipeA, equipe2: equipeB, date, goalsA: [], goalsB: [] },
    ]);
  }

  function AjouterBut() {
    if (!selectedEquipe || !selectedJoueur || !goalMinute) {
      alert("Please fill all fields for the goal");
      return;
    }

    if (goalMinute < 0 || goalMinute > 90) {
      alert("La minute du but doit être entre 0 et 90");
      return;
    }

    setMatchs((prevMatchs) =>
      prevMatchs.map((match) => {
        if (match.equipe1 === selectedEquipe) {
          return {
            ...match,
            goalsA: [...match.goalsA, { joueur: selectedJoueur, minute: goalMinute }],
          };
        } else if (match.equipe2 === selectedEquipe) {
          return {
            ...match,
            goalsB: [...match.goalsB, { joueur: selectedJoueur, minute: goalMinute }],
          };
        }
        return match;
      })
    );
  }

  useEffect(() => {
    async function fetchEquipes() {
      try {
        const response = await axios.get("https://gahi-said.com/apis/matchs.php");
        if (Array.isArray(response.data)) {
          setEquipes(response.data);
        }
      } catch (error) {
        console.error("Error fetching equipes:", error);
      }
    }
    fetchEquipes();
  }, []);

  return (
    <>
      <form>
        <select onChange={(e) => setEquipeA(e.target.value)}>
          <option value="">Choisir une équipe A</option>
          {equipes.map((equipe, index) => (
            <option key={index} value={equipe}>
              {equipe}
            </option>
          ))}
        </select>
        <br />
        <select onChange={(e) => setEquipeB(e.target.value)}>
          <option value="">Choisir une équipe B</option>
          {equipes.map((equipe, index) => (
            <option key={index} value={equipe}>
              {equipe}
            </option>
          ))}
        </select>
        <br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date du match"
        />
        <br />
        <h3>Les buts</h3>
        <select
          onChange={(e) => {
            setSelectedEquipe(e.target.value);
            ListeJoueurs(e.target.value);
          }}
        >
          <option value="">Choisir une équipe</option>
          <option value={equipeA}>{equipeA}</option>
          <option value={equipeB}>{equipeB}</option>
        </select>
        <br />
        <select onChange={(e) => setSelectedJoueur(e.target.value)}>
          <option value="">Choisir un joueur</option>
          {joueurs.map((joueur, index) => (
            <option key={index} value={joueur}>
              {joueur}
            </option>
          ))}
        </select>
        <br />
        <input
          type="number"
          value={goalMinute}
          onChange={(e) => setGoalMinute(e.target.value)}
          placeholder="Minute du but"
          min={0}
          max={90}
        />
        <br />
        <input type="button" value="Ajouter Match" onClick={AjouterMatch} />
        <input type="button" value="Ajouter But" onClick={AjouterBut} />
      </form>
      <Tableau matchs={matchs} />
    </>
  );
}
