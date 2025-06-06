import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  let { id } = useParams(); // used to extract dynamic route value
  console.log(id);

  let [editEmp, setEditEmp] = useState({});

  let navigate = useNavigate()

  useEffect(() => {
    async function getEdituser() {
      let { data } = await axios.get(`http://localhost:4040/users/${id}`);
      console.log(data);
      setEditEmp(data); // storing data to state
    }
    getEdituser();
  }, []);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setEditEmp({ ...editEmp, [name]: value });
  };

  let formSubmit = async (e) => {
    e.preventDefault();
    console.log(editEmp);
    try {
      let resp = await axios.put(`http://localhost:4040/users/${id}`, editEmp);
      console.log(resp);
      toast.success("user updated");
      navigate("/admin")
    } catch (error) {
      toast.error("unable to edit");
    }
  };

  return (
    <div>
      <h1>EditUser</h1>
      <form onSubmit={formSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={editEmp.username}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={editEmp.email}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={editEmp.password}
          onChange={handleChange}
        />
        <br />
        <br />

        <label>Phone No</label>
        <input
          type="tel"
          name="phoneno"
          value={editEmp.phoneno}
          onChange={handleChange}
        />
        <br />
        <br />

        <button type="submit">update</button>
      </form>
    </div>
  );
};

export default EditUser;
