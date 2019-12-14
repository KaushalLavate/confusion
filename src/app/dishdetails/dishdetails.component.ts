import { Component, OnInit } from '@angular/core';
import { Params,ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Comment } from "../shared/comment";
import {coerceNumberProperty} from '@angular/cdk/coercion';



@Component({
  selector: 'app-dishdetails',
  templateUrl: './dishdetails.component.html',
  styleUrls: ['./dishdetails.component.css']
})
export class DishdetailsComponent implements OnInit {
  
  dish : Dish ;
  commentForm: FormGroup;
  comment: Comment;
  
  formErrors ={
    'rating': 5,
    'comment' : '',
    'author':'',
  };

  validationMessages = {
    'author': {
      'required': 'Name Cannot be Empty',
      'minlength': 'First Name must be Atleast 2 Characters long',
      'maxlength': 'First Name must be less than 25 Characters long'
    },
    'comment': {
      'required': 'Comment Cannot be Empty',
      'minlength': 'Last Name must be Atleast 2 Characters long',
      'maxlength': 'Last Name must be less than 25 Characters long'
    }
  }

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private cmt: FormBuilder) {
      this.createForm();
     }

  ngOnInit() { 
    let id = this.route.snapshot.params['id'];
    this.dishService.getDish(id)
      .then(dish => this.dish = dish);
  }

  createForm() {
    this.commentForm = this.cmt.group({
      rating:[''],
      comment:['',[Validators.required,Validators.minLength(2), Validators.maxLength(25)]],
      author:['',[Validators.required,Validators.minLength(2), Validators.maxLength(25)]],
      date: ['5']
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
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
    this.comment = this.commentForm.value;
    this.comment.date= new Date().toISOString();
    console.log(this.comment);
    this.commentForm.reset();
    this.dish.comments.push(this.comment);
  }

  goBack():void {
    this.location.back();
  }
}


