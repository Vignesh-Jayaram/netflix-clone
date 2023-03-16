import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import Nav from "../Components/Nav";
import "./ProfileScreen.css";

function ProfileScreen() {
  const user = useSelector(selectUser);

  function renewalDate() {
    let d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toLocaleDateString();
  }

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans (Current plan: Premium)</h3>
              <p>Renewal date: {renewalDate()}</p>
              <div className="plansList">
                <ul>
                  <li>
                    <div className="planContainer">
                      <div className="planName">
                        <p>Netflix Standard</p>
                        <p>1080p</p>
                      </div>
                      <button className="planSubscription__button">
                        Subscribe
                      </button>
                    </div>
                  </li>
                  <li>
                    <div className="planContainer">
                      <div className="planName">
                        <p>Netflix Basic</p>
                        <p>480p</p>
                      </div>
                      <button className="planSubscription__button">
                        Subscribe
                      </button>
                    </div>
                  </li>
                  <li>
                    <div className="planContainer">
                      <div className="planName">
                        <p>Netflix Premium</p>
                        <p>4k+HDR</p>
                      </div>
                      <button className="planSubscription__button">
                        Subscribe
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => auth.signOut()}
                className="profileScreen__signoutButton"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
