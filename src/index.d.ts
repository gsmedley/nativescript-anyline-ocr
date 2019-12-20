
import { AnylineOcrScannerBase } from "./anyline-ocr.android"; 
export interface AnylineOcrScannerConfig {

  /**
   * candidateExpression - regular expression to match candidate strings. These will be displayed
   * in a green box until verified.
   */
  candidateExpression: string;
  
  /**
   * verifyExpression - regular expression to verify strings. As soon as a match is found
   * it will be returned (if it also matches the checksum)
   */
  verifyExpression: string;
  
  /**
   * checkSumClassName - Name of checksum class used to verify the strings, possble values are:
   * Mod11_2, Mod37_2, Mod97_10, Mod661_26, Mod1271_36
   */
  checkSumClassName: string;
  
  /**
   * direction - Camera direction to start with: "front", "back"
   */
  direction: string;

  /**
   * flash - "on" or "off"
   */
  flash: string;
}

export interface AnylineOcrScannerListener{
  success: (data: string) => void;
  error: (data: string) => void;
}


export interface AnylineOcrScannerInterface {   
  startScan(view: any, scanListener: AnylineOcrScannerListener, license : string, scanOpts : any, displayOpts: any )
  stopScan(); 
}

export declare class AnylineOcrScanner extends AnylineOcrScannerBase { 

}
  
