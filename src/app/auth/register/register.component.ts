import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../services/members/member.service';
import { MustMatch } from '../../_helpers/must-match.validator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [MemberService]
})
export class RegisterComponent implements OnInit {

    registerForm!: FormGroup;
    submitted: boolean = false;
    isShowLoader: boolean = false;
    bulkRegistration: boolean = false;

    currentFile?: File;
    fileName = 'Select File';


    constructor(
        private formBuilder: FormBuilder,
        private memberService: MemberService,
        private _snackBar: MatSnackBar,
        private router: Router,
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern('[- +()0-9]+')]],
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
        this.isShowLoader = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            this.isShowLoader = false;
            return;
        }

        let userData = {
            'firstName': this.registerForm.value.firstName,
            'surname': this.registerForm.value.lastName,
            'email': this.registerForm.value.email,
            'password': this.registerForm.value.password,
            'contactNumber': this.registerForm.value.contact,
            'timezone': '',
            'platformId': 11,
            'acceptAgreement': this.registerForm.value.acceptTerms
        }
        this.memberService.memberRegistration(userData).subscribe(
            res => {
                this.isShowLoader = false;
                const response = res.response;
                this._snackBar.open('User Registered Successfully!, You will receive verification email shortly.', 'OK', {
                    duration: 5000,
                    panelClass: ['blue-snackbar', 'my-custom-snackbar']
                });
                this.router.navigate(['login']);
            },
            error => {
                this.isShowLoader = false;
                const errorResponse = error.error;
                this._snackBar.open(errorResponse.response.error.internal_message, 'OK', {
                    duration: 5000,
                    panelClass: ['red-snackbar', 'my-custom-snackbar']
                });
            }
        )
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }


    /** File Upload Code */

    // selectFile(event: any): void {
    //     if (event.target.files && event.target.files[0]) {
    //         const file: File = event.target.files[0];
    //         this.currentFile = file;
    //         this.fileName = this.currentFile.name;
    //     } else {
    //         this.fileName = 'Select File';
    //     }
    // }

}
