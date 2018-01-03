import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../../app/services/data.service';
import { ViewPage } from '../view/view';
import { AdMob } from '@ionic-native/admob'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data:any;
  categorie:String = '1';

  constructor(public navCtrl: NavController,private dataService:DataService, private admob:AdMob) {

    this.OnChangeCategorie()
  }
  OnChangeCategorie(){
    this.data  = this.dataService.getImagesByCategorie(this.categorie);
  }
  ngOnInit(){
    if(AdMob) this.admob.prepareInterstitial( {adId:'ca-app-pub-9117311236925493/5580385583', autoShow:false} );

  }
  view(cat,item){
    if(item.ads == 1){
      if(AdMob) this.admob.showInterstitial();
      this.admob.prepareInterstitial( {adId:'ca-app-pub-9117311236925493/5580385583', autoShow:false} );
    }
    this.navCtrl.push(ViewPage,{
      object:item,
      cat:cat
    })
  }

}
