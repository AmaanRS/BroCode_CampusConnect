function ProfilePage() {
  return (
    <>
      <div>ProfilePage</div>
      <form>
        <input placeholder="username" type="text" />
        <select name="" id="">
          <option value="">select role</option>
          <option value="">Student</option>
          <option value="">Principal</option>
          <option value="">Hod</option>
          <option value="">Admin</option>
        </select>
        <br />
        <select name="" id="">
          <option value="">select Department</option>
          <option value="">IT</option>
          <option value="">Comps</option>
          <option value="">Extc</option>
          <option value="">Civil</option>
        </select>
      </form>
    </>
  );
}

export default ProfilePage;
