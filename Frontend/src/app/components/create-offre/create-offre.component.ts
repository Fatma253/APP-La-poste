import { EventEmitter, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators} from "@angular/forms"; 
import { first } from 'rxjs/operators';
import { Offre } from 'src/app/models/Offre';
import { AuthService } from 'src/app/services/auth.service';
import { OffreService } from 'src/app/services/offre.service';

@Component({
  selector: 'app-create-offre',
  templateUrl: './create-offre.component.html',
  styleUrls: ['./create-offre.component.scss']
})
export class CreateOffreComponent implements OnInit {
  @ViewChild("formDirective")
  formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();
  
  form!: FormGroup;
  isOpen = false;

  constructor(
    private authService: AuthService,
    private offreService: OffreService
  ) { }

  ngOnInit(): void {
    this.form = this.createFormGroup(); 

  }

  createFormGroup(): FormGroup{
    return new FormGroup({
      titre: new FormControl("", [Validators.required, Validators.minLength(5)]),
      description: new FormControl("", [Validators.required,Validators.minLength(10),
      ]),
    });
  }

  onSubmit(formData: Pick<Offre, "titre" |  "description">): void{
    this.offreService
    .createOffre(formData, this.authService.userId)
    .pipe(first())
    .subscribe(() => {
      this.create.emit(null);
    });
  this.form.reset();
  this.formDirective.resetForm();
}

  }


