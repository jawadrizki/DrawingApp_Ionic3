import { Component, Renderer } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {HomePage} from "../home/home";


@Component({
  selector: 'page-view',
  templateUrl: 'view.html'
})
export class ViewPage {
  draw:any;
  cat:any;
  navbar:boolean = true
  @ViewChild(Slides) slides: Slides;
  @ViewChild('myCanvas') canvas: any;
  canvasElement: any;
  lastX: number;
  lastY: number;
  currentColour: string = '#000';
  availableColours: any;
  brushSize: number = 2;
  showBars:boolean = false;
  constructor(public platform: Platform, public renderer: Renderer, public params:NavParams, public navCtrl: NavController,
              public alertCtrl: AlertController) {
         this.draw = params.get('object');
         this.cat = params.get('cat');
    this.availableColours = [
      '#1abc9c',
      '#3498db',
      '#9b59b6',
      '#e67e22',
      '#e74c3c',
      '#000',
      '#ccc'
    ];

  }



  showConfirmClear() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to clear it ?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.clearCanvas()
          }
        },
        {
          text: 'No, keep it',
          handler: () => {
            console.log('Disagree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
  ngAfterViewInit(){
    this.slides.lockSwipes(true)

    this.canvasElement = this.canvas.nativeElement;

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');

  }

  changeColour(colour){
    this.currentColour = colour;
  }

  changeSize(size){
    this.brushSize = size;
  }

  handleStart(ev){

    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY;
  }

  handleMove(ev){

    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX;
    let currentY = ev.touches[0].pageY;

    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.strokeStyle = this.currentColour;
    ctx.lineWidth = this.brushSize;
    ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;

  }

  clearCanvas(){
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  next(){
    this.slides.lockSwipes(false)
    this.slides.slideNext()
    this.slides.lockSwipes(true)
  }
  previous(){
    this.slides.lockSwipes(false)
    this.slides.slidePrev()
    this.slides.lockSwipes(true)

  }
  hidebars(){
    this.showBars = !this.showBars

  }
  checkHeader(){
    if(this.slides.isEnd()){
      return true
    }else {
      return false
    }
  }
  goToHome(){
    this.navCtrl.setRoot(HomePage);
  }








}
