package com.kanayo.anyline;

import android.app.Fragment;
import android.view.WindowManager;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;


import org.json.JSONException;
import org.json.JSONObject;

import at.nineyards.anyline.camera.AnylineViewConfig;
import at.nineyards.anyline.modules.ocr.AnylineOcrConfig;
import at.nineyards.anyline.modules.ocr.AnylineOcrResult;
import at.nineyards.anyline.modules.ocr.AnylineOcrResultListener;
import at.nineyards.anyline.modules.ocr.AnylineOcrScanView;


public class OcrScannerActivity extends Fragment {

    //private static final String TAG = OcrScannerActivity.class.getSimpleName();

    private IScanController mControllerListener;
    private AnylineOcrScanView mScanView;
    private View mView;
    private String mAppResourcesPackage;



    interface IScanController {
        void onScanFinished(String message);
        void onError(String message);
    }

    public void setControllerListener(IScanController listener) {
        mControllerListener = listener;
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        mAppResourcesPackage = getActivity().getPackageName();

        // Inflate the layout for this fragment
        mView =  inflater.inflate(getResources().getIdentifier("anyline_ocr_scanner_activity", "layout", mAppResourcesPackage), container, false);
        createScanner();
        return mView;

    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    private void createScanner(){

        //Set the flag to keep the screen on (otherwise the screen may go dark during scanning)
        getActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        final Bundle args = this.getArguments();

        int ocrViewId =    getActivity().getResources().getIdentifier("anyline_ocr_scannner_view", "id", mAppResourcesPackage);

        mScanView = mView.findViewById(ocrViewId);

        String ocrConfigString = args.getString(OcrScanner.SCAN_OPTS);

        JSONObject ocrConfigJson;
        try {
            ocrConfigJson = new JSONObject(ocrConfigString);
        } catch (JSONException e) {
            mControllerListener.onError( "Error parsing Scan options" );
            e.printStackTrace();
            return;
        }

        AnylineOcrConfig anylineOcrConfig = new AnylineOcrConfig(ocrConfigJson);
        mScanView.setAnylineOcrConfig(anylineOcrConfig);


        String displayConfigString = args.getString(OcrScanner.DISPLAY_OPTS);
        JSONObject displayConfigJson;
        try {
            displayConfigJson = new JSONObject(displayConfigString);
        } catch (JSONException e) {
            mControllerListener.onError( "Error parsing display options" );
            e.printStackTrace();
            return;
        }

        AnylineViewConfig vConfig = new AnylineViewConfig(getActivity().getApplicationContext(), displayConfigJson);
        mScanView.setConfig(vConfig);

        String lic = args.getString(OcrScanner.LICENSE_OPT);

        mScanView.initAnyline(lic, new AnylineOcrResultListener() {
            @Override
            public void onResult(AnylineOcrResult anylineOcrResult) {
                mControllerListener.onScanFinished( anylineOcrResult.getResult());
            }
        });
    }

    @Override
    public void onResume() {
        super.onResume();

        if( mScanView != null ){
            mScanView.postDelayed(new Runnable() {
                @Override
                public void run() {
                    if (!getActivity().isFinishing()) {
                        mScanView.startScanning();
                    }
                }
            }, 1500);
        }


    }

    @Override
    public void onPause() {
        super.onPause();

        if( mScanView != null ) {
            mScanView.cancelScanning();
            mScanView.releaseCameraInBackground();
        }
    }

}
