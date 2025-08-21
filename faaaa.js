
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
