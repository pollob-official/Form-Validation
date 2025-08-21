# Form-Validation
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Form Validation With OOP</title>

<style>
  * { box-sizing: border-box; }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    padding: 20px;
    background-color: #e5e5e5;
    font-family: Arial, Helvetica, sans-serif;
  }
  .form {
    width: 100%;
    max-width: 500px;
    background-color: #fff;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  }
  .title { font-size: 20px; text-align: center; margin-bottom: 25px; font-weight: 700; color: #333; }
  .form-group { display: flex; flex-direction: column; margin-bottom: 15px; gap: 5px; }
  .form-group label { font-weight: 500; color: #333; font-size: 16px; }
  .form-group span { color: #da1204; font-weight: bold; }
  .form-group input, .form-group textarea {
    border: 1px solid #1565dd;
    padding: 10px;
    border-radius: 5px;
    font-size: 15px;
  }
  .form-group input:focus, .form-group textarea:focus { outline: 2px solid #1565dd; }
  .inline-group { display: flex; gap: 15px; flex-wrap: wrap; }
  .submit-btn {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
  }
  .submit-btn:hover { background-color: #0056b3; }
  small.error { color: red; font-size: 13px; }

  /* Popup style */
  #success-msg {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    color: #333;
    padding: 25px 30px;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    width: 90%;
    max-width: 450px;
    z-index: 1000;
    text-align: left;
  }
  #success-msg h3 { margin-top: 0; color: #28a745; text-align: center; }
  #success-msg button {
    display: block;
    margin: 15px auto 0 auto;
    padding: 8px 20px;
    border: none;
    background: #007bff;
    color: #fff;
    font-size: 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  #overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 999;
  }
</style>
</head>
<body>

<form onsubmit="return formValidate.validate(event)" class="form">
  <h2 class="title">Form Validation</h2>

  <div class="form-group">
    <label for="firstName">Name<span>*</span></label>
    <input type="text" id="firstName" placeholder="Enter Name" />
    <small class="error"></small>
  </div>

  <div class="form-group">
    <label for="lastName">Trainee ID<span>*</span></label>
    <input type="text" id="lastName" placeholder="Enter Trainee ID" />
    <small class="error"></small>
  </div>

  <div class="form-group">
    <label for="age">Age<span>*</span></label>
    <input type="number" id="age" placeholder="Enter Your Age" />
    <small class="error"></small>
  </div>

  <div class="form-group">
    <label for="email">Email<span>*</span></label>
    <input type="text" id="email" placeholder="Enter Email" />
    <small class="error"></small>
  </div>

  <div class="form-group">
    <label for="password">Password<span>*</span></label>
    <input type="password" id="password" placeholder="Enter Password" />
    <small class="error"></small>
  </div>

  <div class="form-group">
    <label for="phone">Phone<span>*</span></label>
    <input type="text" id="phone" placeholder="Enter Phone" />
    <small class="error"></small>
  </div>

  <div class="form-group">
    <label>Gender<span>*</span></label>
    <div class="inline-group">
      <label><input type="radio" name="gender" value="Male" /> Male</label>
      <label><input type="radio" name="gender" value="Female" /> Female</label>
      <label><input type="radio" name="gender" value="Other" /> Other</label>
    </div>
    <small class="error"></small>
  </div>

  <div class="form-group">
    <label>Favorite Subjects<span>*</span></label>
    <div class="inline-group">
      <label><input type="checkbox" name="subjects" value="Math" /> Math</label>
      <label><input type="checkbox" name="subjects" value="Science" /> Science</label>
      <label><input type="checkbox" name="subjects" value="English" /> English</label>
    </div>
    <small class="error"></small>
  </div>

  <div class="form-group">
    <label for="comment">Comment</label>
    <textarea id="comment" placeholder="Your Comment"></textarea>
    <small class="error"></small>
  </div>

  <button class="submit-btn" type="submit">Submit</button>
</form>

<div id="overlay"></div>
<div id="success-msg">
  <h3>Registration Successful!</h3>
  <div id="form-data"></div>
  <button onclick="closePopup()">Close</button>
</div>

//<script src="faaaa.js"></script>

<script>
class FormValidation {
  constructor() {
    this.fields = {
      firstName: document.getElementById("firstName"),
      lastName: document.getElementById("lastName"),
      age: document.getElementById("age"),
      email: document.getElementById("email"),
      password: document.getElementById("password"),
      phone: document.getElementById("phone"),
      gender: document.getElementsByName("gender"),
      subjects: document.getElementsByName("subjects"),
      comment: document.getElementById("comment")
    };
    this.errors = document.getElementsByClassName("error");
  }

  validate(e) {
    e.preventDefault();
    const emailPattern = /^[a-z0-9._%+-]+@[a-z]+\.[a-z]{2,4}$/;
    const phonePattern = /^(\+8801|8801|01)[3-9]{1}[0-9]{8}$/;
    let valid = true;

    // Name
    if (!this.fields.firstName.value.trim()) {
      this.errors[0].innerText = "Name is required!";
      this.fields.firstName.style.border = "1px solid red";
      valid = false;
    } else {
      this.errors[0].innerText = "";
      this.fields.firstName.style.border = "1px solid #1565dd";
    }

    // Trainee ID
    if (!this.fields.lastName.value.trim()) {
      this.errors[1].innerText = "Trainee ID is required!";
      this.fields.lastName.style.border = "1px solid red";
      valid = false;
    } else {
      this.errors[1].innerText = "";
      this.fields.lastName.style.border = "1px solid #1565dd";
    }

    // Age
    if (!this.fields.age.value.trim() || this.fields.age.value <= 0) {
      this.errors[2].innerText = "Valid Age is required!";
      this.fields.age.style.border = "1px solid red";
      valid = false;
    } else {
      this.errors[2].innerText = "";
      this.fields.age.style.border = "1px solid #1565dd";
    }

    // Email
    if (!this.fields.email.value.trim() || !emailPattern.test(this.fields.email.value.trim())) {
      this.errors[3].innerText = "Valid Email is required!";
      this.fields.email.style.border = "1px solid red";
      valid = false;
    } else {
      this.errors[3].innerText = "";
      this.fields.email.style.border = "1px solid #1565dd";
    }

    // Password
    if (!this.fields.password.value.trim() || this.fields.password.value.length < 6) {
      this.errors[4].innerText = "Password must be at least 6 characters!";
      this.fields.password.style.border = "1px solid red";
      valid = false;
    } else {
      this.errors[4].innerText = "";
      this.fields.password.style.border = "1px solid #1565dd";
    }

    // Phone
    if (!this.fields.phone.value.trim() || !phonePattern.test(this.fields.phone.value.trim())) {
      this.errors[5].innerText = "Valid BD Phone is required!";
      this.fields.phone.style.border = "1px solid red";
      valid = false;
    } else {
      this.errors[5].innerText = "";
      this.fields.phone.style.border = "1px solid #1565dd";
    }

    // Gender
    const genderChecked = Array.from(this.fields.gender).some(r => r.checked);
    if (!genderChecked) {
      this.errors[6].innerText = "Please select Gender!";
      valid = false;
    } else {
      this.errors[6].innerText = "";
    }

    // Subjects
    const checkedSubjects = Array.from(this.fields.subjects).filter(s => s.checked);
    if (checkedSubjects.length === 0) {
      this.errors[7].innerText = "Select at least one subject!";
      valid = false;
    } else {
      this.errors[7].innerText = "";
    }

    if (valid) {
      let genderValue = Array.from(this.fields.gender).find(r => r.checked).value;
      let subjectsValue = checkedSubjects.map(s => s.value).join(", ");
      let msg = `
        <p><strong>Name:</strong> ${this.fields.firstName.value}</p>
        <p><strong>Trainee ID:</strong> ${this.fields.lastName.value}</p>
        <p><strong>Age:</strong> ${this.fields.age.value}</p>
        <p><strong>Email:</strong> ${this.fields.email.value}</p>
        <p><strong>Phone:</strong> ${this.fields.phone.value}</p>
        <p><strong>Gender:</strong> ${genderValue}</p>
        <p><strong>Subjects:</strong> ${subjectsValue}</p>
        <p><strong>Comment:</strong> ${this.fields.comment.value}</p>
      `;
      document.getElementById("form-data").innerHTML = msg;
      document.getElementById("success-msg").style.display = "block";
      document.getElementById("overlay").style.display = "block";

      // Reset form
      Object.values(this.fields).forEach(field => {
        if (field.length) Array.from(field).forEach(f => f.checked = false);
        else field.value = "";
      });
    }

    return false;
  }
}

function closePopup() {
  document.getElementById("success-msg").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

const formValidate = new FormValidation();
</script>

</body>
</html>
