import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimalserviceService } from 'src/app/services/animalservice.service';
import { Animal } from 'src/app/models/Animal';


@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {

  getId!: any;
  // updateForm!: FormGroup;
  message!: string;
  theAnimal!: Animal;

  constructor(public formBuilder: FormBuilder,
    public router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private myhttp: AnimalserviceService) {

  }

  updateForm = new FormGroup({

    name: new FormControl('', []),
    specie: new FormControl('', []),
    breed: new FormControl('', []),
    age: new FormControl(0, []),
    sex: new FormControl('', []),
    neutered: new FormControl('', []),
  });




  ngOnInit() {
    //throw new Error('Method not implemented.');
    this.theAnimal = this.myhttp.a;
    console.log('Animal should be here!', this.theAnimal);
    this.updateForm.controls['name'].setValue(this.theAnimal.name);
    this.updateForm.controls['specie'].setValue(this.theAnimal.specie);
    this.updateForm.controls['breed'].setValue(this.theAnimal.breed);
    this.updateForm.controls['age'].setValue(this.theAnimal.age);
    this.updateForm.controls['sex'].setValue(this.theAnimal.sex);
    this.updateForm.controls['neutered'].setValue(this.theAnimal.neutered);

  }

  updateAnimalDB(): void {



    this.myhttp.updateAnimal({
      id: this.theAnimal.id,
      name: this.updateForm.get('name')?.value,
      specie: this.updateForm.get('specie')?.value,
      breed: this.updateForm.get('breed')?.value,
      age: this.updateForm.get('age')?.value,
      sex: this.updateForm.get('sex')?.value,
      neutered: this.updateForm.get('neutered')?.value,
    }).subscribe({
      next: (result) => {
        if (result == null || result == 0) {
          this.message = 'Error al actualizar Animal';
        } else {
          console.log('from updateAnimalDB', result);
          this.message = 'Update done1';
        }
      },
      error: (error) => {
        console.log('error from updateanimaldb', error);
        if (error.statusText == 'Forbidden') {
          this.message = 'You hace no permission to do this!'
        }
      }
    })
  }

  onUpdate(): any {
    // this.myhttp.updateAnimal(this.updateForm.value).subscribe(() => {
    //   console.log('Animal updated successfully!')
    //   this.ngZone.run(() =>
    //   this.router.navigateByUrl('/residents'))
    // }, (err) => {
    //   console.log(err);
    // });
    this.updateAnimalDB()

  }
}
