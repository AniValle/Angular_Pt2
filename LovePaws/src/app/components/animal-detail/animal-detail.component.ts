import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimalserviceService } from 'src/app/services/animalservice.service';
import { Animal } from 'src/app/models/Animal';


@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {

  getId!:any;
  updateForm!: FormGroup;
  message!:string;
  theAnimal!:Animal;

  constructor(public formBuilder: FormBuilder,
              public router:Router,
              private ngZone: NgZone,
              private activatedRoute: ActivatedRoute,
              private myhttp: AnimalserviceService)
  {
    // this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    // this.updateForm = this.formBuilder.group({
    //   name:   [''],
    //   specie: [''],
    //   breed:  [''],
    //   age:    [''],
    //   sex:    [''],
    //   neutered: [''],
    // })

    // this.myhttp.getAnimal(this.getId).subscribe(res =>
    //   {
  
    //     this.updateForm.patchValue({
    //       name:   res['name'],
    //       specie: res['specie'],
    //       breed:  res['breed'],
    //       age:    res['age'],
    //       sex:    res['sex'],
    //       neutered: res['neutered'],
    //     })
    // });
    
  }

  ngOnInit() {
    //throw new Error('Method not implemented.');
    this.theAnimal=this.myhttp.a;
    console.log(this.theAnimal);

    this.updateForm = new FormGroup({

      name: new FormControl(),
      specie: new FormControl(),
      breed: new FormControl(),
      age: new FormControl(),
      sex: new FormControl(),
      neutered: new FormControl(),
    });

  }

  updateAnimalDB():void{

    this.myhttp.updateAnimal(this.theAnimal).subscribe({
      next: (result: Animal) => {
        if (result == null){
          this.message = 'Error al actualizar Animal';
        }else{
          console.log('from updateAnimalDB',result);
          this.message = 'Update done1';
        }
      },
      error: (error) => {
        console.log('error from updateanimaldb', error);
        if (error.statusText == 'Forbidden'){
          this.message = 'You hace no permission to do this!'
        }
      }
    })
  }

  onUpdate():any {
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
