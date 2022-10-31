import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../services/members/member.service';
import { MustMatch } from '../../_helpers/must-match.validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [MemberService]
})
export class RegisterComponent implements OnInit {

    registerForm!: FormGroup;
    bulkRegisterationFrom!: FormGroup;
    submitted: boolean = false;
    isShowLoader: boolean = false;
    bulkRegistration: boolean = false;
    isBulkRegistrationFormValid: boolean = false;
    bulkRegistrationSubmitted: boolean = false;

    currentFile?: File;
    progress = 0;
    message = '';
    membersFile: any;

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

        this.bulkRegisterationFrom = this.formBuilder.group({
            fileInput: ['', Validators.required],
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
                });
                this.router.navigate(['login']);
            },
            error => {
                this.isShowLoader = false;
                const errorResponse = error.error;
                this._snackBar.open(errorResponse.response.error.internal_message, 'OK', {
                    duration: 5000,
                });
            }
        )
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }


    /** File Upload Code */

    selectFile(event: any): void {
        if (event.target.files && event.target.files[0]) {
            const file: File = event.target.files[0];
            this.currentFile = file;
        }
    }

    onSubmitBulkRegistrationForm() {
        this.bulkRegistrationSubmitted = true;
        this.isShowLoader = true;
        if (this.currentFile) {
            this.isBulkRegistrationFormValid = true;
            this.memberService.memberBulkRegistration(this.currentFile).subscribe(
                (event: any) => {
                    this.isShowLoader = false;
                    if (event.type === HttpEventType.UploadProgress) {
                        this.progress = Math.round(100 * event.loaded / event.total);
                    } else if (event instanceof HttpResponse) {
                        this.message = event.body.message;
                        this._snackBar.open('User Registered Successfully!', 'OK', {
                            duration: 5000,
                        });
                    }
                },
                (resp: any) => {
                    this.isShowLoader = false;
                    console.log(resp);
                    this.progress = 0;
                    this.currentFile = undefined;
                    if (typeof(resp.response) != 'undefined') {
                        this._snackBar.open('Success: ' + resp.response.error.moreInfo.data.successDataCount + ' , Failure: ' + resp.response.error.moreInfo.data.errorDataCount, 'OK', {
                            duration: 5000,
                        });
                    }
                });
        } else {
            this.isBulkRegistrationFormValid = false;
            this.isShowLoader = false;
        }
    }

}
