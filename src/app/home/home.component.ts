import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Utilisateurs } from '../models/utilisateur';
import { UtilisateurService } from '../services/utilisateur.service';
import { AuthService } from '../services/auth.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Agence } from '../models/agence';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  siteKey : string ="6LfjSrQdAAAAAFHuh6TN0KpH6a_S8Jhp-76BwWRi"
  secretKey :string = "6LfjSrQdAAAAADH4TeUlJAoMh-k5bYl4aMentJAL"

  utilisateurs!: Utilisateurs[];

  constructor(private formBuilder:FormBuilder, 
    private router:Router,
    private _utilisateurService : UtilisateurService,
    private _authService:AuthService,
    private routes:ActivatedRoute) { 

  }

  agence !: Agence

  id_agence !:number;
   logo !: string;
	 nom!:string;
	 email!:string;
	 description!:string;
   adresse !:string;
	 telephone !:string;

   loginForm !: FormGroup;

  ngOnInit(): void {

    let id_agence :number = 1
    this.infoAgence(id_agence)

    localStorage.removeItem('token');

    if (this._authService.isLoggedIn()){
      this.router.navigate(['/dashboard'])
    }else{
      console.log("Not Actually connected")
    }

    this.loginForm = this.formBuilder.group({
    //email:['', [Validators.required, Validators.email, Validators.maxLength(30)]],
    email_utilisateur:['', [Validators.required, Validators.email]],
    mot_de_passe_utilisateur:['', [Validators.required, Validators.minLength(3)]],
    //recaptcha: ['', Validators.required]

  });

  }

  notARobot : boolean = true;

  handleSuccess(e:any){
    this.notARobot = true
  }

  onLogIn(){

    if (this.loginForm.valid){
      this._authService.login(this.loginForm.value, this.notARobot);
    }

  }

  infoAgence(id_agence : any){

    this._utilisateurService.getAgenceById(id_agence).subscribe((data:any) => {
      
      this.id_agence = data.id_agence
      this.nom = data.nom
      this.email = data.email
      this.description = data.description
      this.adresse  = data.adresse
      this.telephone = data.telephone
      this.logo = data.logo
      
    });

  }

}
