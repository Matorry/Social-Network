import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/use.user";
import { UserNoId } from "../models/user";

type Props = {
  mode: "register" | "update";
  currentUser?: UserNoId;
};

const RegistrationForm = ({ mode, currentUser }: Props) => {
  const { registerUser, updateUser, error, user } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "update" && currentUser) {
      setUserData(currentUser);
    }
  }, [mode, currentUser]);

  const [userData, setUserData] = useState<UserNoId>({
    userName: "",
    name: "",
    surname: "",
    imageUrl: "",
    followingRelations: { followers: [], followings: [] },
    isPublic: true,
    email: "",
    paswd: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (mode === "register") {
      try {
        await registerUser(userData);
        navigate("/login");
      } catch (error) {
        console.error("Error during registration:", error);
      }
      return;
    }
    try {
      await updateUser(user);
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="userName"
          value={userData.userName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Surname:</label>
        <input
          type="text"
          name="surname"
          value={userData.surname}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />
      </div>
      {mode === "register" && (
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="paswd"
            value={userData.paswd}
            onChange={handleInputChange}
          />
        </div>
      )}
      <div>
        <label>Profile Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={userData.imageUrl}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">
        {mode === "register" ? "Register" : "Update"}
      </button>
      {mode === "register" && (
        <div>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
};

export default RegistrationForm;
