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
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.myhttp.getAnimal(this.getId).subscribe(res =>
    {
      this.updateForm.setValue({
        //name:   res.name,
        name:   res['name'],
        specie: res['specie'],
        breed:  res['breed'],
        age:    res['age'],
        sex:    res['sex'],
        neutered: res['neutered'],
      })
    });
    this.updateForm = this.formBuilder.group({
      name:   [''],
      specie: [''],
      breed:  [''],
      age:    [''],
      sex:    [''],
      neutered: [''],
    })
  }

  ngOnInit() {
    //throw new Error('Method not implemented.');
    this.theAnimal=this.myhttp.a;
    console.log(this.theAnimal);
  }

  onUpdate():any {
    this.myhttp.updateAnimal(this.getId, this.updateForm.value).subscribe(() => {
      console.log('Animal updated successfully!')
      this.ngZone.run(() =>
      this.router.navigateByUrl('/residents'))
    }, (err) => {
      console.log(err);
    });
  }
}
