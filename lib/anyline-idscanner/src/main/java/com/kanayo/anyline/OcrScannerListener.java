package com.kanayo.anyline;


public interface OcrScannerListener {



    void success( String progessString );
    void error( String progessString );
}
