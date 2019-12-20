

import { Component, ViewChild, ElementRef } from "@angular/core";
import {AnylineOcrScanner} from "nativescript-anyline-ocr"
var permissions = require( "nativescript-permissions" );

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent  {


  @ViewChild("container", { static: false }) container: ElementRef;

  scanner : any = null;
  loaded = false;
  anylineScanner

  constructor() {
      // Use the component constructor to inject providers.
  }


  onLoadView(){
    if( !this.loaded  ) {
      this.loaded = true;
      permissions.requestPermission(android.Manifest.permission.CAMERA, "needed to scan")
      .then(
        () => {this.startScan() },
        () => { alert('cancelled')  }
      );
      }
  }

  startScan(){

    let callback = {
      success: (data: string) =>  {
        console.log( "scan success   ============")
        console.log( data)
        alert(data)
    },
      error: (error: string) => {
        console.log( "Scan fail   ============")
        console.log( error)
        alert(error)
      }
    }
        
    let view = this.container.nativeElement;

    this.scanner = new AnylineOcrScanner()

    let displayOpts  = this.config().display
    let scanOpts  = this.config().scan
    let key = this.config().key

    this.scanner.startScan( view.android, callback, key, scanOpts, displayOpts);

  }


  onNavigatedFrom(){ 
    if( this.scanner ){
      this.scanner.stopScan(  )
      this.scanner = null;
    }

  }  

  config(){
    return  {
      "key":  "eyJzY29wZSI6WyJBTEwiXSwicGxhdGZvcm0iOlsiaU9TIiwiQW5kcm9pZCIsIldpbmRvd3MiLCJKUyIsIldlYiJdLCJ2YWxpZCI6IjIwMjAtMDEtMTkiLCJtYWpvclZlcnNpb24iOjMsIm1heERheXNOb3RSZXBvcnRlZCI6NSwic2hvd1dhdGVybWFyayI6dHJ1ZSwicGluZ1JlcG9ydGluZyI6dHJ1ZSwiZGVidWdSZXBvcnRpbmciOiJvcHQtb3V0IiwidG9sZXJhbmNlRGF5cyI6NSwic2hvd1BvcFVwQWZ0ZXJFeHBpcnkiOnRydWUsImlvc0lkZW50aWZpZXIiOlsib3JnLm5hdGl2ZXNjcmlwdC5kZW1vYW5ndWxhciJdLCJhbmRyb2lkSWRlbnRpZmllciI6WyJvcmcubmF0aXZlc2NyaXB0LmRlbW9hbmd1bGFyIl0sIndpbmRvd3NJZGVudGlmaWVyIjpbIm9yZy5uYXRpdmVzY3JpcHQuZGVtb2FuZ3VsYXIiXSwid2ViSWRlbnRpZmllciI6WyJvcmcubmF0aXZlc2NyaXB0LmRlbW9hbmd1bGFyIl0sImpzSWRlbnRpZmllciI6WyJvcmcubmF0aXZlc2NyaXB0LmRlbW9hbmd1bGFyIl0sImltYWdlUmVwb3J0Q2FjaGluZyI6dHJ1ZX0KSjBtK1hDUkZneTVYMlY1RG92T0Vqd1F4U1U2S2RCbW9WTFd3clY1VHJlamg5WFdIcEFiaDVWUnVpNGEvd1VlckppRi9oa1RMOTJMeW9vQ2J4c1BCWCtrNW8xTzN6NmdHeS9ORnREZTJsTUZFTTBMUUswUjRrVnIvajM5UGtCQnMyL1lvL0tDMHhzOXZ5S3FybS9RMXV3WUxpKy9kTDNjYVJFd3pudmJMSk5wZHZ3NURyS0tobjg2T2dCTWVNcDR6YU5vNDlUVU1namJnVXBrYm5SV1dobkZLcXpiMWhDeG9hRmw1cnhhVk1naW1xTzZVekJnQjBiRkYyZ2VpVjV6clI4NWlSTmh4QW1UVyszUGh1cC8zSncyMHBUeEZIendpckpkaEtrSWc4Z3ZRZks1MGVzM1RYaHpOaG9ORHR2UC9VVHpWRWdIMk5PNERyQzRpaXV3R29RPT0=",
      "display": {
        "captureResolution":"1080",
        "cutout": {
          "style": "rect",
          "maxWidthPercent": "80%",
          "maxHeightPercent": "80%",
          "alignment": "center",
          "width": 980,
          "ratioFromSize": {
            "width": 5,
            "height": 1
          },
          "strokeWidth": 2,
          "cornerRadius": 10,
          "strokeColor": "FFFFFF",
          "outerColor": "000000",
          "outerAlpha": 0.3
        },
        "flash": {
          "mode": "manual",
          "alignment": "bottom_right"
        },
        "beepOnResult": true,
        "vibrateOnResult": true,
        "blinkAnimationOnResult": true,
        "cancelOnResult": true,
        "visualFeedback": {
          "style": "contour_underline",
          "strokeColor": "0099FF",
          "strokeWidth": 1
        }
      },
      "scan" : {
        "validationRegex": "^\\d{17}[\\dX]$",
        "charWhitelist": "0123456789X",
        "scanMode": "AUTO",
        "minConfidence": 22,
        "removeSmallContours": true,
        "removeWhitespaces": true,
        "minSharpness": 66,
        "minCharacterHeight": 40,
        "maxCharacterHeight": 60,
      
        "languages": ["tessdata/OcrB.traineddata", "tessdata/deu.traineddata", "tessdata/eng_no_dict.traineddata"]
      }
    }
  }

}

