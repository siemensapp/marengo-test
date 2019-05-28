import { Injectable } from '@angular/core';
import { url } from '../../../../assets/js/variables';
import { DataRetrieverService } from "../services/data-retriever.service";

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {

  constructor(private http: DataRetrieverService) { }

  sendSubscription( subscription: PushSubscription) {
    console.log(subscription);
    console.log(url + '/api/subscriptionDesktop');
    return this.http.postData( url + '/api/subscriptionDesktop', JSON.stringify(subscription));
  }

}