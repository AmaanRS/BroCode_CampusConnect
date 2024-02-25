import { useEffect, useState } from "react";
import Logout from "../../components/Logout";
import { useNavigate,useLoaderData } from "react-router-dom";

function TeacherPage() {
  const [main, setMain] = useState("");
  const [commName, setCommName] = useState("");
  const [commDesc, setCommDesc] = useState("");
  const [commHeadMail, setCommHeadMail] = useState("");
  const [commTechMail, setCommTechMail] = useState("");
  const token = localStorage.getItem("token");
  const [evName, setEvName] = useState();
  const [evDesc, setEvDesc] = useState();
  const [evDate, setEvDate] = useState();
  const [evTimeSlt, setEvTimeSlt] = useState();
  const [evRm, setEvRm] = useState();
  const [commmsg, setCommmsg] = useState();
  const [evmsg, setEvmsg] = useState();
  const [commArr, setCommArr] = useState([]);
  const [request, setRequest] = useState([]);
  const navigate = useNavigate();
  const loader = useLoaderData()

  if(!loader){
    navigate("/login",{replace:true})
  }

  useEffect(() => {
    if (!token) {
      // console.log(token, "token");
      navigate("/login");
    }

    fetchAllComm();
  }, []);

  // console.log(token);

  async function fetchRequest() {
    const res = await fetch("http://localhost:8000/fetchRequestOfUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    // console.log(data);
    if (data.success) {
      setRequest(data.data);
    }

    return data;
  }

  async function fetchAllComm() {
    const res = await fetch("http://localhost:8000/getAllCommittees", {
      method: "POST",
    });
    const data = await res.json();
    if (data.success) {
      setCommArr(data.data);
    }
  }

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
    setCommmsg(data.message);
    // console.log(data);
    return data;
  }

  async function postEvent(cred) {
    const res = await fetch("http://localhost:8000/createEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cred),
    });
    const data = await res.json();
    setEvmsg(data.message);
    // console.log(data);
    return data;
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(commName, commDesc, commHeadMail, commTechMail);
    postCommittee({
      CommitteeName: commName,
      CommitteeDescription: commDesc,
      CommitteeHeadEmail: commHeadMail,
      CommitteeTechnicalHeadEmail: commTechMail,
    });
  }

  function handleSubmitEvent(e) {
    e.preventDefault();
    // console.log(evName, evDesc, evDate, evTimeSlt, evRm);
    postEvent({
      EventName: evName,
      EventDescription: evDesc,
      EventDate: evDate,
      EventTimeSlot: evTimeSlt,
      EventRoom: evRm,
    });
  }

  // console.log("comm arr", commArr);
  console.log("req arr", request[0]);
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
            <p className="text-white">Teacher </p>
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
              <ul className="font-mmatlab edium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <button
                    onClick={() => {
                      setMain("request");
                      fetchRequest();
                    }}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="ms-3">Request</span>
                  </button>
                </li>
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
            <p>Nothing selected , Please select an option to view</p>
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

              {commmsg && <p> {commmsg} </p>}
            </div>
          )}
          {main === "request" && (
            <>
              <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="leading-loose">
                  <ul>
                    {request.map((req) => {
                      return (
                        <li
                          className=" p-2 inline-block"
                          key={req.RequestContent._id}
                        >
                          <div className="  max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {
                                  req.RequestContent.RequestCommittee
                                    .CommitteeName
                                }
                              </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                              {
                                req.RequestContent.RequestCommittee
                                  .CommitteeDescription
                              }
                            </p>
                            <p>
                              Mentor -{" "}
                              {
                                req.RequestContent.RequestCommittee
                                  .CommitteeMentor.username
                              }
                            </p>
                            <p>
                              Committee Head -{" "}
                              {
                                req.RequestContent.RequestCommittee
                                  .CommitteeHead.username
                              }
                            </p>
                            <p>
                              Technical Head -{" "}
                              {
                                req.RequestContent.RequestCommittee
                                  .CommitteeTechnicalHead.username
                              }
                            </p>

                            <p>
                              {" "}
                              status -{" "}
                              {
                                req.RequestContent.RequestCommittee
                                  .isAccountActive
                              }{" "}
                            </p>
                            <button className="border-2 p-1 m-2 bg-green-500 text-white rounded-lg ">
                              Approve
                            </button>
                            <button className="border-2 p-1 m-2 bg-red-500 text-white rounded-lg">
                              Reject
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {evmsg && <p> {evmsg} </p>}
              </div>
            </>
          )}
          {main === "CreateEvent" && (
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
              <div className="leading-loose">
                <form
                  onSubmit={handleSubmitEvent}
                  className="max-w-xl m-4 p-10 bg-white rounded shadow-xl"
                >
                  <p className="text-gray-800 font-medium">Event information</p>
                  <div className="">
                    <label
                      className="block text-sm text-gray-00"
                      htmlFor="cus_name"
                    >
                      Event Name
                    </label>
                    <input
                      value={evName}
                      onChange={(e) => setEvName(e.target.value)}
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                      id="cus_name"
                      name="cus_name"
                      type="text"
                      required
                      placeholder="Event Name"
                      aria-label="Name"
                    />
                  </div>

                  <br />
                  <div className="">
                    <label
                      className="block text-sm text-gray-00"
                      htmlFor="cus_name"
                    >
                      Event Description
                    </label>
                    <textarea
                      value={evDesc}
                      onChange={(e) => setEvDesc(e.target.value)}
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                      id="cus_name"
                      name="cus_name"
                      type="text"
                      required
                      placeholder="Event Description"
                      aria-label="Name"
                    />
                  </div>

                  <div className="">
                    <label
                      className="block text-sm text-gray-00"
                      htmlFor="cus_name"
                    >
                      Event Date
                    </label>
                    <input
                      value={evDate}
                      onChange={(e) => setEvDate(e.target.value)}
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                      id="cus_name"
                      type="date"
                      required
                      aria-label="Name"
                    />
                  </div>
                  <br />
                  <div className="">
                    <label
                      className="block text-sm text-gray-00"
                      htmlFor="cus_name"
                    >
                      Event Time
                    </label>
                    <input
                      value={evTimeSlt}
                      onChange={(e) => setEvTimeSlt(e.target.value)}
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                      id="cus_name"
                      name="cus_name"
                      type="time"
                      required
                      aria-label="Name"
                    />
                  </div>

                  <br />

                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select a Room
                  </label>
                  <select
                    required
                    value={evRm}
                    onChange={(e) => setEvRm(e.target.value)}
                    id="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected="">Choose a Room</option>
                    <option value="R1">Room 1</option>
                    <option value="R2">Room 2</option>
                    <option value="R3">Room 3</option>
                    <option value="R4">Room 4</option>
                    <option value="R5">Room 5</option>
                  </select>

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
              {evmsg && <p> {evmsg} </p>}
            </div>
          )}
        </div>
      </>
    </>
  );
}

export const teacherLoader =async ({request})=>{
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

    return data.data.isTeacher
    
    // return false
  } catch (error) {
    console.log(error)
    return false
  }

}

export default TeacherPage;
