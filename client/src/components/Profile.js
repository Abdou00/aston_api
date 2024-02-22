import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [timezone, setTimezone] = useState('');

  useEffect(() => {
    function getUserDetails() {
      if (id) {
        fetch(`http://localhost:4000/schedules/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setUsername(data.username);
            setSchedules(data.schedules);
            setTimezone(data.timezone.label);
            setLoading(false);
          })
          .catch((err) => console.error(err));
      }
    }

    getUserDetails();
  }, [id]);

  useEffect(() => {
    if (!localStorage.getItem('_id')) navigate('/')
  }, [navigate]);

  return (
    <main className="profile">
      {
        loading ? (<p>LOADING...</p>) : (
          <div style={{width: "70%"}}>
            <h2>Hello { username }</h2>
            <p>My schedule - { timezone }</p>
            <table>
              <tbody>
                { setSchedules.map((sch) => (
                  <tr key={sch.day}>
                    <td>{ sch.day }</td>
                    <td>{ sch.startTime || "Unavaible" }</td>
                    <td>{ sch.endTime || "Unavaible" }</td>
                  </tr>
                )) }
              </tbody>
            </table>
          </div>
        )
      }
    </main>
  )
}

export default Profile;