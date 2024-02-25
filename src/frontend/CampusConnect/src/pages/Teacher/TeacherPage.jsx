import { useState } from "react";

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

  // console.log(token);
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
    console.log(data);
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
    console.log(evName, evDesc, evDate, evTimeSlt, evRm);
    postEvent({
      EventName: evName,
      EventDescription: evDesc,
      EventDate: evDate,
      EventTimeSlot: evTimeSlt,
      EventRoom: evRm,
    });
  }

  return (
    <>
      {/* sidebar frag  */}
      <>
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
        </button>
        <aside
          id="default-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  onClick={() => setMain("CreateCommittee")}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="ms-3">Create Committee</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => setMain("CreateEvent")}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="ms-3">Create Event</span>
                </button>
              </li>

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
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="https://flowbite.com/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Flowbite
              </span>
            </a>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
      {/* main content */}
      <>
        <div className="p-4 sm:ml-64">
          {main === "" && <p>nothing selected</p>}
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

export default TeacherPage;
