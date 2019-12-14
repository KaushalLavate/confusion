import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Feedback, ContactType } from "../shared/feedback";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  formErrors ={
    'firstname':'',
    'lastname' :'',
    'telnum' : '',
    'email' : '',
  };

  validationMessages = {
    'firstname': {
      'minlength': 'First Name must be Atleast 2 Characters long',
      'maxlength': 'First Name must be less than 25 Characters long'
    },
    'lastname': {
      'minlength': 'Last Name must be Atleast 2 Characters long',
      'maxlength': 'Last Name must be less than 25 Characters long'
    },
    'telnum': {
      'pattern' : 'Phone Number must be a Number'
    },
    'email': {
      'email': 'Enter Valid Email' 
    }
  }

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname:['',[Validators.minLength(2), Validators.maxLength(25)]],
      lastname:['',[Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0,Validators.pattern],
      email:['',Validators.email],
      agree: false,
      contacttype: '',
      message:''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      };
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset();
  }

}
