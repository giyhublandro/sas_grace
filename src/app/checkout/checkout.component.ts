import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NgModule } from "@angular/core";

import { StripeScriptTag,  StripeModule} from "stripe-angular"

import { StripeService, StripePaymentElementComponent, StripeCardComponent } from 'ngx-stripe';
import {
  StripeElementsOptions,
  PaymentIntent,
  StripeElement,
  StripeElements,
  StripeCardElement
} from '@stripe/stripe-js';

import { switchMap } from 'rxjs/operators';

//Elements, Element as StripeElement, ElementsOptions

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent {
  
  elements !: StripeElements;
  card !: StripeCardElement;

  // optional parameters
  elementsOptions: StripeElementsOptions = {
    locale: 'fr'
};

  stripeTest !: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService) {}

  ngOnInit() {
    this.stripeTest = this.fb.group({
      nom_client: ['', [Validators.required]],
      email_client: ['', [Validators.required]]
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element');
        }
      });
  }

  buy() {
    
    const name = this.stripeTest.get('nom_client').value;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

}