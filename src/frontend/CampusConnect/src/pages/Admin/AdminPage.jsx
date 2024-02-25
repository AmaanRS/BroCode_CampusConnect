import { useEffect, useState } from "react";
import Logout from "../../components/Logout";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  const [main, setMain] = useState();
  const [requestdata, setRequestdata] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      console.log(token, "token");
      navigate("/login");
    }
  }, []);

  async function fetchRequest() {
    const res = await fetch("http://localhost:8000/fetchRequestOfUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    console.log(data);
    if (data.success) {
      setRequestdata(data.data);
    }

    return data;
  }
  // console.log(requestdata);

  async function handleRequest(cred) {
    const res = await fetch("http://localhost:8000/handleRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cred),
    });
    const data = await res.json();
    console.log(data);
    return data;
  }

  function handleApprove(status, id) {
    console.log("aprove click", status, id);
    handleRequest({ status, requestId: id });
  }

  function handleReject(status, id) {
    console.log("reject click", status, id);
    handleRequest({ status, requestId: id });
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
            <p className="text-white">ADMIN</p>
            <hr />
            <ul className="space-y-2 font-medium">
              <li className="py-2">
                <button
                  onClick={() => {
                    setMain("getAllReq");
                    fetchRequest();
                  }}
                  className="flex items-center p-2 text-gray-100 rounded-lg  hover:bg-gray-700  group"
                >
                  <span className="ms-3">All Request</span>
                </button>
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
            {!main && <p>Please choose an option from sidebar</p>}

            {main === "getAllReq" && (
              <>
                <p>fetching all user Request</p>
                {requestdata.map((item) => {
                  console.log(item.RequestContent);
                  if (item.RequestContent.RequestStatus === "pending") {
                    return (
                      <div
                        className="my-3 p-3 rounded-md bg-slate-200"
                        key={item.RequestContent._id}
                      >
                        <p>
                          Request Status - {item.RequestContent.RequestStatus}
                        </p>
                        <p>
                          Email -{" "}
                          {item.RequestContent.RequestToCreateNewUser.email}
                        </p>
                        <p>
                          Department -{" "}
                          {
                            item.RequestContent.RequestToCreateNewUser
                              .Department
                          }{" "}
                        </p>

                        <p>
                          User Name -{" "}
                          {item.RequestContent.RequestToCreateNewUser.username}
                        </p>
                        <button
                          onClick={() =>
                            handleApprove("accepted", item.RequestContent._id)
                          }
                          className="border-2 p-1 m-2 bg-green-500 text-white rounded-lg "
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            handleReject("rejected", item.RequestContent._id)
                          }
                          className="border-2 p-1 m-2 bg-red-500 text-white rounded-lg"
                        >
                          Reject
                        </button>
                      </div>
                    );
                  }
                })}
              </>
            )}
          </div>
        </div>
      </>
    </>
  );
}

export default AdminPage;
