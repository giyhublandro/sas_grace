import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = '';
  
  constructor(private route: ActivatedRoute) {  }

  ngOnInit() {

  }

}
