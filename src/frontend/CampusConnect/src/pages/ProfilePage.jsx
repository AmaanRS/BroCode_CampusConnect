import { useState } from "react";

export default function ProfilePage() {
  const email = localStorage.getItem("email");
  const [username, setUsername] = useState();
  const [department, setDept] = useState();
  const [role, setRole] = useState();
  const [isStudent, setIsStudent] = useState(false);
  const [isPrincipal, setIsPrincipal] = useState(false);
  const [isHod, setIsHod] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [msg, setMsg] = useState();

  async function postProfile(cred) {
    const res = await fetch("http://localhost:8000/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cred),
    });
    const data = await res.json(cred);

    console.log(data);
    setMsg(data.message);
    return data;
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("clicked");
    switch (role) {
      case "student":
        setIsStudent(true);
        setIsTeacher(false);
        setIsHod(false);
        setIsAdmin(false);
        setIsPrincipal(false);

        break;
      case "teacher":
        setIsStudent(false);
        setIsTeacher(true);
        setIsHod(false);
        setIsAdmin(false);
        setIsPrincipal(false);
        break;
      case "hod":
        setIsStudent(false);
        setIsTeacher(false);
        setIsHod(true);
        setIsAdmin(false);
        setIsPrincipal(false);
        break;
      case "admin":
        setIsStudent(false);
        setIsTeacher(false);
        setIsHod(false);
        setIsAdmin(true);
        setIsPrincipal(false);
        break;
      case "principal":
        setIsStudent(false);
        setIsTeacher(false);
        setIsHod(false);
        setIsAdmin(false);
        setIsPrincipal(true);
        break;

      default:
        break;
    }
    console.log(
      email,
      username,
      department,
      isStudent,
      isTeacher,
      isHod,
      isAdmin,
      isPrincipal
    );
    const data = postProfile({
      email,
      username,
      department,
      isStudent,
      isTeacher,
      isHod,
      isAdmin,
      isPrincipal,
    });
    console.log(data);
    setMsg(data.message);
  }

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        {/*  */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xl m-4 p-10 bg-white rounded shadow-xl"
        >
          <p className="text-gray-800 font-medium">User information</p>
          <div className="">
            <label className="block text-sm text-gray-00" htmlFor="cus_name">
              Name
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="cus_name"
              name="cus_name"
              type="text"
              required
              placeholder="Your Name"
              aria-label="Name"
            />
          </div>

          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a Role
          </label>
          <select
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            id="role"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected="">Choose a role</option>
            <option value="student">Student</option>
            <option value="principal">Principal</option>
            <option value="hod">Hod</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
          </select>
          <br />
          <label
            htmlFor="department"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select your Department
          </label>
          <select
            required
            value={department}
            onChange={(e) => setDept(e.target.value)}
            id="department"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected="">Choose a DEPT</option>
            <option value="it">IT</option>
            <option value="comps">COMPS</option>
            <option value="extc">EXTC</option>
            <option value="civil">CIVIL</option>
            <option value="admin">ADMIN</option>
          </select>

          <div className="mt-4">
            <button
              className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
              type="submit"
            >
              UPDATE
            </button>
          </div>
          {msg && <p> {msg} </p>}
        </form>
      </div>
    </section>
  );
}
