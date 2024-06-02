export default function Home(props) {
  const {showAlert} = props;
  return (
    <>
      <div className="container">
        <h2>Home</h2>
        <hr/>
        <p>Welcome to our home page! You may find out the features bellow.</p>
        <h4>Create account component</h4>
        <p>In that component we create a user account with the following fields</p>
        <ul>
          <li>First Name <sup class="input_required_field">*</sup></li>
          <li>Last Name</li>
          <li>Gender <sup class="input_required_field">*</sup></li>
          <li>Email <sup class="input_required_field">*</sup></li>
          <li>Password <sup class="input_required_field">*</sup></li>
        </ul>
        <h4>Login to your account</h4>
        <p>In that component we create a user login screen with the following fieldd</p>
        <ul>
          <li>Email <sup class="input_required_field">*</sup></li>
          <li>Password <sup class="input_required_field">*</sup></li>
        </ul>
        <h4>Update account</h4>
        <p>In that component we update user account details.</p>
        <ul>
          <li>First Name <sup class="input_required_field">*</sup></li>
          <li>Last Name</li>
          <li>Gender <sup class="input_required_field">*</sup></li>
          <li>Email <sup class="input_required_field">*</sup></li>
        </ul>
        <h4>Password Update</h4>
        <p>In that component we update user password.</p>
        <ul>
          <li>Password <sup class="input_required_field">*</sup></li>
        </ul>
      </div>
    </>
  )
}