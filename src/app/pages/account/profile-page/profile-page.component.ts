import { CustomValidator } from 'src/app/validators/custom.validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(80),
          Validators.required,
        ]),
      ],
      document: [{ value: '', disabled: true }],
      email: [
        '',
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(120),
          Validators.required,
          CustomValidator.EmailValidator,
        ]),
      ],
    });
  }

  ngOnInit(): void {
    this.busy = true;
    this.service.getProfile().subscribe(
      (data: any) => {
        this.busy = false;
        this.form.controls['name'].setValue(data.name);
        this.form.controls['document'].setValue(data.document);
        this.form.controls['email'].setValue(data.email);
      },
      (err) => {
        console.log(err);
        this.busy = false;
      }
    );
  }
}
