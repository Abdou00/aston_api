import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();

  return (
    <main className="profile">
      <div style={{width: "70%"}}>
        <h2>My Profile</h2>
        <p>My schedule</p>
        <table>
          <tbody>
            <tr>
              <td>MON</td>
              <td>8:00am</td>
              <td>12:00am</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default Profile;