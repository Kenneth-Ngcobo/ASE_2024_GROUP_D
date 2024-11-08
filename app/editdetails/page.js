"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../hook/useAuth";
export default function EditDetails() {
  const { logout } = useAuth();
  const [userDetails, setUserDetails] = useState({
    email: "",
    fullName: "Not set",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
      if (loggedInUserEmail) {
        setUserDetails((prev) => ({ ...prev, email: loggedInUserEmail }));

        try {
          const response = await fetch(
            `/api/user/details?email=${loggedInUserEmail}`
          );
          if (response.ok) {
            const data = await response.json();
            setUserDetails({
              email: data.email,
              fullName: data.fullName || "Not set",
            });
          } else {
            console.error("Failed to fetch user details");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleToggleEdit = () => setIsEditing((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="edit-details">
      <h2>Edit Your Details</h2>
      <p>Email: {userDetails.email || "No email available"}</p>
      {isEditing ? (
        <div>
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={userDetails.fullName}
              onChange={handleInputChange}
            />
          </label>

          <button onClick={handleToggleEdit}>Save Changes</button>
        </div>
      ) : (
        <div>
          <p>Full Name: {userDetails.fullName}</p>

          <button onClick={handleToggleEdit}>Edit Details</button>
        </div>
      )}
    </div>
  );
}
