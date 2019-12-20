package com.kanayo.anyline;


import android.app.Activity;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.kanayo.anyline.iso7064.PureSystemCalculator;


public class OcrScanner implements OcrScannerActivity.IScanController {

    private static final String TAG = "OcrScanner";

    static final String SCAN_OPTS = "scanOpts";
    static final String DISPLAY_OPTS = "displayOpts";
    static final String LICENSE_OPT = "licenseOpt";


    private OcrScannerActivity mFragment;
    private Bundle mExecArgs;
    private FrameLayout mContainerView;

    private Activity mActivity;
    private View mView;
    private OcrScannerListener mListener;





    public void startScan(Activity activity, View view, OcrScannerListener listener,
                          String license, String scanOpts, String displayOpts ) {


        this.mExecArgs = new Bundle();
        this.mExecArgs.putString(SCAN_OPTS, scanOpts);
        this.mExecArgs.putString(DISPLAY_OPTS, displayOpts);
        this.mExecArgs.putString(LICENSE_OPT, license);


        mListener = listener;
        mActivity = activity;
        mView = view;

        doScan();

    }

    private void doScan() {

        Log.d(TAG, "start camera action");
        if (mFragment != null) {
            mListener.error("Camera already started");
        } else {

            mFragment = new OcrScannerActivity();
            mFragment.setArguments(mExecArgs);
            mFragment.setControllerListener(this);



            if (mContainerView == null) {
                Log.d(TAG, "make  mContainerView");
                mContainerView = new FrameLayout(mActivity.getApplicationContext());

                int containerViewId = mActivity.getResources().getIdentifier( mActivity.getApplicationContext().getPackageName() + ":id/anyline_ocr_scanner_container", null, null);

                Log.d(TAG, "containerViewId"  + containerViewId );
                mContainerView.setId(containerViewId);
            }

            if (mContainerView.getParent() != mView) {
                if (mContainerView.getParent() != null) {
                    ((ViewGroup) mContainerView.getParent()).removeView(mContainerView);
                }
                FrameLayout.LayoutParams containerLayoutParams = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT);
                mContainerView.setBackgroundColor(0xFF0000);
                ((ViewGroup) mView).addView(mContainerView, containerLayoutParams);
                Log.d(TAG, "added view"   );
            }

            mContainerView.bringToFront();

            //add the mFragment to the container
            FragmentManager fragmentManager = mActivity.getFragmentManager();
            FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
            fragmentTransaction.add(mContainerView.getId(), mFragment);
            fragmentTransaction.commit();
        }

    }


    public void stopScan() {
        Log.d(TAG, "scan stopped");

        FragmentManager fragmentManager = mActivity.getFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.remove(mFragment);
        fragmentTransaction.commit();
        mFragment = null;

    }

    @Override
    public void onScanFinished(String message) {
        Log.d(TAG, "scan finished");
        if (mListener != null) {
            mListener.success(message);
            mListener = null;
        }
    }

    @Override
    public void onError(String message) {
        Log.d(TAG, "scan finished");
        if (mListener != null) {
            mListener.error(message);
            mListener = null;
        }
    }



}