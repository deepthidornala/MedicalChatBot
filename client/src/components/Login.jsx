import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ employeeId: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[900px] h-[500px] flex rounded-lg shadow-lg">
        <div className="w-2/3 flex flex-col justify-center items-center bg-white rounded-l-lg">
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <h1 className="text-[40px] font-bold mb-4 text-center">Login to Your Account</h1>
            <input
              type="number"
              placeholder="Employee ID"
              name="employeeId"
              onChange={handleChange}
              value={data.employeeId}
              required
              className="w-full p-4 mb-4 rounded-lg bg-[#edf5f3] text-gray-700"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="w-full p-4 mb-4 rounded-lg bg-[#edf5f3] text-gray-700"
            />
            {error && (
              <div className="w-full p-4 mb-4 text-white bg-red-500 text-center rounded-md">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-[#3bb19b] text-white font-bold rounded-full mt-4 hover:bg-[#34a38b]"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="w-1/3 flex flex-col justify-center items-center bg-[#3bb19b] rounded-r-lg">
          <h1 className="text-white text-[40px] mb-4">New Here?</h1>
          <Link to="/signup">
            <button
              type="button"
              className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-full"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
