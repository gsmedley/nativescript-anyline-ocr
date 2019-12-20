import { AnylineOcrScannerInterface, AnylineOcrScannerListener, AnylineOcrScannerConfig } from "./index";

export class AnylineOcrScannerBase implements AnylineOcrScannerInterface {

  startScan(view: any, scanListener: AnylineOcrScannerListener, license : string, scanOpts : any, displayOpts: any ){ /* override */ };
  stopScan(){ /* override */ };
 
}

