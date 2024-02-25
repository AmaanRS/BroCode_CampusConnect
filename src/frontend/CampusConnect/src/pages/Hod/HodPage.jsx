import { useEffect, useState } from "react";
import Logout from "../../components/Logout";
import { useNavigate } from "react-router-dom";

function HodPage() {
  const [main, setMain] = useState("");
  const [commName, setCommName] = useState("");
  const [commDesc, setCommDesc] = useState("");
  const [commHeadMail, setCommHeadMail] = useState("");
  const [commTechMail, setCommTechMail] = useState("");

  const token = localStorage.getItem("token");
  console.log("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      console.log(token, "token");
      navigate("/login");
    }
  }, []);

  async function postCommittee(cred) {
    const res = await fetch("http://localhost:8000/createCommittee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cred),
    });
    const data = await res.json();
    // console.log(data);
    return data;
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(commName, commDesc, commHeadMail, commTechMail);
    postCommittee({
      CommitteeName: commName,
      CommitteeDescription: commDesc,
      CommitteeHeadEmail: commHeadMail,
      CommitteeTechnicalHeadEmail: commTechMail,
    });
  }

  return (
    <>
      {/* sidebar frag  */}
      <>
        <aside
          id="default-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="flex-1 ms-3 whitespace-nowrap">Kanban</span>
                  <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    Pro
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    3
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Products
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </>
      {/* navbar frag */}
      <>
        <nav className="bg-white border-gray-600 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="https://flowbite.com/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            ></a>

            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-mmatlab edium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <button
                    onClick={() => setMain("CreateCommittee")}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="ms-3">Create Committee</span>
                  </button>
                </li>
                <li>
                  <Logout />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
      {/* main content */}
      <>
        <div className="p-4 sm:ml-64">
          {main === "" && (
            <p>nothing selected , Please select option from sidebar to view</p>
          )}
          {main === "CreateCommittee" && (
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
              <div className="leading-loose">
                <form
                  onSubmit={handleSubmit}
                  className="max-w-xl m-4 p-10 bg-white rounded shadow-xl"
                >
                  <p className="text-gray-800 font-medium">
                    Committee information
                  </p>
                  <div className="">
                    <label
                      className="block text-sm text-gray-00"
                      htmlFor="cus_name"
                    >
                      Committee Name
                    </label>
                    <input
                      value={commName}
                      onChange={(e) => setCommName(e.target.value)}
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                      id="cus_name"
                      name="cus_name"
                      type="text"
                      required
                      placeholder="Committee Name"
                      aria-label="Name"
                    />
                  </div>

                  <br />
                  <div className="">
                    <label
                      className="block text-sm text-gray-00"
                      htmlFor="cus_name"
                    >
                      Committee Description
                    </label>
                    <textarea
                      value={commDesc}
                      onChange={(e) => setCommDesc(e.target.value)}
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                      id="cus_name"
                      name="cus_name"
                      type="text"
                      required
                      placeholder="Committee Description"
                      aria-label="Name"
                    />
                  </div>

                  <div className="">
                    <label
                      className="block text-sm text-gray-00"
                      htmlFor="cus_name"
                    >
                      Committee Head Email
                    </label>
                    <input
                      value={commHeadMail}
                      onChange={(e) => setCommHeadMail(e.target.value)}
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                      id="cus_name"
                      name="cus_name"
                      type="email"
                      required
                      placeholder="Committee Head Email"
                      aria-label="Name"
                    />
                  </div>
                  <br />
                  <div className="">
                    <label
                      className="block text-sm text-gray-00"
                      htmlFor="cus_name"
                    >
                      Committee Techincal Head Email
                    </label>
                    <input
                      value={commTechMail}
                      onChange={(e) => setCommTechMail(e.target.value)}
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                      id="cus_name"
                      name="cus_name"
                      type="email"
                      required
                      placeholder="Committee Technical Head Email"
                      aria-label="Name"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                      type="submit"
                    >
                      UPDATE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </>
    </>
  );
}

export default HodPage;
