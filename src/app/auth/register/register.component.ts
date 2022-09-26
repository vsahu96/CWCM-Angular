import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../services/members/member.service';
import { MustMatch } from '../../_helpers/must-match.validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [MemberService]
})
export class RegisterComponent implements OnInit {

    registerForm!: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder, private memberService: MemberService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[- +()0-9]+')]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        // display form values on success
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
        // return;
        let userData = {
            'firstName': this.registerForm.value.firstName,
            'surname': this.registerForm.value.lastName,
            'email': this.registerForm.value.email,
            'password': this.registerForm.value.password,
            'contactNumber': this.registerForm.value.contact,
            'timezone': '',
            'platformId': 11,
        }
        this.memberService.memberRegistration(userData).subscribe(
            res => {
                const response = res.response;
                console.log(response);
            }
        )
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

}