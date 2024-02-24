import { useContext } from "react";
import { UserContext } from "../store/UserContextProvider";

export default function ProfilePage() {
  const { userId } = useContext(UserContext);
  console.log(userId);
  return (
    <div>
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-gray-200  rounded-lg">
          {/* <div className="p-4 sm:ml-64"> */}
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="leading-loose">
              <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
                <p className="text-gray-800 font-medium">User information</p>
                <div className="">
                  <label
                    className="block text-sm text-gray-00"
                    htmlFor="cus_name"
                  >
                    Name
                  </label>
                  <input
                    className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                    id="cus_name"
                    name="cus_name"
                    type="text"
                    required=""
                    placeholder="Your Name"
                    aria-label="Name"
                  />
                </div>

                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select a Role
                </label>
                <select
                  id="role"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected="">Choose a role</option>
                  <option value="">Student</option>
                  <option value="">Principal</option>
                  <option value="">Hod</option>
                  <option value="">Admin</option>
                </select>
                <br />
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select your Department
                </label>
                <select
                  id="department"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected="">Choose a DEPT</option>
                  <option value="">IT</option>
                  <option value="">COMPS</option>
                  <option value="">EXTC</option>
                  <option value="">CIVIL</option>
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
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
