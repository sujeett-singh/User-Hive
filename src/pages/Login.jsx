import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [registeredUser, setRegistredUser] = useState(null);

  let navigate = useNavigate()

  useEffect(() => {
    async function getSignupUsers() {
      let { data } = await axios.get("http://localhost:4040/users");
      console.log(data);
      setRegistredUser(data)// storing data to state
    }
    getSignupUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    let authUser = registeredUser.find((user)=>{
      return user.email === formData.email && user.password === formData.password
    })

    console.log(authUser);

    if(authUser?.email === "admin@gmail.com" && authUser?.password === "admin123"){

      //navigate admin page
      navigate("/admin")

      //adminID id set in sessionStorage
      sessionStorage.setItem("adminID",authUser.id)

    }else if(authUser) {
      //navigate profile page
      navigate("/profile")

      //authuser id set in sessionStorage
      sessionStorage.setItem("userID",authUser.id)
      
    }else{
      // popup not registred
      toast.error("not registered")

      // navigate signup page
      navigate("/signup")
    }
    

  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
 