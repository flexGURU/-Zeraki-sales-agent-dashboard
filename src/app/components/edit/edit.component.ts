import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { School } from '../../models/school.model';
import { editService } from '../../services/edit.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

constructor(
  private editServ: editService,
  private router: Router,
  private route: ActivatedRoute
)  {}

formdata: School = {
  id: 0,
  name: '',
  type: '',
  products: [],
  county: '',
  registrationDate: '',
  contactInfo: {
    email: '',
    phone: ''
  },
  balance: 0
}


ngOnInit(): void {
  
  this.route.paramMap.subscribe((param) => {
    let id = Number(param.get('id'))
    this.getByid(id)
  })
}
getByid(id: number) {
  this.editServ.edit(id).subscribe((data) => {
    this.formdata = data;

  })
}
update() {
  this.editServ.update(this.formdata).subscribe({
    next: (data) => {
      this.router.navigate(["/schools"])

    },
    error: (er) => {
      console.log(er)
    }
  })
}

}


