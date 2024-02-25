import { useEffect, useState } from "react";
import { useNavigate,useLoaderData } from "react-router-dom";
import Logout from "../../components/Logout";

function StudentPage() {
  const [main, setMain] = useState();
  const [commArr, setCommArr] = useState([]);
  const loader = useLoaderData()

  if(!loader){
    navigate("/login",{replace:true})
  }

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      console.log(token, "token");
      navigate("/login");
    }
    fetchAllComm();
  }, []);

  async function fetchAllComm() {
    const res = await fetch("http://localhost:8000/getAllCommittees", {
      method: "POST",
    });
    const data = await res.json();
    if (data.success) {
      setCommArr(data.data);
    }
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
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800 ">
            <p className="text-white">Student </p>
            <hr />
            <p className="text-white py-4">All Committee List</p>
            <ul className="space-y-2 font-medium">
              {commArr.length === 0 && (
                <p className="text-white">No committee found</p>
              )}
              {commArr.map((comm) => {
                return (
                  <li key={comm._id} className="py-2 text-white">
                    <button>{comm.CommitteeName}</button>
                  </li>
                );
              })}
              {/* <li className="py-2">
                <button
                  // onClick={() => {
                  //   setMain("getAllReq");
                  //   fetchRequest();
                  // }}
                  className="flex items-center p-2 text-gray-100 rounded-lg  hover:bg-gray-700  group"
                >
                  <span className="ms-3">All Request</span>
                </button>
              </li> */}
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
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            {!main && <p>Nothing selected</p>}
            {main === "getCommittee" && (
              <div className="leading-loose">
                {/* card */}
                <div className=" inline-block max-w-sm m-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      commitee name
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    commitee dec
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
                <div className=" inline-block max-w-sm m-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      commitee name
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    commitee dec
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    </>
  );
}

export const studentLoader =async ({request})=>{
  try {
    let token = localStorage.getItem("token")
    const res = await fetch("http://localhost:8000/getUserData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if(!data){
      return false
    }

    return data.data.isStudent

    // return false
  } catch (error) {
    console.log(error)
    return false
  }

}

export default StudentPage;
