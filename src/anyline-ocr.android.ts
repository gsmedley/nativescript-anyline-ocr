import { AnylineOcrScannerListener} from './index';
import { AnylineOcrScannerBase } from './anyline-ocr.common';

import * as application from 'tns-core-modules/application';
import * as utilityModule from 'tns-core-modules/utils/utils';

declare const com: any;
 


export class AnylineOcrScanner extends AnylineOcrScannerBase {

  private scanRunning: boolean = false;
  private scanner: any;
  private scl: any;
  private listener: AnylineOcrScannerListener;
  
  startScan(view: any, scanListener: AnylineOcrScannerListener, license : string, 
    scanOpts : any, displayOpts: any ) {
    if( !this.scanRunning ){

      scanners.push( this );

      this.scanRunning = true

      let context = utilityModule.ad.getApplicationContext();
      let activity = application.android.foregroundActivity

      this.scanner = new com.kanayo.anyline.OcrScanner()
      this.scl = new com.kanayo.anyline.OcrScannerListener(scanListener)
      this.listener = scanListener;

      this.scanner.startScan(
        activity, 
        view, 
        this.scl, 
        license,
        JSON.stringify(scanOpts),
        JSON.stringify(displayOpts));
    } 
  }
  
  stopScan(){
    if( this.scanRunning ){
      scanners = scanners.filter(scn => scn !== this);

      this.scanRunning = false;
      
      this.scanner = null
      this.scl = null
      this.listener = null;
    }

  }
  

}

export var scanners : Array<AnylineOcrScanner> = [];

